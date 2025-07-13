import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const language = searchParams.get('language')

    let query = supabase
      .from('blog_summaries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (language) {
      query = query.eq('target_language', language)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}