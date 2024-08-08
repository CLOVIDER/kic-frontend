import { useCallback, useState } from 'react'
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
  } = kindergartens[Number(id) - 1]

  const [name, setName] = useState<string>(kindergartenNm)
  const [addr, setAddr] = useState<string>(kindergartenAddr)
  const [info, setInfo] = useState<string>(kindergartenInfo)
  const [phone, setPhone] = useState<string>(kindergartenNo)
  const [time, setTime] = useState<string>(kindergartenTime)
  const [scale, setScale] = useState<number>(kindergartenScale)
  const [capacity, setCapacity] = useState<number>(kindergartenCapacity)
  const [images, setImages] = useState<string[]>(kindergartenImageUrls)
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

    patchKindergartensDetail({
      kindergartenId: id,
      kindergartenAddr: addr,
      kindergartenImageUrls: images,
      kindergartenInfo: info,
      kindergartenNm: name,
      kindergartenNo: phone,
      kindergartenScale: scale,
      kindergartenCapacity: capacity,
      kindergartenTime: time,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, addr, info, name, phone, scale, capacity, time, images])

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
  }
}
