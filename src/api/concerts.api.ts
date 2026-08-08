import { apiClient } from './client'

export const getConcerts = async (): Promise<any> => {
  const response = await apiClient.get('/concerts')
  return response.data
}

export const getConcertById = async (id: string) => {
  const response = await apiClient.get(`/concerts/${id}`)
  return response.data
}
