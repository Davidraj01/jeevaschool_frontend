import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import {
  Plus, Trash2, Video, Play, Upload, Check, Eye,
  Film, Cloud, Sparkles, X, ExternalLink
} from 'lucide-react';

const SAMPLE_VIDEO_PRESETS = [
  {
    title: 'Jeeva Matric Higher Secondary School - Campus & Labs Tour',
    thumbnail_url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Campus Tour',
    description: 'Explore the modern classrooms, physics lab, library, and sports campus at Jeeva Matric.'
  },
  {
    title: 'Annual Sports Day & Athletics Meet Championship',
    thumbnail_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Sports & Athletics',
    description: 'Track events, relay race, karate demonstrations, and championship awards.'
  },
  {
    title: 'Science & Robotics Exhibition Highlights 2026',
    thumbnail_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Academics & STEM',
    description: 'Innovative student projects, working models, and technology exhibitions.'
  }
];

export default function VideoManager() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Jeeva Matric School Official Campus & Smart Classrooms Tour',
      thumbnail_url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      category: 'Campus Tour',
      description: 'Comprehensive walk-through of the school infrastructure and labs.'
    },
    {
      id: 2,
      title: 'Annual Sports Day Championship Highlights',
      thumbnail_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      category: 'Sports & Athletics',
      description: 'Annual sports meet ceremonies, march-past, and prize distribution.'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [notification, setNotification] = useState('');
  const [inputUrl, setInputUrl] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Campus Tour',
    video_url: '',
    thumbnail_url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    description: ''
  });

  useEffect(() => {
    apiService.getVideos()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setVideos(data);
      })
      .catch(() => {});
  }, []);

  const showNotice = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete video "${title}"?`)) return;
    try { await apiService.deleteVideoItem(id); } catch(e){}
    setVideos(videos.filter(v => v.id !== id));
    showNotice(`Video "${title}" deleted.`);
  };

  // Convert regular YouTube link or Google Drive link to embed URL
  const formatVideoUrl = (rawUrl) => {
    if (!rawUrl) return '';
    let url = rawUrl.trim();

    // YouTube watch or short links
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return url;
  };

  const handleUrlChange = (e) => {
    const raw = e.target.value;
    setInputUrl(raw);
    const formatted = formatVideoUrl(raw);
    setFormData(prev => ({
      ...prev,
      video_url: formatted
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.video_url) {
      alert('Please provide video title and video embed URL.');
      return;
    }

    const newV = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      video_url: formatVideoUrl(formData.video_url),
      thumbnail_url: formData.thumbnail_url || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
      description: formData.description || 'School video content'
    };

    try { await apiService.createVideoItem(newV); } catch(e){}
    setVideos([newV, ...videos]);
    setIsModalOpen(false);
    setFormData({ title: '', category: 'Campus Tour', video_url: '', thumbnail_url: '', description: '' });
    setInputUrl('');
    showNotice(`Video "${newV.title}" added successfully!`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-900)', fontWeight: 800 }}>Video Content Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Manage and publish school campus video tours, event recordings, sports day footage, and YouTube embeds.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({ title: '', category: 'Campus Tour', video_url: '', thumbnail_url: '', description: '' });
            setInputUrl('');
            setIsModalOpen(true);
          }}
          className="btn btn-gold"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.3rem' }}
        >
          <Plus size={18} /> Add New Video
        </button>
      </div>

      {notification && (
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
          <Check size={18} /> {notification}
        </div>
      )}

      {/* Videos Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {videos.map((vid) => (
          <div
            key={vid.id}
            style={{
              background: 'white',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              onClick={() => setActiveVideoModal(vid)}
              style={{
                height: '190px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                backgroundColor: '#0f172a'
              }}
            >
              <img
                src={vid.thumbnail_url || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'}
                alt={vid.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(217, 119, 6, 0.6)'
                }}>
                  <Play size={26} style={{ marginLeft: '4px' }} fill="white" />
                </div>
              </div>

              <span style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {vid.category}
              </span>
            </div>

            <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-900)', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.3 }}>
                  {vid.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', margin: 0, lineHeight: 1.4 }}>
                  {vid.description || 'Official school video showcase.'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                <button
                  onClick={() => setActiveVideoModal(vid)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                >
                  <Play size={13} /> Play Video
                </button>

                <button
                  onClick={() => handleDelete(vid.id, vid.title)}
                  style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Video Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '620px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-900)', fontWeight: 800, margin: 0 }}>Add Video Content</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Paste YouTube URL, Vimeo, Google Drive video link, or MP4 stream.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>

            {/* Quick Presets */}
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} /> Quick Templates:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {SAMPLE_VIDEO_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFormData({
                        title: p.title,
                        category: p.category,
                        video_url: p.video_url,
                        thumbnail_url: p.thumbnail_url,
                        description: p.description
                      });
                      setInputUrl(p.video_url);
                      showNotice(`Loaded preset: "${p.title}"`);
                    }}
                    style={{
                      background: 'white',
                      border: '1px solid var(--border-light)',
                      borderRadius: '6px',
                      padding: '0.3rem 0.6rem',
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: 'var(--primary-800)'
                    }}
                  >
                    {p.category}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Video Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Annual Sports Meet 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="responsive-form-row">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Campus Tour">🏫 Campus Tour</option>
                    <option value="Sports & Athletics">🏆 Sports & Athletics</option>
                    <option value="Academics & STEM">🔬 Academics & STEM</option>
                    <option value="Events & Cultural">🎉 Events & Cultural</option>
                    <option value="Admissions">📢 Admissions Showcase</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Thumbnail Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://... (Poster image)"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">YouTube URL / Video Stream Link *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://www.youtube.com/watch?v=... or embed URL"
                  value={inputUrl || formData.video_url}
                  onChange={handleUrlChange}
                  required
                />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  ⚡ Auto-converted to: <code>{formData.video_url || 'Embed link preview'}</code>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Brief summary of the video content..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  <Check size={16} /> Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {activeVideoModal && (
        <div
          className="modal-overlay"
          onClick={() => setActiveVideoModal(null)}
          style={{ background: 'rgba(0,0,0,0.85)', zIndex: 1000 }}
        >
          <div
            style={{ maxWidth: '850px', width: '90%', background: '#0f172a', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem' }}>
                {activeVideoModal.title}
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={activeVideoModal.video_url}
                title={activeVideoModal.title}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
