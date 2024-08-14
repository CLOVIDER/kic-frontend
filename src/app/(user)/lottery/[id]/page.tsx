import { useRecruitStatusContext } from '../fetcher/RecruitStatusFetcher'
import ResultFail from './ResultEntry/ResultFail'
import ResultProcessing from './ResultEntry/ResultProcessing'
// import ResultWaiting from './ResultEntry/ResultWaiting'
import ResultWinning from './ResultEntry/ResultWinning'

export default function Page() {
  const { recruitStatus } = useRecruitStatusContext()

  return (
    <>
      {/* TODO: 추후 리팩토링 */}
      {recruitStatus === '모집기간' && <ResultProcessing />}
      {(recruitStatus === '1차등록기간' || recruitStatus === '2차등록기간') &&
        (true ? <ResultWinning /> : <ResultFail />)}
      {/* {recruitStatus === 'waiting' && <ResultWaiting />} */}
    </>
  )
}
