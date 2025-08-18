export type RefreshToken = {
  id?: number
  userId: number
  token: string
  userAgent?: string
  ipAddress?: string
  macAddress?: string
  lastLogin?: number
  expiredAt: number
  createdAt?: number
  updatedAt?: number
}