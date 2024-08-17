import { ApplicationPayload } from '@/app/(user)/apply/api'
import { Dispatch, SetStateAction } from 'react'

// /src/type/application.ts

export interface DropdownOption {
  key: string
  label: string
}

export interface DropdownOptions {
  [kindergartenName: string]: DropdownOption[]
}

export interface Child {
  id: number
  name: string
  classes: {
    [kindergarten: string]: string
  }
  recruitId?: number
}

export interface FormData {
  children: Child[]
  selectedOptions: string[]
  uploadedFiles: string[]
  selectedItems: boolean[]
}

export interface LeftSectionProps {
  name: string
  date: string
  ifCC: boolean
}

export interface RightSection1Props {
  kindergartenName: string[]
  dropdownOptions: { [key: string]: DropdownOption[] }
  onSubmit: (
    data: Partial<ApplicationPayload>,
    updatedChildren: Child[],
  ) => void
  children: Child[]
  setChildren: React.Dispatch<React.SetStateAction<Child[]>>
  setFormData: React.Dispatch<React.SetStateAction<ApplicationPayload>>
  formData: ApplicationPayload
  selectedLabels: Record<string, Record<string, string>>
  handleDropdownSelect: (
    childId: number,
    kindergarten: string,
    option: DropdownOption,
  ) => void
}

export interface RightSection2Props {
  onPrevious: () => void
  onSubmit: (data: Partial<ApplicationPayload>) => Promise<void>
  onTempSave: () => Promise<void>
  formData: ApplicationPayload
  setFormData: React.Dispatch<React.SetStateAction<ApplicationPayload>>
  uploadedFiles: Record<string, UploadedFile>
  setUploadedFiles: React.Dispatch<React.SetStateAction<Record<string, UploadedFile>>>
  onFileUpload: (id: string, size: number, file: string) => void
  // onFileUploadComplete: (id: string, file: File, url: string) => void;
  onDeleteFile: (id: string) => void
  selectedItems: Record<string, boolean>
  onCheckboxChange: (id: string, value: boolean) => void
}

export interface ApplicationFormProps {
  kindergartenName: string[]
  dropdownOptions: { [key: string]: DropdownOption[] } // 변경됨
}

export interface Item {
  id: string
  name: string
  isRequired: boolean
}

export interface UploadedFile {
  file: File;
  url: string;
  name: string;
  size: number;
}

export interface RecruitInfo {
  kindergartenNm: string
  recruitIds: number[]
  aggClasses: string[]
}

export interface DropdownSelectProps {
  options: DropdownOption[]
  selectedOption: string
  onSelect: (option: DropdownOption) => void
  placeholder: string
}
