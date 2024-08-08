import { http } from '@/api'
import { GetKindergartensResponse } from '@/app/kindergarten/api/index'

export interface PatchKindergartensDetail extends GetKindergartensResponse {}

export const patchKindergartensDetails = (
  details: PatchKindergartensDetail[number],
) =>
  http.patch({
    url: `/api/admin/kindergartens/${details.kindergartenId}`,
    data: details,
  })

export const postKindergartensDetails = (
  details: Omit<PatchKindergartensDetail[number], 'kindergartenId'>,
) =>
  http.post({
    url: '/api/admin/kindergartens',
    data: details,
  })
