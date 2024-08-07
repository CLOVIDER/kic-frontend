import { Chip, ChipProps } from '@nextui-org/react'
import HistoryModal from '../HistoryModal'

const statusColorMap: Record<string, ChipProps['color']> = {
  당첨: 'success',
  등록: 'danger',
}

export default function ChildResultCard({
  name,
  results,
  classes,
}: {
  name: string
  results: string[]
  classes: string[]
}) {
  return (
    <div className="flex flex-col px-30 py-10 pb-30 bg-[#FFF7E3] rounded-8 custom-box-shadow border border-[#cccccc]">
      <p className="my-10 text-[#5a5650] font-semibold">{name} 어린이</p>
      <ul className="list-disc text-[#666666] text-14 whitespace-nowrap">
        {classes.map((data, index) => (
          <li key={data}>
            <div className="flex items-center justify-between mb-5 gap-5">
              <span>{data}</span>
              <Chip
                className="w-67 !max-w-67 h-21 px-8 text-14 font-bold text-center border border-[#A0A5A9]"
                color={statusColorMap[results[index]]}
                size="sm"
                variant="flat"
              >
                {results[index]}
              </Chip>
              <HistoryModal status="당첨" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
