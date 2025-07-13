'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Calendar, User } from 'lucide-react'

export function RecentSummaries() {
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRecentSummaries()
  }, [])

  const fetchRecentSummaries = async () => {
    try {
      const response = await fetch('/api/summaries?limit=5')
      const data = await response.json()
      
      if (data.success) {
        setSummaries(data.data)
      } else {
        setError('Failed to fetch summaries')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Summaries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Summaries</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Summaries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {summaries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No summaries yet. Process your first blog!
            </p>
          ) : (
            summaries.map((summary, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm line-clamp-1">
                    {summary.title || 'Untitled'}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(summary.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {summary.translated_summary}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {summary.author || 'Unknown'}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(summary.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}