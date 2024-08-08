import http from './core'

export const postImage = (
  domainName: 'notice' | 'kindergarten',
  file: string,
) =>
  http.post({
    url: '/api/upload/image',
    params: {
      domainName,
    },
    data: {
      file,
    },
  })

export const postDocument = (applicationId: string, file: string) =>
  http.post({
    url: '/api/upload/image',
    params: {
      applicationId,
    },
    data: {
      file,
    },
  })
