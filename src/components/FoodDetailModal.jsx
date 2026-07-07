import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import OpenStatus from './OpenStatus'
import FoodDetail from './FoodDetail'
import { getBestForLabels } from '../utils/foodSpotHelpers'
import './FoodDetailModal.css'

function FoodDetailModal({ spot, onClose, onUpdateSpotReviews, onUploadSpotMedia, onReportSpotInfo }) {
  const closeButtonRef = useRef(null)
  const reviewCount = spot.reviews?.length || 0
  const bestForLabels = getBestForLabels(spot)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div className="spot-modal-overlay" onClick={onClose}>
      <div
        className="spot-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="spot-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="spot-modal-header">
          <div className="spot-modal-header-main">
            <p className="spot-modal-cuisine">{spot.cuisine}</p>
            <h2 id="spot-modal-title">{spot.name}</h2>
            <div className="spot-modal-meta">
              <span className="spot-modal-rating">{spot.rating} / 5</span>
              <span className="spot-modal-dot">•</span>
              <span className="spot-modal-price">{spot.priceRange}</span>
              <span className="spot-modal-dot">•</span>
              <span>{spot.distance}</span>
              <span className="spot-modal-dot">•</span>
              <span>
                {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
              </span>
              <OpenStatus hours={spot.hours} />
            </div>
            {spot.tags?.length > 0 && (
              <div className="spot-modal-tags">
                {spot.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
            {bestForLabels.length > 0 && (
              <div className="spot-modal-best-for">
                <span className="spot-modal-chip-label">Best for</span>
                <div className="spot-modal-tags">
                  {bestForLabels.map((tag) => (
                    <span key={tag} className="spot-modal-best-for-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="spot-modal-close"
            onClick={onClose}
            aria-label="Close spot details"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="spot-modal-body">
          <FoodDetail
            spot={spot}
            onUpdateSpotReviews={onUpdateSpotReviews}
            onUploadSpotMedia={onUploadSpotMedia}
            onReportSpotInfo={onReportSpotInfo}
            inModal
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default FoodDetailModal
