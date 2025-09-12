from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import os
from typing import List
import asyncio
from datetime import datetime, timezone, timedelta

from database import get_db, init_db
from models import ResumeAnalysis, IST
from schemas import ResumeAnalysisResponse
from pdf_service import extract_text_from_pdf
from llm_service import analyze_resume

app = FastAPI(title="ResumeAI", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.get("/")
async def root():
    return {"message": "ResumeAI API is running"}

@app.post("/api/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume_endpoint(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        # Extract text from PDF
        pdf_content = await file.read()
        text = extract_text_from_pdf(pdf_content)
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")
        
        # Analyze with LLM
        extracted_data, llm_analysis = await analyze_resume(text)
        
        # Save to database
        resume_analysis = ResumeAnalysis(
            filename=file.filename,
            extracted_data=extracted_data.json(),
            llm_analysis=llm_analysis.json(),
            created_at=datetime.now(timezone.utc)
        )
        
        db.add(resume_analysis)
        await db.commit()
        await db.refresh(resume_analysis)
        
        return ResumeAnalysisResponse(
            id=resume_analysis.id,
            filename=resume_analysis.filename,
            name=extracted_data.name,
            email=extracted_data.email,
            phone=extracted_data.phone,
            location=extracted_data.location,
            summary=extracted_data.summary,
            core_skills=extracted_data.core_skills,
            soft_skills=extracted_data.soft_skills,
            work_experience=extracted_data.work_experience,
            education=extracted_data.education,
            certifications=extracted_data.certifications,
            languages=extracted_data.languages,
            projects=extracted_data.projects,
            resume_rating=llm_analysis.resume_rating,
            improvement_areas=llm_analysis.improvement_areas,
            upskill_suggestions=[
                {"skill": suggestion.skill, "reason": suggestion.reason}
                for suggestion in llm_analysis.upskill_suggestions
            ],
            created_at=resume_analysis.created_at
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/api/history", response_model=List[dict])
async def get_history(db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(ResumeAnalysis).order_by(ResumeAnalysis.created_at.desc()))
        analyses = result.scalars().all()
        
        history = []
        for analysis in analyses:
            import json
            extracted_data = json.loads(analysis.extracted_data)
            history.append({
                "id": analysis.id,
                "filename": analysis.filename,
                "name": extracted_data.get("name", ""),
                "email": extracted_data.get("email", ""),
                "phone": extracted_data.get("phone", ""),
                "location": extracted_data.get("location", ""),
                "created_at": analysis.created_at.isoformat()
            })
        
        return history
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")

@app.get("/api/analysis/{analysis_id}", response_model=ResumeAnalysisResponse)
async def get_analysis(analysis_id: int, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(ResumeAnalysis).where(ResumeAnalysis.id == analysis_id))
        analysis = result.scalar_one_or_none()
        
        if not analysis:
            raise HTTPException(status_code=404, detail="Analysis not found")
        
        import json
        extracted_data = json.loads(analysis.extracted_data)
        llm_analysis = json.loads(analysis.llm_analysis)
        
        return ResumeAnalysisResponse(
            id=analysis.id,
            filename=analysis.filename,
            name=extracted_data["name"],
            email=extracted_data["email"],
            phone=extracted_data["phone"],
            location=extracted_data.get("location", ""),
            summary=extracted_data.get("summary", ""),
            core_skills=extracted_data["core_skills"],
            soft_skills=extracted_data["soft_skills"],
            work_experience=extracted_data.get("work_experience", []),
            education=extracted_data.get("education", []),
            certifications=extracted_data.get("certifications", []),
            languages=extracted_data.get("languages", []),
            projects=extracted_data.get("projects", []),
            resume_rating=llm_analysis["resume_rating"],
            improvement_areas=llm_analysis["improvement_areas"],
            upskill_suggestions=llm_analysis["upskill_suggestions"],
            created_at=analysis.created_at
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch analysis: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)