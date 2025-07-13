'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Loader2, Globe, BookOpen, Languages } from 'lucide-react'

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL' }),
  targetLanguage: z.string().min(1, { message: 'Please select a language' }),
})

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ur', name: 'Urdu' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
]

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetLanguage: 'ur',
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/process-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to process blog')
      }

      const result = await response.json()
      setResult(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Blog Summarizer & Translator
        </h1>
        <p className="text-gray-600 text-lg">
          Extract, summarize, and translate blog content in multiple languages
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Process Blog URL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-2">
                Blog URL
              </label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/blog-post"
                {...register('url')}
              />
              {errors.url && (
                <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="targetLanguage" className="block text-sm font-medium mb-2">
                Target Language
              </label>
              <Select id="targetLanguage" {...register('targetLanguage')}>
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </Select>
              {errors.targetLanguage && (
                <p className="text-red-500 text-sm mt-1">{errors.targetLanguage.message}</p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Process Blog'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Blog Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1">Title</h4>
                  <p className="text-gray-600">{result.title}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Author</h4>
                  <p className="text-gray-600">{result.author}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Language</h4>
                  <p className="text-gray-600">{result.targetLanguage}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Processing Time</h4>
                  <p className="text-gray-600">{result.processingTime}ms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Original Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={result.originalSummary}
                readOnly
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Translated Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={result.translatedSummary}
                readOnly
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}