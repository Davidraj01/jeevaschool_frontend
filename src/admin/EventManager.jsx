import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Plus, Trash2, Calendar, MapPin, Clock } from 'lucide-react';

export default function EventManager() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Annual Science & Tech Expo 2026',
      event_date: '2026-10-15',
      time: '09:00 AM - 04:00 PM',
      location: 'Main Exhibition Hall',
      description: 'Over 100 student projects in robotics, AI, renewable energy.',
      status: 'UPCOMING'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    event_date: '2026-10-15',
    time: '09:00 AM - 02:00 PM',
    location: 'Main School Auditorium',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    status: 'UPCOMING'
  });

  useEffect(() => {
    apiService.getEvents()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setEvents(data);
      })
      .catch(() => {});
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete event from calendar?')) return;
    try { await apiService.deleteEvent(id); } catch(e){}
    setEvents(events.filter(e => e.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newE = { id: Date.now(), ...formData };
    try { await apiService.createEvent(formData); } catch(e){}
    setEvents([...events, newE]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-900)' }}>Events Calendar Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Schedule school sports days, science fairs, parent-teacher meetings, and announcements.
          </p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-gold">
          <Plus size={18} /> Schedule New Event
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--primary-900)' }}>{e.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{e.description}</div>
                </td>
                <td>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>📅 {e.event_date}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⏰ {e.time}</div>
                </td>
                <td>📍 {e.location}</td>
                <td><span className="badge badge-published">{e.status}</span></td>
                <td>
                  <button onClick={() => handleDelete(e.id)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.35rem 0.6rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem' }}>
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-900)', marginBottom: '1.25rem' }}>Schedule New Event</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Event Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Annual Sports Meet 2026"
                  value={formData.title}
                  onChange={(ev) => setFormData({ ...formData, title: ev.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Event Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.event_date}
                    onChange={(ev) => setFormData({ ...formData, event_date: ev.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Event Time</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.time}
                    onChange={(ev) => setFormData({ ...formData, time: ev.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Campus Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.location}
                  onChange={(ev) => setFormData({ ...formData, location: ev.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Event Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={formData.description}
                  onChange={(ev) => setFormData({ ...formData, description: ev.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-gold">Publish Event</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
