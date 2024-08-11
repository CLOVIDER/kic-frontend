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
  isSingleParent: string
  childrenCnt: number // string에서 number로 변경
  isDisability: string
  isDualIncome: string
  isEmployeeCouple: string
  isSibling: string
  childrenRecruitList: {
    childNm: string
    recruitIds: number[]
  }[]
  imageUrls: {
    [key: string]: string
  }
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
  onSubmit: (
    data: Partial<ApplicationPayload>,
    updatedChildren: Child[],
  ) => void
  children: Child[]
  setChildren: React.Dispatch<React.SetStateAction<Child[]>>
  setFormData: React.Dispatch<React.SetStateAction<ApplicationPayload>>
}

export interface RightSection2Props {
  onPrevious: () => void
  onSubmit: (data: Partial<ApplicationPayload>) => Promise<void>
  onTempSave: () => Promise<void>
  formData: ApplicationPayload
  setFormData: React.Dispatch<React.SetStateAction<ApplicationPayload>>
  uploadedFiles: { [key: string]: string }
  onFileUpload: (id: string, url: string) => void
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
