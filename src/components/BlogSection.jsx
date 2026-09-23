import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { User, Calendar, ArrowRight } from 'lucide-react';

export default function BlogSection() {
  const defaultBlogs = [
    {
      id: 1,
      title: 'Integrating AI & Robotics in High School STEM Curriculum',
      slug: 'academics-stem',
      category_name: 'Academics & STEM',
      description: 'How hands-on robotics labs and machine learning modules prepare students for modern technology careers.',
      image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      tags: 'STEM, Robotics, AI',
      author: 'Dr. Marcus Vance',
      published_date: '2026-08-15'
    },
    {
      id: 2,
      title: 'The Importance of Fine Arts and Music in Child Cognitive Growth',
      slug: 'fine-arts-growth',
      category_name: 'Campus Life',
      description: 'Exploring how creative expression in drama, painting, and orchestral music enhances academic focus.',
      image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      tags: 'Fine Arts, Music, Creativity',
      author: 'Elena Rostova',
      published_date: '2026-08-28'
    },
    {
      id: 3,
      title: 'Annual Inter-School Sports Championship 2026 Highlights',
      slug: 'sports-championship-2026',
      category_name: 'Sports & Wellness',
      description: 'Celebrating victory, sportsmanship, and teamwork across track & field, basketball, and swimming events.',
      image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      tags: 'Sports, Athletics',
      author: 'Coach Miller',
      published_date: '2026-09-02'
    }
  ];

  const [blogs, setBlogs] = useState(defaultBlogs);

  useEffect(() => {
    apiService.getBlogs()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setBlogs(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section-padding" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">News & Insights</span>
          <h2 className="section-title">Latest School Articles</h2>
          <p className="section-subtitle">
            Educational thoughts, student achievements, faculty research, and campus news.
          </p>
        </div>

        {/* Blog Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '2rem'
        }}>
          {blogs.slice(0, 3).map((article) => (
            <div
              key={article.id}
              
              className="card-hover"
              style={{
                background: 'var(--surface-subtle)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={article.image_url}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge badge-published" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  {article.category_name || 'Education'}
                </span>
              </div>

              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.6rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><User size={13} /> {article.author}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={13} /> {article.published_date}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-900)', marginBottom: '0.6rem', lineHeight: 1.35 }}>
                    {article.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    {article.description}
                  </p>
                </div>

                <Link
                  to={`/blog/${article.id}`}
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '0.5rem 1rem', fontSize: '0.88rem' }}
                >
                  Read Full Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
