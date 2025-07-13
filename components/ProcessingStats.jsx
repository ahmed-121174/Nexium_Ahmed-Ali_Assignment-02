import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Globe, FileText, Database } from 'lucide-react'

export function ProcessingStats({ stats }) {
  const statItems = [
    {
      icon: Clock,
      label: 'Processing Time',
      value: `${stats.processingTime}ms`,
      color: 'text-blue-600',
    },
    {
      icon: Globe,
      label: 'Source Language',
      value: stats.sourceLanguage || 'Auto-detected',
      color: 'text-green-600',
    },
    {
      icon: FileText,
      label: 'Content Length',
      value: `${stats.contentLength} chars`,
      color: 'text-purple-600',
    },
    {
      icon: Database,
      label: 'Storage Status',
      value: stats.storageStatus || 'Saved',
      color: 'text-orange-600',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-lg font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}