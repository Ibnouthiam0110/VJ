import { apiClient } from './client'

export const getGallery = async (category?: string) => {
  const response = await apiClient.get('/gallery', { params: { category } })
  return response.data
}

export const getMediaById = async (id: string) => {
  const response = await apiClient.get(`/gallery/${id}`)
  return response.data
}
