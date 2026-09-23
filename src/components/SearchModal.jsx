import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { Search, X, BookOpen, Calendar, Image, ArrowRight } from 'lucide-react';

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await apiService.search(value);
      if (data && data.results) {
        setResults(data.results);
      }
    } catch (err) {
      // Demo local fallback
      const mockResults = [
        { type: 'Blog', title: 'Integrating AI & Robotics in STEM', description: 'Exploring robotics lab coding...', url: '/blog/1' },
        { type: 'Event', title: 'Annual Science Expo 2026', description: 'Over 100 student projects...', url: '/events' },
        { type: 'Gallery', title: 'Smart Classroom Facilities', description: 'Interactive 4K displays...', url: '/gallery' },
      ].filter(item => item.title.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase()));
      setResults(mockResults);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectResult = (url) => {
    navigate(url);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '650px', padding: '1.5rem', background: 'white' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '2px solid var(--primary-100)', paddingBottom: '0.8rem', marginBottom: '1.25rem' }}>
          <Search size={22} style={{ color: 'var(--primary-600)' }} />
          <input
            type="text"
            placeholder="Search blogs, events, gallery, courses..."
            value={query}
            onChange={handleSearch}
            autoFocus
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '1.15rem',
              color: 'var(--primary-900)',
              fontWeight: 600
            }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {loading && <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>Searching Apex database...</div>}

        {!loading && query && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
            No matching results found for "{query}". Try searching for <em>robotics</em>, <em>admissions</em>, or <em>sports</em>.
          </div>
        )}

        {results.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto' }}>
            {results.map((res, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectResult(res.url)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-subtle)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                  border: '1px solid var(--border-light)'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary-500)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
              >
                <div>
                  <span className="badge badge-published" style={{ fontSize: '0.7rem', marginBottom: '0.2rem' }}>
                    {res.type}
                  </span>
                  <div style={{ fontWeight: 700, color: 'var(--primary-900)', fontSize: '0.98rem' }}>{res.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{res.description}</div>
                </div>
                <ArrowRight size={18} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
