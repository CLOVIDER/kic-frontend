import { SVGProps } from 'react'

export default function Right({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Chevron big/Right">
        <path
          id="Vector"
          d="M9.5 18.5C11.6808 16.923 13.6364 15.0771 15.3172 13.0101C15.5609 12.7103 15.5609 12.2897 15.3172 11.9899C13.6364 9.92294 11.6808 8.07701 9.5 6.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
