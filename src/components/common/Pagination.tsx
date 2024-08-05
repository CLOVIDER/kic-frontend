import Image from 'next/image'
import { Pagination as NextUIPagination, Button } from '@nextui-org/react'
import cn from '@/util/cn'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

interface PaginationButtonProps {
  onClick: () => void
  disabled: boolean
  iconSrc: string
  altText: string
}

function PaginationButton({
  onClick,
  disabled,
  iconSrc,
  altText,
}: PaginationButtonProps) {
  return (
    <button
      className={cn('w-28 h-28 shadow-md bg-[#f1f2f6] rounded-4 min-w-0 p-0', {
        'opacity-50': disabled,
      })}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      <Image src={iconSrc} alt={altText} height={24} width={24} />
    </button>
  )
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex ml-265 mt-34 w-[787px] h-28 justify-center items-center">
      <Button
        className="w-28 h-28 shadow-md bg-[#f1f2f6] rounded-4 min-w-0 p-0"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        iconSrc="/images/left.svg"
        altText="Previous"
      />

      <NextUIPagination
        total={totalPages}
        page={currentPage}
        onChange={onPageChange}
        showControls={false}
        classNames={{
          wrapper: 'gap-0',
          item: 'w-28 h-28',
          cursor: 'hidden',
        }}
        renderItem={({ ref, value, isActive }) => {
          if (typeof value === 'number') {
            return (
              <button
                key={value}
                ref={ref}
                className={cn('w-28 h-28 shadow-md rounded-4 min-w-0 p-0', {
                  'bg-[#ff9f00] text-[#ffffff]': isActive,
                  'bg-[#f1f2f6]': !isActive,
                })}
                onClick={() => onPageChange(value)}
                type="button"
              >
                {value}
              </button>
            )
          }
          return null
        }}
      />


      <Button
        className="w-28 h-28 shadow-md bg-[#f1f2f6] rounded-4 min-w-0 p-0"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        iconSrc="/images/right.svg"
        altText="Next"
      />
    </div>
  )
}
