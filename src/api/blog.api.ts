import { apiClient } from './client'

export const getBlogPosts = async (): Promise<any> => {
  const response = await apiClient.get('/blog', { params: { page: 1, limit: 10 } })
  return response.data
}

export const getBlogPostById = async (id: string) => {
  const response = await apiClient.get(`/blog/${id}`)
  return response.data
}
