import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/requests').then(res => { setRequests(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Maintenance Requests</h2>
        <Link to="/requests/new" className="new-request-btn">+ New Request</Link>
      </div>
      <div className="requests-grid">
        {requests.map(r => (
          <Link key={r._id} to={`/requests/${r._id}`} className="request-card">
            <div className="request-card-header">
              <h3>{r.title}</h3>
              <span className={`request-status status-${r.status.toLowerCase().replace(' ', '-')}`}>
                {r.status}
              </span>
            </div>
            <div className="request-card-body">
              <p>{r.description}</p>
              <div className="request-meta">
                Category: {r.category} | Priority: {r.priority}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
