import { useCallback, useEffect, useMemo, useState } from 'react'
import { getJson, setJson, storageKeys } from '../utils/storage'

export type ThemeMode = 'light' | 'dark' | 'system'

function getSystemPrefersDark() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

function applyThemeClass(mode: ThemeMode) {
  const root = document.documentElement
  const shouldBeDark = mode === 'dark' || (mode === 'system' && getSystemPrefersDark())
  root.classList.toggle('dark', shouldBeDark)
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => getJson<ThemeMode>(storageKeys.theme) ?? 'system')

  useEffect(() => {
    applyThemeClass(mode)
    setJson(storageKeys.theme, mode)
  }, [mode])

  useEffect(() => {
    if (mode !== 'system') return
    const mql = window.matchMedia?.('(prefers-color-scheme: dark)')
    const onChange = () => applyThemeClass('system')
    mql?.addEventListener?.('change', onChange)
    return () => mql?.removeEventListener?.('change', onChange)
  }, [mode])

  const toggle = useCallback(() => {
    setMode((m) => (m === 'dark' ? 'light' : 'dark'))
  }, [])

  return useMemo(
    () => ({
      mode,
      setMode,
      toggle,
      isDark: document.documentElement.classList.contains('dark'),
    }),
    [mode, toggle],
  )
}

