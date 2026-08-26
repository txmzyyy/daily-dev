import ContentCard from '../../components/content/ContentCard.jsx'
import { MOCK_CONTENT } from '../../data/mockContent.js'

export default function Wishlist() {
  const saved = MOCK_CONTENT.slice(0, 2) // mock: first two items are "saved"

  return (
    <div className="screen">
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Wishlist</h1>

      {saved.length === 0 ? (
        <div className="empty-state">Nothing saved yet. Tap the bookmark icon on any post to add it here.</div>
      ) : (
        <div className="content-grid">
          {saved.map((item) => <ContentCard key={item.id} content={item} />)}
        </div>
      )}
    </div>
  )
}