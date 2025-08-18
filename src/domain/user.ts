export type User = {
  id: number
  email: string
  password: string
  name: string
  phone: string
  address: string
  image: string
  roleId: string
  isActive: number
  dateCreated: number
  gender: 'Male' | 'Female' | ''
  noServices: string
  lang: string
  codephone: string
  referrer?: string | null
}

export type Tracing = {
  ipAddress?: string
  userAgent?: string
  macAddress?: string
}

export type UserLoginResponse = {
  user:{
    username?: string,
    name: string,
    email: string,
    phone?: string,
    address?: string,
    lang?: string,
    image?: string,
    roles?: string[]
    lastLogin?: Date,
  },
  refreshToken?: TokenPayload,
  accessToken?: TokenPayload,
}

export type TokenPayload = {
  token: string,
  expiresIn: Date
}
