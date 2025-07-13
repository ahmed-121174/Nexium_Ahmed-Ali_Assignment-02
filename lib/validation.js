import { z } from 'zod'

export const urlSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
  targetLanguage: z.string().min(1, 'Please select a language'),
})

export const supportedLanguages = ['en', 'ur', 'ar', 'hi', 'es']

export function validateUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isValidLanguage(lang) {
  return supportedLanguages.includes(lang)
}