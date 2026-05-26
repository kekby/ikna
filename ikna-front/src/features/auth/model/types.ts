import type { User } from '../../../entities/user/types'

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = LoginPayload & {
  name: string
}

export type AuthState = {
  user: User | null
}
