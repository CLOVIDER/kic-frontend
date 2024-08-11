/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { JSX, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/util'
import { Boxes, Home, Lightning, Person, Talk } from '@/components/common/Icons'

export default function Navigator() {
  const pathname = usePathname()

  const createRoute = (label: string, path: string, icon: JSX.Element) => {
    const isActive = pathname === path
    return {
      label,
      href: path,
      isActive,
      icon: <icon.type fill={isActive ? '#FFFFFF' : '#717579'} />,
    }
  }

  const routes = useMemo(() => {
    return [
      createRoute('어린이집 정보', '/kindergarten', <Home />),
      createRoute('신청하기', '/apply', <Lightning />),
      createRoute('신청결과', '/lottery', <Lightning />),
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
      createRoute('공지사항', '/admin/notice', <Talk />),
      createRoute('1:1 문의', '/admin/q', <Talk />),
    ]
  }, [pathname])

  const isAdmin = pathname.startsWith('/admin')
  const selectedRoutes = isAdmin ? adminRoutes : routes

  return (
    <section className="relative h-full">
      <div className="flex flex-col p-4 mr-10">
        {selectedRoutes.map(({ label, href, isActive, icon }) => (
          <Link
            key={label}
            href={href}
            className={cn(
              'flex flex-row text-18 text-[#717579] px-25 py-14 ml-25 mr-50 gap-30 rounded-60 mb-20 hover:bg-[#FFF4CC]',
              isActive && 'bg-[#FFEDAE] font-semibold text-[#333333]',
            )}
          >
            {icon}
            {label}
          </Link>
        ))}
      </div>

      <Link
        key="pwd"
        href="/"
        className="text-14 text-[#717579] underline absolute bottom-30 right-30"
      >
        비밀번호 변경
      </Link>
    </section>
  )
}
