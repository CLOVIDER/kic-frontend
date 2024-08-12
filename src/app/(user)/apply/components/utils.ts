export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

export const truncateFileName = (
  fileName: string,
  maxLength: number,
): string => {
  if (fileName.length <= maxLength) return fileName
  const extension = fileName.split('.').pop()
  const name = fileName.substring(0, fileName.lastIndexOf('.'))
  return `${name.substring(0, maxLength - 3 - (extension?.length || 0))}...${extension}`
}
