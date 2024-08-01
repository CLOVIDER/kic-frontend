import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '../../Button'

export default function Logo() {
  const { push } = useRouter()

  return (
    <div className="text-12 flex flex-row gap-10">
      <Button
        className="w-15 h-15 text-[12px] bg-transparent text-[#333333]"
        onClick={() => push('/')}
      >
        <div className="flex flex-row items-center gap-5 whitespace-nowrap">
          <Image src="/images/logo.png" alt="logo" width={18} height={13} />
          <p>kids in company</p>
        </div>
      </Button>
      <Button
        className="w-15 h-15 text-[12px] bg-transparent text-[#333333]"
        onClick={() => push('/login')}
      >
        login
      </Button>
    </div>
  )
}
