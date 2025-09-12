from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from datetime import datetime, timezone, timedelta

Base = declarative_base()

# IST timezone offset (+05:30)
IST = timezone(timedelta(hours=5, minutes=30))

class ResumeAnalysis(Base):
    __tablename__ = "resume_analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    extracted_data = Column(Text, nullable=False)  # JSON string
    llm_analysis = Column(Text, nullable=False)    # JSON string
    created_at = Column(DateTime(timezone=True), server_default=func.now())