import { useMutation } from '@tanstack/react-query'
import { postImage } from '@/api/common'
import { patchKindergartensDetails, postKindergartensDetails } from '.'

export const usePostKindergartenDetails = () =>
  useMutation({
    mutationKey: ['patch-kindergartens-detail'],
    mutationFn: postKindergartensDetails,
  })

export const usePatchKindergartenDetails = (id: number) =>
  useMutation({
    mutationKey: ['patch-kindergartens-detail', id],
    mutationFn: patchKindergartensDetails,
  })

export const usePostImage = (domainName: 'notice' | 'kindergarten') =>
  useMutation({
    mutationKey: ['upload-image'],
    mutationFn: (file: File) => postImage(domainName, file),
  })
