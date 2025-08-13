export type UserSqlEntity = {
  id: number
  name: string
  username?: string
  email: string
  password: string
  phone?: string
  address?: string
  lang?: string
  ktp?: string
  npwp?: string
  gender: 'm' | 'f' | 'n/a'
  image_url?: string
  is_active?: boolean
  roles?: string
  last_login?: Date
  last_password_change?: Date
  email_verified?: boolean
  google_id?: string
  created_at?: Date
  updated_at?: Date
}