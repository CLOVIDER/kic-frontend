/* eslint-disable no-restricted-globals */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unstable-nested-components */

'use client'

import { ko, enUS, Locale } from 'date-fns/locale'
import {
  forwardRef,
  KeyboardEvent,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { format } from 'date-fns'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { CalendarProps } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { DayPicker } from 'react-day-picker'
import { Input } from '@/components'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function isValidHour(value: string) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value)
}

function isValid12Hour(value: string) {
  return /^(0[1-9]|1[0-2])$/.test(value)
}

function isValidMinuteOrSecond(value: string) {
  return /^[0-5][0-9]$/.test(value)
}

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean }

function getValidNumber(
  value: string,
  { max, min = 0, loop = false }: GetValidNumberConfig,
) {
  let numericValue = parseInt(value, 10)

  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max
      if (numericValue < min) numericValue = min
    } else {
      if (numericValue > max) numericValue = min
      if (numericValue < min) numericValue = max
    }
    return numericValue.toString().padStart(2, '0')
  }

  return '00'
}

function getValidHour(value: string) {
  if (isValidHour(value)) return value
  return getValidNumber(value, { max: 23 })
}

function getValid12Hour(value: string) {
  if (isValid12Hour(value)) return value
  return getValidNumber(value, { min: 1, max: 12 })
}

function getValidMinuteOrSecond(value: string) {
  if (isValidMinuteOrSecond(value)) return value
  return getValidNumber(value, { max: 59 })
}

type GetValidArrowNumberConfig = {
  min: number
  max: number
  step: number
}

function getValidArrowNumber(
  value: string,
  { min, max, step }: GetValidArrowNumberConfig,
) {
  let numericValue = parseInt(value, 10)
  if (!isNaN(numericValue)) {
    numericValue += step
    return getValidNumber(String(numericValue), { min, max, loop: true })
  }
  return '00'
}

function getValidArrowHour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 23, step })
}

function getValidArrow12Hour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 1, max: 12, step })
}

function getValidArrowMinuteOrSecond(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 59, step })
}

function setMinutes(date: Date, value: string) {
  const minutes = getValidMinuteOrSecond(value)
  date.setMinutes(parseInt(minutes, 10))
  return date
}

function setSeconds(date: Date, value: string) {
  const seconds = getValidMinuteOrSecond(value)
  date.setSeconds(parseInt(seconds, 10))
  return date
}

function setHours(date: Date, value: string) {
  const hours = getValidHour(value)
  date.setHours(parseInt(hours, 10))
  return date
}
function convert12HourTo24Hour(hour: number, period: Period) {
  if (period === 'PM') {
    if (hour <= 11) {
      return hour + 12
    }
    return hour
  }
  if (period === 'AM') {
    if (hour === 12) return 0
    return hour
  }
  return hour
}

function set12Hours(date: Date, value: string, period: Period) {
  const hours = parseInt(getValid12Hour(value), 10)
  const convertedHours = convert12HourTo24Hour(hours, period)
  date.setHours(convertedHours)
  return date
}

type TimePickerType = 'minutes' | 'seconds' | 'hours' | '12hours'
type Period = 'AM' | 'PM'

function setDateByType(
  date: Date,
  value: string,
  type: TimePickerType,
  period?: Period,
) {
  switch (type) {
    case 'minutes':
      return setMinutes(date, value)
    case 'seconds':
      return setSeconds(date, value)
    case 'hours':
      return setHours(date, value)
    case '12hours': {
      if (!period) return date
      return set12Hours(date, value, period)
    }
    default:
      return date
  }
}
function getArrowByType(value: string, step: number, type: TimePickerType) {
  switch (type) {
    case 'minutes':
      return getValidArrowMinuteOrSecond(value, step)
    case 'seconds':
      return getValidArrowMinuteOrSecond(value, step)
    case 'hours':
      return getValidArrowHour(value, step)
    case '12hours':
      return getValidArrow12Hour(value, step)
    default:
      return '00'
  }
}

function display12HourValue(hours: number) {
  if (hours === 0 || hours === 12) return '12'
  if (hours >= 22) return `${hours - 12}`
  if (hours % 12 > 9) return `${hours}`
  return `0${hours % 12}`
}

function genMonths(locale: Locale) {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2021, i), 'MMMM', { locale }),
  }))
}

function genYears(locale: Locale, yearRange = 50) {
  const today = new Date()
  return Array.from({ length: yearRange * 2 + 1 }, (_, i) => ({
    value: today.getFullYear() - yearRange + i,
    label: (today.getFullYear() - yearRange + i).toString(),
  }))
}

function getDateByType(date: Date | null, type: TimePickerType) {
  if (!date) return '00'
  switch (type) {
    case 'minutes':
      return getValidMinuteOrSecond(String(date.getMinutes()))
    case 'seconds':
      return getValidMinuteOrSecond(String(date.getSeconds()))
    case 'hours':
      return getValidHour(String(date.getHours()))
    case '12hours':
      const hours = display12HourValue(date.getHours())
      return getValid12Hour(String(hours))
    default:
      return '00'
  }
}

// ---------- utils end ----------

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  yearRange = 50,
  ...props
}: CalendarProps & { yearRange?: number }) {
  const MONTHS = useMemo(() => genMonths(props.locale || enUS), [])
  const YEARS = useMemo(() => genYears(props.locale || enUS, yearRange), [])

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-12 bg-white', className)}
      classNames={{
        months:
          'flex flex-col sm:flex-row space-y-16 sm:space-x-16 sm:space-y-0 justify-center',
        month: 'space-y-16',
        caption: 'flex justify-center pt-16 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-4 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-28 w-28 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-4',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-36 font-normal text-[0.8rem]',
        row: 'flex w-full mt-8',
        cell: 'h-36 w-36 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-36 w-36 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_end: 'day-range-end',
        day_selected:
          '!bg-orange/80 text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-16 w-16" />,
        IconRight: () => <ChevronRight className="h-16 w-16" />,
        CaptionLabel: ({ displayMonth }) => {
          return (
            <div className="inline-flex gap-2">
              <Select
                defaultValue={displayMonth.getMonth().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(displayMonth)
                  newDate.setMonth(parseInt(value, 10))
                  props.onMonthChange?.(newDate)
                }}
              >
                <SelectTrigger className="w-fit border-none p-0 focus:bg-accent focus:text-accent-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem
                      key={month.value}
                      value={month.value.toString()}
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                defaultValue={displayMonth.getFullYear().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(displayMonth)
                  newDate.setFullYear(parseInt(value, 10))
                  props.onMonthChange?.(newDate)
                }}
              >
                <SelectTrigger className="w-fit border-none p-0 focus:bg-accent focus:text-accent-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem key={year.value} value={year.value.toString()}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

interface PeriodSelectorProps {
  period: Period
  setPeriod?: (m: Period) => void
  date?: Date | null
  onDateChange?: (date: Date | undefined) => void
  onRightFocus?: () => void
  onLeftFocus?: () => void
}

const TimePeriodSelect = forwardRef<HTMLButtonElement, PeriodSelectorProps>(
  (
    { period, setPeriod, date, onDateChange, onLeftFocus, onRightFocus },
    ref,
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowRight') onRightFocus?.()
      if (e.key === 'ArrowLeft') onLeftFocus?.()
    }

    const handleValueChange = (value: Period) => {
      setPeriod?.(value)

      if (date) {
        const tempDate = new Date(date)
        const hours = display12HourValue(date.getHours())
        onDateChange?.(
          setDateByType(
            tempDate,
            hours.toString(),
            '12hours',
            period === 'AM' ? 'PM' : 'AM',
          ),
        )
      }
    }

    return (
      <div className="flex h-40 items-center">
        <Select
          defaultValue={period}
          onValueChange={(value: Period) => handleValueChange(value)}
        >
          <SelectTrigger
            ref={ref}
            className="w-48 h-36 text-center border-[#CCCCCC] focus:bg-accent focus:text-accent-foreground"
            onKeyDown={handleKeyDown}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white w-50">
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  },
)

TimePeriodSelect.displayName = 'TimePeriodSelect'

interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType
  date?: Date | null
  onDateChange?: (date: Date | undefined) => void
  period?: Period
  onRightFocus?: () => void
  onLeftFocus?: () => void
}

const TimePickerInput = forwardRef<HTMLInputElement, TimePickerInputProps>(
  (
    {
      className,
      type = 'tel',
      value,
      id,
      name,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      onDateChange,
      onChange,
      onKeyDown,
      picker,
      period,
      onLeftFocus,
      onRightFocus,
      ...props
    },
    ref,
  ) => {
    const [flag, setFlag] = useState<boolean>(false)
    const [prevIntKey, setPrevIntKey] = useState<string>('0')

    useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false)
        }, 2000)

        return () => clearTimeout(timer)
      }
    }, [flag])

    const calculatedValue = useMemo(() => {
      return getDateByType(date, picker)
    }, [date, picker])

    const calculateNewValue = (key: string) => {
      if (picker === '12hours') {
        if (flag && calculatedValue.slice(1, 2) === '1' && prevIntKey === '0')
          return `0${key}`
      }

      return !flag ? `0${key}` : calculatedValue.slice(1, 2) + key
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') return
      e.preventDefault()
      if (e.key === 'ArrowRight') onRightFocus?.()
      if (e.key === 'ArrowLeft') onLeftFocus?.()
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        const step = e.key === 'ArrowUp' ? 1 : -1
        const newValue = getArrowByType(calculatedValue, step, picker)
        if (flag) setFlag(false)
        const tempDate = date ? new Date(date) : new Date()
        onDateChange?.(setDateByType(tempDate, newValue, picker, period))
      }
      if (e.key >= '0' && e.key <= '9') {
        if (picker === '12hours') setPrevIntKey(e.key)

        const newValue = calculateNewValue(e.key)
        if (flag) onRightFocus?.()
        setFlag((prev) => !prev)
        const tempDate = date ? new Date(date) : new Date()
        onDateChange?.(setDateByType(tempDate, newValue, picker, period))
      }
    }

    return (
      <Input
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={cn(
          'w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:border-4 focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none',
          className,
        )}
        value={value || calculatedValue}
        onChange={(e) => {
          e.preventDefault()
          onChange?.(e)
        }}
        type={type}
        inputMode="decimal"
        onKeyDown={(e) => {
          onKeyDown?.(e)
          handleKeyDown(e)
        }}
        {...props}
      />
    )
  },
)

TimePickerInput.displayName = 'TimePickerInput'

interface TimePickerProps {
  date?: Date | null
  onChange?: (date: Date | undefined) => void
  hourCycle?: 12 | 24
  granularity?: Granularity
}

interface TimePickerRef {
  minuteRef: HTMLInputElement | null
  hourRef: HTMLInputElement | null
  secondRef: HTMLInputElement | null
}

const TimePicker = forwardRef<TimePickerRef, TimePickerProps>(
  ({ date, onChange, hourCycle = 24, granularity = 'hour' }, ref) => {
    const minuteRef = useRef<HTMLInputElement>(null)
    const hourRef = useRef<HTMLInputElement>(null)
    const secondRef = useRef<HTMLInputElement>(null)
    const periodRef = useRef<HTMLButtonElement>(null)
    const [period, setPeriod] = useState<Period>(
      date && date.getHours() >= 12 ? 'PM' : 'AM',
    )

    useImperativeHandle(
      ref,
      () => ({
        minuteRef: minuteRef.current,
        hourRef: hourRef.current,
        secondRef: secondRef.current,
        periodRef: periodRef.current,
      }),
      [minuteRef, hourRef, secondRef],
    )

    return (
      <div className="flex items-center justify-center gap-2">
        <label htmlFor="datetime-picker-hour-input" className="cursor-pointer">
          <Clock className="mr-2 h-4 w-4" />
        </label>
        {hourCycle === 12 && (
          <div className="grid gap-1 text-center">
            <TimePeriodSelect
              period={period}
              setPeriod={setPeriod}
              date={date}
              onDateChange={(data) => {
                onChange?.(data)
                if (data && data?.getHours() >= 12) {
                  setPeriod('PM')
                } else {
                  setPeriod('AM')
                }
              }}
              ref={periodRef}
              onLeftFocus={() => secondRef.current?.focus()}
            />
          </div>
        )}

        <TimePickerInput
          picker={hourCycle === 24 ? 'hours' : '12hours'}
          date={date}
          id="datetime-picker-hour-input"
          onDateChange={onChange}
          ref={hourRef}
          period={period}
          onRightFocus={() => minuteRef.current?.focus()}
        />

        {(granularity === 'minute' || granularity === 'second') && (
          <>
            :
            <TimePickerInput
              picker="minutes"
              date={date}
              onDateChange={onChange}
              ref={minuteRef}
              onLeftFocus={() => hourRef.current?.focus()}
              onRightFocus={() => secondRef.current?.focus()}
            />
          </>
        )}
        {granularity === 'second' && (
          <>
            :
            <TimePickerInput
              picker="seconds"
              date={date}
              onDateChange={onChange}
              ref={secondRef}
              onLeftFocus={() => minuteRef.current?.focus()}
              onRightFocus={() => periodRef.current?.focus()}
            />
          </>
        )}
      </div>
    )
  },
)
TimePicker.displayName = 'TimePicker'

type Granularity = 'day' | 'hour' | 'minute' | 'second'

type DateTimePickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  hourCycle?: 12 | 24
  placeholder?: string
  minDate?: Date
  maxDate?: Date

  yearRange?: number

  displayFormat?: { hour24?: string; hour12?: string }

  granularity?: Granularity
} & Pick<
  CalendarProps,
  'locale' | 'weekStartsOn' | 'showWeekNumber' | 'showOutsideDays'
>

type DateTimePickerRef = {
  value?: Date
} & Omit<HTMLButtonElement, 'value'>

const DateTimePicker = forwardRef<DateTimePickerRef, DateTimePickerProps>(
  (
    {
      locale = ko,
      value,
      onChange,
      hourCycle = 24,
      yearRange = 50,
      disabled = false,
      displayFormat,
      granularity = 'second',
      placeholder = 'Pick a date',
      minDate,
      maxDate,
      ...props
    },
    ref,
  ) => {
    const [month, setMonth] = useState<Date>(value ?? new Date())
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleSelect = (newDay: Date | undefined) => {
      if (!newDay) return

      const localDate = new Date(
        newDay.getFullYear(),
        newDay.getMonth(),
        newDay.getDate(),
        newDay.getHours(),
        newDay.getMinutes(),
        newDay.getSeconds(),
      )

      onChange?.(localDate)
      setMonth(localDate)
    }

    useImperativeHandle(
      ref,
      () => ({
        ...buttonRef.current!,
        value,
      }),
      [value],
    )

    return (
      <Popover>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="ghost"
            className={cn(
              'w-[200px] h-40 p-10 justify-between text-left font-normal border !border-[#CCCCCC]',
              !value && 'text-muted-foreground',
            )}
            ref={buttonRef}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-8 h-16 w-16" />
              {value ? (
                <span>{format(value, 'yyyy.MM.dd', { locale })}</span>
              ) : (
                <span>{placeholder}</span>
              )}
            </div>
            {value && (
              <span className="ml-auto">
                {format(value, hourCycle === 24 ? 'HH시' : 'a hh시', {
                  locale,
                })}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            month={month}
            onSelect={(d) => handleSelect(d)}
            onMonthChange={handleSelect}
            initialFocus
            yearRange={yearRange}
            locale={locale}
            fromDate={minDate}
            toDate={maxDate}
            {...props}
          />
          {granularity !== 'day' && (
            <div className="border-t bg-[#fff1de] p-3">
              <TimePicker
                onChange={onChange}
                date={value}
                hourCycle={hourCycle}
                granularity="hour"
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    )
  },
)

DateTimePicker.displayName = 'DateTimePicker'

export { DateTimePicker, TimePickerInput, TimePicker }
export type { TimePickerType, DateTimePickerProps, DateTimePickerRef }
