import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Check, X, Eye, Search, Filter } from 'lucide-react';

export default function AdmissionsManager() {
  const [admissions, setAdmissions] = useState([
    {
      id: 1,
      student_name: 'Oliver Smith',
      dob: '2012-05-14',
      class_applying: 'Grade 9',
      parent_name: 'James Smith',
      phone: '+1 555-4433',
      email: 'jsmith@example.com',
      address: '742 Evergreen Terrace, CA',
      message: 'Interested in school transport and computer lab facilities.',
      status: 'PENDING',
      created_at: '2026-09-18'
    },
    {
      id: 2,
      student_name: 'Emma Watson',
      dob: '2010-09-02',
      class_applying: 'Grade 11 STEM',
      parent_name: 'Thomas Watson',
      phone: '+1 555-0195',
      email: 'twatson@example.com',
      address: '100 Sunset Blvd, CA',
      message: 'Applying for robotics scholarship.',
      status: 'APPROVED',
      created_at: '2026-09-10'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  useEffect(() => {
    apiService.getAdmissions()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setAdmissions(data);
      })
      .catch(() => {});
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await apiService.updateAdmissionStatus(id, newStatus);
    } catch (err) {}
    setAdmissions(admissions.map(item => item.id === id ? { ...item, status: newStatus } : item));
    if (selectedAdmission && selectedAdmission.id === id) {
      setSelectedAdmission({ ...selectedAdmission, status: newStatus });
    }
  };

  const filteredData = admissions.filter(item => {
    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    const matchesSearch = item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.class_applying.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-900)' }}>Admissions Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Review, approve, or reject online student admission applications.
          </p>
        </div>

        {/* Filter & Search */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search student or parent..."
              className="form-control"
              style={{ paddingLeft: '2.5rem', width: '220px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="form-control"
            style={{ width: '160px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending Only</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Admissions Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Class Applying</th>
              <th>Parent Name</th>
              <th>Contact Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td><strong>#{item.id}</strong></td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--primary-900)' }}>{item.student_name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DOB: {item.dob}</div>
                </td>
                <td><span className="badge badge-published">{item.class_applying}</span></td>
                <td>{item.parent_name}</td>
                <td>{item.phone}</td>
                <td>
                  <span className={`badge badge-${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setSelectedAdmission(item)}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                      title="View Details"
                    >
                      <Eye size={14} /> View
                    </button>
                    {item.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'APPROVED')}
                          style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.35rem 0.6rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                          title="Approve Admission"
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'REJECTED')}
                          style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.35rem 0.6rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                          title="Reject Admission"
                        >
                          <X size={14} /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Application Detail Modal */}
      {selectedAdmission && (
        <div className="modal-overlay" onClick={() => setSelectedAdmission(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-900)' }}>Admission Application #{selectedAdmission.id}</h3>
              <span className={`badge badge-${selectedAdmission.status.toLowerCase()}`}>{selectedAdmission.status}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', background: 'var(--surface-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div><strong>Student Name:</strong> {selectedAdmission.student_name}</div>
              <div><strong>Class Applying:</strong> {selectedAdmission.class_applying}</div>
              <div><strong>Date of Birth:</strong> {selectedAdmission.dob}</div>
              <div><strong>Parent/Guardian:</strong> {selectedAdmission.parent_name}</div>
              <div><strong>Phone:</strong> {selectedAdmission.phone}</div>
              <div><strong>Email:</strong> {selectedAdmission.email}</div>
              <div style={{ gridColumn: 'span 2' }}><strong>Address:</strong> {selectedAdmission.address}</div>
              <div style={{ gridColumn: 'span 2' }}><strong>Parent Notes:</strong> {selectedAdmission.message || 'None provided.'}</div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => handleUpdateStatus(selectedAdmission.id, 'APPROVED')} className="btn btn-gold">
                Approve Application
              </button>
              <button onClick={() => handleUpdateStatus(selectedAdmission.id, 'REJECTED')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem 1.4rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}>
                Reject Application
              </button>
              <button onClick={() => setSelectedAdmission(null)} className="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
