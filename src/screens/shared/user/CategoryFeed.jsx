import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import clsx from 'clsx'
import ContentCard from '../../components/content/ContentCard.jsx'
import { MOCK_CONTENT } from '../../data/mockContent.js'

export default function CategoryFeed() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [subscribed, setSubscribed] = useState(false)
  const label = slug?.replace('-', ' / ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Category'

  const items = MOCK_CONTENT.filter((c) => c.category.toLowerCase().includes(slug?.split('-')[0] || ''))

  return (
    <div className="screen">
      <button className="btn-icon btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        <ArrowLeft size={18} />
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 24 }}>{label}</h1>
        <button
          className={clsx('btn', subscribed ? 'btn-secondary' : 'btn-primary')}
          style={{ width: 'auto', padding: '8px 16px' }}
          onClick={() => setSubscribed(!subscribed)}
        >
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">No content yet in this category.</div>
      ) : (
        <div className="content-grid">
          {items.map((item) => <ContentCard key={item.id} content={item} />)}
        </div>
      )}
    </div>
  )
}