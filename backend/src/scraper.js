import * as cheerio from 'cheerio'

const MAX_LINKS = 100

// Fetch a page and pull out its title, description, headings, and links
export async function scrapePage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'OnCampusBot/0.1' },
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }

  const html = await res.text()
  const $ = cheerio.load(html)

  const headings = $('h1, h2, h3')
    .map((_, el) => ({
      level: el.tagName.toLowerCase(),
      text: $(el).text().trim(),
    }))
    .get()
    .filter((h) => h.text)

  const links = $('a[href]')
    .map((_, el) => {
      const href = $(el).attr('href')
      try {
        return { text: $(el).text().trim(), href: new URL(href, url).href }
      } catch {
        return null
      }
    })
    .get()
    .filter(Boolean)
    .slice(0, MAX_LINKS)

  return {
    url,
    title: $('title').first().text().trim(),
    description: $('meta[name="description"]').attr('content') || '',
    headings,
    links,
  }
}
