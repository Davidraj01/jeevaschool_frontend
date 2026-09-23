import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../services/api';
import {
  Plus, Trash2, Image as ImageIcon, Upload, Check, Eye,
  Filter, FolderUp, Cloud, Link as LinkIcon, Sparkles, Copy, X, ExternalLink
} from 'lucide-react';

const SAMPLE_PHOTO_PRESETS = [
  {
    title: 'Admissions Open Poster',
    image_url: '/images/admission_poster_main.jpg',
    category: 'ADMISSIONS',
    description: 'Official school admission open enrollment poster for Pre-KG to Grade 12.'
  },
  {
    title: 'Modern Smart Classroom with Interactive Display',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    category: 'CAMPUS',
    description: 'Digital smart board classrooms facilitating collaborative STEM learning.'
  },
  {
    title: 'Physics, Chemistry & Biology STEM Innovation Lab',
    image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    category: 'LABS',
    description: 'Advanced laboratory stations equipped for experiential science experiments.'
  },
  {
    title: 'Championship Athletics & Sports Field',
    image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    category: 'SPORTS',
    description: 'Standard track and playground for athletic training, karate, and sports meets.'
  },
  {
    title: 'Annual Cultural Festival & Performing Arts Gala',
    image_url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    category: 'EVENTS',
    description: 'Student drama, music, dance presentations, and academic prize distributions.'
  },
  {
    title: 'Computer Science Lab & Coding Studio',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    category: 'LABS',
    description: 'Dedicated high-speed computer terminals with modern programming curricula.'
  }
];

export default function GalleryManager() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Admissions Open Poster',
      image_url: '/images/admission_poster_main.jpg',
      category: 'ADMISSIONS',
      description: 'Official school admissions enrollment banner for Pre-KG to Grade 12.'
    },
    {
      id: 2,
      title: 'Smart Classroom & Interactive Learning',
      image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      category: 'CAMPUS',
      description: 'Interactive smart boards and collaborative student desks.'
    },
    {
      id: 3,
      title: 'Physics & Chemistry STEM Lab',
      image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      category: 'LABS',
      description: 'State-of-the-art laboratory equipment.'
    },
    {
      id: 4,
      title: 'Sports Arena & Athletic Ground',
      image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      category: 'SPORTS',
      description: 'Spacious sports grounds for athletics, football, and karate.'
    },
    {
      id: 5,
      title: 'Annual Cultural Festival',
      image_url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
      category: 'EVENTS',
      description: 'Annual drama and performing arts celebration.'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadTab, setUploadTab] = useState('file'); // 'file' | 'cloud' | 'url' | 'presets'
  const [notification, setNotification] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'CAMPUS',
    image_url: '',
    description: ''
  });

  const [cloudUrl, setCloudUrl] = useState('');
  const [batchUploadedCount, setBatchUploadedCount] = useState(0);

  useEffect(() => {
    apiService.getGallery()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setItems(data);
      })
      .catch(() => {});
  }, []);

  const showNotice = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}" photo from gallery?`)) return;
    try {
      await apiService.deleteGalleryItem(id);
    } catch(e){}
    setItems(items.filter(i => i.id !== id));
    showNotice(`"${title}" has been deleted from gallery.`);
  };

  // Convert Google Photos or Drive share links to viewable direct image link
  const convertCloudLink = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    if (trimmed.includes('drive.google.com/file/d/')) {
      const match = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    return trimmed;
  };

  const handleCloudImport = (e) => {
    e.preventDefault();
    if (!cloudUrl) return;
    const directUrl = convertCloudLink(cloudUrl);
    setFormData({
      ...formData,
      image_url: directUrl,
      title: formData.title || 'Imported Cloud Media'
    });
    setUploadTab('url');
    showNotice('Cloud link processed! Review details and save below.');
  };

  // Process Local Files / Folder selection
  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    const validImageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (validImageFiles.length === 0) {
      alert('Please select valid image files (JPG, PNG, WebP, SVG).');
      return;
    }

    if (validImageFiles.length === 1) {
      const file = validImageFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
          category: formData.category || 'CAMPUS',
          image_url: e.target.result,
          description: `Uploaded from local device (${(file.size / 1024).toFixed(1)} KB)`
        });
        showNotice(`File "${file.name}" loaded for upload.`);
      };
      reader.readAsDataURL(file);
    } else {
      // Multiple files / folder import
      let added = 0;
      const newItems = [];
      validImageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const item = {
            id: Date.now() + Math.random(),
            title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
            category: formData.category || 'CAMPUS',
            image_url: e.target.result,
            description: `Batch uploaded from local folder`
          };
          try {
            await apiService.createGalleryItem(item);
          } catch(err){}
          newItems.push(item);
          added += 1;
          if (added === validImageFiles.length) {
            setItems(prev => [...newItems, ...prev]);
            setIsModalOpen(false);
            showNotice(`Successfully imported and uploaded ${validImageFiles.length} photos!`);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image_url) {
      alert('Please provide a title and an image URL or upload an image file.');
      return;
    }

    const newItem = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      image_url: formData.image_url,
      description: formData.description || 'School gallery photo'
    };

    try {
      await apiService.createGalleryItem(newItem);
    } catch(e){}

    setItems([newItem, ...items]);
    setIsModalOpen(false);
    setFormData({ title: '', category: 'CAMPUS', image_url: '', description: '' });
    showNotice(`Photo "${newItem.title}" added to gallery successfully!`);
  };

  const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url);
    showNotice('Image URL copied to clipboard!');
  };

  const filteredItems = activeCategory === 'ALL'
    ? items
    : items.filter(i => i.category?.toUpperCase() === activeCategory.toUpperCase());

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-900)', fontWeight: 800 }}>Media & Gallery Hub</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Upload, manage, and import campus photos, admission posters, sports events, and STEM lab galleries.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setFormData({ title: '', category: 'CAMPUS', image_url: '', description: '' });
              setUploadTab('file');
              setIsModalOpen(true);
            }}
            className="btn btn-gold"
            style={{ padding: '0.7rem 1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Upload size={18} /> Upload / Import Media
          </button>
        </div>
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
          gap: '0.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Check size={18} /> {notification}
        </div>
      )}

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Filter size={15} /> Filter:
        </span>
        {['ALL', 'ADMISSIONS', 'CAMPUS', 'LABS', 'SPORTS', 'EVENTS', 'ACTIVITIES'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: activeCategory === cat ? '1px solid var(--primary-600)' : '1px solid var(--border-light)',
              backgroundColor: activeCategory === cat ? 'var(--primary-900)' : 'white',
              color: activeCategory === cat ? 'white' : 'var(--text-main)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat === 'ADMISSIONS' ? '📢 Admissions Posters' : cat}
          </button>
        ))}
      </div>

      {/* Gallery Items Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'white',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div style={{ height: '190px', position: 'relative', overflow: 'hidden', background: '#f1f5f9' }}>
              <img
                src={item.image_url}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: item.category === 'ADMISSIONS' ? 'var(--accent-gold)' : 'rgba(15, 23, 42, 0.75)',
                  color: 'white',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                {item.category}
              </span>

              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                display: 'flex',
                gap: '0.35rem'
              }}>
                <button
                  onClick={() => setPreviewImage(item)}
                  title="Fullscreen Preview"
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    border: 'none',
                    padding: '0.4rem',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Eye size={15} />
                </button>
                <button
                  onClick={() => copyImageUrl(item.image_url)}
                  title="Copy Image URL"
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    border: 'none',
                    padding: '0.4rem',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Copy size={15} />
                </button>
              </div>
            </div>

            <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1rem', color: 'var(--primary-900)', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', margin: 0, lineHeight: 1.4 }}>
                  {item.description || 'School campus gallery visual.'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload & Import Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-card"
            style={{ maxWidth: '680px', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-900)', fontWeight: 800, margin: 0 }}>
                  Upload & Import Media
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Choose local device files, select an entire folder, import from Google Photos, or paste direct URLs.
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={22} />
              </button>
            </div>

            {/* Source Tab Selector */}
            <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setUploadTab('file')}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: uploadTab === 'file' ? 'var(--primary-900)' : '#f1f5f9',
                  color: uploadTab === 'file' ? 'white' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <FolderUp size={15} /> Device / Folder Upload
              </button>

              <button
                type="button"
                onClick={() => setUploadTab('cloud')}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: uploadTab === 'cloud' ? 'var(--primary-900)' : '#f1f5f9',
                  color: uploadTab === 'cloud' ? 'white' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Cloud size={15} /> Google Photos / Drive
              </button>

              <button
                type="button"
                onClick={() => setUploadTab('presets')}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: uploadTab === 'presets' ? 'var(--primary-900)' : '#f1f5f9',
                  color: uploadTab === 'presets' ? 'white' : 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Sparkles size={15} /> High-Res Presets
              </button>
            </div>

            {/* TAB 1: LOCAL FILE / FOLDER DROP */}
            {uploadTab === 'file' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
                  }}
                  style={{
                    border: dragActive ? '2px dashed var(--accent-gold)' : '2px dashed var(--border-light)',
                    borderRadius: '12px',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    backgroundColor: dragActive ? 'rgba(217, 119, 6, 0.05)' : '#f8fafc',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FolderUp size={36} style={{ color: 'var(--primary-600)', margin: '0 auto 0.75rem' }} />
                  <div style={{ fontWeight: 700, color: 'var(--primary-900)', fontSize: '0.98rem' }}>
                    Click to select photo(s) or drag & drop here
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    Supports JPG, PNG, WebP, SVG • Multi-file and full folders supported
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                  <input
                    type="file"
                    ref={folderInputRef}
                    webkitdirectory=""
                    directory=""
                    multiple
                    style={{ display: 'none' }}
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    Select Individual Files
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); folderInputRef.current?.click(); }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    Select Entire Folder
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: GOOGLE PHOTOS / DRIVE LINK IMPORT */}
            {uploadTab === 'cloud' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <label className="form-label" style={{ fontWeight: 700 }}>
                    Google Photos / Google Drive Link
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Paste Google Photos shared link or Google Drive link..."
                      value={cloudUrl}
                      onChange={(e) => setCloudUrl(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleCloudImport}
                      className="btn btn-gold"
                      style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}
                    >
                      Process Link
                    </button>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    💡 Direct sharing links from Google Photos or Google Drive are automatically converted to embeddable images.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRESETS */}
            {uploadTab === 'presets' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto' }}>
                  {SAMPLE_PHOTO_PRESETS.map((p, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setFormData({
                          title: p.title,
                          category: p.category,
                          image_url: p.image_url,
                          description: p.description
                        });
                        showNotice(`Selected preset "${p.title}"!`);
                      }}
                      style={{
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: '#ffffff'
                      }}
                    >
                      <img src={p.image_url} alt={p.title} style={{ width: '100%', height: '80px', objectFit: 'cover' }} />
                      <div style={{ padding: '0.4rem', fontSize: '0.76rem', fontWeight: 600, color: 'var(--primary-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata Form */}
            <form onSubmit={handleSubmit}>
              <div className="responsive-form-row">
                <div className="form-group">
                  <label className="form-label">Photo / Media Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Science Laboratory Session"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="ADMISSIONS">📢 Admissions Posters</option>
                    <option value="CAMPUS">🏫 Campus & Infrastructure</option>
                    <option value="LABS">🔬 STEM & Science Labs</option>
                    <option value="SPORTS">🏆 Sports & Athletics</option>
                    <option value="EVENTS">🎉 Cultural & Events</option>
                    <option value="ACTIVITIES">🎨 Student Activities</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Image Source URL *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://... or auto-filled by upload"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  required
                />
              </div>

              {formData.image_url && (
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8fafc', padding: '0.6rem', borderRadius: '8px' }}>
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Image Ready for publishing to gallery.
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Brief context about this photo..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold"
                >
                  <Check size={16} /> Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen Photo Preview Modal */}
      {previewImage && (
        <div
          className="modal-overlay"
          onClick={() => setPreviewImage(null)}
          style={{ background: 'rgba(0,0,0,0.85)', zIndex: 1000 }}
        >
          <div
            style={{ maxWidth: '900px', width: '90%', textAlign: 'center', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <X size={28} />
            </button>
            <img
              src={previewImage.image_url}
              alt={previewImage.title}
              style={{ maxHeight: '75vh', maxWidth: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
            />
            <div style={{ color: 'white', marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.25rem', color: 'white' }}>{previewImage.title}</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0 }}>{previewImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
