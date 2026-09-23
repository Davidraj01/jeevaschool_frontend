import React from 'react';
import BlogSection from '../components/BlogSection';

export default function BlogPage() {
  return (
    <main>
      <div style={{ background: 'linear-gradient(135deg, var(--primary-900), var(--primary-700))', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '0.8rem' }}>Apex Educational Blog</h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '650px', margin: '0 auto' }}>
            Articles on modern pedagogy, STEM robotics, student mental health, and college admissions.
          </p>
        </div>
      </div>
      <BlogSection />
    </main>
  );
}
