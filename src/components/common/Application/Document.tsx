'use client'

import Image from 'next/image'
import { Modal, ModalContent } from '@nextui-org/react'
import { useState } from 'react'
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

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (image: string) => {
    handleButtonClick(image)
    setIsModalOpen(true)
    console.log(selectedImage)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

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
              onClick={() => handleOpenModal(image)}
              className="w-84 h-24 bg-[#ffde8d] text-[12px] text-[#333333] rounded border-1 border-solid border-[#cccccc]"
            >
              🔗 파일
            </Button>
          </div>
        ))}
      </div>

      <Modal
        size="5xl"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        className="absolute top-70 z-99999 mt-10 bg-white border border-[#333333] rounded-4 w-[1000px] h-600"
      >
        <ModalContent>
          {selectedImage && selectedImage.endsWith('.pdf') ? (
            <iframe
              title="img"
              src={selectedImage}
              width="100%"
              height="100%"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              src={selectedImage!}
              alt="Document"
              width={1000}
              height={600}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
