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
    <div className="flex ml-265 mt-34 w-[787px] h-[28px] justify-center">
      <button
        className="w-[28px] h-[28px] text-center shadow-md bg-[#f1f2f6] rounded-4"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Image src="/images/left.svg" alt="Previous" height={24} width={24} />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`w-[28px] h-[28px] text-center shadow-md ${
            currentPage === index + 1
              ? 'bg-[#ff9f00] text-[#ffffff]'
              : 'bg-[#f1f2f6]'
          } rounded-4`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="w-[28px] h-[28px] text-center shadow-md bg-[#f1f2f6] rounded-4"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Image src="/images/right.svg" alt="Next" height={24} width={24} />
      </button>
    </div>
  )
}
