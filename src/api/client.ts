import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mouhamed-vj-backend.onrender.com'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to headers if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
