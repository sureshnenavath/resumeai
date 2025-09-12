from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ExtractedData(BaseModel):
    name: str
    email: str
    phone: str
    location: str
    summary: str
    core_skills: List[str]
    soft_skills: List[str]
    work_experience: List[dict]  # [{"company": str, "position": str, "duration": str, "description": str}]
    education: List[dict]  # [{"institution": str, "degree": str, "year": str}]
    certifications: List[str]
    languages: List[str]
    projects: List[dict]  # [{"name": str, "description": str, "technologies": List[str]}]

class UpskillSuggestion(BaseModel):
    skill: str
    reason: str

class LLMAnalysis(BaseModel):
    resume_rating: int  # 1-10
    improvement_areas: str  # 1 paragraph
    upskill_suggestions: List[UpskillSuggestion]  # 3-5 items

class ResumeAnalysisResponse(BaseModel):
    id: int
    filename: str
    name: str
    email: str
    phone: str
    location: str
    summary: str
    core_skills: List[str]
    soft_skills: List[str]
    work_experience: List[dict]
    education: List[dict]
    certifications: List[str]
    languages: List[str]
    projects: List[dict]
    resume_rating: int
    improvement_areas: str
    upskill_suggestions: List[dict]
    created_at: datetime