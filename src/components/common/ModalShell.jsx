import { X } from 'lucide-react'

export default function ModalShell({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card modal-content" style={{ margin: 0 }} onClick={(e) => e.stopPropagation()}>
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18 }}>{title}</h3>
            <button className="btn-icon" style={{ background: 'none', border: 'none', color: 'var(--muted)' }} onClick={onClose}>
              <X size={18} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}