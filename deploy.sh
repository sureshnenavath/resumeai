echo "🚀 Starting ResumeAI Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -f "requirements.txt" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
echo "✅ Frontend built successfully"

# Go back to root
cd ..

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "🐳 Docker found. You can deploy with:"
    echo "   docker-compose up --build"
else
    echo "📋 Manual deployment steps:"
    echo "   1. Deploy frontend: Upload frontend/dist/ to Vercel/Netlify"
    echo "   2. Deploy backend: Upload backend/ to Railway/Render"
    echo "   3. Set environment variables: GEMINI_API_KEY"
    echo "   4. Update VITE_API_URL in frontend"
fi

echo "🎉 Deployment preparation complete!"
echo "📖 See DEPLOYMENT.md for detailed instructions"

