import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Star, MessageSquare, CheckCircle, Quote } from 'lucide-react';

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Parent (Grade 8 Student)',
      feedback_text: 'Apex Academy has transformed my daughter\'s confidence! The teachers are genuinely committed to nurturing each child\'s individual strengths.',
      rating: 5,
      created_at: '2026-08-14'
    },
    {
      id: 2,
      name: 'Michael Chang',
      role: 'Parent (Grade 11 STEM Student)',
      feedback_text: 'The STEM program and robotics club are top tier. My son won first place in the regional science fair thanks to faculty mentorship.',
      rating: 5,
      created_at: '2026-08-20'
    },
    {
      id: 3,
      name: 'David Ross',
      role: 'Alumni (Class of 2021)',
      feedback_text: 'The rigorous academic preparation and leadership skills I acquired at Apex were key to my success at Stanford University.',
      rating: 5,
      created_at: '2026-09-01'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Parent',
    feedback_text: '',
    rating: 5
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    apiService.getFeedback()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const approved = data.filter(item => item.is_approved);
          if (approved.length > 0) setFeedbacks(approved);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.submitFeedback(formData);
    } catch (err) {
      // Demo fallback
    }
    const newFeedback = {
      id: Date.now(),
      name: formData.name,
      role: formData.role,
      feedback_text: formData.feedback_text,
      rating: formData.rating,
      created_at: 'Just now'
    };
    setFeedbacks([newFeedback, ...feedbacks]);
    setSubmitted(true);
    setFormData({ name: '', email: '', role: 'Parent', feedback_text: '', rating: 5 });
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Community Voice</span>
          <h2 className="section-title">Student & Parent Feedback</h2>
          <p className="section-subtitle">
            Read what our parents, students, and alumni have to say about their journey at Apex International Academy.
          </p>
        </div>

        {/* Feedback Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {feedbacks.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="card-hover"
              style={{
                background: 'var(--surface-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <Quote size={40} style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.1, color: 'var(--primary-700)' }} />

              <div>
                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < item.rating ? '#f59e0b' : 'none'}
                      color={i < item.rating ? '#f59e0b' : '#cbd5e1'}
                    />
                  ))}
                </div>
                <p style={{ color: 'var(--primary-900)', fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  "{item.feedback_text}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--primary-900)', fontSize: '1rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Feedback Box */}
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, var(--primary-900), #1e3a8a)',
          color: 'white',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h3 style={{ fontSize: '1.6rem', color: 'white', marginBottom: '0.5rem', textAlign: 'center' }}>
            Share Your School Experience
          </h3>
          <p style={{ color: '#cbd5e1', textAlign: 'center', fontSize: '0.92rem', marginBottom: '2rem' }}>
            Your feedback helps us continuously elevate our academic programs and campus facilities.
          </p>

          {submitted && (
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid #10b981',
              color: '#6ee7b7',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <CheckCircle size={22} />
              <span>Thank you for your review! Your feedback has been submitted to the administration.</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="responsive-form-row" style={{ marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.3rem', display: 'block' }}>Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.3rem', display: 'block' }}>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="responsive-form-row" style={{ marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.3rem', display: 'block' }}>Your Role</label>
                <select
                  className="form-control"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="Parent">Parent</option>
                  <option value="Student">Student</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Visitor">Visitor</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.3rem', display: 'block' }}>Rating</label>
                <select
                  className="form-control"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars (Good)</option>
                  <option value={3}>⭐⭐⭐ 3 Stars (Average)</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.3rem', display: 'block' }}>Your Feedback</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Write your honest thoughts about Apex Academy..."
                value={formData.feedback_text}
                onChange={(e) => setFormData({ ...formData, feedback_text: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
              <MessageSquare size={18} /> Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
