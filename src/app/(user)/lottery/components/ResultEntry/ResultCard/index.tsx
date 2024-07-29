import { StrictPropsWithChildren } from '@/type'
import { cn } from '@/util'

interface Props extends StrictPropsWithChildren {
  className?: string
}

function Title({ children, className }: Props) {
  return <h1 className={cn('text-40 font-bold', className)}>{children}</h1>
}

function SubTitle({ children, className }: Props) {
  return <h1 className={cn('text-30 font-bold', className)}>{children}</h1>
}

function Description({ children, className }: Props) {
  return <h1 className={cn('text-20 font-bold', className)}>{children}</h1>
}

function ResultCard({ children, className }: Props) {
  return (
    <section
      className={cn(
        'relative flex flex-col justify-center items-center',
        className,
      )}
    >
      {children}
    </section>
  )
}

function Footer({ children, className }: Props) {
  return <div className={className}>{children}</div>
}

ResultCard.Title = Title
ResultCard.SubTitle = SubTitle
ResultCard.Description = Description
ResultCard.Footer = Footer

export default ResultCard
