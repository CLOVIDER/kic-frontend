import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN } from '@/constants'
import Button from '../../Button'

export default function Logo() {
  const { push } = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const accessToken = Cookies.get(ACCESS_TOKEN) as string
    setIsLoggedIn(!!accessToken)
  }, [isLoggedIn])

  const handleLogout = () => {
    Cookies.remove(ACCESS_TOKEN)
    setIsLoggedIn(false)
    push('/')
  }

  return (
    <div className="text-12 w-full flex flex-row justify-between">
      <Button
        className="w-15 h-15 text-[12px] bg-transparent text-[#333333]"
        onClick={() => push('/')}
      >
        <div className="flex flex-row items-center gap-5 whitespace-nowrap">
          <Image src="/images/logo.png" alt="logo" width={18} height={13} />
          <p>kids in company</p>
        </div>
      </Button>
      {isLoggedIn ? (
        <Button
          className="w-15 h-15 text-[12px] bg-transparent text-[#333333]"
          onClick={handleLogout}
        >
          logout
        </Button>
      ) : (
        <Button
          className="w-15 h-15 text-[12px] bg-transparent text-[#333333]"
          onClick={() => push('/login')}
        >
          login
        </Button>
      )}
    </div>
  )
}
