/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import type { Session, User } from '../types'
import { apiLogin, apiSignup } from '../utils/mockApi'
import { getJson, remove, setJson, storageKeys } from '../utils/storage'

type AuthState = { status: 'anonymous' } | { status: 'authenticated'; session: Session }

const AuthContext = createContext<{
  state: AuthState
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  updateUser: (patch: Partial<User>) => void
  logout: () => void
} | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const existing = getJson<Session>(storageKeys.session)
    return existing ? { status: 'authenticated', session: existing } : { status: 'anonymous' }
  })

  const login = useCallback(async (email: string, password: string) => {
    const session = await apiLogin(email, password)
    setJson(storageKeys.session, session)
    setState({ status: 'authenticated', session })
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const session = await apiSignup(name, email, password)
    setJson(storageKeys.session, session)
    setState({ status: 'authenticated', session })
  }, [])

  const logout = useCallback(() => {
    remove(storageKeys.session)
    setState({ status: 'anonymous' })
  }, [])

  const updateUser = useCallback((patch: Partial<User>) => {
    setState((prev) => {
      if (prev.status !== 'authenticated') return prev
      const next: Session = { ...prev.session, user: { ...prev.session.user, ...patch } }
      setJson(storageKeys.session, next)
      return { status: 'authenticated', session: next }
    })
  }, [])

  const user = state.status === 'authenticated' ? state.session.user : null

  const value = useMemo(
    () => ({ state, user, login, signup, updateUser, logout }),
    [state, user, login, signup, updateUser, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

