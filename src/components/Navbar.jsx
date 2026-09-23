import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, GraduationCap, Shield } from "lucide-react";

export default function Navbar({ onOpenSearch }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Admissions", path: "/admissions" },
    { name: "Gallery", path: "/gallery" },
    { name: "Events", path: "/events" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMobileMenu = () => {
    const nextState = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextState);
    if (nextState) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-light)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Top Bar */}
      <div
        className="topbar"
        style={{
          backgroundColor: "var(--primary-900)",
          color: "white",
          fontSize: "0.82rem",
          padding: "0.4rem 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="topbar-contact"
            style={{ display: "flex", gap: "1.5rem" }}
          >
            <span className="topbar-email">
              📞 Admissions: 7200005950, 7200005951
            </span>
            <span className="topbar-email">✉️ jmhas2002@gmail.com</span>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span
              style={{ color: "var(--accent-gold-light)", fontWeight: 600 }}
            >
              🎓 Admissions Open
            </span>
            <Link
              to="/login"
              style={{
                color: "white",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.8rem",
                background: "rgba(255,255,255,0.15)",
                padding: "0.15rem 0.6rem",
                borderRadius: "4px",
              }}
            >
              <Shield size={12} /> Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "75px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
          }}
        >
          <img
            src="/images/logo.png"
            alt="Jeeva Matric School Logo"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "contain",
              backgroundColor: "white",
              padding: "2px",
              border: "2px solid var(--accent-gold)",
              boxShadow: "0 4px 10px rgba(30, 58, 138, 0.2)",
            }}
          />
          <div>
            <div
              style={{
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "var(--primary-900)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              JEEVA MATRIC
            </div>
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "var(--accent-gold)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Hr. Sec. School • Arakkonam
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div
          className="nav-actions"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <button
            onClick={onOpenSearch}
            style={{
              background: "var(--surface-subtle)",
              border: "1px solid var(--border-light)",
              padding: "0.55rem",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
              color: "var(--primary-900)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "var(--transition-fast)",
            }}
            title="Search website"
          >
            <Search size={18} />
          </button>

          <Link
            to="/admissions"
            className="btn btn-gold apply-now"
            style={{ padding: "0.6rem 1.4rem", fontSize: "0.9rem" }}
          >
            Apply Now
          </Link>

          {/* Hamburger Icon */}
          <button
            onClick={toggleMobileMenu}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "var(--primary-900)",
              display: "none",
            }}
            className="mobile-hamburger-btn"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: "white",
            borderTop: "1px solid var(--border-light)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: isActive(item.path)
                  ? "var(--primary-600)"
                  : "var(--primary-900)",
                padding: "0.4rem 0",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
