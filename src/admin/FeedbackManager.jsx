import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Check, X, Trash2, Star } from 'lucide-react';

export default function FeedbackManager() {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: 'Sarah Jenkins',
      email: 'sarah.j@gmail.com',
      role: 'Parent',
      feedback_text: 'Apex Academy has transformed my daughter\'s confidence! The teachers are genuinely committed.',
      rating: 5,
      is_approved: true,
      created_at: '2026-08-14'
    },
    {
      id: 2,
      name: 'Michael Chang',
      email: 'mchang@techcorp.io',
      role: 'Parent',
      feedback_text: 'The STEM program and robotics club are top tier.',
      rating: 5,
      is_approved: true,
      created_at: '2026-08-20'
    }
  ]);

  useEffect(() => {
    apiService.getFeedback()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setFeedbacks(data);
      })
      .catch(() => {});
  }, []);

  const handleToggleApproval = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    try { await apiService.toggleFeedbackApproval(id, newStatus); } catch(e){}
    setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, is_approved: newStatus } : f));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete feedback review permanently?')) return;
    try { await apiService.deleteFeedback(id); } catch(e){}
    setFeedbacks(feedbacks.filter(f => f.id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-900)' }}>Feedback & Reviews Moderation</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Review submitted feedback from students, parents, and visitors before rendering on live website.
        </p>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Author</th>
              <th>Rating</th>
              <th>Feedback Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f.id}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--primary-900)' }}>{f.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{f.role} ({f.email})</div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                    {[...Array(f.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" />
                    ))}
                  </div>
                </td>
                <td style={{ maxWidth: '350px' }}>"{f.feedback_text}"</td>
                <td>
                  <span className={`badge ${f.is_approved ? 'badge-approved' : 'badge-pending'}`}>
                    {f.is_approved ? 'Approved (Visible)' : 'Hidden / Pending'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleToggleApproval(f.id, f.is_approved)}
                      style={{
                        background: f.is_approved ? '#fef3c7' : '#d1fae5',
                        color: f.is_approved ? '#92400e' : '#065f46',
                        border: 'none',
                        padding: '0.35rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}
                    >
                      {f.is_approved ? 'Hide' : 'Approve'}
                    </button>
                    <button onClick={() => handleDelete(f.id)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.35rem 0.6rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
