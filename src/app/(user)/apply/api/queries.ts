import { useMutation } from '@tanstack/react-query'
import { saveApplicationTemp, submitApplication } from './api'

export const useSaveApplicationTemp = () => {
  return useMutation({
    mutationFn: saveApplicationTemp,
  })
}

export const useSubmitApplication = () => {
  return useMutation({
    mutationFn: submitApplication,
  })
}
