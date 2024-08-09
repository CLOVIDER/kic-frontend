import { http } from '@/api'

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

    return response.result // 직접 URL 문자열 반환
    // throw new Error(`Image upload failed: ${response.message}`)
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}
