// import ResultFail from './ResultFail'
// import ResultProcessing from './ResultProcessing'
// import ResultWaiting from './ResultWaiting'
import ResultWinning from './ResultWinning'

const currentProcesses = ['processing', 'result', 'fail', 'waiting'] as const

export default function ResultEntry() {
  const currentProess = currentProcesses[1]

  return (
    <>
      {/* TODO: 추후 리팩토링 */}
      {/* {currentProess === 'processing' && <ResultProcessing />} */}
      {currentProess === 'result' && <ResultWinning />}
      {/* {currentProess === 'fail' && <ResultFail />} */}
      {/* {currentProess === 'waiting' && <ResultWaiting />} */}
    </>
  )
}
