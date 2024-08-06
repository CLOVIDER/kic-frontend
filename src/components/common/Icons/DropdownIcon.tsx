import { SVGProps } from 'react'

export default function DropdownIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6 8.79687L12 14.6606L18 8.79688" fill="white" />
    </svg>
  )
}
