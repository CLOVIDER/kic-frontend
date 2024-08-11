'use client'

import ChildCard from '../ChildCard'
import { useChildContext } from './ApplicationContext/fetcher'

export default function ChildCards() {
  const { childData } = useChildContext()

  return (
    <div className="grid grid-cols-2 gap-20 w-auto">
      {childData.map(({ childName, recruitInfos }) => (
        <ChildCard
          key={childName}
          name={childName}
          kindergartenList={recruitInfos}
        />
      ))}
    </div>
  )
}
