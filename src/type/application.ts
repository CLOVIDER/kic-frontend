// @/type/application.ts

export interface Child {
  id: number
  name: string
  classes: {
    [kindergarten: string]: string
  }
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
  dropdownOptions: { key: string; label: string }[]
  onSubmit: (children: Child[], selectedOptions: string[]) => void
}

export interface RightSection2Props {
  onPrevious: () => void
  onSubmit: (uploadedFiles: string[], selectedItems: boolean[]) => void
}

export interface ApplicationFormProps {
  kindergartenName: string[]
  dropdownOptions: { key: string; label: string }[]
}

export interface Item {
  id: string
  name: string
  isRequired: boolean
}

export interface UploadedFile {
  file: File
  name: string
}
