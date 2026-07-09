import { useCallback, useEffect, useState } from 'react'
import {
  getAdminFoodSpots,
  setFoodSpotArchived,
  updateFoodSpot,
} from '../api/admin'

const VISIBILITY_TABS = [
  { id: 'active', label: 'Live' },
  { id: 'archived', label: 'Archived' },
  { id: 'all', label: 'All' },
]

const emptyEditForm = {
  name: '',
  cuisine: '',
  priceRange: '$',
  distance: '',
  location: '',
  hours: '',
  description: '',
  menu: '',
  tags: '',
  bestFor: '',
}

function spotToEditForm(spot) {
  return {
    name: spot.name || '',
    cuisine: spot.cuisine || '',
    priceRange: spot.priceRange || '$',
    distance: spot.distance || '',
    location: spot.location || '',
    hours: spot.hours || '',
    description: spot.description || '',
    menu: (spot.menu || []).join(', '),
    tags: (spot.tags || []).join(', '),
    bestFor: (spot.bestFor || []).join(', '),
  }
}

function splitList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function AdminLocations({ onMessage }) {
  const [visibilityFilter, setVisibilityFilter] = useState('active')
  const [spots, setSpots] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(emptyEditForm)
  const [saving, setSaving] = useState(false)

  const loadSpots = useCallback(async (show) => {
    setLoading(true)
    setError('')
    try {
      const data = await getAdminFoodSpots(show)
      setSpots(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadSpots(visibilityFilter)
  }, [visibilityFilter, loadSpots])

  const filteredSpots = spots.filter((spot) => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return true
    return [spot.name, spot.cuisine, spot.location]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query))
  })

  const openEdit = (spot) => {
    setEditingId(spot._id)
    setEditForm(spotToEditForm(spot))
  }

  const handleSave = async (spotId) => {
    setSaving(true)
    onMessage('')
    try {
      await updateFoodSpot(spotId, {
        name: editForm.name.trim(),
        cuisine: editForm.cuisine.trim(),
        priceRange: editForm.priceRange,
        distance: editForm.distance.trim(),
        location: editForm.location.trim(),
        hours: editForm.hours.trim(),
        description: editForm.description.trim(),
        menu: splitList(editForm.menu),
        tags: splitList(editForm.tags),
        bestFor: splitList(editForm.bestFor),
      })
      setEditingId(null)
      onMessage('Location updated.')
      await loadSpots(visibilityFilter)
    } catch (err) {
      onMessage(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleArchiveToggle = async (spot) => {
    const nextArchived = !spot.archived
    const action = nextArchived ? 'archived' : 'restored'
    onMessage('')
    try {
      await setFoodSpotArchived(spot._id, nextArchived)
      onMessage(`${spot.name} ${action}.`)
      if (editingId === spot._id) setEditingId(null)
      await loadSpots(visibilityFilter)
    } catch (err) {
      onMessage(err.message)
    }
  }

  return (
    <div className="admin-locations">
      <div className="admin-section-heading">
        <h2>Manage locations</h2>
        <p>Edit live food spots or archive ones that should be hidden from students.</p>
      </div>

      <div className="admin-locations-toolbar">
        <input
          type="search"
          className="admin-search-input"
          placeholder="Search by name, cuisine, or address..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <div className="admin-tabs">
          {VISIBILITY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin-tab ${visibilityFilter === tab.id ? 'active' : ''}`}
              onClick={() => setVisibilityFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="status-message">Loading locations...</p>}
      {error && <p className="admin-error">{error}</p>}

      {!loading && !error && filteredSpots.length === 0 && (
        <div className="admin-empty">
          <p>No locations match this view.</p>
        </div>
      )}

      <div className="admin-suggestion-list">
        {filteredSpots.map((spot) => (
          <article
            key={spot._id}
            className={`admin-suggestion-card ${spot.archived ? 'is-archived' : ''}`}
          >
            <div className="admin-suggestion-header">
              <div>
                <h2>{spot.name}</h2>
                <p className="admin-suggestion-meta">
                  {spot.cuisine} • {spot.priceRange} • {spot.distance || 'Distance not set'}
                </p>
              </div>
              <span className={`admin-status-badge ${spot.archived ? 'rejected' : 'approved'}`}>
                {spot.archived ? 'Archived' : 'Live'}
              </span>
            </div>

            <div className="admin-suggestion-body">
              <p><strong>Address:</strong> {spot.location || 'Not set'}</p>
              <p><strong>Hours:</strong> {spot.hours || 'Not set'}</p>
              <p><strong>Rating:</strong> {spot.rating || 0} / 5 ({spot.reviews?.length || 0} reviews)</p>
              <p>{spot.description}</p>
            </div>

            <div className="admin-suggestion-actions">
              <button type="button" className="primary-button" onClick={() => openEdit(spot)}>
                Edit
              </button>
              <button
                type="button"
                className={`secondary-button ${spot.archived ? '' : 'danger'}`}
                onClick={() => handleArchiveToggle(spot)}
              >
                {spot.archived ? 'Restore' : 'Archive'}
              </button>
            </div>

            {editingId === spot._id && (
              <div className="admin-approval-panel">
                <h3>Edit location</h3>

                <div className="admin-approval-grid">
                  <label>
                    Name
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, name: event.target.value }))
                      }
                      required
                    />
                  </label>

                  <label>
                    Cuisine
                    <input
                      type="text"
                      value={editForm.cuisine}
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, cuisine: event.target.value }))
                      }
                    />
                  </label>

                  <label>
                    Price range
                    <select
                      value={editForm.priceRange}
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, priceRange: event.target.value }))
                      }
                    >
                      <option value="$">$</option>
                      <option value="$$">$$</option>
                      <option value="$$$">$$$</option>
                    </select>
                  </label>

                  <label>
                    Distance
                    <input
                      type="text"
                      value={editForm.distance}
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, distance: event.target.value }))
                      }
                    />
                  </label>

                  <label>
                    Hours
                    <input
                      type="text"
                      value={editForm.hours}
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, hours: event.target.value }))
                      }
                    />
                  </label>

                  <label>
                    Address
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(event) =>
                        setEditForm((current) => ({ ...current, location: event.target.value }))
                      }
                    />
                  </label>
                </div>

                <label>
                  Description
                  <textarea
                    rows="3"
                    value={editForm.description}
                    onChange={(event) =>
                      setEditForm((current) => ({ ...current, description: event.target.value }))
                    }
                  />
                </label>

                <label>
                  Menu items (comma-separated)
                  <input
                    type="text"
                    value={editForm.menu}
                    onChange={(event) =>
                      setEditForm((current) => ({ ...current, menu: event.target.value }))
                    }
                  />
                </label>

                <label>
                  Tags (comma-separated)
                  <input
                    type="text"
                    value={editForm.tags}
                    onChange={(event) =>
                      setEditForm((current) => ({ ...current, tags: event.target.value }))
                    }
                  />
                </label>

                <label>
                  Best for (comma-separated)
                  <input
                    type="text"
                    value={editForm.bestFor}
                    onChange={(event) =>
                      setEditForm((current) => ({ ...current, bestFor: event.target.value }))
                    }
                    placeholder="quick lunch, study spot"
                  />
                </label>

                <div className="admin-approval-actions">
                  <button
                    type="button"
                    className="primary-button"
                    disabled={saving}
                    onClick={() => handleSave(spot._id)}
                  >
                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

export default AdminLocations
