import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import CancelContent from './WinningContent'

interface AppProps {
  status: '당첨' | '등록' | '대기' | '취소'
}

const statusMessages = {
  당첨: '축하합니다! 당첨되었습니다.',
  등록: '등록이 완료되었습니다.',
  대기: '현재 대기 중입니다.',
  취소: '',
}

const buttonTexts = {
  당첨: '등록/포기',
  등록: '포기하기',
  대기: '포기하기',
  취소: '',
}

const statusStyles = {
  당첨: 'bg-green-500',
  등록: 'bg-blue-500',
  대기: 'bg-yellow-500',
  취소: 'bg-gray-500',
}

export default function HistoryModal({ status }: AppProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        onPress={onOpen}
        color="secondary"
        className="h-20 bg-transparent text-[#716F6F] underline text-[12px] ml-10"
      >
        {buttonTexts[status]}
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: 'py-6',
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
          base: 'border-[#292f46] bg-[#FFF3D4] text-center',
          header: 'border-b-[1px] border-[#292f46]',
          footer: 'border-t-[1px] border-[#292f46]',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <CancelContent />
              </ModalBody>
              {/* <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className={`shadow-lg shadow-indigo-500/20 ${statusStyles[status]}`}
                  onPress={onClose}
                >
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
