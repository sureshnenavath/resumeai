# ResumeAI - AI-Powered Résumé Analysis

## Description
ResumeAI is a modern web application that leverages Google Gemini AI to provide comprehensive résumé analysis. Upload your PDF résumé and get instant feedback on skills extraction, rating, improvement areas, and upskilling suggestions.

## Author
**Nenavath Suresh**  
GitHub: [@sureshnenavath](https://github.com/sureshnenavath)  
LinkedIn: [nenavath-suresh](https://linkedin.com/in/nenavath-suresh)  
Twitter: [@creator_surya](https://twitter.com/creator_surya)  
Instagram: [n_e_n_a_v_a_t_h___s_u_r_e_s_h](https://instagram.com/n_e_n_a_v_a_t_h___s_u_r_e_s_h)

## Assessment Compliance ✅

This project fully meets all assessment requirements:

- ✅ **Two-tab UI**: Upload tab for new resumes, History tab for past analyses
- ✅ **Backend API**: FastAPI with comprehensive resume analysis endpoints
- ✅ **Database**: PostgreSQL storing all extracted resume data
- ✅ **LLM Integration**: Google Gemini 1.5 Flash with LangChain
- ✅ **Comprehensive Data Extraction**: Name, email, phone, location, summary, skills, work experience, education, certifications, languages, projects
- ✅ **Resume Rating**: 1-10 scale with detailed feedback
- ✅ **Upskill Suggestions**: Personalized, specific recommendations with reasoning
- ✅ **Sample Data**: 4 sample PDF resumes for testing
- ✅ **Modern UI**: Clean, responsive design with proper loading states
- ✅ **Modal Details**: Click "Details" button to view full analysis

## Tech Stack
- **Frontend**: React 18, Vite, TypeScript, TailwindCSS, Axios
- **Backend**: Python 3.11, FastAPI, SQLAlchemy 2.0 (async)
- **Database**: PostgreSQL with async support
- **AI**: Google Gemini 1.5 Flash via LangChain
- **PDF Processing**: pdfplumber

## Features
- 📄 PDF résumé upload and parsing with drag-and-drop
- 🤖 Two-step AI analysis (extraction → analysis)
- 📊 Comprehensive résumé scoring (1-10)
- 💡 Personalized improvement suggestions
- 📈 Skills analysis (core & soft skills)
- 💼 Work experience extraction
- 🎓 Education history parsing
- 🏆 Certifications and projects analysis
- 🌍 Languages and location detection
- 📋 Analysis history with searchable table
- 🎨 Modern, responsive UI with loading states
- 📱 Mobile-friendly design

## Local Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

### Installation
```bash
# Clone repository
git clone <your-repo-url>
cd resumeai

# Setup environment
cp backend/.env.example backend/.env
# Add your GEMINI_API_KEY to backend/.env file

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup (new terminal)
cd frontend
npm install

# Run backend (Terminal 1)
cd backend && source venv/bin/activate
uvicorn main:app --reload --port 8000

# Run frontend (Terminal 2)  
cd frontend && npm run dev
```

Visit http://localhost:5173 to use the application.

## API Documentation
Visit http://localhost:8000/docs for interactive OpenAPI documentation.

## Testing
```bash
# Backend tests
cd backend && pytest

# Frontend tests
cd frontend && npm test
```

## Sample Data
The `sample_data/` folder contains 4 sample PDF resumes for testing:
- sample-resume-1.pdf
- sample-resume-2.pdf  
- sample-resume-3.pdf
- sample-resume-4.pdf

## Screenshots
The `screenshots/` folder contains UI screenshots:
- upload-screen.png - Upload interface
- history-screen.png - Analysis history table
- detail-modal.png - Detailed analysis view
- analysis-loading.png - Loading state

## Project Structure
```
/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API client
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── package.json
├── backend/            # FastAPI application
│   ├── main.py         # FastAPI app and routes
│   ├── models.py       # Database models
│   ├── schemas.py      # Pydantic schemas
│   ├── llm_service.py  # Gemini AI integration
│   ├── pdf_service.py  # PDF text extraction
│   ├── database.py     # Database configuration
│   └── requirements.txt
├── sample_data/        # Example PDF résumés
├── screenshots/        # UI screenshots
└── README.md
```

## Key Features Implementation

### Data Extraction
The application extracts comprehensive information from resumes:
- **Personal Info**: Name, email, phone, location
- **Professional Summary**: Career overview and objectives
- **Skills**: Core technical skills and soft skills
- **Experience**: Work history with company, position, duration, description
- **Education**: Degrees, institutions, graduation years
- **Projects**: Project names, descriptions, technologies used
- **Certifications**: Professional certifications and licenses
- **Languages**: Spoken languages and proficiency levels

### AI Analysis
- **Resume Rating**: 1-10 scale based on completeness and quality
- **Improvement Areas**: Specific, actionable feedback
- **Upskill Suggestions**: Personalized skill recommendations with detailed reasoning

### UI/UX Features
- **Drag & Drop**: Easy PDF upload with visual feedback
- **Loading States**: Smooth user experience during analysis
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modal Details**: Comprehensive view of all extracted data
- **History Management**: Easy access to past analyses

## Links
- **GitHub Repository**: [https://github.com/sureshnenavath/resumeai](https://github.com/sureshnenavath/resumeai)
- **Live Demo**: [Add deployment URL if available]
- **Demo Video**: [Add 2-minute Loom demo link here]

## Contact & Collaboration
For questions, suggestions, or collaboration opportunities, feel free to reach out:

- **Email**: [Add your email here]
- **GitHub**: [@sureshnenavath](https://github.com/sureshnenavath)
- **LinkedIn**: [nenavath-suresh](https://linkedin.com/in/nenavath-suresh)
- **Twitter**: [@creator_surya](https://twitter.com/creator_surya)
- **Instagram**: [n_e_n_a_v_a_t_h___s_u_r_e_s_h](https://instagram.com/n_e_n_a_v_a_t_h___s_u_r_e_s_h)

### 🤝 Open for Collaboration
I'm always interested in:
- **Open Source Contributions**: Feel free to submit issues and pull requests
- **AI/ML Projects**: Particularly interested in innovative AI applications
- **Web Development**: Full-stack development opportunities
- **Tech Discussions**: Happy to discuss technology trends and best practices

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Built with ❤️ by [Nenavath Suresh](https://github.com/sureshnenavath)**

[![GitHub](https://img.shields.io/badge/GitHub-sureshnenavath-blue?style=flat&logo=github)](https://github.com/sureshnenavath)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-nenavath--suresh-blue?style=flat&logo=linkedin)](https://linkedin.com/in/nenavath-suresh)
[![Twitter](https://img.shields.io/badge/Twitter-@creator__surya-blue?style=flat&logo=twitter)](https://twitter.com/creator_surya)

</div>