interface LegendProps {
  labels: string[]
  backgroundColors: string[]
}

export default function Legend({ labels, backgroundColors }: LegendProps) {
  return (
    <ul className="list-none">
      {labels.map((label, i) => (
        <li key={backgroundColors[i]} className="flex items-center">
          <span className={`w-30 h-10 mr-4 rounded-3 ${backgroundColors[i]}`} />
          <span className="text-12 text-[#666666]">{label}</span>
        </li>
      ))}
    </ul>
  )
}
