import { http } from '@/api'
import { toast } from 'react-toastify'

export const uploadImage = async (
  file: File,
  domainName: string,
): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await http.post<string>({
      url: `/api/upload/image?domainName=${domainName}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.result // 직접 URL 문자열 반환
    throw new Error(`Image upload failed: ${response.message}`)
  } catch (error) {
    toast.error(`Error uploading image: ${error}`)
    throw error
  }
}
