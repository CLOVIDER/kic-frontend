import cn from '@/util/cn'
import { Pagination as NextUIPagination, Button } from '@nextui-org/react'
import Image from 'next/image'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex ml-265 mt-34 w-[787px] h-28 justify-center items-center">
      <Button
        className={cn(
          'w-28 h-28 shadow-md bg-[#f1f2f6] rounded-4 min-w-0 p-0',
          {
            isDisabled: currentPage === 1,
          },
        )}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        isDisabled={currentPage === 1}
        isIconOnly
      >
        <Image src="/images/left.svg" alt="Previous" height={24} width={24} />
      </Button>

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
              <Button
                key={value}
                ref={ref}
                className={cn('w-28 h-28 shadow-md rounded-4 min-w-0 p-0', {
                  'bg-[#ff9f00] text-[#ffffff]': isActive,
                  'bg-[#f1f2f6]': !isActive,
                })}
                onClick={() => onPageChange(value)}
              >
                {value}
              </Button>
            )
          }
          return null
        }}
      />

      <Button
        className={cn(
          'w-28 h-28 shadow-md bg-[#f1f2f6] rounded-4 min-w-0 p-0',
          {
            isDisabled: currentPage === totalPages,
          },
        )}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        isDisabled={currentPage === totalPages}
        isIconOnly
      >
        <Image src="/images/right.svg" alt="Next" height={24} width={24} />
      </Button>
    </div>
  )
}
