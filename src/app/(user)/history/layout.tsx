import { StrictPropsWithChildren } from '@/type'

export default function HistoryLayout({ children }: StrictPropsWithChildren) {
  return (
    <div className="flex justify-center p-100 bg-[#FBFBFB] h-screen">
      {children}
    </div>
  )
}
