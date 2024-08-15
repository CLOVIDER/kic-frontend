'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ApplicationFormProps } from '@/type/application'
import { useApplicationForm } from '../hooks/useApplicationForm'
import RightSection1 from './RightSection1'
import RightSection2 from './RightSection2'

export default function ApplicationForm({
  kindergartenName,
  dropdownOptions,
}: ApplicationFormProps) {
  const { currentSection, handleNext, handlePrevious, handleSubmit } =
    useApplicationForm()

  const pageVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 300 : -300,
    }),
    in: { opacity: 1, x: 0 },
    out: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 300 : -300,
    }),
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.2,
  }

  return (
    <div>
      <AnimatePresence mode="wait" custom={currentSection === 1 ? 1 : -1}>
        <motion.div
          key={currentSection}
          custom={currentSection === 1 ? 1 : -1}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className=""
        >
          {currentSection === 1 ? (
            <RightSection1
              kindergartenName={kindergartenName}
              dropdownOptions={dropdownOptions}
              onSubmit={handleNext}
            />
          ) : (
            <RightSection2
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
