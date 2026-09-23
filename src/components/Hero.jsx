import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Users, BookOpen, Trophy } from 'lucide-react';

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '82vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '4.5rem 0 5rem 0',
      overflow: 'hidden',
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.40), rgba(15, 23, 42, 0.52)), url('/images/school_hero_bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          
          {/* Top Subtle Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.15rem',
            borderRadius: '9999px',
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            color: '#fef08a',
            fontWeight: 700,
            fontSize: '0.88rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
          }}>
            <Sparkles size={16} style={{ color: '#fbbf24' }} />
            <span>Excellence in Holistic Education</span>
          </div>

          {/* Clean Prominent Title like reference */}
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2.8rem, 6.5vw, 4.4rem)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '0.6rem',
            letterSpacing: '-0.02em',
            textShadow: '0 3px 18px rgba(0, 0, 0, 0.8), 0 1px 4px rgba(0,0,0,0.9)'
          }}>
            Jeeva
          </h1>

          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.4rem, 3.2vw, 2.2rem)',
            fontWeight: 700,
            color: '#fef3c7',
            marginBottom: '1.25rem',
            letterSpacing: '0.02em',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.85)'
          }}>
            Matric Higher Secondary School
          </div>

          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#ffffff',
            lineHeight: 1.6,
            marginBottom: '2.25rem',
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontWeight: 500,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.85)'
          }}>
            Melpakkam Yard, Arakkonam • Nurturing confident leaders through academic excellence, discipline, and innovation.
          </p>

          {/* Clean Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Link
              to="/admissions"
              className="btn btn-gold"
              style={{
                padding: '0.9rem 2.2rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                borderRadius: '10px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>Apply for Admissions</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              className="btn btn-secondary"
              style={{
                padding: '0.9rem 2rem',
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#0f172a',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
              }}
            >
              About School
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline-light"
              style={{
                padding: '0.9rem 1.8rem',
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Clean Glassmorphic Stats Ribbon at Bottom */}
        <div style={{
          marginTop: '3.5rem',
          background: 'rgba(15, 23, 42, 0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          padding: '1.5rem 1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.45)'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', lineHeight: 1 }}>25+</div>
            <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '0.2rem' }}>Years of Excellence</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#93c5fd', lineHeight: 1 }}>1,450+</div>
            <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '0.2rem' }}>Enrolled Students</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6ee7b7', lineHeight: 1 }}>1:12</div>
            <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '0.2rem' }}>Teacher to Student Ratio</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', lineHeight: 1 }}>35+</div>
            <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '0.2rem' }}>Sports & Labs</div>
          </div>
        </div>
      </div>
    </section>
  );
}
