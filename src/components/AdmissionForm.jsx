import React, { useState } from 'react';
import { apiService } from '../services/api';
import { Send, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdmissionForm() {
  const initialFormState = {
    student_name: '',
    dob: '',
    class_applying: 'Grade 9',
    parent_name: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Basic Validation
    if (!formData.student_name || !formData.dob || !formData.parent_name || !formData.phone || !formData.email || !formData.address) {
      setErrorMessage('Please fill in all required fields marked with *');
      setSubmitting(false);
      return;
    }

    try {
      await apiService.submitAdmission(formData);
      setSuccessMessage(`Thank you, ${formData.parent_name}! Admission application for ${formData.student_name} has been submitted successfully. Reference ID generated.`);
      setFormData(initialFormState);
    } catch {
      setErrorMessage('We could not submit your application at this time. Please try again shortly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: 'var(--radius-lg)',
      padding: '2.5rem',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border-light)'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="section-badge">Online Registration</span>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-900)', marginTop: '0.4rem' }}>
          Student Admission Application Form
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Please complete the form below. Required fields are marked with an asterisk (*).
        </p>
      </div>

      {successMessage && (
        <div style={{
          backgroundColor: '#d1fae5',
          color: '#065f46',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: 600
        }}>
          <CheckCircle size={22} style={{ flexShrink: 0 }} />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: 600
        }}>
          <AlertCircle size={22} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Student Name */}
          <div className="form-group">
            <label className="form-label">Student Full Name *</label>
            <input
              type="text"
              name="student_name"
              className="form-control"
              placeholder="e.g. Oliver Smith"
              value={formData.student_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* DOB */}
          <div className="form-group">
            <label className="form-label">Date of Birth *</label>
            <input
              type="date"
              name="dob"
              className="form-control"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* Class Applying For */}
          <div className="form-group">
            <label className="form-label">Class Applying For *</label>
            <select
              name="class_applying"
              className="form-control"
              value={formData.class_applying}
              onChange={handleChange}
              required
            >
              <option value="Kindergarten">Kindergarten / Early Years</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11 STEM">Grade 11 (STEM Stream)</option>
              <option value="Grade 11 Humanities">Grade 11 (Humanities Stream)</option>
              <option value="Grade 12">Grade 12</option>
            </select>
          </div>

          {/* Parent Name */}
          <div className="form-group">
            <label className="form-label">Parent / Guardian Name *</label>
            <input
              type="text"
              name="parent_name"
              className="form-control"
              placeholder="e.g. James Smith"
              value={formData.parent_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="+1 (555) 019-2834"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="parent@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="form-group">
          <label className="form-label">Residential Address *</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Street Address, City, State, ZIP"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Message */}
        <div className="form-group">
          <label className="form-label">Additional Message / Inquiries</label>
          <textarea
            name="message"
            className="form-control"
            placeholder="Mention any specific interest in transport, scholarships, or athletic clubs..."
            value={formData.message}
            onChange={handleChange}
            rows={3}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="submit" className="btn btn-gold" disabled={submitting}>
            <Send size={18} /> {submitting ? 'Submitting Application...' : 'Submit Application'}
          </button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            <RotateCcw size={18} /> Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}
