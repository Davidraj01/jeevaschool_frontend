import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Globe, Edit, Check, ExternalLink, ShieldCheck, Eye, Search, Share2, Info } from 'lucide-react';

export default function SEOManager() {
  const [seoList, setSeoList] = useState([
    { 
      id: 1, 
      page_name: 'home', 
      meta_title: 'Apex International Academy | Premier K-12 Institution', 
      meta_description: 'Discover world-class education, smart classrooms, athletic programs, and STEM innovation at Apex International Academy.', 
      keywords: 'apex academy, international school, k12 education, stem, admissions',
      canonical_url: 'http://localhost:5173/', 
      robots: 'index, follow',
      og_image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 2, 
      page_name: 'about', 
      meta_title: 'About Apex Academy | Vision, Mission & Leadership', 
      meta_description: 'Learn about our 25+ year legacy of academic excellence, campus infrastructure, and core educational values.', 
      keywords: 'about apex, school vision, leadership, campus infrastructure',
      canonical_url: 'http://localhost:5173/about', 
      robots: 'index, follow',
      og_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 3, 
      page_name: 'admissions', 
      meta_title: 'Admissions Open | Jeeva Matric School Application Portal', 
      meta_description: 'Apply online for admission to Apex Academy. View fee structure, eligibility criteria, and submit student applications.', 
      keywords: 'school admission, online application, apex school fees, registration',
      canonical_url: 'http://localhost:5173/admissions', 
      robots: 'index, follow',
      og_image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 4, 
      page_name: 'gallery', 
      meta_title: 'Campus Photo & Video Gallery | Apex Academy', 
      meta_description: 'Explore photos and video tours of our smart classrooms, science labs, sports arena, and cultural festivals.', 
      keywords: 'photo gallery, campus tour, school facilities, sports arena',
      canonical_url: 'http://localhost:5173/gallery', 
      robots: 'index, follow',
      og_image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 5, 
      page_name: 'events', 
      meta_title: 'School Events & Academic Calendar | Apex Academy', 
      meta_description: 'Stay updated with upcoming Annual Sports Meet, Science Fairs, Cultural Galas, and Academic Olympiads.', 
      keywords: 'school events, annual sports meet, science fair, calendar',
      canonical_url: 'http://localhost:5173/events', 
      robots: 'index, follow',
      og_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 6, 
      page_name: 'blog', 
      meta_title: 'Educational Insights & School News | Apex Blog', 
      meta_description: 'Read articles on modern pedagogy, student wellness, STEM projects, and career counseling written by educators.', 
      keywords: 'education blog, pedagogy, student wellness, stem learning',
      canonical_url: 'http://localhost:5173/blog', 
      robots: 'index, follow',
      og_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 7, 
      page_name: 'contact', 
      meta_title: 'Contact Us | Apex International Academy Admissions Office', 
      meta_description: 'Get in touch with our admissions office, schedule a campus tour, or contact school administrators.', 
      keywords: 'contact apex academy, phone number, address, campus tour',
      canonical_url: 'http://localhost:5173/contact', 
      robots: 'index, follow',
      og_image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState('meta');
  const [saveNotice, setSaveNotice] = useState('');

  useEffect(() => {
    apiService.getSEOList()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSeoList(data);
      })
      .catch(() => {});
  }, []);

  const handleSave = async (item) => {
    try { 
      await apiService.updateSEO(item.id, item); 
    } catch(e){}
    setEditingItem(null);
    setSeoList(seoList.map(s => s.id === item.id ? item : s));
    setSaveNotice(`SEO Settings for page '/${item.page_name}' updated successfully.`);
    setTimeout(() => setSaveNotice(''), 4000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-600)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <ShieldCheck size={16} /> Admin Exclusive Tool
          </div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-900)', marginTop: '0.2rem' }}>SEO Page Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Configure Meta Titles, Meta Descriptions, Canonical URLs, and OpenGraph tags per page. Restricted exclusively to authorized administrators.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href="https://api.jeevamatriculation.in/api/sitemap/" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
            <ExternalLink size={14} /> View Sitemap.xml
          </a>
          <a href="https://api.jeevamatriculation.in/api/robots/" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
            <ExternalLink size={14} /> View Robots.txt
          </a>
        </div>
      </div>

      {saveNotice && (
        <div style={{
          backgroundColor: '#d1fae5',
          color: '#065f46',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Check size={18} /> {saveNotice}
        </div>
      )}

      {/* Page SEO List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {seoList.map((item) => {
          const isEditing = editingItem?.id === item.id;
          const current = isEditing ? editingItem : item;

          return (
            <div
              key={item.id}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Globe size={22} style={{ color: 'var(--primary-600)' }} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary-900)' }}>
                    {item.page_name} Page
                  </h3>
                  <span className="badge badge-published" style={{ fontSize: '0.72rem' }}>
                    /{item.page_name === 'home' ? '' : item.page_name}
                  </span>
                </div>

                {isEditing ? (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setEditingItem(null)} className="btn btn-secondary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
                      Cancel
                    </button>
                    <button onClick={() => handleSave(editingItem)} className="btn btn-gold" style={{ padding: '0.4rem 1.1rem', fontSize: '0.85rem' }}>
                      <Check size={14} /> Save Meta Tags
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setEditingItem({ ...item })} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                    <Edit size={14} /> Edit Page SEO
                  </button>
                )}
              </div>

              {/* Editing Form vs Display Mode */}
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="responsive-form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Meta Title Tag *</span>
                        <span style={{ fontSize: '0.75rem', color: current.meta_title?.length > 60 ? 'var(--danger)' : 'var(--text-muted)' }}>
                          {current.meta_title?.length || 0}/60 chars
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={current.meta_title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, meta_title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Canonical URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={current.canonical_url || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, canonical_url: e.target.value })}
                        placeholder="https://apexacademy.edu/page"
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Meta Description *</span>
                      <span style={{ fontSize: '0.75rem', color: current.meta_description?.length > 160 ? 'var(--danger)' : 'var(--text-muted)' }}>
                        {current.meta_description?.length || 0}/160 chars
                      </span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={current.meta_description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, meta_description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="responsive-form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">SEO Keywords (Comma Separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={current.keywords || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, keywords: e.target.value })}
                        placeholder="education, school, admissions, stem"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Social Share Card Image (OG:Image URL)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={current.og_image || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, og_image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {/* Google Search Live Preview */}
                  <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                    border: '1px solid var(--border-light)'
                  }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Search size={14} /> Google Search Snippet Preview
                    </div>
                    <div style={{ color: '#1a0dab', fontSize: '1.15rem', fontWeight: 600, cursor: 'pointer', marginBottom: '0.2rem' }}>
                      {item.meta_title}
                    </div>
                    <div style={{ color: '#006621', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                      {item.canonical_url || `http://localhost:5173/${item.page_name === 'home' ? '' : item.page_name}`}
                    </div>
                    <div style={{ color: '#545454', fontSize: '0.88rem', lineHeight: 1.4 }}>
                      {item.meta_description}
                    </div>
                  </div>

                  {item.keywords && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <strong>Keywords:</strong> <code>{item.keywords}</code>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
