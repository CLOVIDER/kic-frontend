'use client'

import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react'
import { NonEmptyArray } from '@/type'

export interface StepProps<Steps extends NonEmptyArray<string>> {
  name: Steps[number]
  onEnter?: () => void
  children: ReactNode
}

export interface FunnelProps<Steps extends NonEmptyArray<string>> {
  steps: Steps
  step: Steps[number]
  children:
    | Array<ReactElement<StepProps<Steps>>>
    | ReactElement<StepProps<Steps>>
}

export function Funnel<Steps extends NonEmptyArray<string>>({
  steps,
  step,
  children,
}: FunnelProps<Steps>) {
  const validChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter(({ props }) =>
      steps.includes((props as Partial<StepProps<Steps>>).name ?? ''),
    ) as Array<ReactElement<StepProps<Steps>>>
  const targetStep = validChildren.find(({ props: { name } }) => name === step)
  return <>{targetStep}</>
}

export function Step<Steps extends NonEmptyArray<string>>({
  onEnter,
  children,
}: StepProps<Steps>) {
  useEffect(() => {
    onEnter?.()
  }, [onEnter])

  return <>{children}</>
}
