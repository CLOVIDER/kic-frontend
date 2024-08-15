import Image from 'next/image'

export default function HomeFallback() {
  return (
    <>
      <Image src="/images/spinner.gif" alt="loading" width={100} height={100} />
    </>
  )
}
