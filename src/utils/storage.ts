export const storageKeys = {
  theme: 'edtech.theme',
  session: 'edtech.session',
  progress: 'edtech.progress',
  posts: 'edtech.posts',
} as const

export function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

export function setJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getJson<T>(key: string): T | null {
  return safeJsonParse<T>(localStorage.getItem(key))
}

export function remove(key: string) {
  localStorage.removeItem(key)
}

