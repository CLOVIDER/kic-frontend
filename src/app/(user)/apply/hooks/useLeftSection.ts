export const useLeftSection = (date: string, ifCC: boolean) => {
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const ccStatus = ifCC ? 'O' : 'X'

  return { formattedDate, ccStatus }
}
