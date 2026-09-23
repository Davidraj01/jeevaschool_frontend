import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Plus, Edit, Trash2, FileText, Globe, Check } from 'lucide-react';

export default function BlogManager() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Integrating AI & Robotics in High School STEM Curriculum',
      slug: 'academics-stem',
      category_name: 'Academics & STEM',
      description: 'How hands-on robotics labs prepare students for tech careers.',
      content: 'Technology is reshaping the future...',
      image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      status: 'PUBLISHED',
      tags: 'STEM, Robotics, AI',
      meta_title: 'AI & Robotics in STEM | Apex Academy',
      meta_description: 'Explore our robotics curriculum for high schoolers.',
      author: 'Dr. Marcus Vance'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    tags: 'Education, STEM',
    meta_title: '',
    meta_description: '',
    author: 'Admin Principal',
    status: 'PUBLISHED'
  });

  useEffect(() => {
    apiService.getBlogs()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setBlogs(data);
      })
      .catch(() => {});
  }, []);

  const handleOpenCreate = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      content: '',
      image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      tags: 'Education, Apex',
      meta_title: '',
      meta_description: '',
      author: 'Admin Principal',
      status: 'PUBLISHED'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({ ...blog });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try { await apiService.deleteBlog(id); } catch(e){}
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingBlog) {
      try { await apiService.updateBlog(editingBlog.id, formData); } catch(e){}
      setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...b, ...formData } : b));
    } else {
      const newB = { id: Date.now(), ...formData };
      try { await apiService.createBlog(formData); } catch(e){}
      setBlogs([newB, ...blogs]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-900)' }}>Blog & Content Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Publish educational articles, edit status, and manage page-level SEO titles & descriptions.
          </p>
        </div>
        <button onClick={handleOpenCreate} className="btn btn-gold">
          <Plus size={18} /> Create New Blog Post
        </button>
      </div>

      {/* Blogs Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>SEO Meta Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--primary-900)' }}>{b.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/{b.slug || 'slug'}</div>
                </td>
                <td>{b.author}</td>
                <td><span className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</span></td>
                <td>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <Globe size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {b.meta_title || b.title}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenEdit(b)} className="btn btn-secondary" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}>
                      <Edit size={14} /> Edit
                    </button>
                    <button onClick={() => handleDelete(b.id)} style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', padding: '0.35rem 0.6rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem' }}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-900)', marginBottom: '1.5rem' }}>
              {editingBlog ? 'Edit Blog Article' : 'Create New Article'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Article Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">URL Slug</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. robotics-stem-2026"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Author Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Status Choice</label>
                  <select
                    className="form-control"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Cover Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Summary (Description)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Article Content</label>
                <textarea
                  className="form-control"
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                />
              </div>

              {/* SEO Box */}
              <div style={{ background: 'var(--surface-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-900)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Globe size={16} /> SEO & OpenGraph Settings
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>SEO Meta Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Article Tags</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>SEO Meta Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-gold">Save & Publish</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
