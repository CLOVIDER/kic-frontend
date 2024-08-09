import { http } from '@/api'

export const getRecruitData = async () => {
  try {
    const response = await http.get<any>({ url: '/api/recruits' })
    return response.result
  } catch (error) {
    console.error('Error fetching recruit data:', error)
    throw error
  }
}

export const getEmployeeData = async () => {
  try {
    const response = await http.get<any>({ url: '/api/employees' })
    return response.result
  } catch (error) {
    console.error('Error fetching employee data:', error)
    throw error
  }
}
