// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default async function submitApplication(
  applicationData: unknown,
  accessToken: string,
) {
  try {
    const response = await api.post('/applications', applicationData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message)
      throw new Error(
        error.response?.data?.message ||
          'An error occurred while submitting the form',
      )
    } else {
      console.error('Error submitting form:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}
