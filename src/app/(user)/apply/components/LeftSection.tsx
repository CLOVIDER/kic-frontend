'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  EmployeeInfo,
  getEmployeeData,
} from '@/components/common/Application/api/getRecruitData'

export default function LeftSection() {
  const [employeeData, setEmployeeData] = useState<EmployeeInfo | undefined>(
    undefined,
  )

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
    <div className="h-[547px] w-[366px] mt-87 ml-123 flex flex-col items-center">
      <div className="font-bold text-[31px]">
        <span className="text-[#202020]">안녕하세요 </span>
        <span className="text-[#ffaa2c]">{nameKo}</span>
        <span className="text-[#202020]">님 !</span>
      </div>
      <p className="relative mt-49 left-[16px] font-medium text-[20px] text-center text-[#202020]">
        아래 정보와 다른 부분이 있다면
        <br />
        채널톡을 통해 관리자에게 문의해주세요.
      </p>
      <Image
        className="relative mt-24"
        alt=""
        src="/images/boy-standing-front.svg"
        width={208.89}
        height={249.85}
        priority
      />
      <div className="w-342 h-110 rounded-2xl border border-solid border-[#ffaa2c]">
        <div className="flex w-194 h-72 mt-19 ml-74 ">
          <div className="w-93 h-70 mr-20 text-16 text-center text-[#FFAB2D]">
            <div>입사일</div>
            <div className="w-93 mt-22">사내 부부 여부</div>
          </div>
          <div className="w-100 h-72 text-[#666666] text-16 text-center">
            <div className="w-100 h-24">{formattedDate}</div>
            <div className="mt-22">{ccStatus}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
