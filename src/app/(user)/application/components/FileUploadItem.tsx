import React, { useState } from 'react'

interface FileItem {
  name: string
  size: number
}

const FileUploadItem = function FileUploadItem() {
  const [file, setFile] = useState<FileItem | null>(null)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile({
        name: selectedFile.name,
        size: selectedFile.size,
      })
    }
  }

  const truncateFileName = function truncateFileName(
    name: string,
    maxLength: number,
  ) {
    if (name.length <= maxLength) return name
    const extension = name.split('.').pop()
    const nameWithoutExtension = name.substring(0, name.lastIndexOf('.'))
    const truncatedName = `${nameWithoutExtension.substring(
      0,
      maxLength - (extension?.length || 0) - 4,
    )}...`
    return `${truncatedName}.${extension}`
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(1)} MB`
  }

  return (
    <div className="flex items-center justify-between w-full mb-2">
      <div className="flex items-center">
        <input type="checkbox" className="w-5 h-5 mr-2" />
        <span className="text-lg">주민등록록본*</span>
      </div>
      <div className="flex items-center">
        {file ? (
          <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 mr-2">
            <span className="truncate max-w-[150px]" title={file.name}>
              {truncateFileName(file.name, 20)} ({formatFileSize(file.size)})
            </span>
            <button
              type="submit"
              onClick={() => setFile(null)}
              className="ml-2 text-red-500 font-bold"
            >
              X
            </button>
          </div>
        ) : (
          <label
            htmlFor="file-input"
            className="cursor-pointer bg-yellow-200 text-gray-700 px-3 py-1 rounded-md"
          >
            📎 파일
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
        )}
      </div>
    </div>
  )
}

export default FileUploadItem
