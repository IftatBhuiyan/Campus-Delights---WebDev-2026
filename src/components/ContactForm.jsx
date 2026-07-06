import { useState } from 'react'
import { submitSuggestion } from '../api/suggestions'
import './Contact.css'

function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    restaurantName: '',
    cuisine: '',
    address: '',
    reason: '',
    email: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await submitSuggestion(formData)
      setSuccess(true)
      setTimeout(() => {
        onClose()
      }, 1800)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="suggestion-form-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="close-button" onClick={onClose} aria-label="Close form">
          ×
        </button>

        <div className="modal-header">
          <h2 id="suggestion-form-title">Suggest a Food Spot</h2>
          <p>
            Help Campus Delights grow by recommending your favorite places to eat
            near Hunter College. Our team will review your submission.
          </p>
        </div>

        {success ? (
          <div className="form-success">
            <strong>Thanks for your suggestion!</strong>
            <p>We received your request and will review it soon.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Restaurant Name
              <input
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                placeholder="Ex. Joe's Pizza"
                required
              />
            </label>

            <label>
              Cuisine Type
              <input
                type="text"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                placeholder="Korean, Mexican, Italian..."
              />
            </label>

            <label>
              Address
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address or nearby intersection"
              />
            </label>

            <label>
              Why should we add this place?
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us why students should know about it..."
                required
              />
            </label>

            <label>
              Email (optional)
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="yourname@email.com"
              />
            </label>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="primary-button submit-button" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit!'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ContactForm
