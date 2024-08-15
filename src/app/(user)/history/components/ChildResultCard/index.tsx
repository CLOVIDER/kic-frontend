import { Button, Chip, ChipProps } from '@nextui-org/react'
import CancelModal from '@/components/common/CancelModal'
import { If } from '@/components'
import { useRouter } from 'next/navigation'
import { LotteryResult } from '../HistoryFetcher/api'

const statusColorMap: Record<string, ChipProps['color']> = {
  당첨: 'danger',
  대기: 'warning',
  등록: 'success',
}

export default function ChildResultCard({
  name,
  lotteryResults,
}: {
  name: string
  lotteryResults: LotteryResult[]
}) {
  const { push } = useRouter()

  return (
    <div className="flex flex-col px-30 py-10 pb-30 bg-[#FFF7E3] rounded-8 custom-box-shadow border border-[#cccccc]">
      <p className="my-10 text-[#5a5650] font-semibold">{name} 어린이</p>
      <ul className="list-disc text-[#666666] text-14 whitespace-nowrap">
        {lotteryResults.map(
          ({
            result,
            isregistry,
            waitingNumber,
            applicationId,
            kindergartenName,
            lotteryId,
          }) => {
            let statusLabel = ''
            let displayText = ''

            if (result === 'WIN' && isregistry === '1') {
              statusLabel = '등록'
              displayText = '등록'
            } else if (result === 'WIN') {
              statusLabel = '당첨'
              displayText = '당첨'
            } else {
              statusLabel = '대기'
              displayText = `대기 ${waitingNumber}번`
            }

            return (
              <li key={applicationId}>
                <div className="flex items-center justify-between mb-5 gap-5">
                  <span>{kindergartenName}</span>
                  <Chip
                    className="w-67 !max-w-67 h-21 px-8 text-14 font-bold text-center border border-[#A0A5A9]"
                    color={statusColorMap[statusLabel]}
                    size="sm"
                    variant="flat"
                  >
                    {displayText}
                  </Chip>
                  <If condition={statusLabel === '등록'}>
                    <Button
                      onClick={() => push(`/lottery/${lotteryId}`)}
                      className="h-20 bg-transparent text-[#716F6F] underline text-[12px] ml-10"
                    >
                      등록/취소
                    </Button>
                  </If>
                  <If
                    condition={statusLabel === '대기' || statusLabel === '당첨'}
                  >
                    <CancelModal id={applicationId}>
                      {(onOpen) => (
                        <Button
                          onPress={onOpen}
                          className="h-20 bg-transparent text-[#716F6F] underline text-[12px] ml-10"
                        >
                          취소하기
                        </Button>
                      )}
                    </CancelModal>
                  </If>
                </div>
              </li>
            )
          },
        )}
      </ul>
    </div>
  )
}
