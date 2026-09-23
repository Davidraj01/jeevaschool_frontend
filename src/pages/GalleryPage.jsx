import React from 'react';
import GallerySection from '../components/GallerySection';
import VideoSection from '../components/VideoSection';

export default function GalleryPage() {
  return (
    <main>
      <div style={{ background: 'linear-gradient(135deg, var(--primary-900), var(--primary-700))', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '0.8rem' }}>Campus Photo & Video Gallery</h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '650px', margin: '0 auto' }}>
            Visual highlights of campus life, student achievements, classroom learning, sports, and celebrations.
          </p>
        </div>
      </div>
      <GallerySection />
      <VideoSection />
    </main>
  );
}
