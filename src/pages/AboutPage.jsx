import React from 'react';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import FeedbackSection from '../components/FeedbackSection';

export default function AboutPage() {
  return (
    <main>
      <div style={{ background: 'linear-gradient(135deg, var(--primary-900), var(--primary-700))', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '0.8rem' }}>About Our Institution</h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '650px', margin: '0 auto' }}>
            Empowering students through quality education, creativity, discipline, and STEM innovation since 1998.
          </p>
        </div>
      </div>
      <AboutSection />
      <FeaturesSection />
      <FeedbackSection />
    </main>
  );
}
