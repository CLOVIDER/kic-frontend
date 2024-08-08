// @/type/application.ts

export interface Child {
  id: number
  name: string
  classes: {
    [kindergarten: string]: string
  }
  recruitId?: number
}

export interface ApplicationPayload {
  isSingleParent: '0' | '1'
  childrenCnt: number
  isDisability: '0' | '1'
  isDualIncome: '0' | '1'
  isEmployeeCouple: '0' | '1'
  isSibling: '0' | '1'
  childrenRecruitList: Array<{ id: number; name: string; recruitId: number }>
  imageUrls: { [key in DocumentType]: string }
}

export enum DocumentType {
  SINGLE_PARENT = 'SINGLE_PARENT',
  DISABILITY = 'DISABILITY',
  DUAL_INCOME = 'DUAL_INCOME',
  EMPLOYEE_COUPLE = 'EMPLOYEE_COUPLE',
  SIBLING = 'SIBLING',
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
  onSubmit: (data: Partial<ApplicationPayload>) => void
  formData: ApplicationPayload
  setFormData: React.Dispatch<React.SetStateAction<ApplicationPayload>>
}

export interface RightSection2Props {
  onPrevious: () => void
  onSubmit: (data: Partial<ApplicationPayload>) => Promise<void>
  onTempSave: () => Promise<void>
  formData: ApplicationPayload
  setFormData: React.Dispatch<React.SetStateAction<ApplicationPayload>>
  uploadedFiles: { [key: string]: File }
  onFileUpload: (id: string, file: File) => void
  onDeleteFile: (id: string) => void
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
