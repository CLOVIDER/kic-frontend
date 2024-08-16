interface LoadingMessageProps {
  message?: string
}

export default function QnaLoadingMessage({
  message = 'Loading...',
}: LoadingMessageProps) {
  return <div>{message}</div>
}
