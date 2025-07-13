import * as cheerio from 'cheerio'
import axios from 'axios'

export class WebScraper {
  static async scrapeUrl(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      })
      
      const $ = cheerio.load(response.data)
      
      //remove unwanted elements
      $('script, style, nav, header, footer, aside, .sidebar, .advertisement').remove()
      
      //extract content
      const title = $('title').text() || $('h1').first().text()
      const author = $('meta[name="author"]').attr('content') || 
                    $('.author').first().text() || 
                    $('[rel="author"]').first().text()
      
      //try multiple selectors for main content
      let content = $('article').text() || 
                   $('.post-content').text() || 
                   $('.entry-content').text() || 
                   $('.content').text() || 
                   $('main').text()
      
      if (!content) {
        //fallback: get all paragraph text
        content = $('p').map((i, el) => $(el).text()).get().join('\n')
      }
      
      return {
        title: title.trim(),
        author: author?.trim() || 'Unknown',
        content: content.trim(),
        url,
        scrapedAt: new Date().toISOString()
      }
    } catch (error) {
      throw new Error(`Failed to scrape URL: ${error.message}`)
    }
  }
}