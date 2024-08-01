import Notification from './Notification'
import QnA from './QnA'

export default function LandingLower() {
  return (
    <div className="flex flex-row gap-20">
      <QnA />
      <Notification />
    </div>
  )
}
