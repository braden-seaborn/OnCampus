import express from 'express'
import { scrapePage } from './scraper.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

// GET /api/scrape?url=https://example.com
app.get('/api/scrape', async (req, res) => {
  const { url } = req.query

  let target
  try {
    target = new URL(url)
  } catch {
    return res.status(400).json({ error: 'Provide a valid ?url= parameter' })
  }
  if (!['http:', 'https:'].includes(target.protocol)) {
    return res.status(400).json({ error: 'Only http and https URLs are supported' })
  }

  try {
    const data = await scrapePage(target.href)
    res.json(data)
  } catch (err) {
    res.status(502).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`)
})
