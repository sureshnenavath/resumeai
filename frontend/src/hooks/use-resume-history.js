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

      // Start both the API call and the minimum loading timer
      const apiPromise = apiClient.get('/history')
      const minLoadingPromise = new Promise(resolve => setTimeout(resolve, 5000)) // 5 seconds

      try {
        // Wait for both the API call and the minimum loading time
        const [response] = await Promise.all([apiPromise, minLoadingPromise])
        setHistory(response.data)
      } catch (err) {
        // If API fails, still wait for the minimum loading time
        try {
          await minLoadingPromise
        } catch {
          // minLoadingPromise never rejects, this is just for completeness
        }
        
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
