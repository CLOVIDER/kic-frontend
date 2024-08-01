import { SVGProps } from 'react'

export default function Home({
  fill = '#FFFEFE',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      {...props}
    >
      <path
        d="M5.55882 0V5.70588H0V9.29412H5.55882V15H9.44118V9.29412H15V5.70588H9.44118V0H5.55882Z"
        fill={fill}
      />
    </svg>
  )
}
