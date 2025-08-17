import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // RSS feeds for AI and tech news (no API key required)
    const rssFeeds = [
      'https://techcrunch.com/tag/artificial-intelligence/feed/',
      'https://venturebeat.com/category/ai/feed/',
      'https://www.theverge.com/rss/ai/index.xml',
      'https://www.zdnet.com/news/rss.xml',
      'https://www.artificialintelligence-news.com/feed/'
    ]

    // Fetch news from multiple RSS feeds
    const newsPromises = rssFeeds.map(async (feedUrl) => {
      try {
        const response = await fetch(feedUrl, { 
          next: { revalidate: 3600 } // Cache for 1 hour
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${feedUrl}`)
        }
        
        const xmlText = await response.text()
        return parseRSSFeed(xmlText, feedUrl)
      } catch (error) {
        console.error(`Error fetching ${feedUrl}:`, error)
        return []
      }
    })

    // Wait for all feeds to be fetched
    const allNews = await Promise.all(newsPromises)
    
    // Flatten and filter AI-related news
    const aiNews = allNews
      .flat()
      .filter(item => isAINews(item.title))
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, 10) // Get top 10 most recent

    // Convert to our format
    const formattedNews = aiNews.map(item => ({
      title: item.title,
      date: getTimeAgo(item.pubDate),
      source: getSourceFromUrl(item.link),
      url: item.link
    }))

    return NextResponse.json({ 
      success: true, 
      news: formattedNews
    })

  } catch (error) {
    console.error('Error fetching RSS feeds:', error)
    
    // Fallback to sample data if RSS fails
    const fallbackNews = [
      {
        title: "AI Tools Market Continues Rapid Growth",
        date: "2 days ago",
        source: "AI News"
      },
      {
        title: "New Breakthroughs in Generative AI",
        date: "1 week ago",
        source: "Tech News"
      },
      {
        title: "AI Integration in Business Tools Accelerates",
        date: "2 weeks ago",
        source: "Business AI"
      }
    ]
    
    return NextResponse.json({ 
      success: false, 
      news: fallbackNews,
      error: 'Using fallback data'
    })
  }
}

// Parse RSS XML feed
function parseRSSFeed(xmlText, feedUrl) {
  try {
    // Simple XML parsing for RSS feeds
    const items = []
    const itemRegex = /<item>([\s\S]*?)<\/item>/g
    let match
    
    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemXml = match[1]
      
      const title = extractTag(itemXml, 'title')
      const link = extractTag(itemXml, 'link')
      const pubDate = extractTag(itemXml, 'pubDate')
      const description = extractTag(itemXml, 'description')
      
      if (title && link) {
        items.push({
          title: cleanText(title),
          link: cleanText(link),
          pubDate: cleanText(pubDate),
          description: cleanText(description)
        })
      }
    }
    
    return items
  } catch (error) {
    console.error('Error parsing RSS feed:', error)
    return []
  }
}

// Extract content from XML tags
function extractTag(xml, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
  const match = xml.match(regex)
  return match ? match[1] : null
}

// Clean text content
function cleanText(text) {
  if (!text) return ''
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'") // Right single quotation mark
    .replace(/&#8216;/g, "'") // Left single quotation mark
    .replace(/&#8220;/g, '"') // Left double quotation mark
    .replace(/&#8221;/g, '"') // Right double quotation mark
    .replace(/&#8230;/g, '...') // Horizontal ellipsis
    .replace(/&#8211;/g, '–') // En dash
    .replace(/&#8212;/g, '—') // Em dash
    .replace(/&nbsp;/g, ' ') // Non-breaking space
    .replace(/&rsquo;/g, "'") // Right single quotation mark
    .replace(/&lsquo;/g, "'") // Left single quotation mark
    .replace(/&rdquo;/g, '"') // Right double quotation mark
    .replace(/&ldquo;/g, '"') // Left double quotation mark
    .replace(/&hellip;/g, '...') // Horizontal ellipsis
    .replace(/&ndash;/g, '–') // En dash
    .replace(/&mdash;/g, '—') // Em dash
    .trim()
}

// Check if news item is AI-related
function isAINews(title) {
  if (!title) return false
  
  const aiKeywords = [
    'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
    'neural network', 'chatgpt', 'gpt', 'claude', 'gemini', 'copilot',
    'automation', 'robotics', 'algorithm', 'data science', 'nlp',
    'computer vision', 'autonomous', 'smart', 'intelligent'
  ]
  
  const lowerTitle = title.toLowerCase()
  return aiKeywords.some(keyword => lowerTitle.includes(keyword))
}

// Extract source name from URL
function getSourceFromUrl(url) {
  try {
    const domain = new URL(url).hostname
    return domain.replace('www.', '').split('.')[0]
  } catch {
    return 'Unknown'
  }
}

// Helper function to convert dates to "time ago" format
function getTimeAgo(dateString) {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Recently'
    
    const now = new Date()
    const diffInMs = now - date
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) === 1 ? '' : 's'} ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) === 1 ? '' : 's'} ago`
    return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) === 1 ? '' : 's'} ago`
  } catch {
    return 'Recently'
  }
}
