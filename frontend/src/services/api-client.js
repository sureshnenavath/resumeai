import axios from 'axios'

// Get API base URL from environment or use production URL as fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://resumeai-orm7.onrender.com/api' : 'http://localhost:8000/api')

// Debug logging
console.log('API Base URL:', API_BASE_URL)
console.log('Environment:', import.meta.env.MODE)
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL)

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data)
    } else if (error.response?.status === 400) {
      console.error('Bad request:', error.response.data)
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout')
    }
    return Promise.reject(error)
  }
)