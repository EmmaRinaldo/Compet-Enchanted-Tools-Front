declare module './actions' {
  export function subscribeUser(
    sub: any
  ): Promise<{
    success: boolean
  }>

  export function unsubscribeUser(): Promise<{
    success: boolean
  }>

  export function sendNotification(
    message: string
  ): Promise<{
    success: boolean
    error?: string
  }>
}

