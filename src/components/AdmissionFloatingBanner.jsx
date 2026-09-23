import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, X, Flame, Eye, CheckCircle2, Award, Phone } from 'lucide-react';

export default function AdmissionFloatingBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show inside admin panel
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Trigger occasional pulse & shake animation to draw attention
  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1200);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic document title switcher without any outdated year references
  useEffect(() => {
    if (isAdminRoute) return;
    let index = 0;
    const titles = [
      '🎓 Admissions Open | Jeeva Matric Higher Secondary School',
      '🌟 Apply Now - Pre-KG to Grade 12 | Quality Holistic Education',
      'Jeeva Matric Higher Secondary School, Melpakkam Yard, Arakkonam'
    ];
    const titleInterval = setInterval(() => {
      document.title = titles[index % titles.length];
      index += 1;
    }, 4000);

    return () => clearInterval(titleInterval);
  }, [isAdminRoute]);

  if (isAdminRoute || !isVisible) return null;

  const handleGoToAdmissions = () => {
    setIsExpanded(false);
    navigate('/admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @keyframes miniBannerShake {
          0% { transform: translateY(0) scale(1) rotate(0deg); }
          15% { transform: translateY(-5px) scale(1.04) rotate(-3deg); }
          30% { transform: translateY(-5px) scale(1.04) rotate(3deg); }
          45% { transform: translateY(-3px) scale(1.02) rotate(-2deg); }
          60% { transform: translateY(-3px) scale(1.02) rotate(2deg); }
          75% { transform: translateY(0) scale(1.01) rotate(0deg); }
          100% { transform: translateY(0) scale(1) rotate(0deg); }
        }

        @keyframes badgeGlowPulse {
          0% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.7), 0 10px 25px rgba(0,0,0,0.4); }
          70% { box-shadow: 0 0 0 14px rgba(217, 119, 6, 0), 0 10px 25px rgba(0,0,0,0.4); }
          100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0), 0 10px 25px rgba(0,0,0,0.4); }
        }

        @keyframes bannerCoverSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .admission-mini-floating-trigger {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9990;
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%);
          border: 2px solid #f59e0b;
          border-radius: 18px;
          padding: 10px 14px;
          cursor: pointer;
          color: white;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.45);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          max-width: 320px;
          animation: badgeGlowPulse 2.5s infinite;
        }

        .admission-mini-floating-trigger.shake {
          animation: miniBannerShake 0.9s ease-in-out, badgeGlowPulse 2.5s infinite;
        }

        .admission-mini-floating-trigger:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 18px 40px rgba(217, 119, 6, 0.55);
          border-color: #fbbf24;
        }

        /* Expanded Cover Card */
        .admission-cover-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(6px);
          z-index: 9998;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 24px;
          animation: fadeIn 0.25s ease-out;
        }

        .admission-cover-modal {
          background: linear-gradient(145deg, #0f172a, #1e293b);
          border: 2px solid #fbbf24;
          border-radius: 24px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(245, 158, 11, 0.3);
          width: 100%;
          max-width: 440px;
          overflow: hidden;
          animation: bannerCoverSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          color: #ffffff;
          position: relative;
        }

        @media (max-width: 640px) {
          .admission-mini-floating-trigger {
            bottom: 16px;
            right: 16px;
            left: 16px;
            max-width: calc(100% - 32px);
            padding: 8px 12px;
          }

          .admission-cover-backdrop {
            padding: 12px;
            align-items: center;
            justify-content: center;
          }

          .admission-cover-modal {
            max-width: 100%;
          }
        }
      `}</style>

      {/* Floating Mini Trigger Banner */}
      {!isExpanded && (
        <div
          className={`admission-mini-floating-trigger ${isShaking ? 'shake' : ''}`}
          onClick={() => setIsExpanded(true)}
          onMouseEnter={() => setIsExpanded(true)}
          role="button"
          tabIndex={0}
          aria-label="Admissions Open - Tap to view poster and details"
        >
          {/* Poster Thumbnail */}
          <div style={{
            position: 'relative',
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            overflow: 'hidden',
            flexShrink: 0,
            border: '2px solid #fbbf24',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            background: '#ffffff'
          }}>
            <img
              src="/images/admission_poster_main.jpg"
              alt="Admission Poster"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = '/images/logo.png';
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to right, #d97706, #b45309)',
              color: 'white',
              fontSize: '8px',
              fontWeight: 800,
              textAlign: 'center',
              padding: '1px 0',
              letterSpacing: '0.03em'
            }}>
              OPEN
            </div>
          </div>

          {/* Banner Text */}
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 800,
              color: '#fbbf24',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              <Flame size={13} style={{ color: '#f59e0b' }} /> ADMISSIONS OPEN
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.2,
              marginTop: '2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Pre-KG to Grade 12
            </div>
            <div style={{
              fontSize: '11px',
              color: '#93c5fd',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              marginTop: '2px',
              fontWeight: 600
            }}>
              <Eye size={12} />
              <span>Hover/Tap for Poster</span>
            </div>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              color: '#94a3b8',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              padding: 0
            }}
            title="Dismiss banner"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Expanded Full-Cover Attention Banner Modal */}
      {isExpanded && (
        <div
          className="admission-cover-backdrop"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="admission-cover-modal"
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={() => setIsExpanded(false)}
          >
            {/* Header with Close */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.85rem 1.25rem',
              background: 'linear-gradient(90deg, #1e3a8a, #0f172a)',
              borderBottom: '1px solid rgba(251, 191, 36, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={16} style={{ color: '#fbbf24' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Admissions Open
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                title="Close poster view"
              >
                <X size={16} />
              </button>
            </div>

            {/* Poster Main Body */}
            <div style={{ padding: '1rem', maxHeight: '75vh', overflowY: 'auto' }}>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.15)',
                marginBottom: '1rem'
              }}>
                <img
                  src="/images/admission_poster_main.jpg"
                  alt="Jeeva Matric Hr Sec School Admission Poster"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              {/* Highlights */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.8rem',
                color: '#e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '0.45rem 0.65rem', borderRadius: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Pre-KG to Std 12</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '0.45rem 0.65rem', borderRadius: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Smart Classrooms</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '0.45rem 0.65rem', borderRadius: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Science & STEM Labs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '0.45rem 0.65rem', borderRadius: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>Safe Transport</span>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
                <button
                  onClick={handleGoToAdmissions}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #d97706, #b45309)',
                    border: 'none',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 20px rgba(217, 119, 6, 0.4)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <span>Apply for Admission Online</span>
                  <ArrowRight size={18} />
                </button>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: '#94a3b8',
                  marginTop: '0.2rem'
                }}>
                  <Phone size={13} style={{ color: '#f59e0b' }} />
                  <span>Enquiries: <strong>044-1234567 / 9876543210</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
