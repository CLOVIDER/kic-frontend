// /src/type/application.ts

export interface DropdownOption {
  key: string
  label: string
}

export interface DropdownOptions {
  [kindergartenName: string]: DropdownOption[]
}

export interface ApplicationPayload {
  isSingleParent: string
  childrenCnt: number
  isDisability: string
  isDualIncome: string
  isEmployeeCouple: string
  isSibling: string
  childrenRecruitList: {
    childNm: string
    recruitIds: number[]
  }[]
  imageUrls: {
    [key: string]: File | string
  }
}

export interface Child {
  id: number
  name: string
  classes: {
    [kindergarten: string]: string
  }
  recruitId?: number
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
  dropdownOptions: { [key: string]: DropdownOption[] }
  onSubmit: (
    data: Partial<ApplicationPayload>,
    updatedChildren: Child[],
  ) => void
  children: Child[]
  setChildren: React.Dispatch<React.SetStateAction<Child[]>>
  setFormData: React.Dispatch<React.SetStateAction<ApplicationPayload>>
  formData: ApplicationPayload
}

export interface RightSection2Props {
  onPrevious: () => void
  onSubmit: (data: Partial<ApplicationPayload>) => Promise<void>
  onTempSave: () => Promise<void>
  formData: ApplicationPayload
  setFormData: React.Dispatch<React.SetStateAction<ApplicationPayload>>
  uploadedFiles: Record<string, File>
  setUploadedFiles: React.Dispatch<React.SetStateAction<Record<string, File>>>
  onFileUpload: (id: string, file: File) => void
  onDeleteFile: (id: string) => void
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
  file: File
  name: string
}

export interface RecruitInfo {
  kindergartenNm: string
  recruitIds: number[]
  aggClasses: string[]
}
