'use client'

import React, { useState, useEffect } from "react";
import ApplicationLayout from './application-layout'
import LeftSection from "./components/LeftSection";
import RightSection1 from "./components/RightSection1";
import RightSection2 from "./components/RightSection2";
import './style/style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({ children: [], selectedOptions: [] });
  const [direction, setDirection] = useState<number>(1);
  const [tokens, setTokens] = useState({ refreshToken: '', accessToken: '' });

  const name = "김재하";
  const date = "2013.10.12";
  const ifCC = false;

  const kindergartenName = [
    "샛별어린이집",
    "한마음어린이집",
    "미르어린이집",
  ];

  const dropdownOptions = [
    { key: "option1", label: "햇님반" },
    { key: "option2", label: "달님반" },
    { key: "option3", label: "별님반" }
  ];

  const handleNext = (children: FormData['children'], selectedOptions: string[]) => {
    setFormData({ children, selectedOptions });
    setDirection(1);  // 다음으로 이동
    setCurrentSection(2);
  };

  const handlePrevious = () => {
    setDirection(-1);  // 이전으로 이동
    setCurrentSection(1);
  };

  // useEffect(() => {
  //   const cookies = parseCookies();
  //   setTokens({
  //     refreshToken: cookies.refreshToken || '',
  //     accessToken: cookies.accessToken || '',
  //   });
  // }, []);

  const handleSubmit = async (uploadedFiles: string[], selectedItems: boolean[]) => {
    try {
      const formDataToSend = new FormData();

      // Add existing data
      formData.children.forEach((child, index) => {
        formDataToSend.append(`children[${index}].name`, child.name);
        Object.entries(child.classes).forEach(([kindergarten, className]) => {
          formDataToSend.append(`children[${index}].classes.${kindergarten}`, className);
        });
      });

      // Add selected options (which correspond to isSingleParent, isDualIncome, isDisability, isSibling)
      formData.selectedOptions.forEach((option, index) => {
        formDataToSend.append(`selectedOptions[${index}]`, option);
      });

      // Add uploaded files (imageUrls)
      uploadedFiles.forEach((file, index) => {
        if (file) {
          formDataToSend.append(`files[${index}]`, file);
        }
      }); 

      // Add selected items
      selectedItems.forEach((item, index) => {
        formDataToSend.append(`selectedItems[${index}]`, item.toString());
      });

      // Add additional data
      formDataToSend.append('childrenCnt', formData.children.length.toString());
      formDataToSend.append('isEmployeeCouple', ifCC ? 'Y' : 'N');
      formDataToSend.append('isTemp', 'N'); // Assuming false by default, add UI element if needed

      // Add tokens
      formDataToSend.append('refreshToken', tokens.refreshToken);
      formDataToSend.append('accessToken', tokens.accessToken);

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      toast.success('Form submitted successfully');
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
    }
  };

  const pageVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 300 : -300
    }),
    in: { opacity: 1, x: 0 },
    out: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 300 : -300
    })
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.2,
  };

  return (
    <ApplicationLayout>
      <div className="absolute w-[1280px] h-[720px] bg-white flex justify-between">
      <LeftSection name={name} date={date} ifCC={ifCC} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
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
    </ApplicationLayout>
  );
}
