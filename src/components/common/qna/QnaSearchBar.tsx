import { Button } from '@nextui-org/react'

interface SearchBarProps {
  keyword: string
  setKeyword: (keyword: string) => void
  onSearch: () => void
}

export default function QnaSearchBar({
  keyword,
  setKeyword,
  onSearch,
}: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className="flex mt-26 w-[787px] h-[39px]">
      <div className="ml-21 w-[118px] h-[39px] text-32 font-inter font-bold">
        문의사항
      </div>
      <div className="p-3 mt-7 ml-53 w-[63px] h-[37px] rounded-3 border border-[#d5d1d1] text-center text-14">
        제목
      </div>
      <input
        className="p-3 ml-14 mt-7 w-[367px] h-[37px] rounded-3 border border-[#d5d1d1]"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button
        className="ml-14 mt-7 w-[117px] h-[37px] border bg-white border-[#ff9900] rounded-[3px] text-[#ff9900] font-bold text-[14px]"
        type="button"
        onClick={onSearch}
      >
        검색
      </Button>
    </div>
  )
}
