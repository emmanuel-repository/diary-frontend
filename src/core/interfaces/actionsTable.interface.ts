/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ActionsTable { 
  description: string,
  callbacks?: (...args: any[]) => any
}