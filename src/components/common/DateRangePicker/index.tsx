'use client'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/locale'

type DateRangePickerProps = {
  startLabel?: string
  endLabel?: string
  startDate: Date | null
  endDate: Date | null
  onChange: (startDate: Date | null, endDate: Date | null) => void
  showTimeSelect?: boolean
}

function DateRangePicker({
  startLabel = '시작일',
  endLabel = '마감일',
  startDate,
  endDate,
  onChange,
  showTimeSelect = false,
}: DateRangePickerProps) {
  return (
    <div className="border border-[#CCCCCC] rounded-5 flex flex-row gap-20 px-5 bg-white">
      <div>
        <label htmlFor="startLabel" className="text-12 text-[#656464]">
          {startLabel}
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => onChange(date, endDate)}
          showTimeSelect={showTimeSelect}
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat={showTimeSelect ? 'yyyy/MM/dd aa h:mm' : 'yyyy/MM/dd'}
          timeCaption="Time"
          className="px-5 text-15 cursor-pointer"
          locale={ko}
        />
      </div>
      <div>
        <label htmlFor="endLabel" className="text-12 text-[#656464]">
          {endLabel}
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => onChange(startDate, date)}
          showTimeSelect={showTimeSelect}
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat={showTimeSelect ? 'yyyy/MM/dd aa h:mm' : 'yyyy/MM/dd'}
          timeCaption="Time"
          className="px-5 text-15 cursor-pointer"
          locale={ko}
        />
      </div>
    </div>
  )
}

export default DateRangePicker
