import { Application } from '@/components'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react'

interface ApproveModalProps {
  application: {
    nameKo: string
    applicationId: number
  }
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export default function ApproveModal({
  application: { nameKo, applicationId },
  isOpen,
  onOpenChange,
}: ApproveModalProps) {
  return (
    <Modal
      size="4xl"
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="lg"
      classNames={{
        body: 'py-6 flex justify-center items-center',
        backdrop: 'bg-white/50 backdrop-opacity-40',
        base: 'border-[#292f46] p-30 flex justify-center',
        header: 'border-b-[1px] border-[#292f46]',
        footer: 'border-t-[1px] border-[#292f46]',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {nameKo} 지원자님 신청서
            </ModalHeader>
            <ModalBody>
              <Application id={applicationId} type="admin" />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={onClose}
                className="border-1 p-16 rounded-[20px] w-120 h-40 text-[18px] text-white bg-orange/60 from-[#ffbb37] to-[#ffe39e]"
              >
                저장
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
