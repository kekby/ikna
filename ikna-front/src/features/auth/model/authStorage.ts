import type { AuthState, RegisterPayload } from './types'

const AUTH_STORAGE_KEY = 'ikna-auth-state'
const USERS_STORAGE_KEY = 'ikna-users'

type StoredUser = {
  id: string
  name: string
  email: string
  password: string
}

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key)

    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

const writeJson = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getStoredAuthState = (): AuthState => {
  return readJson<AuthState>(AUTH_STORAGE_KEY, { user: null })
}

export const saveAuthState = (state: AuthState) => {
  writeJson(AUTH_STORAGE_KEY, state)
}

export const clearAuthState = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export const getStoredUsers = (): StoredUser[] => {
  return readJson<StoredUser[]>(USERS_STORAGE_KEY, [])
}

export const saveStoredUsers = (users: StoredUser[]) => {
  writeJson(USERS_STORAGE_KEY, users)
}

export const createStoredUser = (payload: RegisterPayload): StoredUser => {
  return {
    id: crypto.randomUUID(),
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
  }
}
