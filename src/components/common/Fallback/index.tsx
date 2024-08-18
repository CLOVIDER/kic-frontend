import Image from 'next/image'

export default function Fallback() {
  return (
    <>
      <Image
        src="/images/loading.gif"
        alt="loading"
        width={1000}
        height={1000}
      />
    </>
  )
}
