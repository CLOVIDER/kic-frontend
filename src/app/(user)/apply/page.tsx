import LeftSection from './components/LeftSection'
import ApplicationForm from './components/ApplicationForm'

export default function Page() {
  return (
    <div className="flex flex-row justify-center gap-220 mt-150 ml-190 w-full">
      <LeftSection />
      <ApplicationForm />
    </div>
  )
}
