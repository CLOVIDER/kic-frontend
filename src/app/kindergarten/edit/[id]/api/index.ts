import { http } from '@/api'
import { GetKindergartensResponse } from '@/app/kindergarten/api/index'

export interface PatchKindergartensDetail
  extends Omit<GetKindergartensResponse[number], 'kindergartenClass'> {
  kindergartenClass: Array<{ className: string; ageClass: string }>
}

export const patchKindergartensDetails = (details: PatchKindergartensDetail) =>
  http.patch({
    url: `/api/admin/kindergartens/${details.kindergartenId}`,
    data: details,
  })

export const postKindergartensDetails = (
  details: Omit<PatchKindergartensDetail, 'kindergartenId'>,
) =>
  http.post({
    url: '/api/admin/kindergartens',
    data: details,
  })
