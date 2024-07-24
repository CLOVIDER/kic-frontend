import React, { useRef, useState } from "react";
import Image from 'next/image';
// import S3Upload from '@/components/S3Upload';

type RightSection2Props = {
  onPrevious: () => void;
  onSubmit: (uploadedFiles: string[], selectedItems: boolean[]) => void;
};

export default function RightSection2({ onPrevious, onSubmit }: RightSection2Props) {
  const items = [
    { name: '주민등록등본', isRequired: true },
    { name: '맞벌이', isRequired: false },
    { name: '한부모', isRequired: false },
    { name: '장애부모', isRequired: false },
    { name: '다자녀가정', isRequired: false },
    { name: '형제/자매 채용 여부', isRequired: false }
  ];

  const [uploadedFiles, setUploadedFiles] = useState<(string | null)[]>(new Array(items.length).fill(null)); // string | null 배열로 초기화
  const [selectedItems, setSelectedItems] = useState(new Array(items.length).fill(false));
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>(new Array(items.length).fill(null));

  const handleCheckboxChange = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
  };

  const handleFileUpload = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setCurrentFile(file);
      const fileUrl = URL.createObjectURL(file);
      setUploadedFiles(prevFiles => {
        const newFiles = [...prevFiles];
        newFiles[index] = fileUrl; // URL을 상태로 설정
        return newFiles;
      });
    }
  };

  const handleDeleteFile = (index: number) => {
    const newUploadedFiles = [...uploadedFiles];
    newUploadedFiles[index] = null;
    setUploadedFiles(newUploadedFiles);
  };

  const handleSubmit = () => {
    onSubmit(uploadedFiles.filter(url => url !== null) as string[], selectedItems);
  };

  // 업로드 완료 함수
  function handleUploadComplete(url: string): void {
    console.log('File uploaded to:', url);
  }

  return (
    <div className="w-453 h-507 mt-109 mr-103">
      <div className="ml-4 mt-26">
        <div className="text-20 text-[#434343] flex flex-col">
          <div>해당되는 항목을 체크해주세요!</div>
          <div className="mt-1">당첨 시 가점 요인이 됩니다.</div>
        </div>
      </div>
      <div className="ml-4 mt-5">
        <div className="text-[#E86565] text-12">체크한 항목을 증빙할 수 있는 서류를 각각 첨부해주세요.</div>
      </div>
      <div className="ml-7 mt-65 w-[444px]">
        {items.map((item, index) => (
          <div key={index} className="w-full mb-10 flex items-center justify-between">
            <div className="flex items-center">
              <div
                onClick={() => handleCheckboxChange(index)}
                className="w-24 h-24 border rounded-lg border-solid border-[#CCCCCC] flex items-center justify-center cursor-pointer mr-16"
              >
                {selectedItems[index] && (
                  <Image src="/images/check.svg" alt="Checkmark" width={24} height={24} />
                )}
              </div>
              <span className="text-lg">
                {item.name}
                {item.isRequired && <span className="text-[#ea7465] ml-1">*</span>}
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleFileUpload(index)}
                className="w-[84px] h-[24px] bg-[#ffde8d] text-12 text-gray-700 rounded border-[1px] border-solid border-[#cccccc]"
              >
                {uploadedFiles[index] ? '📎 완료' : '📎 파일'}
              </button>
              <input
                type="file"
                ref={el => { fileInputRefs.current[index] = el; }}
                onChange={(e) => handleFileChange(index, e)}
                style={{ display: 'none' }}
              />
              {uploadedFiles[index] && (
                <div className="ml-2 flex items-center">
                  <span className="text-sm mr-2">{uploadedFiles[index]}</span>
                  <button
                    onClick={() => handleDeleteFile(index)}
                    className="text-[#ef4444]"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* {currentFile && <S3Upload file={currentFile} onUploadComplete={(url) => handleUploadComplete(url)} />} */}
      <div className="mt-114 w-[449px] h-[33px] flex items-center">
        <button onClick={onPrevious} className="w-[98px] h-[31px] bg-white border border-[#fdba74] font-bold text-[#fb923c] rounded-full text-sm">
          이전
        </button>
        <div className="w-[148px]"></div>
        <button className="w-[98px] h-[31px] [background:linear-gradient(90deg,_rgba(255,_171,_45,_0.13),_rgba(153,_103,_27,_0.11))] border border-[#e6d5c5] font-bold text-[#fb923c] rounded-full text-sm">
          임시저장
        </button>
        <div className="w-[8px]"></div>
        <button onClick={handleSubmit} className="w-[98px] h-[31px] shadow-md [background:linear-gradient(90deg,_#ffbb38,_#ffe39f)] text-[#ffffff] rounded-full text-sm">
          제출
        </button>
      </div>
    </div>
  );
}
