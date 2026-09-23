import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    apiService.getBlogBySlug(id)
      .then((data) => setBlog(data))
      .catch(() => {
        // Fallback article
        setBlog({
          id: id,
          title: 'Integrating AI & Robotics in High School STEM Curriculum',
          author: 'Dr. Marcus Vance',
          published_date: '2026-08-15',
          category_name: 'Academics & STEM',
          tags: 'STEM, Robotics, AI',
          image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
          content: `Technology is reshaping the future of work at an unprecedented speed. At Apex Academy, our updated STEM curriculum introduces students from Grade 8 onwards to practical robotics engineering, Python coding, and ethical AI concepts. Through collaborative team projects and international hackathons, students build critical problem-solving capabilities.\n\nHands-on learning in our state-of-the-art laboratory enables students to design autonomous systems, write algorithms, and test physical prototypes. We believe that early exposure to artificial intelligence equips learners not just with technical proficiency, but with the ethical frameworks needed to steer tech innovation responsibly.`
        });
      });
  }, [id]);

  if (!blog) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Loading article...</div>;

  return (
    <main style={{ backgroundColor: 'white', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '850px', paddingTop: '3rem' }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-600)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={18} /> Back to Blog List
        </Link>

        <span className="badge badge-published" style={{ marginBottom: '1rem' }}>{blog.category_name || 'Education'}</span>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-900)', marginBottom: '1.2rem', lineHeight: 1.2 }}>
          {blog.title}
        </h1>

        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={16} /> By {blog.author}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> {blog.published_date}</span>
        </div>

        <img
          src={blog.image_url}
          alt={blog.title}
          style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: '2.5rem' }}
        />

        <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--primary-900)', whiteSpace: 'pre-line' }}>
          {blog.content}
        </div>

        {blog.tags && (
          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Tag size={18} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Tags: {blog.tags}</span>
          </div>
        )}
      </div>
    </main>
  );
}
