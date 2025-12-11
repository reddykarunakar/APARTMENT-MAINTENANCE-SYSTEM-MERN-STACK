import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';

export default function RequestDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => { API.get(`/requests/${id}`).then(r => setRequest(r.data)); }, [id]);
  if (!request) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="details-container">
      <div className="details-card card">
        <div className="details-header">
          <h2>{request.title}</h2>
          <span className={`request-status status-${request.status.toLowerCase().replace(' ', '-')}`}>
            {request.status}
          </span>
        </div>
        <div className="details-meta">
          <div className="meta-item">
            <strong>Category:</strong> {request.category}
          </div>
          <div className="meta-item">
            <strong>Priority:</strong> {request.priority}
          </div>
          <div className="meta-item">
            <strong>Submitted:</strong> {new Date(request.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="details-description">
          <h3>Description</h3>
          <p>{request.description}</p>
        </div>
        {request.photos && request.photos.length > 0 && (
          <div className="details-photos">
            <h3>Photos</h3>
            <div className="photos-grid">
              {request.photos.map(p => (
                <img key={p} src={(process.env.REACT_APP_API_URL || 'http://localhost:5000').replace('/api','') + p} alt="Request photo" />
              ))}
            </div>
          </div>
        )}
        {request.comments && request.comments.length > 0 && (
          <div className="details-comments">
            <h3>Comments</h3>
            <div className="comments-list">
              {request.comments.map(c => (
                <div key={c._id} className="comment-item">
                  <div className="comment-header">
                    <strong>{c.author?.name}</strong>
                    <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{c.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
