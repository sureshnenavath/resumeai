import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAI
from langchain.output_parsers import PydanticOutputParser
from langchain.prompts import PromptTemplate
from schemas import ExtractedData, LLMAnalysis

load_dotenv()

# Initialize Gemini
llm = GoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.1
)

# Parsers
extraction_parser = PydanticOutputParser(pydantic_object=ExtractedData)
analysis_parser = PydanticOutputParser(pydantic_object=LLMAnalysis)

# Prompts (exact wording as specified)
extraction_prompt = PromptTemplate(
    template="""You are an expert ATS recruiter. Extract comprehensive structured data from the following résumé text. Return ONLY a valid JSON object that matches this schema:
{{
"name": string,
"email": string,
"phone": string,
"location": string,
"summary": string,
"core_skills": string[],
"soft_skills": string[],
"work_experience": [{{"company": string, "position": string, "duration": string, "description": string}}],
"education": [{{"institution": string, "degree": string, "year": string}}],
"certifications": string[],
"languages": string[],
"projects": [{{"name": string, "description": string, "technologies": string[]}}]
}}
Extract ALL available information. If a field is not found, use empty string or empty array.
No additional text.

Résumé text:
{resume_text}

{format_instructions}""",
    input_variables=["resume_text"],
    partial_variables={"format_instructions": extraction_parser.get_format_instructions()}
)

analysis_prompt = PromptTemplate(
    template="""You are a career coach. Using the comprehensive JSON résumé data below, provide a critical analysis. Return ONLY a valid JSON object:
{{
"resume_rating": integer, // 1-10 based on completeness, skills relevance, experience quality
"improvement_areas": string, // 1 detailed paragraph with specific actionable feedback
"upskill_suggestions": [{{"skill": string, "reason": string}}] // 3-5 specific, relevant skills with detailed reasoning
}}

Focus on:
- Skills gaps based on their experience and industry trends
- Technologies that complement their current skillset
- Emerging skills in their field
- Certifications or tools that would enhance their profile

Make suggestions specific to their background, not generic. Consider their work experience, projects, and current skills.

Résumé data:
{extracted_data}

{format_instructions}""",
    input_variables=["extracted_data"],
    partial_variables={"format_instructions": analysis_parser.get_format_instructions()}
)

async def analyze_resume(resume_text: str) -> tuple[ExtractedData, LLMAnalysis]:
    try:
        # Step 1: Extract data
        extraction_chain = extraction_prompt | llm | extraction_parser
        extracted_data = await extraction_chain.ainvoke({"resume_text": resume_text})
        
        # Step 2: Analyze data
        analysis_chain = analysis_prompt | llm | analysis_parser
        llm_analysis = await analysis_chain.ainvoke({"extracted_data": extracted_data.json()})
        
        return extracted_data, llm_analysis
        
    except Exception as e:
        raise Exception(f"LLM analysis failed: {str(e)}")