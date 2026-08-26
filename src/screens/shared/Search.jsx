import { useState } from 'react'
import { SearchIcon, FileText, Video, Headphones } from 'lucide-react'
import clsx from 'clsx'
import ContentCard from '../../components/content/ContentCard.jsx'
import { MOCK_CONTENT } from '../../data/mockContent.js'

const TYPES = [
  { key: 'article', label: 'Article', icon: FileText },
  { key: 'video', label: 'Video', icon: Video },
  { key: 'audio', label: 'Audio', icon: Headphones },
]

export default function Search() {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState(null)

  const results = MOCK_CONTENT.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase())
    const matchesType = !typeFilter || item.type === typeFilter
    return matchesQuery && matchesType
  })

  return (
    <div className="screen">
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Search</h1>

      <div style={{ position: 'relative', marginBottom: 16 }}>
        <SearchIcon size={18} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--muted)' }} />
        <input
          style={{ paddingLeft: 40 }}
          placeholder="Search articles, videos, audio..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {TYPES.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={clsx('chip', typeFilter === key && 'selected')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px' }}
            onClick={() => setTypeFilter(typeFilter === key ? null : key)}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="empty-state">No results found. Try a different search.</div>
      ) : (
        <div className="content-grid">
          {results.map((item) => <ContentCard key={item.id} content={item} />)}
        </div>
      )}
    </div>
  )
}