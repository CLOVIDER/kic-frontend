'use client'

import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { useDeleteQna } from '@/components/qna'
import { useRouter, usePathname } from 'next/navigation'

export default function CancelModal({
  id,
  children,
}: {
  id: number
  children: (onOpen: () => void) => ReactNode
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutate: deleteQna } = useDeleteQna()
  const router = useRouter()
  const pathname = usePathname()

  const handleDelete = () => {
    deleteQna(id, {
      onSuccess: () => {
        onClose() // 성공 시 모달 닫기
        if (pathname === '/admin/qna') {
          window.location.reload()
        } else {
          router.push('/admin/qna') // 다른 경로에서는 /admin/qna로 이동
        }
      },
      onError: () => {
        alert('삭제 실패') // 에러 처리
      },
    })
  }

  return (
    <>
      {children(onOpen)}

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
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
                정말 삭제하시겠습니까?
                <br />이 작업은 되돌릴 수 없습니다.
              </h3>
              <div className="flex flex-row justify-center gap-10 mt-40">
                <Button
                  onClick={onClose}
                  className="w-98 h-31 bg-white border border-[#fdba74] font-semibold text-[#fb923c] rounded-16 text-sm"
                >
                  돌아가기
                </Button>
                <Button
                  onClick={handleDelete}
                  className="w-98 h-31 shadow-md gradient-button text-[#ffffff] font-bold rounded-16 text-sm"
                >
                  네, 삭제할래요
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
