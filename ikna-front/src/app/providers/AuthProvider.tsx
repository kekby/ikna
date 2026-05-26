import { type PropsWithChildren, useMemo, useState } from 'react'
import type { User } from '../../entities/user/types'
import {
  clearAuthState,
  createStoredUser,
  getStoredAuthState,
  getStoredUsers,
  saveAuthState,
  saveStoredUsers,
} from '../../features/auth/model/authStorage'
import { AuthContext, type AuthContextValue } from './authContext'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(() => getStoredAuthState().user)

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: ({ email, password }) => {
        const normalizedEmail = email.trim().toLowerCase()
        const storedUser = getStoredUsers().find(
          (item) =>
            item.email === normalizedEmail && item.password === password,
        )

        if (!storedUser) {
          throw new Error('Неверная почта или пароль')
        }

        const nextUser = {
          id: storedUser.id,
          name: storedUser.name,
          email: storedUser.email,
        }

        setUser(nextUser)
        saveAuthState({ user: nextUser })
      },
      register: (payload) => {
        const users = getStoredUsers()
        const normalizedEmail = payload.email.trim().toLowerCase()
        const userExists = users.some((item) => item.email === normalizedEmail)

        if (userExists) {
          throw new Error('Пользователь с такой почтой уже существует')
        }

        const storedUser = createStoredUser(payload)
        const nextUser = {
          id: storedUser.id,
          name: storedUser.name,
          email: storedUser.email,
        }

        saveStoredUsers([...users, storedUser])
        setUser(nextUser)
        saveAuthState({ user: nextUser })
      },
      logout: () => {
        setUser(null)
        clearAuthState()
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
