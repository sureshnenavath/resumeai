import React from 'react'
import { Calendar, User, Mail, Phone, Eye, MapPin } from 'lucide-react'
import { useResumeHistory } from '../hooks/use-resume-history.js'
import { formatToIST } from '../utils/timezone.js'
import { apiClient } from '../services/api-client.js'

const HistorySection = ({ 
  onSelectAnalysis, 
  refreshTrigger
}) => {
  const { history, loading, error } = useResumeHistory(refreshTrigger)

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading analysis history...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No resume analyses yet.</p>
        <p className="text-gray-500 mt-2">Upload your first resume to get started!</p>
      </div>
    )
  }

  const handleViewDetails = async (historyItem) => {
    try {
      const response = await apiClient.get(`/analysis/${historyItem.id}`)
      if (response.status === 200) {
        onSelectAnalysis(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch analysis details:', err)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Analysis History</h2>
        <p className="text-gray-600 mt-1">{history.length} resume(s) analyzed</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {history.map((item) => (
            <li key={item.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.filename}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        PDF
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {item.name || 'Name not found'}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {item.email || 'Email not found'}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {item.phone || 'Phone not found'}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.location || 'Location not found'}
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatToIST(item.created_at)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HistorySection