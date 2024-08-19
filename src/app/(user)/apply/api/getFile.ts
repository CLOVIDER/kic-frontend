export interface FileInfo {
  name: string
  url: string
}

export function getFileInfoFromUrl(fileurl: string): FileInfo {
  const fileName = fileurl.split('/').pop() || 'unknown_file'
  return { name: fileName, url: fileurl }
}
