import { getApplicationData } from '@/app/(user)/apply/api'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export async function handleApplyClick(router: AppRouterInstance) {
  try {
    const applicationStatus = await getApplicationData()

    if (applicationStatus.id === null) {
      router.push('/apply')
    } else {
      router.push(`/apply/application?isTemp=${applicationStatus.isTemp}`)
    }
  } catch (error) {
    console.error('Error checking application status:', error)
  }
}
