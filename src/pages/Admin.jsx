import { useCallback, useEffect, useState } from 'react'
import {
  approveSuggestion,
  getAdminSession,
  getSuggestions,
  loginAdmin,
  logoutAdmin,
  rejectSuggestion,
} from '../api/admin'
import './Admin.css'

const STATUS_TABS = [
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'all', label: 'All' },
]

const emptyApprovalForm = {
  priceRange: '$',
  distance: '',
  hours: '',
  description: '',
  menu: '',
  tags: '',
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString()
}

function Admin() {
  const [session, setSession] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const [statusFilter, setStatusFilter] = useState('pending')
  const [suggestions, setSuggestions] = useState([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [listError, setListError] = useState('')

  const [activeApprovalId, setActiveApprovalId] = useState(null)
  const [approvalForm, setApprovalForm] = useState(emptyApprovalForm)
  const [rejectingId, setRejectingId] = useState(null)
  const [rejectionNote, setRejectionNote] = useState('')
  const [actionMessage, setActionMessage] = useState('')

  const loadSuggestions = useCallback(async (status) => {
    setLoadingSuggestions(true)
    setListError('')
    try {
      const data = await getSuggestions(status)
      setSuggestions(data)
    } catch (err) {
      setListError(err.message)
      if (err.message.toLowerCase().includes('login')) {
        setSession(null)
        logoutAdmin()
      }
    } finally {
      setLoadingSuggestions(false)
    }
  }, [])

  useEffect(() => {
    getAdminSession()
      .then((data) => setSession(data))
      .catch(() => {
        logoutAdmin()
        setSession(null)
      })
      .finally(() => setCheckingSession(false))
  }, [])

  useEffect(() => {
    if (session) {
      loadSuggestions(statusFilter)
    }
  }, [session, statusFilter, loadSuggestions])

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoggingIn(true)
    setLoginError('')

    try {
      const data = await loginAdmin(loginForm.username, loginForm.password)
      setSession({ username: data.username, role: 'admin' })
      setLoginForm({ username: '', password: '' })
    } catch (err) {
      setLoginError(err.message)
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = () => {
    logoutAdmin()
    setSession(null)
    setSuggestions([])
    setActiveApprovalId(null)
    setRejectingId(null)
  }

  const openApproval = (suggestion) => {
    setRejectingId(null)
    setActiveApprovalId(suggestion._id)
    setApprovalForm({
      priceRange: '$',
      distance: '',
      hours: '',
      description: suggestion.reason,
      menu: '',
      tags: '',
    })
  }

  const handleApprove = async (suggestionId) => {
    setActionMessage('')
    try {
      await approveSuggestion(suggestionId, {
        priceRange: approvalForm.priceRange,
        distance: approvalForm.distance,
        hours: approvalForm.hours,
        description: approvalForm.description,
        menu: approvalForm.menu
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        tags: approvalForm.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      })
      setActiveApprovalId(null)
      setActionMessage('Suggestion approved and added to food spots.')
      await loadSuggestions(statusFilter)
    } catch (err) {
      setActionMessage(err.message)
    }
  }

  const handleReject = async (suggestionId) => {
    setActionMessage('')
    try {
      await rejectSuggestion(suggestionId, rejectionNote)
      setRejectingId(null)
      setRejectionNote('')
      setActionMessage('Suggestion rejected.')
      await loadSuggestions(statusFilter)
    } catch (err) {
      setActionMessage(err.message)
    }
  }

  if (checkingSession) {
    return (
      <section className="page-section admin-page">
        <p className="status-message">Checking admin session...</p>
      </section>
    )
  }

  if (!session) {
    return (
      <section className="page-section admin-page">
        <div className="page-heading">
          <p className="hero-label">Admin</p>
          <h1>Team Login</h1>
          <p>Sign in to review student food spot suggestions.</p>
        </div>

        <div className="admin-login-card">
          <form className="admin-login-form" onSubmit={handleLogin}>
            <label>
              Username
              <input
                type="text"
                value={loginForm.username}
                onChange={(event) =>
                  setLoginForm((current) => ({ ...current, username: event.target.value }))
                }
                autoComplete="username"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((current) => ({ ...current, password: event.target.value }))
                }
                autoComplete="current-password"
                required
              />
            </label>

            {loginError && <p className="admin-error">{loginError}</p>}

            <button type="submit" className="primary-button" disabled={loggingIn}>
              {loggingIn ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="page-section admin-page">
      <div className="admin-top-bar">
        <div className="page-heading">
          <p className="hero-label">Admin</p>
          <h1>Review submissions</h1>
          <p>
            Signed in as <strong>{session.username}</strong>. Approve suggestions to publish
            them on the Food Spots page.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className="admin-tabs">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`admin-tab ${statusFilter === tab.id ? 'active' : ''}`}
            onClick={() => setStatusFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {actionMessage && <p className="admin-action-message">{actionMessage}</p>}
      {loadingSuggestions && <p className="status-message">Loading submissions...</p>}
      {listError && <p className="admin-error">{listError}</p>}

      {!loadingSuggestions && !listError && suggestions.length === 0 && (
        <div className="admin-empty">
          <p>No {statusFilter === 'all' ? '' : statusFilter} submissions right now.</p>
        </div>
      )}

      <div className="admin-suggestion-list">
        {suggestions.map((suggestion) => (
          <article key={suggestion._id} className="admin-suggestion-card">
            <div className="admin-suggestion-header">
              <div>
                <h2>{suggestion.restaurantName}</h2>
                <p className="admin-suggestion-meta">
                  {suggestion.cuisine || 'Cuisine not provided'}
                  {suggestion.email ? ` • ${suggestion.email}` : ''}
                </p>
              </div>
              <span className={`admin-status-badge ${suggestion.status}`}>
                {suggestion.status}
              </span>
            </div>

            <div className="admin-suggestion-body">
              <p><strong>Address:</strong> {suggestion.address || 'Not provided'}</p>
              <p><strong>Why add it:</strong> {suggestion.reason}</p>
              <p className="admin-timestamps">
                Submitted {formatDate(suggestion.createdAt)}
                {suggestion.reviewedAt ? ` • Reviewed ${formatDate(suggestion.reviewedAt)}` : ''}
              </p>
              {suggestion.rejectionNote && (
                <p><strong>Rejection note:</strong> {suggestion.rejectionNote}</p>
              )}
            </div>

            {suggestion.status === 'pending' && (
              <div className="admin-suggestion-actions">
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => openApproval(suggestion)}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="secondary-button danger"
                  onClick={() => {
                    setActiveApprovalId(null)
                    setRejectingId(suggestion._id)
                    setRejectionNote('')
                  }}
                >
                  Reject
                </button>
              </div>
            )}

            {activeApprovalId === suggestion._id && (
              <div className="admin-approval-panel">
                <h3>Publish details</h3>
                <p>Add any extra info before this spot goes live.</p>

                <div className="admin-approval-grid">
                  <label>
                    Price range
                    <select
                      value={approvalForm.priceRange}
                      onChange={(event) =>
                        setApprovalForm((current) => ({
                          ...current,
                          priceRange: event.target.value,
                        }))
                      }
                    >
                      <option value="$">$</option>
                      <option value="$$">$$</option>
                      <option value="$$$">$$$</option>
                    </select>
                  </label>

                  <label>
                    Distance from campus
                    <input
                      type="text"
                      value={approvalForm.distance}
                      onChange={(event) =>
                        setApprovalForm((current) => ({
                          ...current,
                          distance: event.target.value,
                        }))
                      }
                      placeholder="e.g. 2 blocks away"
                    />
                  </label>

                  <label>
                    Hours
                    <input
                      type="text"
                      value={approvalForm.hours}
                      onChange={(event) =>
                        setApprovalForm((current) => ({
                          ...current,
                          hours: event.target.value,
                        }))
                      }
                      placeholder="e.g. 10 AM - 8 PM"
                    />
                  </label>
                </div>

                <label>
                  Description
                  <textarea
                    rows="3"
                    value={approvalForm.description}
                    onChange={(event) =>
                      setApprovalForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                  />
                </label>

                <label>
                  Menu items (comma-separated)
                  <input
                    type="text"
                    value={approvalForm.menu}
                    onChange={(event) =>
                      setApprovalForm((current) => ({ ...current, menu: event.target.value }))
                    }
                    placeholder="Slice, Garlic knots, Salad"
                  />
                </label>

                <label>
                  Tags (comma-separated)
                  <input
                    type="text"
                    value={approvalForm.tags}
                    onChange={(event) =>
                      setApprovalForm((current) => ({ ...current, tags: event.target.value }))
                    }
                    placeholder="cheap, quick, lunch"
                  />
                </label>

                <div className="admin-approval-actions">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => handleApprove(suggestion._id)}
                  >
                    Confirm approval
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setActiveApprovalId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {rejectingId === suggestion._id && (
              <div className="admin-reject-panel">
                <h3>Reject submission</h3>
                <label>
                  Optional note (internal)
                  <textarea
                    rows="3"
                    value={rejectionNote}
                    onChange={(event) => setRejectionNote(event.target.value)}
                    placeholder="Why this was not added..."
                  />
                </label>
                <div className="admin-approval-actions">
                  <button
                    type="button"
                    className="secondary-button danger"
                    onClick={() => handleReject(suggestion._id)}
                  >
                    Confirm rejection
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setRejectingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Admin
