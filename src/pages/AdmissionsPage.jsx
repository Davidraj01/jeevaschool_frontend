import React, { useRef } from 'react';
import AdmissionForm from '../components/AdmissionForm';
import {
  Sparkles, CheckCircle2, Phone, FileText, Download,
  GraduationCap, BookOpen, ShieldCheck, Bus, Award, ArrowDown,
  Calendar, Check, HelpCircle
} from 'lucide-react';

export default function AdmissionsPage() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ backgroundColor: 'var(--surface-subtle)', minHeight: '100vh' }}>
      {/* 1. HERO HEADER */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a, #1e3a8a, #0369a1)',
        color: 'white',
        padding: '3.5rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(217, 119, 6, 0.15), transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid rgba(251, 191, 36, 0.5)',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#fef08a',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <Sparkles size={16} /> Admissions Open - Enroll Today
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            color: 'white',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}>
            Invest in Your Child's Future at <br />
            <span style={{ color: '#fbbf24' }}>Jeeva Matric Higher Secondary School</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#cbd5e1',
            maxWidth: '750px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            Enrolling Pre-KG, LKG, UKG and Grades I to XII. Empowering young minds through holistic STEM education, disciplined values, smart classrooms, championship sports, and character building.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={scrollToForm}
              className="btn btn-gold"
              style={{
                fontSize: '1.05rem',
                padding: '0.85rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 25px rgba(217, 119, 6, 0.4)'
              }}
            >
              Apply Online Now <ArrowDown size={18} />
            </button>
            <a
              href="tel:7200005950"
              className="btn btn-secondary"
              style={{
                fontSize: '1.05rem',
                padding: '0.85rem 1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Phone size={18} /> Call: 7200005950
            </a>
          </div>
        </div>
      </section>

      {/* 2. ADMISSION OPENING POSTER & HIGHLIGHTS POST */}
      <section className="section-padding">
        <div className="container">
          <div style={{
            background: 'white',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            padding: 'clamp(1.5rem, 4vw, 3rem)'
          }}>
            {/* Poster Presentation Image */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
                border: '4px solid #ffffff'
              }}>
                <img
                  src="/images/admission_poster_main.jpg"
                  alt="Jeeva Matric School Admissions Open Poster"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '12px'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                <a
                  href="/images/admission_poster_main.jpg"
                  download="Jeeva_Matric_Admission_Poster.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.88rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Download size={15} /> Download Poster
                </a>
              </div>
            </div>

            {/* Poster Content & Academic Highlights Post */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--primary-700)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.5rem'
              }}>
                <Award size={16} /> Admission Notice
              </div>

              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)',
                fontWeight: 800,
                color: 'var(--primary-900)',
                lineHeight: 1.2,
                marginBottom: '1rem'
              }}>
                Why Choose Jeeva Matric Higher Secondary School?
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                At Jeeva Matric Higher Secondary School, Arakkonam, we are dedicated to providing a nurturing environment where every child discovers their full potential. Admissions are now open for Pre-KG through Grade XII.
              </p>

              {/* Feature Highlights Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ background: '#eff6ff', color: 'var(--primary-700)', padding: '0.5rem', borderRadius: '8px', flexShrink: 0 }}>
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-900)' }}>Pre-KG to Grade XII</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Matric & State Board excellence</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ background: '#fef3c7', color: 'var(--accent-gold-dark)', padding: '0.5rem', borderRadius: '8px', flexShrink: 0 }}>
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-900)' }}>Smart Classrooms</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Digital interactive boards & audio-visual</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ background: '#ecfdf5', color: '#059669', padding: '0.5rem', borderRadius: '8px', flexShrink: 0 }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-900)' }}>STEM Science Labs</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Equipped Physics, Chemistry & CS labs</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.5rem', borderRadius: '8px', flexShrink: 0 }}>
                    <Bus size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-900)' }}>Safe GPS School Bus</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Arakkonam & nearby surrounding routes</div>
                  </div>
                </div>
              </div>

              {/* Call to action button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={scrollToForm}
                  className="btn btn-gold"
                  style={{ padding: '0.85rem 1.8rem', fontSize: '1rem', fontWeight: 700 }}
                >
                  Apply Online Now →
                </button>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  ⚡ Limited seats available for upcoming batch
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ADMISSION STEP-BY-STEP PROCESS */}
      <section style={{ padding: '2rem 0 4rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-900)' }}>
              Simple 3-Step Admission Process
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              We have made the admissions journey smooth and straightforward for parents and students.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-50)', color: 'var(--primary-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                01
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '0.5rem' }}>
                Submit Online Application
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Fill out the quick online admission form below with student and guardian contact details.
              </p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', color: 'var(--accent-gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                02
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '0.5rem' }}>
                Campus Interaction & Tour
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Visit our campus for an informal interaction, campus facility tour, and meeting with our faculty.
              </p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                03
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '0.5rem' }}>
                Document Verification & Enrollment
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Submit the required certificates (Birth Certificate, TC, Aadhaar) to confirm your seat enrollment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ONLINE ADMISSION FORM */}
      <section ref={formRef} className="section-padding" style={{ background: 'white', borderTop: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '920px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Online Registration
            </span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-900)', fontWeight: 800, marginTop: '0.3rem' }}>
              Student Admission Application Form
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Please enter accurate student and parent details. Our admissions team will review and contact you promptly.
            </p>
          </div>

          <AdmissionForm />
        </div>
      </section>

      {/* 5. HELPLINE BAR */}
      <section style={{ background: 'var(--primary-900)', color: 'white', padding: '2.5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>
            Have Questions About Admissions or Fee Structure?
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
            Our admissions counselors are available Monday to Saturday (8:30 AM to 5:00 PM).
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="tel:7200005950" style={{ color: '#fbbf24', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none' }}>
              📞 7200005950
            </a>
            <a href="tel:7200005951" style={{ color: '#fbbf24', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none' }}>
              📞 7200005951
            </a>
            <span style={{ color: '#94a3b8' }}>|</span>
            <a href="mailto:jmhas2002@gmail.com" style={{ color: '#93c5fd', fontWeight: 600, fontSize: '1.05rem', textDecoration: 'none' }}>
              ✉️ jmhas2002@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
