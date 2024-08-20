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
import { predata } from '@/type/application'
import { ApplicationPayload } from '../api'
import { FileInfo } from '../api/getFile'

export default function SubmitModal({
  formData,
  uploadedFiles,
  onSubmit,
  children,
  selectedLabels,
}: {
  formData: ApplicationPayload
  uploadedFiles: Record<string, FileInfo>
  onSubmit: (data: Partial<ApplicationPayload>) => void
  children: (onOpen: () => void) => ReactNode
  selectedLabels: Record<string, Record<string, string>>
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
                <div>
                  <h2>아이 정보:</h2>
                  {formData.childrenRecruitList.map((child, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                      <p>아이 이름: {child.childNm}</p>
                      <p>
                        신청한 어린이집 및 반:{' '}
                        {Object.entries(
                          selectedLabels[child.childNm] || {},
                        ).map(([kindergarten, className], idx) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <span key={idx}>
                            {kindergarten} - {className}
                            {idx <
                            Object.keys(selectedLabels[child.childNm]).length -
                              1
                              ? ', '
                              : ''}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <h2>첨부 파일:</h2>
                  {Object.keys(uploadedFiles).map((key) => {
                    const itemName =
                      predata.find((item) => item.key === key)?.name || key
                    return (
                      <div key={key}>
                        <p>
                          {itemName}:{' '}
                          {uploadedFiles[key]?.name || 'No file uploaded'}
                        </p>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <h2>선택한 항목:</h2>
                  <p>
                    한부모: {formData.isSingleParent === '1' ? '예' : '아니요'}
                  </p>
                  <p>
                    장애인: {formData.isDisability === '1' ? '예' : '아니요'}
                  </p>
                  <p>
                    맞벌이: {formData.isDualIncome === '1' ? '예' : '아니요'}
                  </p>
                  <p>
                    직장부부:{' '}
                    {formData.isEmployeeCouple === '1' ? '예' : '아니요'}
                  </p>
                  <p>
                    형제자매: {formData.isSibling === '1' ? '예' : '아니요'}
                  </p>
                </div>
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
