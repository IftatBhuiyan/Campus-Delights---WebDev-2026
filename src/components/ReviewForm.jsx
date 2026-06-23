import React, { useState } from 'react'

function ReviewForm({ onAddReview }) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState('5')
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!name.trim() || !comment.trim()) {
      alert('Please fill out your name and a comment!')
      return
    }

    onAddReview({
      name: name,
      rating: Number(rating),
      text: comment
    })

    setName('')
    setRating('5')
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit} className="review-form-container">
      <h4>Add Your Review</h4>
      
      <div className="form-field-group">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-text-input"
        />
      </div>

      <div className="form-field-group">
        <label className="form-label">Rating: </label>
        <select value={rating} onChange={(e) => setRating(e.target.value)} className="form-select-input">
          <option value="5">5/5</option>
          <option value="4">4/5</option>
          <option value="3">3/5</option>
          <option value="2">2/5</option>
          <option value="1">1/5</option>
        </select>
      </div>

      <div className="form-field-group">
        <textarea
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          className="form-textarea-input"
        />
      </div>

      <button type="submit" className="form-submit-btn">Submit Review</button>
    </form>
  )
}

export default ReviewForm