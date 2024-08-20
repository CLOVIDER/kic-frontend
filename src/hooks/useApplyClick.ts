import { getHomeData } from '@/app/(home)/components/api/api'
import { getApplicationData } from '@/app/(user)/apply/api'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export async function useHandleApplyClick(router: AppRouterInstance) {
  const response = await getHomeData()
  console.log(response.result.recruitStatus)
  try {
    const applicationStatus = await getApplicationData()
    if (response.result.recruitStatus === '모집없음') {
      alert('신청기간이 아닙니다.')
      router.push('/')
    } else if (applicationStatus.id === null) {
      router.push('/apply')
    } else {
      router.push(`/apply/application?isTemp=${applicationStatus.isTemp}`)
    }
  } catch (error) {
    console.error('Error checking application status:', error)
  }
}
