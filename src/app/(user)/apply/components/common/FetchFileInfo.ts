export async function fetchFileInfo(
  url: string,
): Promise<{ name: string; size: number }> {
  const response = await fetch(url, { method: 'HEAD' })
  const contentDisposition = response.headers.get('Content-Disposition')
  const fileSize = Number(response.headers.get('Content-Length'))

  let fileName = url.split('/').pop() || 'Unknown File'
  if (contentDisposition) {
    const matches = /filename="([^"]+)"/.exec(contentDisposition)
    if (matches) {
      const [, extractedFileName] = matches // 배열 구조 분해 사용
      if (extractedFileName) {
        fileName = extractedFileName
      }
    }
  }

  return { name: fileName, size: fileSize }
}
