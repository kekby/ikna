import { createContext } from 'react'
import type { User } from '../../entities/user/types'
import type {
  LoginPayload,
  RegisterPayload,
} from '../../features/auth/model/types'

export type AuthContextValue = {
  user: User | null
  login: (payload: LoginPayload) => void
  register: (payload: RegisterPayload) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
