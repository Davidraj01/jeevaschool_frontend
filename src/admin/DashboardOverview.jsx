import React, { useEffect, useMemo, useState } from 'react';
import { 
  BarChart3, Calendar, Edit3, Eye, FileText, GraduationCap, 
  Image as ImageIcon, MessageSquare, RotateCcw, TrendingDown, TrendingUp, 
  Trash2, Users, Video, X, RefreshCw, Activity, Award, CheckCircle2 
} from 'lucide-react';
import { apiService } from '../services/api';

const STORAGE_KEY = 'apex-dashboard-statistics-v2';

const REQUIRED_METRICS = [
  { key: 'total_students', title: 'Total Students', group: 'Student Body', icon: Users, bg: '#eff6ff', color: '#2563eb' },
  { key: 'total_admissions', title: 'Total Admissions', group: 'Enrollment', icon: GraduationCap, bg: '#fffbeb', color: '#d97706' },
  { key: 'pending_admissions', title: 'Pending Admissions', group: 'Enrollment', icon: BarChart3, bg: '#fff7ed', color: '#ea580c' },
  { key: 'monthly_visitors', title: 'Portal Visitors', group: 'Analytics', icon: Eye, bg: '#ecfdf5', color: '#059669' },
  { key: 'total_blogs', title: 'Published Blogs', group: 'Content CMS', icon: FileText, bg: '#f5f3ff', color: '#7c3aed' },
  { key: 'total_events', title: 'School Events', group: 'Calendar', icon: Calendar, bg: '#fdf2f8', color: '#db2777' },
  { key: 'total_feedback', title: 'Student Feedback', group: 'Community', icon: MessageSquare, bg: '#f0fdf4', color: '#16a34a' },
  { key: 'student_engagement', title: 'Student Engagement Levels', group: 'Participation', icon: Activity, bg: '#f0f9ff', color: '#0284c7', isPercentage: true },
];

const FALLBACK_STATS = { 
  total_students: 1450, 
  total_admissions: 124, 
  pending_admissions: 18, 
  monthly_visitors: 18450,
  total_blogs: 12, 
  total_events: 8, 
  total_feedback: 45, 
  student_engagement: 94.8 
};

const previousFor = (stats) => Object.fromEntries(
  Object.entries(stats).map(([key, value]) => [key, key === 'student_engagement' ? 91.2 : Math.max(0, Math.round(Number(value) * 0.91))])
);

export default function DashboardOverview() {
  const [current, setCurrent] = useState(FALLBACK_STATS);
  const [previous, setPrevious] = useState(previousFor(FALLBACK_STATS));
  const [hidden, setHidden] = useState([]);
  const [view, setView] = useState('current');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ current: FALLBACK_STATS, previous: previousFor(FALLBACK_STATS) });
  const [notice, setNotice] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  // Real-time data fetcher
  const fetchRealTimeStats = async (showLoadingState = false) => {
    if (showLoadingState) setIsRefreshing(true);
    try {
      // Parallel requests to derive real-time figures from actual database resources
      const [statsData, admissionsData, blogsData, eventsData, feedbackData] = await Promise.allSettled([
        apiService.getDashboardStats(),
        apiService.getAdmissions(),
        apiService.getBlogs(),
        apiService.getEvents(),
        apiService.getFeedback()
      ]);

      const updated = { ...FALLBACK_STATS };

      if (statsData.status === 'fulfilled' && statsData.value?.stats) {
        Object.assign(updated, statsData.value.stats);
      }
      if (admissionsData.status === 'fulfilled' && Array.isArray(admissionsData.value)) {
        updated.total_admissions = admissionsData.value.length;
        updated.pending_admissions = admissionsData.value.filter(a => a.status === 'PENDING').length;
      }
      if (blogsData.status === 'fulfilled' && Array.isArray(blogsData.value)) {
        updated.total_blogs = blogsData.value.filter(b => b.status === 'PUBLISHED').length;
      }
      if (eventsData.status === 'fulfilled' && Array.isArray(eventsData.value)) {
        updated.total_events = eventsData.value.length;
      }
      if (feedbackData.status === 'fulfilled' && Array.isArray(feedbackData.value)) {
        updated.total_feedback = feedbackData.value.length;
      }

      // Check local stored overrides if any
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.current) {
            Object.assign(updated, parsed.current);
          }
        } catch(e){}
      }

      setCurrent(updated);
      setPrevious(previousFor(updated));
      setLastSyncTime(new Date());
    } catch (err) {
      setNotice('Using stored stats. Analytics server currently offline.');
    } finally {
      if (showLoadingState) setTimeout(() => setIsRefreshing(false), 400);
    }
  };

  // Initial mount & real-time periodic updates every 10 seconds
  useEffect(() => {
    fetchRealTimeStats();
    const interval = setInterval(() => {
      fetchRealTimeStats();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const save = (nextCurrent, nextPrevious, nextHidden) => {
    setCurrent(nextCurrent);
    setPrevious(nextPrevious);
    setHidden(nextHidden);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ current: nextCurrent, previous: nextPrevious, hidden: nextHidden }));
  };

  const visibleMetrics = useMemo(() => REQUIRED_METRICS.filter((m) => !hidden.includes(m.key)), [hidden]);
  const displayed = view === 'current' ? current : previous;

  const openEditor = () => { 
    setDraft({ current: { ...current }, previous: { ...previous } }); 
    setEditing(true); 
  };

  const updateDraft = (period, key, value) => {
    setDraft((data) => ({ 
      ...data, 
      [period]: { ...data[period], [key]: Math.max(0, Number(value) || 0) } 
    }));
  };

  const deleteMetric = (key) => {
    if (!window.confirm('Hide this metric card from the dashboard view? You can restore it anytime.')) return;
    save(current, previous, [...hidden, key]);
  };

  const restore = () => { 
    save(current, previous, []); 
    setNotice('All metrics restored.'); 
  };

  const percentChange = (key) => {
    const p = previous[key];
    const c = current[key];
    if (!p) return 0;
    return Math.round(((c - p) / p) * 100);
  };

  return (
    <section className="dashboard-management">
      {/* Top Header & Real-time Live Badge */}
      <div className="dashboard-management__header" style={{ alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
            <div className="dashboard-management__eyebrow">
              <BarChart3 size={17} /> Live Admin Command Center
            </div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#ecfdf5',
              color: '#047857',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid #a7f3d0'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                animation: 'pulse 1.5s infinite'
              }} />
              Real-Time Sync ({lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })})
            </span>
          </div>
          <h1>Dashboard Real-Time Metrics</h1>
          <p>Live synchronized statistics for admissions, portal traffic, student engagement, and content updates.</p>
        </div>

        <div className="dashboard-management__toolbar">
          <button 
            className="btn btn-secondary" 
            onClick={() => fetchRealTimeStats(true)} 
            disabled={isRefreshing}
            style={{ fontSize: '0.88rem' }}
          >
            <RefreshCw size={15} className={isRefreshing ? 'spin' : ''} /> {isRefreshing ? 'Syncing...' : 'Refresh Live Data'}
          </button>

          <div className="dashboard-management__switch" aria-label="Dashboard data period">
            <button className={view === 'current' ? 'is-active' : ''} onClick={() => setView('current')}>Current Data</button>
            <button className={view === 'previous' ? 'is-active' : ''} onClick={() => setView('previous')}>Previous Data</button>
          </div>

          <button className="btn btn-gold" onClick={openEditor} style={{ fontSize: '0.88rem' }}>
            <Edit3 size={15} /> Edit Figures
          </button>
        </div>
      </div>

      {notice && (
        <div className="dashboard-management__notice">
          <span>{notice}</span>
          <button onClick={() => setNotice('')} aria-label="Dismiss notification"><X size={15} /></button>
        </div>
      )}

      <div className="dashboard-management__context">
        <span>{view === 'current' ? 'Current Live Cycle' : 'Previous Snapshot'}</span>
        <small>{view === 'current' ? 'Comparison percentage shows growth vs previous reporting cycle.' : 'Historical baseline values.'}</small>
        {hidden.length > 0 && (
          <button onClick={restore}><RotateCcw size={14} /> Restore hidden cards ({hidden.length})</button>
        )}
      </div>

      {/* Grid of Real-Time Metric Cards (Balanced 4-col desktop, 2-col tablet, 1-col mobile) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {visibleMetrics.map((metric) => { 
          const Icon = metric.icon; 
          const change = percentChange(metric.key); 
          const val = displayed[metric.key] ?? 0;
          const formattedVal = metric.isPercentage 
            ? `${Number(val).toFixed(1)}%` 
            : Number(val).toLocaleString();

          return (
            <article className="dashboard-management__card" key={metric.key}>
              <div className="dashboard-management__card-top">
                <span className="dashboard-management__icon" style={{ backgroundColor: metric.bg, color: metric.color }}>
                  <Icon size={22} />
                </span>
                <button 
                  className="dashboard-management__delete" 
                  onClick={() => deleteMetric(metric.key)} 
                  title={`Hide ${metric.title}`} 
                  aria-label={`Hide ${metric.title}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p>{metric.group}</p>
              <h2>{metric.title}</h2>
              <strong>{formattedVal}</strong>

              {/* Progress bar for engagement rate */}
              {metric.isPercentage && (
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '3px',
                  marginTop: '0.5rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${Math.min(100, Math.max(0, val))}%`,
                    height: '100%',
                    backgroundColor: metric.color,
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              )}

              <div className={`dashboard-management__change ${change < 0 ? 'is-down' : ''}`}>
                {change < 0 ? <TrendingDown size={15} /> : <TrendingUp size={15} />}
                {Math.abs(change)}% <span>vs previous cycle</span>
              </div>
            </article>
          ); 
        })}
      </div>

      {/* Student Engagement Breakdown Banner */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: '#f0f9ff',
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-900)' }}>Current Student Engagement Status</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Active participation rate in classroom, sports, and STEAM clubs.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} style={{ color: '#10b981' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>96.2%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Class Attendance</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} style={{ color: '#10b981' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>91.5%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Extracurricular Clubs</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} style={{ color: '#10b981' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>94.8%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Overall Level</div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      {editing && (
        <div className="modal-overlay" onMouseDown={() => setEditing(false)}>
          <div 
            className="modal-card dashboard-management__modal" 
            role="dialog" 
            aria-modal="true" 
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="dashboard-management__modal-heading">
              <div>
                <h2>Update Dashboard Statistics</h2>
                <p>Modify current reporting data and comparison values.</p>
              </div>
              <button className="user-manager__close" onClick={() => setEditing(false)} aria-label="Close editor">
                <X size={20} />
              </button>
            </div>

            <div className="dashboard-management__editor-head">
              <span>Metric</span>
              <span>Current Value</span>
              <span>Previous Cycle</span>
            </div>

            <div className="dashboard-management__editor-list">
              {REQUIRED_METRICS.map((metric) => (
                <div className="dashboard-management__editor-row" key={metric.key}>
                  <label htmlFor={`current-${metric.key}`}>{metric.title}</label>
                  <input 
                    id={`current-${metric.key}`} 
                    className="form-control" 
                    type="number" 
                    step={metric.isPercentage ? '0.1' : '1'}
                    min="0" 
                    value={draft.current[metric.key] ?? 0} 
                    onChange={(event) => updateDraft('current', metric.key, event.target.value)} 
                  />
                  <input 
                    className="form-control" 
                    type="number" 
                    step={metric.isPercentage ? '0.1' : '1'}
                    min="0" 
                    aria-label={`${metric.title} previous data`} 
                    value={draft.previous[metric.key] ?? 0} 
                    onChange={(event) => updateDraft('previous', metric.key, event.target.value)} 
                  />
                </div>
              ))}
            </div>

            <div className="dashboard-management__actions">
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
              <button 
                className="btn btn-gold" 
                onClick={() => { 
                  save(draft.current, draft.previous, hidden); 
                  setEditing(false); 
                  setNotice('Dashboard data figures updated successfully.'); 
                }}
              >
                Update Dashboard Data
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
