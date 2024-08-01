'use client'

import { Button } from '@/components/common'
import { useErrorBoundaryContext } from '@/react-utils/ErrorBoundary/ErrorBoundaryContext'
import { StrictPropsWithChildren } from '@/type'

export default function HomeFallback({ children }: StrictPropsWithChildren) {
  const { error, resetErrorBoundary } = useErrorBoundaryContext()

  if (error !== null) {
    // TODO: 변경
    return <Button onClick={() => resetErrorBoundary()}>다시 시도하기</Button>
  }
  return children
}
