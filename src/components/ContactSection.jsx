import React, { useState } from "react";
import { apiService } from "../services/api";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.submitContact(formData);
    } catch (err) {
      // Fallback
    }
    setSubmitted(true);
    setSubmitting(false);
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--surface-subtle)" }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Get in Touch</span>
          <h2 className="section-title">Contact School Administration</h2>
          <p className="section-subtitle">
            Have questions regarding admissions, school visits, or academic
            programs? We are here to help.
          </p>
        </div>

        <div
          className="contact-grid responsive-grid-2"
          style={{
            alignItems: "start",
          }}
        >
          {/* Left Info & Map */}
          <div>
            <div
              style={{
                background: "white",
                borderRadius: "var(--radius-lg)",
                padding: "2.5rem",
                boxShadow: "var(--shadow-md)",
                border: "1px solid var(--border-light)",
                marginBottom: "2rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  color: "var(--primary-900)",
                  marginBottom: "1.5rem",
                }}
              >
                Apex International Academy
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "var(--primary-50)",
                      color: "var(--primary-700)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "var(--primary-900)",
                      }}
                    >
                      Campus Address
                    </div>
                    <div
                      style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}
                    >
                      3JHV+XRP, Jeeva Nagar, Melpakkam yard, Melpakkam, Tamil Nadu, Pincode: 631003
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "var(--accent-gold-bg)",
                      color: "var(--accent-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "var(--primary-900)",
                      }}
                    >
                      Phone Numbers
                    </div>
                    <div
                      style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}
                    >
                      7200005950, 7200005951
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "#ecfdf5",
                      color: "#059669",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "var(--primary-900)",
                      }}
                    >
                      Email Inquiries
                    </div>
                    <div
                      style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}
                    >
                      jmhas2002@gmail.com
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "#f5f3ff",
                      color: "#8b5cf6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "var(--primary-900)",
                      }}
                    >
                      Administrative Hours
                    </div>
                    <div
                      style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}
                    >
                      Monday – Friday: 8:00 AM – 4:30 PM (Saturday: 9:00 AM –
                      1:00 PM)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                height: "240px",
                boxShadow: "var(--shadow-md)",
                border: "1px solid var(--border-light)",
              }}
            >
              <iframe
                title="School Location Map"
                src="https://maps.google.com/maps?q=3JHV%2BXRP%2C+Jeeva+Nagar%2C+Melpakkam+yard%2C+Melpakkam%2C+Tamil+Nadu+631003&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Contact Form */}
          <div
            style={{
              background: "white",
              borderRadius: "var(--radius-lg)",
              padding: "2.5rem",
              boxShadow: "var(--shadow-md)",
              border: "1px solid var(--border-light)",
            }}
          >
            <h3
              style={{
                fontSize: "1.6rem",
                color: "var(--primary-900)",
                marginBottom: "0.5rem",
              }}
            >
              Send Us a Message
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.92rem",
                marginBottom: "2rem",
              }}
            >
              Fill in your contact information below and our team will get back
              to you promptly.
            </p>

            {submitted && (
              <div
                style={{
                  backgroundColor: "#d1fae5",
                  color: "#065f46",
                  padding: "1rem",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontWeight: 600,
                }}
              >
                <CheckCircle size={22} />
                <span>
                  Message sent! Thank you for contacting Apex Academy
                  administration.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Jennifer Taylor"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="contact-form-fields responsive-form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+1 555-0192"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Admission Inquiry Grade 9"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="How can we assist you?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "1rem" }}
                disabled={submitting}
              >
                <Send size={18} />{" "}
                {submitting ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
