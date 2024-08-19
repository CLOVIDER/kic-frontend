import { ApplicationPayload } from '@/app/(user)/apply/api'
import { FileInfo } from '@/app/(user)/apply/api/getFile'

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
  uploadedFiles: Record<string, FileInfo>
  setUploadedFiles: React.Dispatch<
    React.SetStateAction<Record<string, FileInfo>>
  >
  onFileUpload: (id: string, fileData: FileInfo) => void
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
  key: string
  isRequired: boolean
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

export const predata = [
  {
    id: 'isResidentRegister',
    key: 'RESIDENT_REGISTER',
    name: '주민등록등본',
    isRequired: true,
  },
  {
    id: 'isSingleParent',
    key: 'SINGLE_PARENT',
    name: '한부모 가정',
    isRequired: false,
  },
  {
    id: 'isDisability',
    key: 'DISABILITY',
    name: '장애 유무',
    isRequired: false,
  },
  {
    id: 'isDualIncome',
    key: 'DUAL_INCOME',
    name: '맞벌이 여부',
    isRequired: false,
  },
  {
    id: 'isMultiChild',
    key: 'MULTI_CHILD',
    name: '다자녀 가구',
    isRequired: false,
  },
  {
    id: 'isSibling',
    key: 'SIBLING',
    name: '형제/자매 유무',
    isRequired: false,
  },
]
