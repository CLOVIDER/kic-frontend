import {
  Modal,
  Button,
  useDisclosure,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { ReactNode } from 'react'
import { ApplicationPayload } from '../api'

export default function SubmitModal({
  formData,
  onSubmit,
  children,
}: {
  formData: ApplicationPayload
  onSubmit: (data: Partial<ApplicationPayload>) => void
  children: (onOpen: () => void) => ReactNode
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      {children(onOpen)}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: 'py-6',
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
          base: 'border-[#292f46] bg-[#FFF3D4] text-center p-30',
          header: 'border-b-[1px] border-[#292f46]',
          footer: 'border-t-[1px] border-[#292f46]',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>신청서 확인</h1>
              </ModalHeader>
              <ModalBody>
                {/* 데이터를 UI에 맞게 표시 */}
                <div>
                  이름:{' '}
                  {formData.childrenRecruitList
                    .map((child) => child.childNm)
                    .join(', ')}
                </div>
                <div>
                  파일 URLS: {Object.values(formData.fileUrls).join(', ')}
                </div>
                {/* 추가 데이터 표시 */}
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="mt-20 w-[98px] h-[31px] [background:linear-gradient(90deg,_rgba(255,_171,_45,_0.13),_rgba(153,_103,_27,_0.11))] border bg-[#fff] border-[#e6d5c5] font-bold text-[#fb923c] rounded-full text-sm"
                >
                  돌아가기
                </Button>
                <Button
                  className="mt-20 ml-20 w-[98px] h-[31px] bg-[#ffb74d] font-bold text-white rounded-full text-sm"
                  onClick={() => {
                    onSubmit(formData)
                    onClose()
                  }}
                >
                  제출하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
