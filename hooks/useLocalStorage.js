import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    try {
      const item = window?.localStorage?.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.log('localStorage not available')
    }
  }, [key])

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window?.localStorage?.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log('localStorage not available')
    }
  }

  return [storedValue, setValue]
}