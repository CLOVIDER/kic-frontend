'use client'

import { ComponentProps, Suspense } from 'react'
import useIsClient from '@/hooks/useIsClient'

export default function SSRSafeSuspense(
  props: ComponentProps<typeof Suspense>,
) {
  const isClient = useIsClient()

  if (!isClient) {
    // eslint-disable-next-line react/destructuring-assignment
    return props.fallback
  }
  return <Suspense {...props} />
}
