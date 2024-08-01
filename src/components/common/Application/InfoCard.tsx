export default function InfoCard() {
  const email = 'abs1223'
  const employeeNumber = '202418273'
  const department = 'X'
  const entryDate = '2020.08.01'

  return (
    <div className="border border-orange rounded-20 p-10 bg-white text-15 w-420 items-center justify-center">
      <div className="grid grid-cols-4 gap-y-2 gap-x-7">
        <div className="text-right font-bold text-[#F90]">메일</div>
        <div className="text-left">{email}</div>
        <div className="text-right font-bold text-[#F90]">사내부부</div>
        <div className="text-center">{department}</div>

        <div className="text-right font-bold text-[#F90]">사원번호</div>
        <div className="text-left">{employeeNumber}</div>

        <div className="text-right font-bold text-[#F90]">입사일</div>
        <div className="text-left">{entryDate}</div>
      </div>
    </div>
  )
}
