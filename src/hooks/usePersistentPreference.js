import { useEffect, useState } from 'react'

export function usePersistentPreference(key, fallback) {
  const [value, setValue] = useState(() => localStorage.getItem(key) || fallback)

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}
