import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--primary-900)",
        color: "white",
        paddingTop: "4rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Col 1: About */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.2rem",
              }}
            >
              <img
                src="/images/logo.png"
                alt="Jeeva Matric School Logo"
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  objectFit: "contain",
                  backgroundColor: "white",
                  padding: "2px",
                  border: "2px solid var(--accent-gold)",
                }}
              />
              <div>
                <span
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    display: "block",
                  }}
                >
                  JEEVA MATRIC
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--accent-gold-light)",
                    fontWeight: 600,
                  }}
                >
                  Hr. Sec. School • Arakkonam
                </span>
              </div>
            </div>
            <p
              style={{
                color: "var(--text-light)",
                fontSize: "0.92rem",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              Empowering students through quality education, creativity,
              discipline, and STEM innovation since 1998. Building future global
              leaders.
            </p>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              <Link
                to="/login"
                className="btn btn-outline-light"
                style={{ padding: "0.4rem 1rem", fontSize: "0.82rem" }}
              >
                <Shield size={14} /> Staff Admin Login
              </Link>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4
              style={{
                color: "white",
                fontSize: "1.1rem",
                marginBottom: "1.2rem",
                position: "relative",
              }}
            >
              Quick Navigation
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {[
                "Home",
                "About",
                "Academics",
                "Admissions",
                "Gallery",
                "Events",
                "Blog",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.92rem",
                      transition: "var(--transition-fast)",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.color = "var(--accent-gold-light)")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.color = "var(--text-light)")
                    }
                  >
                    → {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Academic Programs */}
          <div>
            <h4
              style={{
                color: "white",
                fontSize: "1.1rem",
                marginBottom: "1.2rem",
              }}
            >
              Academic Wings
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                color: "var(--text-light)",
                fontSize: "0.92rem",
              }}
            >
              <li>• Early Years & Kindergarten</li>
              <li>• Primary School (Grades 1-5)</li>
              <li>• Middle School (Grades 6-8)</li>
              <li>• High School STEM & Humanities</li>
              <li>• Robotics & Artificial Intelligence Lab</li>
              <li>• Music & Fine Arts Conservatory</li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4
              style={{
                color: "white",
                fontSize: "1.1rem",
                marginBottom: "1.2rem",
              }}
            >
              Campus Office
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
                color: "var(--text-light)",
                fontSize: "0.9rem",
              }}
            >
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <MapPin
                  size={20}
                  style={{ color: "var(--accent-gold-light)", flexShrink: 0 }}
                />
                <span>
                  3JHV+XRP, Jeeva Nagar, Melpakkam yard, Melpakkam, Tamil Nadu,
                  Pincode: 631003
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Phone
                  size={18}
                  style={{ color: "var(--accent-gold-light)", flexShrink: 0 }}
                />
                <span>7200005950, 7200005951</span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Mail
                  size={18}
                  style={{ color: "var(--accent-gold-light)", flexShrink: 0 }}
                />
                <span>jmhas2002@gmail.com</span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Clock
                  size={18}
                  style={{ color: "var(--accent-gold-light)", flexShrink: 0 }}
                />
                <span>Mon - Fri: 8:00 AM - 4:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            color: "var(--text-light)",
            fontSize: "0.85rem",
          }}
        >
          <div>
            © {new Date().getFullYear()} Apex International Academy. All Rights
            Reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link
              to="/sitemap.xml"
              target="_blank"
              style={{ color: "var(--text-light)" }}
            >
              Sitemap
            </Link>
            <Link
              to="/robots.txt"
              target="_blank"
              style={{ color: "var(--text-light)" }}
            >
              Robots.txt
            </Link>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
