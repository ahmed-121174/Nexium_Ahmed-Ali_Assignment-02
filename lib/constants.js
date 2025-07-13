export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
]

export const DEFAULT_LANGUAGE = 'ur'

export const API_ENDPOINTS = {
  PROCESS_BLOG: '/api/process-blog',
  SUMMARIES: '/api/summaries',
  HEALTH: '/api/health',
}

export const SCRAPER_CONFIG = {
  REQUEST_TIMEOUT: 30000,
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  MAX_CONTENT_LENGTH: 50000, //50kb
}

export const SUMMARIZER_CONFIG = {
  DEFAULT_SENTENCE_COUNT: 4,
  MIN_WORD_LENGTH: 3,
  STOP_WORDS: ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'],
}