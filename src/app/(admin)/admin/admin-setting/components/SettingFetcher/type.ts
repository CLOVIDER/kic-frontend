export interface ClassInfo {
  ageClass: string
  recruitCnt: number
}

export interface KindergartenClassInfo {
  kindergartenName: string
  classInfoList: ClassInfo[]
}

export interface RecruitDateInfo {
  recruitStartDt: string
  recruitEndDt: string
  firstStartDt: string
  firstEndDt: string
  secondStartDt: string
  secondEndDt: string
}

export interface RecruitWeightInfo {
  workYearsUsage: string
  isSingleParentUsage: string
  childrenCntUsage: string
  isDisabilityUsage: string
  isDualIncomeUsage: string
  isEmployeeCoupleUsage: string
  isSiblingUsage: string
  [key: string]: string
}

export interface RecruitDateAndWeightInfo {
  recruitDateInfo: RecruitDateInfo
  recruitWeightInfo: RecruitWeightInfo
}

export interface SettingData {
  kindergartenClassInfoList: KindergartenClassInfo[]
  recruitDateAndWeightInfo: RecruitDateAndWeightInfo
  isCreated: boolean
}
