export interface IFirestoreAdapter {
  registerFcmToken(email: string, token: string): Promise<void>
}