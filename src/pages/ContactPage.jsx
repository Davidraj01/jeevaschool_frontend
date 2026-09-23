import React from 'react';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  return (
    <main>
      <div style={{ background: 'linear-gradient(135deg, var(--primary-900), var(--primary-700))', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '0.8rem' }}>Contact School Administration</h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '650px', margin: '0 auto' }}>
            We look forward to connecting with parents, students, and campus visitors.
          </p>
        </div>
      </div>
      <ContactSection />
    </main>
  );
}
