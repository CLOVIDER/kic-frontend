import { http } from '@/api'
import { RecruitInfo } from '@/type/application'

export const getRecruitData = async (): Promise<RecruitInfo[]> => {
  try {
    const response = await http.get<RecruitInfo[]>({
      url: '/api/recruits',
    })
    return response.result
  } catch (error) {
    console.error('Error fetching recruit data:', error)
    throw error
  }
}

export interface EmployeeInfo {
  nameKo: string
  accountId: string
  employeeNo: number
  isCouple: boolean
  workedAt: Date
}

export async function getEmployeeData(): Promise<EmployeeInfo> {
  try {
    const response = await http.get<EmployeeInfo>({ url: '/api/employees' })
    return response.result
  } catch (error) {
    console.error('Error fetching employee data:', error)
    throw error
  }
}
