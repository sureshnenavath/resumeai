# ResumeAI Setup Instructions

## Quick Start (3 commands)
```bash
# 1. Setup backend
cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt

# 2. Setup frontend  
cd ../frontend && npm install

# 3. Run both servers (requires 2 terminals)
# Terminal 1: cd backend && source venv/bin/activate && uvicorn main:app --reload --port 8000
# Terminal 2: cd frontend && npm run dev
```

## Environment Setup
1. Copy `.env.example` to `.env` in project root
2. Add your Google Gemini API key to `GEMINI_API_KEY=your_key_here`
3. Backend runs on http://localhost:8000, Frontend on http://localhost:5173

## Running Tests
```bash
# Backend tests
cd backend && source venv/bin/activate && pytest

# Frontend tests  
cd frontend && npm test
```

## Creating GitHub Package
```bash
# From project root
zip -r resumeai-codebase.zip . -x "*/node_modules/*" "*/.venv/*" "*/venv/*" "*/__pycache__/*" "*.pyc"
```