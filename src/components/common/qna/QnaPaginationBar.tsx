import { Pagination } from '@nextui-org/react'

interface PaginationBarProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function QnaPaginationBar({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationBarProps) {
  return (
    <Pagination
      total={totalPages}
      initialPage={1}
      page={currentPage}
      onChange={onPageChange}
      showControls
      showShadow
      color="warning"
      classNames={{
        base: 'flex justify-center',
        wrapper: 'gap-2',
        cursor: 'border-none w-28 h-28 !rounded-[4] bg-[#FF9F00]',
        item: 'w-28 h-28 !rounded-[4]',
        next: 'w-28 h-28 !rounded-[4] font-bold',
        prev: 'w-28 h-28 !rounded-[4]',
      }}
    />
  )
}
