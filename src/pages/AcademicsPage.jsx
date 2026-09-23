import React from 'react';
import FeaturesSection from '../components/FeaturesSection';
import { BookOpen, Cpu, Award } from 'lucide-react';

export default function AcademicsPage() {
  return (
    <main>
      <div style={{ background: 'linear-gradient(135deg, var(--primary-900), var(--primary-700))', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '0.8rem' }}>Academic Excellence</h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '650px', margin: '0 auto' }}>
            Comprehensive K-12 curriculum designed for global college readiness, STEM innovation, and creative inquiry.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ color: 'var(--primary-600)', marginBottom: '1rem' }}><BookOpen size={36} /></div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-900)', marginBottom: '0.6rem' }}>Early Years & Primary Wing</h3>
              <p style={{ color: 'var(--text-muted)' }}>Focus on foundational literacy, numeracy, social play, phonics, and curiosity-driven discovery learning.</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}><Cpu size={36} /></div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-900)', marginBottom: '0.6rem' }}>Middle & High School STEM</h3>
              <p style={{ color: 'var(--text-muted)' }}>Advanced Mathematics, Physics, Chemistry, Python Coding, AI/Robotics, and Environmental Engineering.</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ color: '#059669', marginBottom: '1rem' }}><Award size={36} /></div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-900)', marginBottom: '0.6rem' }}>Humanities & Arts Track</h3>
              <p style={{ color: 'var(--text-muted)' }}>World History, Debate, Literature, Economics, Digital Media, Orchestral Music, and Fine Arts.</p>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />
    </main>
  );
}
