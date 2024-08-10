import React from 'react'
import { ToastContainer } from 'react-toastify'
import LeftSection from './components/LeftSection'
import ApplicationForm from './components/ApplicationForm'
import 'react-toastify/dist/ReactToastify.css'

export default function Page() {
  return (
    <div className="absolute w-[1280px] h-[720px] bg-white flex justify-between">
      <LeftSection />
      <ApplicationForm />
      <ToastContainer />
    </div>
  )
}
