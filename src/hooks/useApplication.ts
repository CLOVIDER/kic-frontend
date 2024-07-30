// hooks/useApplication.ts
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import {
  submitApplication,
  ApplicationRequest,
  ApplicationResponse,
} from '../app/(user)/application/api/submitApplication'

export const useApplication = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const submitForm = async (data: ApplicationRequest, token: string) => {
    setIsLoading(true)
    try {
      const response = await submitApplication(data, token)
      if (response.isSuccess) {
        toast.success('Application submitted successfully')
        router.push('/')
      } else {
        toast.error(response.message || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return { submitForm, isLoading }
}
