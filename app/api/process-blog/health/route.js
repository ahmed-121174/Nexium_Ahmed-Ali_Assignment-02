import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    //check supabase connection
    const { data: supabaseHealth, error: supabaseError } = await supabase
      .from('blog_summaries')
      .select('count')
      .limit(1)

    //check mongoDB connection
    let mongoHealth = false
    try {
      const client = await clientPromise
      await client.db('admin').command({ ping: 1 })
      mongoHealth = true
    } catch (mongoError) {
      console.error('MongoDB health check failed:', mongoError)
    }

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        supabase: supabaseError ? 'unhealthy' : 'healthy',
        mongodb: mongoHealth ? 'healthy' : 'unhealthy',
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
