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
    <div className={className}>
      <p className="text-20  font-semibold">{title}</p>
      <p className="text-10 text-[#E86565]"> {subtitle}</p>
    </div>
  )
}
