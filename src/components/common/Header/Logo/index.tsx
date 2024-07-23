import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex flex-row items-center gap-5">
      <Image src="/images/logo.png" alt="logo" width={18} height={13} />
      <p className="text-12">kids in company</p>
    </div>
  )
}
