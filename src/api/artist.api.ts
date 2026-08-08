import { apiClient } from './client'

export const getArtist = async (): Promise<any> => {
  const response = await apiClient.get('/artist')
  return response.data
}
