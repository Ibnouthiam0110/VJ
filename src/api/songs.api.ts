import { apiClient } from './client'

export const getSongs = async (): Promise<any> => {
  const response = await apiClient.get('/songs', { params: { page: 1, limit: 20 } })
  return response.data
}

export const getSongById = async (id: string) => {
  const response = await apiClient.get(`/songs/${id}`)
  return response.data
}
