import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Scrape failed')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>OnCampus</h1>
      <p className="subtitle">Enter a URL to scrape.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Scraping…' : 'Scrape'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <section className="result">
          <h2>{result.title || '(no title)'}</h2>
          {result.description && <p>{result.description}</p>}

          <h3>Headings ({result.headings.length})</h3>
          <ul>
            {result.headings.map((h, i) => (
              <li key={i}>
                <span className="tag">{h.level}</span> {h.text}
              </li>
            ))}
          </ul>

          <h3>Links ({result.links.length})</h3>
          <ul>
            {result.links.map((link, i) => (
              <li key={i}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.text || link.href}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default App
