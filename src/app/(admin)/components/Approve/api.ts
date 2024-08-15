import { http } from '@/api'
import { useMutation } from '@tanstack/react-query'

export type ApproveStatus = 'ACCEPT' | 'UNACCEPT' | 'WAIT'

export interface ApproveRequest {
  RESIDENT_REGISTER: ApproveStatus
  DUAL_INCOME: ApproveStatus
  SINGLE_PARENT: ApproveStatus
  DISABILITY: ApproveStatus
  MULTI_CHILDREN: ApproveStatus
  SIBLING: ApproveStatus
}

interface ApproveResponse {
  id: number
  createdAt: string
}

export const patchApprove = (id: number, data: Partial<ApproveRequest>) =>
  http.patch<ApproveResponse>({
    url: `/api/admin/applications/${id}`,
    data,
  })

export const usePatchApprove = (id: number) => {
  return useMutation({
    mutationKey: ['approve', id],
    mutationFn: ({ data }: { data: Partial<ApproveRequest> }) =>
      patchApprove(id, data),
    onSuccess: () => {},
  })
}
