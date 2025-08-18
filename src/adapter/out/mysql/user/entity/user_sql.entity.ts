export type UserSqlEntity = { 
  id: number
  email: string
  password: string
  name: string
  phone: string
  address: string
  image: string
  role_id: string
  is_active: number
  date_created: number
  gender: 'Male' | 'Female' | ''
  no_services: string
  lang: string
  codephone: string
  referrer?: string | null
}