'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { EmployeeInfo, getEmployeeData } from '../api'

export default function LeftSection() {
  const [employeeData, setEmployeeData] = useState<EmployeeInfo | undefined>(
    undefined,
  )
  const router = useRouter()
  const onHome = () => {
    router.push('/')
  }

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await getEmployeeData()
        setEmployeeData(data)
      } catch (error) {
        console.error('Error fetching employee data:', error)
      }
    }
    fetchEmployeeData()
  }, [setEmployeeData])

  if (!employeeData) {
    return <div>Loading...</div>
  }

  const { nameKo, workedAt, isCouple } = employeeData
  const formattedDate = new Date(workedAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const ccStatus = isCouple ? 'O' : 'X'

  return (
    <div className="flex w-350 flex-col items-center">
      <div className="font-bold text-[31px]">
        <span className="text-[#202020]">안녕하세요 </span>
        <span className="text-[#ffaa2c]">{nameKo}</span>
        <span className="text-[#202020]">님 !</span>
      </div>
      <p className="mt-10 font-medium text-[20px] text-center text-[#202020]">
        아래 정보와 다른 부분이 있다면
        <br />
        관리자에게 문의해주세요.
      </p>
      <Image
        className="mt-50"
        alt=""
        src="/images/boy-standing-front.svg"
        width={208.89}
        height={249.85}
        priority
      />
      <div className="flex w-342 h-110 rounded-2xl border-2 border-[#ffaa2c] mt-30 pl-30 justify-center items-center">
        <div className="w-1/3 text-16 text-center text-[#FFAB2D]">
          <p>입사일</p>
          <p className="mt-22">사내 부부 여부</p>
        </div>
        <div className="w-2/3 text-[#666666] text-16 text-center">
          <div>{formattedDate}</div>
          <div className="mt-22">{ccStatus}</div>
        </div>
      </div>
      <div className="mt-15">
        <Button
          onClick={onHome}
          className="w-[98px] h-[31px] bg-white border border-[#fdba74] font-bold text-[#fb923c] rounded-full text-sm"
        >
          홈으로
        </Button>
      </div>
    </div>
  )
}
