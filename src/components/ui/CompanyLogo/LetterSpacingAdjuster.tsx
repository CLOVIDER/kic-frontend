import { useEffect, ReactNode } from 'react'

interface LetterSpacingAdjusterProps {
  companyName: string
  descriptionId: string
  companyNameId: string
  children: ReactNode
}

export default function LetterSpacingAdjuster({
  companyName,
  descriptionId,
  companyNameId,
  children,
}: LetterSpacingAdjusterProps) {
  useEffect(() => {
    function adjustLetterSpacing() {
      const descriptionElement = document.getElementById(descriptionId)
      const companyNameElement = document.getElementById(companyNameId)

      if (descriptionElement && companyNameElement) {
        const companyNameStyles = window.getComputedStyle(companyNameElement)
        const font = `${companyNameStyles.fontWeight} ${companyNameStyles.fontSize} ${companyNameStyles.fontFamily}`

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        if (!context) return

        context.font = font
        const companyNameFull = `${companyName}. KIC`
        const companyNameWidth = context.measureText(companyNameFull).width

        const descriptionWidth = 120
        const letterSpacing = (companyNameWidth - descriptionWidth) / 11

        descriptionElement.style.letterSpacing = `${letterSpacing}px`
        descriptionElement.style.opacity = '0.8'
      }
    }

    adjustLetterSpacing()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>{children}</div>
}
