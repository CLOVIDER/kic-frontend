/* eslint-disable react-hooks/rules-of-hooks */

'use client'

import Image from 'next/image'
import { Modal } from '@nextui-org/react'
import CheckboxWithLabel from '../CheckboxWithLabel'
import Button from '../Button'
import { useDocumentLogic } from './useDocument'

export default function Document({
  type,
  applicationID,
}: {
  type: 'admin' | 'user'
  applicationID?: number
}) {
  const {
    documents,
    selectedImage,
    checkboxStates,
    handleButtonClick,
    handleCheckboxChange,
    getLabelText,
  } = useDocumentLogic(type, applicationID)

  return (
    <>
      <div className="flex flex-col w-430 gap-20 text-[#666666]">
        {documents.map(({ id, documentType, image }) => (
          <div key={id} className="flex justify-between items-center gap-10">
            <CheckboxWithLabel
              text={getLabelText(documentType)}
              checked={type === 'user' || checkboxStates[documentType]}
              onChange={
                type === 'admin'
                  ? () => handleCheckboxChange(documentType)
                  : undefined
              }
            />
            <Button
              onClick={() => handleButtonClick(image)}
              className="w-84 h-24 bg-[#ffde8d] text-[12px] text-[#333333] rounded border-1 border-solid border-[#cccccc]"
            >
              🔗 파일
            </Button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Modal className="absolute top-70 left-150 z-999 mt-10 bg-white border border-[#333333] rounded-4 w-700 h-600">
          <Image
            src={selectedImage}
            alt="Document"
            width={700}
            height={500}
            className="w-full h-auto"
          />
        </Modal>
      )}
    </>
  )
}
