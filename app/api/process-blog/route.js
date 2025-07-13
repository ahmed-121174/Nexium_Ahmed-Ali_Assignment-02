import { NextResponse } from 'next/server'
import { WebScraper } from '@/lib/scraper'
import TextSummarizer from '@/lib/summarizer'
import { AzureTranslator } from '@/lib/translator'
import { supabase } from '@/lib/supabase'
import clientPromise from '@/lib/mongodb'
import prisma from '@/lib/prisma'

export async function POST(request) {
  const startTime = Date.now()
  
  try {
    const { url, targetLanguage } = await request.json()

    //validate URL
    if (!url || !url.startsWith('http')) {
      return NextResponse.json(
        { error: 'Invalid URL provided' },
        { status: 400 }
      )
    }

    //scrape the blog content
    const scrapedData = await WebScraper.scrapeUrl(url)
    
    if (!scrapedData.content) {
      return NextResponse.json(
        { error: 'No content found at the provided URL' },
        { status: 400 }
      )
    }

    //generate summary
    const originalSummary = TextSummarizer.summarize(scrapedData.content)

    //translate summary
    let translatedSummary = originalSummary
    if (targetLanguage !== 'en') {
      translatedSummary = await AzureTranslator.translate(originalSummary, targetLanguage)
    }

    //store in databases
    const processingTime = Date.now() - startTime
    const timestamp = new Date().toISOString()

    //store summary in Supabase using Prisma
    let supabaseResult = null
    try {
      //try using Prisma first
      supabaseResult = await prisma.blogSummary.create({
        data: {
          url,
          title: scrapedData.title,
          author: scrapedData.author,
          original_summary: originalSummary,
          translated_summary: translatedSummary,
          target_language: targetLanguage,
          processing_time: processingTime,
        },
      })
      console.log('Data stored in Supabase using Prisma:', supabaseResult.id)
    } catch (prismaError) {
      console.error('Prisma error, falling back to direct Supabase client:', prismaError)
      
      //gallback to direct Supabase client
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('blog_summaries')
        .insert([
          {
            url,
            title: scrapedData.title,
            author: scrapedData.author,
            original_summary: originalSummary,
            translated_summary: translatedSummary,
            target_language: targetLanguage,
            processing_time: processingTime,
            created_at: timestamp,
          },
        ])
        .select()

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        //continue even if Supabase fails
      } else {
        supabaseResult = supabaseData?.[0]
        console.log('Data stored in Supabase using direct client:', supabaseResult?.id)
      }
    }

    //store full content in MongoDB
    let mongoResult = null
    try {
      const client = await clientPromise
      const db = client.db('blog_processor')
      const collection = db.collection('blog_content')

      mongoResult = await collection.insertOne({
        url,
        title: scrapedData.title,
        author: scrapedData.author,
        full_content: scrapedData.content,
        scraped_at: scrapedData.scrapedAt,
        target_language: targetLanguage,
        processing_time: processingTime,
        created_at: timestamp,
      })
      console.log('Data stored in MongoDB:', mongoResult.insertedId)
    } catch (mongoError) {
      console.error('MongoDB error:', mongoError)
      //continue even if MongoDB fails
    }

    //return success response
    return NextResponse.json({
      success: true,
      title: scrapedData.title,
      author: scrapedData.author,
      originalSummary,
      translatedSummary,
      targetLanguage,
      processingTime,
      timestamp,
      database_results: {
        supabase: supabaseResult ? 'success' : 'failed',
        mongodb: mongoResult ? 'success' : 'failed',
        supabase_id: supabaseResult?.id,
        mongodb_id: mongoResult?.insertedId,
      },
    })

  } catch (error) {
    console.error('Processing error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process blog' },
      { status: 500 }
    )
  }
}