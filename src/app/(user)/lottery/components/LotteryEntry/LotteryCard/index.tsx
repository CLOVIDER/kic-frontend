import { StrictPropsWithChildren } from '@/type'
import { cn } from '@/util'

interface Props extends StrictPropsWithChildren {
  className?: string
}

function Title({ className, children }: Props) {
  return <h1 className={cn('text-60 font-bold', className)}>{children}</h1>
}

function Description({ className, children }: Props) {
  return <h2 className={cn('text-27', className)}>{children}</h2>
}

function LotteryCard({ className, children }: Props) {
  return (
    <section
      className={cn('flex flex-col justify-center items-center', className)}
    >
      {children}
    </section>
  )
}

function Content({ className, children }: Props) {
  return <div className={className}>{children}</div>
}

LotteryCard.Title = Title
LotteryCard.Description = Description
LotteryCard.Content = Content

export default LotteryCard
