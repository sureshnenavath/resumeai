import { useState } from 'react'
import { apiClient } from '../services/api-client.js'

export const useAnalyzeResume = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const analyzeResume = async (file) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await apiClient.post('/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setResult(response.data)
      return true
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Analysis failed. Please try again.'
      setError(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    analyzeResume,
    loading,
    error,
    result,
  }
}