import { http } from '@/api'
import { toast } from 'react-toastify'

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await http.post<string>({
      url: `/api/upload/document`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.result
  } catch (error) {
    toast.error('이미지 업로드에 실패하였습니다. 다시 시도해주세요', {
      autoClose: 1000,
      pauseOnHover: false,
    })
    throw error
  }
}
