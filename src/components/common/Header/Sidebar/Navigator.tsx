/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { JSX, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/util'
import {
  Boxes,
  Graph,
  Home,
  Lightning,
  Person,
  Talk,
} from '@/components/common/Icons'
import { getApplicationData } from '@/app/(user)/apply/api'

export default function Navigator() {
  const pathname = usePathname()
  const router = useRouter()

  const handleApplyClick = async () => {
    try {
      const applicationStatus = await getApplicationData()

      if (applicationStatus.id === null) {
        router.push('/apply')
      } else {
        router.push('/apply/application')
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error checking application status:', error)
    }
  }

  const createRoute = (
    label: string,
    path: string,
    icon: JSX.Element,
    onClick?: () => void,
  ) => {
    const isActive = pathname === path
    return {
      label,
      href: path,
      isActive,
      icon: <icon.type fill={isActive ? '#FFFFFF' : '#717579'} />,
      onClick,
    }
  }

  const routes = useMemo(() => {
    return [
      createRoute('어린이집 정보', '/kindergarten', <Home />),
      createRoute('신청하기', '#', <Lightning />, handleApplyClick),
      createRoute('신청결과', '/lottery', <Graph />),
      createRoute('신청내역', '/history', <Person />),
      createRoute('공지사항', '/notice', <Boxes />),
      createRoute('1:1 문의', '/q', <Talk />),
    ]
  }, [pathname])

  const adminRoutes = useMemo(() => {
    return [
      createRoute('어린이집 설정', '/kindergarten', <Home />),
      createRoute('모집설정', '/admin/admin-setting', <Lightning />),
      createRoute('신청현황', '/admin/applications', <Person />),
      createRoute('추첨결과', '/admin/', <Boxes />),
      createRoute('공지사항', '/admin/notice', <Graph />),
      createRoute('1:1 문의', '/admin/q', <Talk />),
    ]
  }, [pathname])

  const isAdmin = pathname.startsWith('/admin')
  const selectedRoutes = isAdmin ? adminRoutes : routes

  return (
    <section className="relative h-full w-330">
      <div className="flex flex-col p-4 mr-10">
        {selectedRoutes.map(({ label, href, isActive, icon, onClick }) => (
          <Link
            key={label}
            href={href}
            className={cn(
              'flex flex-row text-18 text-[#717579] px-25 py-14 ml-25 mr-50 gap-30 rounded-60 mb-20 hover:bg-[#FFF4CC]',
              isActive && 'bg-[#FFEDAE] font-semibold text-[#333333]',
            )}
            onClick={onClick}
          >
            {icon}
            {label}
          </Link>
        ))}
      </div>

      <Link
        key="pwd"
        href="/password"
        className="text-14 text-[#717579] underline absolute bottom-30 right-30"
      >
        비밀번호 변경
      </Link>
    </section>
  )
}
