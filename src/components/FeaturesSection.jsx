import React from 'react';
import {
  Users, Monitor, BookOpen, Cpu, Trophy,
  Bus, FlaskConical, Palette
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Users size={32} />,
      title: 'Experienced Teachers',
      desc: 'Certified educators with advanced master degrees and a passion for personalized student mentorship.',
      color: '#3b82f6',
      bg: '#eff6ff',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: <Monitor size={32} />,
      title: 'Smart Classrooms',
      desc: 'Interactive 4K touch displays, ergonomic seating, and high-speed campus fiber Wi-Fi.',
      color: '#d97706',
      bg: '#fffbeb',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: <BookOpen size={32} />,
      title: 'Central Library',
      desc: '25,000+ print volumes, digital journal access, study pods, and quiet research rooms.',
      color: '#059669',
      bg: '#ecfdf5',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: <Cpu size={32} />,
      title: 'Computer & AI Lab',
      desc: 'Modern workstations equipped with Python, CAD software, and robotics hardware kits.',
      color: '#8b5cf6',
      bg: '#f5f3ff',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: <Trophy size={32} />,
      title: 'Sports & Athletics',
      desc: 'Olympic-size indoor pool, basketball courts, soccer field, and dedicated fitness coaches.',
      color: '#ef4444',
      bg: '#fef2f2',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: <Bus size={32} />,
      title: 'Safe Transportation',
      desc: 'GPS-tracked AC school buses with trained drivers and real-time parent app tracking.',
      color: '#0284c7',
      bg: '#f0f9ff',
      image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: <FlaskConical size={32} />,
      title: 'Advanced Science Labs',
      desc: 'Dedicated Physics, Chemistry, and Biology research labs built with safety standards.',
      color: '#10b981',
      bg: '#ecfdf5',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: <Palette size={32} />,
      title: 'Cultural Activities',
      desc: 'Drama theater, music conservatory, dance studio, and annual arts exhibitions.',
      color: '#f43f5e',
      bg: '#fff1f2',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80'
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--surface-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">World-Class Infrastructure</span>
          <h2 className="section-title">Key Campus Features</h2>
          <p className="section-subtitle">
            Providing modern facilities to ensure students thrive academically, physically, and creatively.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((item, idx) => (
            <div
              key={idx}
              className="card-hover"
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: item.bg,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  {item.icon}
                </div>
              </div>

              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-900)', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
