import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { MapPin, Clock, ArrowRight, X } from 'lucide-react';

export default function EventSection() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const defaultEvents = [
    {
      id: 1,
      title: 'Annual Science & Tech Expo 2026',
      event_date: '2026-10-15',
      time: '09:00 AM - 04:00 PM',
      location: 'Main Exhibition Hall',
      description: 'Over 100 student projects in robotics, AI, renewable energy, and environmental science. Open to all parents and community guests.',
      image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      status: 'UPCOMING'
    },
    {
      id: 2,
      title: 'Parents-Teacher Conference (Q3 Review)',
      event_date: '2026-11-05',
      time: '10:00 AM - 03:00 PM',
      location: 'Academic Wing Block A',
      description: 'One-on-one academic progress review meetings between parents, class teachers, and subject coordinators.',
      image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      status: 'UPCOMING'
    },
    {
      id: 3,
      title: 'Apex Inter-School Debate Championship',
      event_date: '2026-11-20',
      time: '08:30 AM - 05:00 PM',
      location: 'Grand School Auditorium',
      description: 'High school debating teams discuss global economic policies and ethical AI regulation.',
      image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      status: 'UPCOMING'
    }
  ];

  const [events, setEvents] = useState(defaultEvents);

  useEffect(() => {
    apiService.getEvents()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setEvents(data);
      })
      .catch(() => {});
  }, []);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--surface-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Calendar & Announcements</span>
          <h2 className="section-title">Upcoming School Events</h2>
          <p className="section-subtitle">
            Stay informed about key dates, academic conferences, sports tournaments, and cultural celebrations.
          </p>
        </div>

        {/* Events Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '2rem'
        }}>
          {events.map((item) => (
            <div
              key={item.id}
              className="card-hover"
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '190px' }}>
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Date Badge */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  backgroundColor: 'var(--primary-900)',
                  color: 'white',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.4rem 0.8rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-gold-light)', fontWeight: 700 }}>
                    {new Date(item.event_date).toLocaleString('default', { month: 'short' })}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>
                    {new Date(item.event_date).getDate()}
                  </div>
                </div>
              </div>

              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.6rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {item.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {item.location}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-900)', marginBottom: '0.6rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedEvent(item)}
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '0.5rem 1rem', fontSize: '0.88rem' }}
                >
                  Event Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge badge-published">Upcoming Event</span>
                <button onClick={() => setSelectedEvent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <img src={selectedEvent.image_url} alt={selectedEvent.title} style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1.2rem' }} />
              <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-900)', marginBottom: '0.8rem' }}>{selectedEvent.title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                <div>📅 <strong>Date:</strong> {formatDate(selectedEvent.event_date)}</div>
                <div>⏰ <strong>Time:</strong> {selectedEvent.time}</div>
                <div>📍 <strong>Location:</strong> {selectedEvent.location}</div>
              </div>
              <p style={{ lineHeight: 1.7, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>{selectedEvent.description}</p>
              <button onClick={() => setSelectedEvent(null)} className="btn btn-primary" style={{ width: '100%' }}>Close Window</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
