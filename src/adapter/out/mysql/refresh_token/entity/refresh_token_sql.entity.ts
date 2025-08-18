export type RefreshTokenSqlEntity = {
  id?: number;
  user_id: number;
  token: string;
  expired_at: number;
  created_at?: number;
  updated_at?: number;
  last_login?: number;
  user_agent?: string;
  ip_address?: string;
  mac_address?: string;
};