import { useCallback, useEffect, useState } from 'react'
import {
  deleteSpotMedia,
  getAdminMedia,
  getAdminReports,
  updateReportStatus,
} from '../api/admin'

const REPORT_TABS = [
  { id: 'open', label: 'Open' },
  { id: 'reviewed', label: 'Reviewed' },
  { id: 'all', label: 'All' },
]

const ISSUE_LABELS = {
  hours: 'Hours are wrong',
  address: 'Address is wrong',
  closed: 'Restaurant is closed',
  menu: 'Menu needs updating',
  other: 'Other',
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString()
}

function AdminStudentActivity({ onMessage }) {
  const [section, setSection] = useState('reports')
  const [reportFilter, setReportFilter] = useState('open')
  const [reports, setReports] = useState([])
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadReports = useCallback(async (status) => {
    setLoading(true)
    setError('')
    try {
      setReports(await getAdminReports(status))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMedia = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setMedia(await getAdminMedia())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (section === 'reports') {
      loadReports(reportFilter)
    } else {
      loadMedia()
    }
  }, [section, reportFilter, loadReports, loadMedia])

  const handleMarkReviewed = async (report) => {
    onMessage('')
    try {
      await updateReportStatus(report.spotId, report.reportId, 'reviewed')
      onMessage(`Marked report for ${report.spotName} as reviewed.`)
      await loadReports(reportFilter)
    } catch (err) {
      onMessage(err.message)
    }
  }

  const handleReopenReport = async (report) => {
    onMessage('')
    try {
      await updateReportStatus(report.spotId, report.reportId, 'open')
      onMessage(`Reopened report for ${report.spotName}.`)
      await loadReports(reportFilter)
    } catch (err) {
      onMessage(err.message)
    }
  }

  const handleRemoveMedia = async (item) => {
    if (!window.confirm(`Remove this upload from ${item.spotName}?`)) return

    onMessage('')
    try {
      await deleteSpotMedia(item.spotId, item.mediaId)
      onMessage(`Removed upload from ${item.spotName}.`)
      await loadMedia()
    } catch (err) {
      onMessage(err.message)
    }
  }

  return (
    <div className="admin-activity">
      <div className="admin-section-heading">
        <h2>Student uploads & reports</h2>
        <p>Review photos students uploaded and info correction reports from spot detail modals.</p>
      </div>

      <div className="admin-main-tabs admin-activity-tabs">
        <button
          type="button"
          className={`admin-main-tab ${section === 'reports' ? 'active' : ''}`}
          onClick={() => setSection('reports')}
        >
          Info reports
        </button>
        <button
          type="button"
          className={`admin-main-tab ${section === 'media' ? 'active' : ''}`}
          onClick={() => setSection('media')}
        >
          Photo uploads
        </button>
      </div>

      {section === 'reports' && (
        <div className="admin-tabs">
          {REPORT_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin-tab ${reportFilter === tab.id ? 'active' : ''}`}
              onClick={() => setReportFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {loading && <p className="status-message">Loading student activity...</p>}
      {error && <p className="admin-error">{error}</p>}

      {section === 'reports' && !loading && !error && reports.length === 0 && (
        <div className="admin-empty">
          <p>No {reportFilter === 'all' ? '' : reportFilter} reports right now.</p>
        </div>
      )}

      {section === 'media' && !loading && !error && media.length === 0 && (
        <div className="admin-empty">
          <p>No student uploads yet.</p>
        </div>
      )}

      {section === 'reports' && (
        <div className="admin-suggestion-list">
          {reports.map((report) => (
            <article key={`${report.spotId}-${report.reportId}`} className="admin-suggestion-card">
              <div className="admin-suggestion-header">
                <div>
                  <h2>{report.spotName}</h2>
                  <p className="admin-suggestion-meta">
                    {ISSUE_LABELS[report.issueType] || report.issueType}
                    {report.email ? ` • ${report.email}` : ''}
                  </p>
                </div>
                <span className={`admin-status-badge ${report.status === 'open' ? 'pending' : 'approved'}`}>
                  {report.status}
                </span>
              </div>

              <div className="admin-suggestion-body">
                <p>{report.details}</p>
                <p className="admin-timestamps">Submitted {formatDate(report.createdAt)}</p>
              </div>

              <div className="admin-suggestion-actions">
                {report.status === 'open' ? (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => handleMarkReviewed(report)}
                  >
                    Mark reviewed
                  </button>
                ) : (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => handleReopenReport(report)}
                  >
                    Reopen
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {section === 'media' && (
        <div className="admin-media-grid">
          {media.map((item) => (
            <article key={`${item.spotId}-${item.mediaId}`} className="admin-media-card">
              <img src={item.dataUrl} alt={item.caption || `${item.spotName} upload`} loading="lazy" />
              <div className="admin-media-card-body">
                <h3>{item.spotName}</h3>
                <p className="admin-suggestion-meta">
                  {item.kind}
                  {item.filename ? ` • ${item.filename}` : ''}
                </p>
                {item.caption && <p>{item.caption}</p>}
                <p className="admin-timestamps">Uploaded {formatDate(item.uploadedAt)}</p>
                <button
                  type="button"
                  className="secondary-button danger"
                  onClick={() => handleRemoveMedia(item)}
                >
                  Remove upload
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminStudentActivity
