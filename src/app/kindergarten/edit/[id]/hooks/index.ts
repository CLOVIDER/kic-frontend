import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useKindergartensContext } from '../../../fetcher/KindergartensFetcher'
import { usePostImage, usePatchKindergartenDetails } from '../api/queries'

export default function useEdit(id: number) {
  const { kindergartens } = useKindergartensContext()
  const { mutate: patchKindergartensDetail } = usePatchKindergartenDetails(id)
  const {
    kindergartenId,
    kindergartenAddr,
    kindergartenImageUrls,
    kindergartenInfo,
    kindergartenNm,
    kindergartenNo,
    kindergartenScale,
    kindergartenCapacity,
    kindergartenTime,
    kindergartenClass,
  } = kindergartens.find(({ kindergartenId: kId }) => kId === Number(id))!

  const [name, setName] = useState<string>(kindergartenNm)
  const [addr, setAddr] = useState<string>(kindergartenAddr)
  const [info, setInfo] = useState<string>(kindergartenInfo)
  const [phone, setPhone] = useState<string>(kindergartenNo)
  const [time, setTime] = useState<string>(kindergartenTime)
  const [scale, setScale] = useState<number>(kindergartenScale)
  const [capacity, setCapacity] = useState<number>(kindergartenCapacity)
  const [newClassName, setNewClassName] = useState<string>('')
  const [newAgeClass, setNewAgeClass] = useState<string>('')
  const [images, setImages] = useState<string[]>(kindergartenImageUrls)
  const [classes, setClasses] = useState<
    Array<{
      className: string
      ageClass: string
    }>
  >(kindergartenClass)
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
    if (
      !id ||
      !addr ||
      !info ||
      !name ||
      !phone ||
      !scale ||
      !capacity ||
      !time
    ) {
      alert('모든 값을 입력해주세요')
      return
    }

    patchKindergartensDetail(
      {
        kindergartenId: id,
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
          toast.success('성공했어요.')
        },
        onError: () => {
          toast.error('잠시 후 다시 시도해주세요.')
        },
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
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
    kindergartenId,
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
  }
}
