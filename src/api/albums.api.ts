import { apiClient } from './client'

export const getAlbums = async (): Promise<any> => {
  const response = await apiClient.get('/albums')
  return response.data
}

export const getAlbumById = async (id: string) => {
  const response = await apiClient.get(`/albums/${id}`)
  return response.data
}
