export interface HomeResponse {
  recruitStartDt: string | null
  recruitEndDt: string | null
  firstStartDt: string | null
  firstEndDt: string | null
  secondStartDt: string | null
  secondEndDt: string | null
  remainPeriod: string | null
  kindergartenClassList: string[] | null
  rateList: string[] | null
  recruitStatus:
    | '모집예정'
    | '모집기간'
    | '1차등록기간'
    | '2차등록기간'
    | '모집없음'
}
