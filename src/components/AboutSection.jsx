import React from 'react';
import { Target, Compass, Heart, CheckCircle } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Discover Apex Academy</span>
          <h2 className="section-title">About Our School</h2>
          <p className="section-subtitle">
            Dedicated to fostering academic rigor, emotional intelligence, and creative innovation in every learner.
          </p>
        </div>

        {/* 2-Column Overview */}
        <div className="about-overview-grid" style={{ marginBottom: '4rem' }}>
          <div>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Institutional Legacy
            </span>
            <h3 style={{ fontSize: '2.2rem', color: 'var(--primary-900)', marginTop: '0.5rem', marginBottom: '1.2rem', lineHeight: 1.25 }}>
              Nurturing Curious Minds into Ethical Global Leaders
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Founded in 1998, Apex International Academy provides a vibrant learning ecosystem where academic inquiry meets character development. Our holistic curriculum balances core STEM disciplines with fine arts, physical wellness, and social responsibility.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                'Interdisciplinary STEM & Humanities Curriculum',
                'State-of-the-Art Science & Robotics Laboratories',
                'Comprehensive Athletic & Physical Education Programs',
                'Dedicated Student Counseling & Wellness Services'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-900)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                alt="Teacher interacting with students in modern classroom"
                className="responsive-img"
                style={{ height: 'auto', maxHeight: '420px', minHeight: '260px' }}
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* Card 1: Vision */}
          <div className="card-hover" style={{
            background: 'var(--surface-subtle)',
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'var(--primary-50)',
              color: 'var(--primary-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <Target size={28} />
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-900)', marginBottom: '0.8rem' }}>Our Vision</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              To empower every student with critical thinking, ethical leadership, and technological fluency to make meaningful contributions in a complex global society.
            </p>
          </div>

          {/* Card 2: Mission */}
          <div className="card-hover" style={{
            background: 'var(--surface-subtle)',
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'var(--accent-gold-bg)',
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <Compass size={28} />
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-900)', marginBottom: '0.8rem' }}>Our Mission</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Delivering accessible, world-class education through inquiry-based learning, individual mentorship, modern infrastructure, and inclusive school culture.
            </p>
          </div>

          {/* Card 3: Values */}
          <div className="card-hover" style={{
            background: 'var(--surface-subtle)',
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <Heart size={28} />
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-900)', marginBottom: '0.8rem' }}>Core Educational Values</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Integrity, curiosity, empathy, discipline, and collaboration form the foundation of our student code of conduct and learning environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
