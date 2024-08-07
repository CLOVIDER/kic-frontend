import { useSuspenseQuery } from '@tanstack/react-query'
import { getKindergartens } from '.'

export const useGetKindergartens = () =>
  useSuspenseQuery({
    queryKey: ['get-kindergartens'],
    queryFn: getKindergartens,
    select: ({ result }) => result,
  })
