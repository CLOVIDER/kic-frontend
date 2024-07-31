interface ChildCardProps {
  name: string
  kindergartenList: string[]
}

export default function ChildCard({ name, kindergartenList }: ChildCardProps) {
  return (
    <div className="flex flex-col items-center w-200 h-117 bg-[#FECDA9]/40 rounded-8 shadow-sm border border-[#cccccc]">
      <div className="my-10 text-[#5a5650] font-semibold underline">{name}</div>
      <ul className="list-disc list-inside text-[#666666] text-14">
        {kindergartenList.map((kindergarten) => (
          <li key={kindergarten}>{kindergarten}</li>
        ))}
      </ul>
    </div>
  )
}
