import React, { useState, useEffect } from 'react'
import UploadSection from './components/upload-section.jsx'
import HistorySection from './components/history-section.jsx'
import DetailModal from './components/detail-modal.jsx'
import Footer from './components/footer.jsx'
import { Brain } from 'lucide-react'

function App() {
  // Get initial tab from URL or default to 'upload'
  const getInitialTab = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get('tab')
    return tab === 'history' ? 'history' : 'upload'
  }

  const [activeTab, setActiveTab] = useState(getInitialTab)
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)
  const [refreshHistory, setRefreshHistory] = useState(0)

  // Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    const url = new URL(window.location.href)
    if (tab === 'upload') {
      url.searchParams.delete('tab')
    } else {
      url.searchParams.set('tab', tab)
    }
    window.history.pushState({}, '', url.toString())
  }

  const handleAnalysisComplete = () => {
    setRefreshHistory(prev => prev + 1)
    handleTabChange('history')
  }

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const newTab = getInitialTab()
      setActiveTab(newTab)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">ResumeAI</h1>
            </div>
            <nav className="flex space-x-8">
              <button
                onClick={() => handleTabChange('upload')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'upload'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Upload Resume
              </button>
              <button
                onClick={() => handleTabChange('history')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Analysis History
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'upload' && (
          <UploadSection onAnalysisComplete={handleAnalysisComplete} />
        )}
        {activeTab === 'history' && (
          <HistorySection
            onSelectAnalysis={setSelectedAnalysis}
            refreshTrigger={refreshHistory}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Detail Modal */}
      {selectedAnalysis && (
        <DetailModal
          analysis={selectedAnalysis}
          onClose={() => setSelectedAnalysis(null)}
        />
      )}
    </div>
  )
}

export default App