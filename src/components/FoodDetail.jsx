import React, { useState } from 'react'
import ReviewForm from './ReviewForm'
import { getBestForLabels } from '../utils/foodSpotHelpers'
import './FoodDetail.css'

function FoodDetail({
  spot,
  onUpdateSpotReviews,
  onUploadSpotMedia,
  onReportSpotInfo,
  inModal = false,
}) {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [mediaType, setMediaType] = useState('photo')
  const [mediaCaption, setMediaCaption] = useState('')
  const [mediaStatus, setMediaStatus] = useState('')
  const [uploadingMedia, setUploadingMedia] = useState(false)
  const [reportIssueType, setReportIssueType] = useState('hours')
  const [reportDetails, setReportDetails] = useState('')
  const [reportEmail, setReportEmail] = useState('')
  const [reportSubject, setReportSubject] = useState('');
  const [reportStatus, setReportStatus] = useState('')
  const [submittingReport, setSubmittingReport] = useState(false)

  if (!spot) {
    return null
  }

  const bestForLabels = getBestForLabels(spot)

  const handleAddReview = (newReview) => {
    const currentReviews = spot.reviews || []
    const updatedReviews = [...currentReviews, newReview]
    onUpdateSpotReviews(spot._id || spot.id, updatedReviews)
  }

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result || ''))
      reader.onerror = () => reject(new Error('Unable to read the selected file'))
      reader.readAsDataURL(file)
    })

  const handleMediaSubmit = async (event) => {
    event.preventDefault()

    if (selectedFiles.length === 0) {
      setMediaStatus('Please choose at least one image to upload.')
      return
    }

    setUploadingMedia(true)
    setMediaStatus('')

    try {
      const attachments = await Promise.all(
        selectedFiles.map(async (file) => ({
          kind: mediaType,
          caption: mediaCaption.trim(),
          filename: file.name,
          mimeType: file.type,
          dataUrl: await readFileAsDataUrl(file),
        })),
      )

      await onUploadSpotMedia(spot._id || spot.id, attachments)
      setSelectedFiles([])
      setMediaCaption('')
      setMediaType('photo')
      event.target.reset()
      setMediaStatus('Thanks. Your upload was added to this spot.')
    } catch (error) {
      setMediaStatus(error.message)
    } finally {
      setUploadingMedia(false)
    }
  }

  const handleReportSubmit = async (event) => {
    event.preventDefault()

    if (!reportDetails.trim()) {
      setReportStatus('Please add a short description of the issue.')
      return
    }

    setSubmittingReport(true)
    setReportStatus('')

    try {
      await onReportSpotInfo(spot._id || spot.id, {
        issueType: reportIssueType,
        details: reportDetails.trim(),
        email: reportEmail.trim(),
      })
      setReportDetails('')
      setReportEmail('')
      setReportIssueType('hours')
      event.target.reset()
      setReportStatus('Thanks. The issue has been reported.')
    } catch (error) {
      setReportStatus(error.message)
    } finally {
      setSubmittingReport(false)
    }
  }

  return (
    <section className={`food-detail ${inModal ? 'food-detail--modal' : ''}`}>
      <p className="food-detail-description">{spot.description}</p>

      <div className="detail-grid">
        <div>
          <h3>Location</h3>
          <p>{spot.location || 'N/A'}</p>
        </div>
        <div>
          <h3>Hours</h3>
          <p>{spot.hours || 'N/A'}</p>
        </div>
        <div>
          <h3>Price</h3>
          <p>{spot.priceRange || 'N/A'}</p>
        </div>
        <div>
          <h3>Rating</h3>
          <p>{spot.rating || 0} / 5</p>
        </div>
        <div>
          <h3>Best for</h3>
          {bestForLabels.length > 0 ? (
            <div className="detail-chip-list">
              {bestForLabels.map((label) => (
                <span key={label} className="detail-chip">
                  {label}
                </span>
              ))}
            </div>
          ) : (
            <p className="detail-empty">No tags yet.</p>
          )}
        </div>
      </div>

      {spot.media?.length > 0 && (
        <div className="detail-section">
          <h3>Photos and menu screenshots</h3>
          <div className="media-grid">
            {spot.media.map((item) => (
              <figure className="media-card" key={item._id || item.filename || item.uploadedAt}>
                <img
                  src={item.dataUrl}
                  alt={item.caption || `${spot.name} ${item.kind}`}
                  loading="lazy"
                />
                <figcaption>
                  <strong>{item.kind}</strong>
                  {item.caption && <p>{item.caption}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      <div className="detail-section">
        <h3>Menu items</h3>
        {spot.menu?.length > 0 ? (
          <ul>
            {spot.menu.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="detail-empty">No menu items listed.</p>
        )}
      </div>

      <div className="detail-section">
        <h3>Student reviews</h3>
        <div className="review-list">
          {spot.reviews?.length > 0 ? (
            spot.reviews.map((review, index) => (
              <article className="review-card" key={index}>
                <strong>
                  {review.name || 'Anonymous'} - {review.rating || 0} / 5
                </strong>
                <p>{review.text}</p>
              </article>
            ))
          ) : (
            <p className="detail-empty">No reviews yet. Be the first to share your experience.</p>
          )}
        </div>
      </div>

      <ReviewForm onAddReview={handleAddReview} />

      <div className="review-form-container">
        <h3>Upload Photos</h3>
        <form className="spot-action-form" onSubmit={handleMediaSubmit}>
          <div className="form-field-group">
            <label className="form-label">Upload type</label>
            <select className="form-select-input" value={mediaType} onChange={(event) => setMediaType(event.target.value)}>
              <optgroup label="Primary Media">
                <option value="photo">General Photo</option>
                <option value="video">Video</option>
              </optgroup>
              <optgroup label="Documentation">
                <option value="menu">Menu</option>
                <option value="receipt">Receipt</option>
                <option value="hours">Operating Hours</option>
              </optgroup>
              <optgroup label="Location Features">
                <option value="exterior">Exterior/Entrance</option>
                <option value="interior">Interior/Atmosphere</option>
                <option value="amenity">Amenities</option>
              </optgroup>
            </select>
          </div>

          <div className="form-field-group">
            <label className="form-label">Caption</label>
            <input
              className="form-text-input"
              type="text"
              value={mediaCaption}
              onChange={(event) => setMediaCaption(event.target.value)}
              placeholder="What should other students know about this image?"
            />
          </div>

          <div className="form-field-group">
            <label className="form-label">Choose files</label>
            <input
              className="form-text-input"
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => setSelectedFiles(Array.from(event.target.files || []))}
            />
          </div>

          {selectedFiles.length > 0 && (
            <p className="detail-help-text">
              {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
            </p>
          )}

          {mediaStatus && <p className="detail-status-message">{mediaStatus}</p>}

          <button type="submit" className="form-submit-btn" disabled={uploadingMedia}>
            {uploadingMedia ? 'Uploading...' : 'Upload media'}
          </button>
        </form>
      </div>

      <div className="review-form-container">
  <h3>Report Incorrect Info</h3>
  <form className="spot-action-form" onSubmit={handleReportSubmit}>
    <div className="form-field-group">
      <label className="form-label">What needs fixing?</label>
      <select
        className="form-select-input"
        value={reportIssueType}
        onChange={(event) => setReportIssueType(event.target.value)}
      >
        <option value="">-- Select an issue --</option>
        <option value="hours">Hours are wrong</option>
        <option value="address">Address is wrong</option>
        <option value="closed">Restaurant is closed</option>
        <option value="menu">Menu needs updating</option>
        <option value="other">Other</option>
      </select>
    </div>

    {reportIssueType === 'other' && (
      <div className="form-field-group">
        <label className="form-label">Subject</label>
        <input
          className="form-text-input"
          type="text"
          value={reportSubject}
          onChange={(event) => setReportSubject(event.target.value)}
          placeholder="Briefly state the issue (e.g., Phone number)"
          required
        />
      </div>
    )}

    <div className="form-field-group">
      <label className="form-label">Details</label>
      <textarea
        className="form-textarea-input"
        rows="3"
        value={reportDetails}
        onChange={(event) => setReportDetails(event.target.value)}
        placeholder="Tell us what is incorrect and what it should say instead."
        required
      />
    </div>

    <div className="form-field-group">
      <label className="form-label">Email for follow-up (optional)</label>
      <input
        className="form-text-input"
        type="email"
        value={reportEmail}
        onChange={(event) => setReportEmail(event.target.value)}
        placeholder="student@hunter.cuny.edu"
      />
    </div>

    {reportStatus && <p className="detail-status-message">{reportStatus}</p>}

    <button type="submit" className="form-submit-btn" disabled={submittingReport}>
      {submittingReport ? 'Sending report...' : 'Report info'}
    </button>
  </form>
</div>
    </section>
  )
}

export default FoodDetail