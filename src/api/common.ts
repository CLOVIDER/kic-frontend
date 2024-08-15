import http from './core'

export const postImage = (
  domainName: 'notice' | 'kindergarten',
  file: File,
) => {
  const formData = new FormData()
  formData.append('file', file)

  return http.post<string>({
    url: '/api/upload/image',
    params: { domainName },
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const postDocument = (applicationId: string, file: string) => {
  const formData = new FormData()
  formData.append('file', file)

  return http.post<string>({
    url: '/api/upload/document',
    params: { applicationId },
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
