import React from 'react'
import { ToastContainer } from 'react-toastify'
import LeftSection from './components/LeftSection'
import ApplicationForm from './components/ApplicationForm'
import 'react-toastify/dist/ReactToastify.css'

export default function Page() {
  const name = '김재하'
  const date = '2013.10.12'
  const ifCC = false

  const kindergartenName = ['샛별어린이집', '한마음어린이집', '미르어린이집']

  const dropdownOptions = [
    { key: 'option1', label: '햇님반' },
    { key: 'option2', label: '달님반' },
    { key: 'option3', label: '별님반' },
  ]

  return (
    <div className="bg-[#FDFDFD] flex flex-row justify-center pl-250 gap-260 items-center w-full h-screen">
      <LeftSection name={name} date={date} ifCC={ifCC} />
      <ApplicationForm
        kindergartenName={kindergartenName}
        dropdownOptions={dropdownOptions}
      />
      <ToastContainer />
    </div>
  )
}
