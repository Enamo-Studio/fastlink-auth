export type RoleGroup = {
  id: number
  roleId: number
  roleName: string
  remark: string
  profitSharing: number
}

export enum RoleName {
  ADMINISTRATOR = "Administrator",
  PELANGGAN = "Pelanggan",
  OPERATOR = "Operator",
  MITRA = "Mitra",
  TEKNISI = "Teknisi",
  KOLEKTOR = "Kolektor",
  FINANCE = "Finance",
}