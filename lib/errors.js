export class BlogProcessingError extends Error {
  constructor(message, code = 'PROCESSING_ERROR', statusCode = 500) {
    super(message)
    this.name = 'BlogProcessingError'
    this.code = code
    this.statusCode = statusCode
  }
}

export class ScrapingError extends BlogProcessingError {
  constructor(message, url) {
    super(message, 'SCRAPING_ERROR', 400)
    this.url = url
  }
}

export class TranslationError extends BlogProcessingError {
  constructor(message, sourceLanguage, targetLanguage) {
    super(message, 'TRANSLATION_ERROR', 500)
    this.sourceLanguage = sourceLanguage
    this.targetLanguage = targetLanguage
  }
}

export class DatabaseError extends BlogProcessingError {
  constructor(message, database) {
    super(message, 'DATABASE_ERROR', 500)
    this.database = database
  }
}