import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import {
  usePostKindergartenDetails,
  usePostImage,
} from '../../edit/[id]/api/queries'

export default function useCreate() {
  const { mutate, isPending } = usePostKindergartenDetails()
  const { push } = useRouter()

  const [name, setName] = useState<string>('')
  const [addr, setAddr] = useState<string>('')
  const [info, setInfo] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [scale, setScale] = useState<number>(0)
  const [capacity, setCapacity] = useState<number>(0)
  const [newClassName, setNewClassName] = useState<string>('')
  const [newAgeClass, setNewAgeClass] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [classes, setClasses] = useState<
    Array<{
      className: string
      ageClass: string
    }>
  >([])
  const { mutateAsync: postImage } = usePostImage('kindergarten')

  const handleImages = useCallback(
    async (newFile: File) => {
      if (!newFile) {
        alert('파일을 업로드해주세요.')
      }
      if (images.length >= 3) {
        alert('파일은 최대 3개까지만 업로드할 수 있습니다.')
      }

      const imageString = await postImage(newFile)

      setImages((prev) => [...prev, imageString.result])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images.length],
  )

  const handleRemoveFile = useCallback((filePath: string) => {
    setImages((prev) => prev.filter((path) => path !== filePath))
  }, [])

  const handleSubmit = useCallback(() => {
    if (!addr || !info || !name || !phone || !scale || !capacity || !time) {
      toast('모든 값을 입력해주세요.')
      return
    }
    if (images.length < 1) {
      toast('이미지를 추가해주세요.')
      return
    }

    mutate(
      {
        kindergartenAddr: addr,
        kindergartenImageUrls: images,
        kindergartenInfo: info,
        kindergartenNm: name,
        kindergartenNo: phone,
        kindergartenScale: scale,
        kindergartenCapacity: capacity,
        kindergartenTime: time,
        kindergartenClass: [
          ...classes,
          { className: newClassName, ageClass: newAgeClass },
        ],
      },
      {
        onSuccess: () => {
          toast.success('저장되었습니다!', {
            autoClose: 1000,
            onClose: () => push('/admin'),
            pauseOnHover: false,
          })
        },
        onError: () => {
          toast.error('잠시 후 다시 시도해주세요.')
        },
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    addr,
    info,
    name,
    phone,
    scale,
    capacity,
    time,
    images,
    classes,
    newClassName,
    newAgeClass,
  ])

  return {
    name,
    setName,
    addr,
    setAddr,
    info,
    setInfo,
    phone,
    setPhone,
    time,
    setTime,
    scale,
    setScale,
    capacity,
    setCapacity,
    images,
    setImages,
    handleSubmit,
    handleImages,
    handleRemoveFile,
    newClassName,
    newAgeClass,
    setNewClassName,
    setNewAgeClass,
    classes,
    setClasses,
    isPending,
  }
}
