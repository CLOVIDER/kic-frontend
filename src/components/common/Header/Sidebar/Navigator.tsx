'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/util'
import { Boxes, Home, Lightning, Person, Talk } from '@/components/common/Icons'

export default function Navigator() {
  const pathname = usePathname()

  const routes = useMemo(() => {
    return [
      {
        label: '어린이집 정보',
        isActive: pathname === '/kindergarten',
        href: '/kindergarten',
        icon: <Home fill={pathname === '/info' ? '#FFFFFF' : '#717579'} />,
      },
      {
        label: '신청하기',
        isActive: pathname === '/apply',
        href: '/apply',
        icon: (
          <Lightning fill={pathname === '/apply' ? '#FFFFFF' : '#717579'} />
        ),
      },
      {
        label: '신청내역',
        isActive: pathname === '/history',
        href: '/history',
        icon: <Person fill={pathname === '/history' ? '#FFFFFF' : '#717579'} />,
      },
      {
        label: '공지사항',
        isActive: pathname === '/notice',
        href: '/notice',
        icon: <Boxes fill={pathname === '/notice' ? '#FFFFFF' : '#717579'} />,
      },
      {
        label: '1:1 문의',
        isActive: pathname === '/q',
        href: '/',
        icon: <Talk fill={pathname === 'q' ? '#FFFFFF' : '#717579'} />,
      },
    ]
  }, [pathname])
  return (
    <section>
      <div className="flex flex-col p-4 mr-10">
        {routes.map(({ label, href, isActive, icon }) => {
          return (
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
          )
        })}
      </div>
      <div className="mt-180">
        <Link
          key="pwd"
          href="/"
          className="text-14 text-[#717579] underline ml-200"
        >
          비밀번호 변경
        </Link>
      </div>
    </section>
  )
}
