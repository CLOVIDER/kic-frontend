import { cn } from '@/lib/utils'

export default function Title({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div>
      <p className={cn('text-30 font-semibold', className)}>{title}</p>
      <p className="text-15 text-[#E86565]"> {subtitle}</p>
    </div>
  )
}
