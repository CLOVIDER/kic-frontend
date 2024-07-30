'use client'

import { useSearchParams } from 'next/navigation'

export default function useGetQueryValueBy(key: string) {
  return useSearchParams().get(key)
}
