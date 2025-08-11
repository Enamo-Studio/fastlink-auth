
export type RolePolicyMySQLEntity = {
  id: number
  type: string
  name: string
  path: string
  action: string
  desc?: string
  module_id?: number
  base_path?: string
  created_at: Date
  updated_at: Date
}
