import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import Image from 'next/image'
import { ReactNode } from 'react'
import { useDeleteLottery } from './api/api'

export default function CancelModal({
  id,
  children,
}: {
  id: number
  children: (onOpen: () => void) => ReactNode
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { mutate: deleteLottery } = useDeleteLottery()

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
              <ModalBody>
                <div className="flex flex-col items-center text-center px-50 mb-10">
                  <Image
                    src="/images/caution.svg"
                    width={180}
                    height={180}
                    alt="주의"
                    className=""
                  />
                  <h3 className="text-20">
                    정말 취소하겠어요? <br />
                    취소는 다시 되돌릴 수 없어요!
                  </h3>
                  <div className="flex flex-row justify-center gap-10 mt-40">
                    <Button
                      onClick={onClose}
                      className="w-98 h-31 bg-white border border-[#fdba74] font-semibold text-[#fb923c] rounded-16 text-sm"
                    >
                      돌아가기
                    </Button>
                    <Button
                      onClick={() => deleteLottery(id)}
                      className="w-98 h-31 shadow-md gradient-button text-[#ffffff] font-bold rounded-16 text-sm"
                    >
                      네, 취소할래요
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
