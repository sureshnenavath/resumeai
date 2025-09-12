import { useState, useEffect } from 'react'
import { apiClient } from '../services/api-client.js'

export const useResumeHistory = (refreshTrigger) => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiClient.get('/history')
        setHistory(response.data)
      } catch (err) {
        const errorMessage = err.response?.data?.detail || 'Failed to fetch history'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [refreshTrigger])

  return {
    history,
    loading,
    error,
  }
}