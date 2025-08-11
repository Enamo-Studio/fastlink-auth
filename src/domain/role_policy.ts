export type RolePolicy = {
  id: string
  type: string
  name: string
  path: string
  action: string
  desc?: string
  moduleId?: string
  basePath?: string
}