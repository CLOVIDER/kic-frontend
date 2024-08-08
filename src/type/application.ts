// @/type/application.ts

export interface Child {
  id: number
  name: string
  classes: {
    [kindergarten: string]: string
  }
}

export interface ApplicationPayload {
  isSingleParent: string
  childrenCnt: number
  isDisability: string
  isDualIncome: string
  isEmployeeCouple: string
  isSibling: string
  childrenRecruitList: Record<string, unknown>[]
  imageUrls: string
}

export interface FormData extends ApplicationPayload {
  selectedOptions: string[]
  uploadedFiles: { [key: string]: UploadedFile }
  selectedItems: { [key: string]: boolean }
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
  initialData: Partial<ApplicationPayload>
}

export interface RightSection2Props {
  onPrevious: () => void
  onSubmit: (data: Partial<ApplicationPayload>) => Promise<void>
  onTempSave: () => Promise<void>
  initialData: ApplicationPayload
  uploadedFiles: { [key: string]: File }
  selectedItems: { [key: string]: boolean }
  onFileUpload: (id: string, file: File) => void
  onDeleteFile: (id: string) => void
  onCheckboxChange: (id: string) => void
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
