import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FolderPlus } from 'lucide-react'
import PostContent from '../user/PostContent.jsx'

export default function CreateContent() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="screen" style={{ paddingBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn-icon btn-secondary" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </button>
          <button className="btn-icon btn-secondary" onClick={() => navigate('/writer/categories')} title="New category">
            <FolderPlus size={18} />
          </button>
        </div>
      </div>
      {/* Reuse the same form used by regular users, since Create Content mirrors Post Content */}
      <PostContent />
    </div>
  )
}