import React from 'react';
import EventSection from '../components/EventSection';

export default function EventsPage() {
  return (
    <main>
      <div style={{ background: 'linear-gradient(135deg, var(--primary-900), var(--primary-700))', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '0.8rem' }}>Events & Calendar</h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '650px', margin: '0 auto' }}>
            Mark your calendar for upcoming science expos, sports meets, parent conferences, and cultural nights.
          </p>
        </div>
      </div>
      <EventSection />
    </main>
  );
}
