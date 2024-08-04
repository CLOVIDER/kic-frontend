import QnaForm from './components/QnaForm'
import { QnaFormProvider } from './contexts/QnaFormContext'

export default function Page() {
  return (
    <QnaFormProvider>
      <QnaForm />
    </QnaFormProvider>
  )
}
