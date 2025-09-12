# PostgreSQL Setup Instructions

## Database Setup

1. **Install PostgreSQL**:
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   
   # macOS with Homebrew
   brew install postgresql
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database**:
   ```bash
   sudo -u postgres psql
   CREATE DATABASE resumeai;
   CREATE USER resumeai_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE resumeai TO resumeai_user;
   \q
   ```

3. **Update Environment**:
   ```bash
   # In backend/.env file
   DATABASE_URL=postgresql+asyncpg://resumeai_user:your_password@localhost/resumeai
   ```

4. **Install Dependencies**:
   ```bash
   pip install asyncpg
   ```

5. **Run Application**:
   ```bash
   uvicorn main:app --reload
   ```
