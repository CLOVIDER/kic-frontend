import { Dispatch, SetStateAction, useCallback } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
  TableBody,
  Chip,
  ChipProps,
  Pagination,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'
import { If } from '@/components'
import {
  usePostLotteryRecruit,
  usePostRecruits,
} from '@/app/(admin)/admin/result/queries/index'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { GetLotteriesResponse } from '../api'
import { useLotteriesContext } from '../fetcher/ResultApplicationsFetcher'

const statusColorMap: Record<string, ChipProps['color']> = {
  당첨: 'success',
  예비: 'warning',
  탈락: 'danger',
}

const columns = [
  { name: '사원번호', uid: 'employeeNo' },
  { name: '신청자', uid: 'nameKo' },
  { name: '아이 이름', uid: 'childNm' },
  { name: '상태', uid: 'lotteryResult' },
]

type Lottery = GetLotteriesResponse['content'][number]

export default function LotteryTable({
  page,
  setPage,
  recruitId,
}: {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  recruitId: number
}) {
  const {
    lotteries: { content, totalPage },
  } = useLotteriesContext()
  const { mutate } = usePostRecruits()
  const { mutate: postRecruit, isSuccess, isPending } = usePostLotteryRecruit()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const renderCell = useCallback(
    (application: Lottery, columnKey: React.Key) => {
      const cellValue = application[columnKey as keyof Lottery]

      switch (columnKey) {
        case 'createdAt':
          return application.employeeNo
        case 'name':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{application.nameKo}</p>
            </div>
          )
        case 'lotteryResult':
          return (
            <Chip
              className="w-67 !max-w-67 h-21 px-8 text-14 font-bold"
              color={statusColorMap[application.lotteryResult] || 'warning'}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          )
        default:
          return cellValue
      }
    },
    [],
  )

  return (
    <>
      <div className="absolute right-70 w-204 flex flex-col justify-center items-center gap-18 font-semibold text-[#EA7465]">
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
                      추첨을 시작할까요?? <br />
                      다시 되돌릴 수 없어요!
                    </h3>
                    <div className="flex flex-row justify-center gap-10 mt-40">
                      <Button
                        onClick={onClose}
                        className="w-98 h-31 bg-white border border-[#fdba74] font-semibold text-[#fb923c] rounded-16 text-sm"
                      >
                        돌아가기
                      </Button>
                      <Button
                        isLoading={isPending}
                        onClick={() => {
                          postRecruit(recruitId, {
                            onSuccess: () => {
                              toast('추첨에 성공했어요.')
                            },
                          })
                          if (isSuccess) {
                            onClose()
                          }
                        }}
                        className="w-98 h-31 shadow-md gradient-button text-[#ffffff] font-bold rounded-16 text-sm"
                      >
                        {isPending ? '발표중이에요..' : '발표하기'}
                      </Button>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

        <Button
          onClick={onOpen}
          className="w-180 h-45 text-[20px] bg-[#FFFCF6] rounded-16 border-1 border-[#EA7465] font-semibold shadow-lg text-[#EA7465]"
        >
          추첨 시작하기
        </Button>

        <Button
          onClick={() => mutate()}
          className="w-180 h-45 text-[20px] bg-[#FFFCF6] rounded-16 border-1 border-[#EA7465] font-semibold shadow-lg text-[#EA7465]"
        >
          결과 공지하기
        </Button>

        <p className="text-13 leading-24">
          버튼을 눌러야 사용자에게 결과가
          <br />
          보여지고 메일 알림이 전송됩니다.
        </p>
      </div>

      <If condition={content.length < 1}>
        <div className="font-semibold flex justify-center items-center h-full text-24">
          추첨 대상자 목록이 없어요..🤣
        </div>
      </If>

      <If condition={content.length >= 1}>
        <Table
          classNames={{
            base: 'rounded-20',
            wrapper: 'shadow-none !rounded-20 h-495',
            thead: 'h-full border-b-2 border-[#F1F1F3] h-35',
            th: 'bg-transparent h-full',
          }}
          aria-label="table"
        >
          <TableHeader columns={columns} className="flex items-center">
            {(column) => (
              <TableColumn className="text-center" key={column.uid}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody items={content}>
            {(item) => (
              <TableRow
                key={item.applicationId}
                className="h-45 cursor-pointer"
              >
                {(columnKey) => (
                  <TableCell className="text-center">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="mt-30" />

        <If condition={!!content.length}>
          <Pagination
            page={page}
            onChange={setPage}
            classNames={{
              base: 'flex justify-center',
              wrapper: 'gap-2',
              cursor: 'border-1 w-28 h-28 !rounded-4 bg-[#FF9F00]',
              item: 'w-28 h-28 !rounded-4',
              next: 'w-28 h-28 !rounded-4',
              prev: 'w-28 h-28 !rounded-4',
            }}
            total={totalPage}
            showShadow
            showControls
          />
        </If>
      </If>
    </>
  )
}
