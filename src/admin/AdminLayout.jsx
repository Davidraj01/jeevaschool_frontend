import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Image,
  Video,
  Calendar,
  MessageSquare,
  Globe,
  LogOut,
  GraduationCap,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { apiService } from "../services/api";
import {
  clearAdminSession,
  getAdminSessionRemainingMs,
} from "../services/adminSession";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [authState, setAuthState] = useState("checking");
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const allowNavigationRef = useRef(false);
  const guardedAdminUrlRef = useRef("");

  useEffect(() => {
    let active = true;
    apiService
      .getCurrentUser()
      .then((response) => {
        if (active) {
          if (response?.authenticated && response?.user?.is_staff) {
            setAuthState("authenticated");
            setCurrentUser(response.user);
          } else {
            setAuthState("unauthenticated");
          }
        }
      })
      .catch(() => {
        if (active) setAuthState("unauthenticated");
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (authState !== "authenticated") return undefined;

    const remainingMs = getAdminSessionRemainingMs();
    if (!remainingMs) {
      handleLogout();
      return undefined;
    }

    const timer = window.setTimeout(() => {
      handleLogout();
    }, remainingMs);
    return () => window.clearTimeout(timer);
  }, [authState]);

  useEffect(() => {
    if (authState !== "authenticated") return undefined;

    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    guardedAdminUrlRef.current = currentUrl;
    window.history.pushState(
      { ...(window.history.state || {}), adminGuard: true },
      "",
      currentUrl,
    );

    const handleBrowserNavigation = () => {
      if (allowNavigationRef.current) return;
      window.history.pushState(
        { ...(window.history.state || {}), adminGuard: true },
        "",
        guardedAdminUrlRef.current,
      );
      setShowLogoutConfirmation(true);
    };

    window.addEventListener("popstate", handleBrowserNavigation);
    return () =>
      window.removeEventListener("popstate", handleBrowserNavigation);
  }, [authState]);

  if (authState === "checking") return null;
  if (authState !== "authenticated") {
    return <Navigate to="/login" state={{ unauthorized: true }} replace />;
  }

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Admissions",
      path: "/admin/admissions",
      icon: <GraduationCap size={18} />,
    },
    { name: "Blogs & CMS", path: "/admin/blogs", icon: <FileText size={18} /> },
    {
      name: "Image Gallery",
      path: "/admin/gallery",
      icon: <Image size={18} />,
    },
    { name: "Video Manager", path: "/admin/videos", icon: <Video size={18} /> },
    {
      name: "Events Calendar",
      path: "/admin/events",
      icon: <Calendar size={18} />,
    },
    {
      name: "Feedback & Reviews",
      path: "/admin/feedback",
      icon: <MessageSquare size={18} />,
    },
    { name: "SEO Page", path: "/admin/seo", icon: <Globe size={18} /> },
    {
      name: "User Management",
      path: "/admin/users",
      icon: <Users size={18} />,
    },
  ];

  const handleLogout = async () => {
    allowNavigationRef.current = true;
    try {
      await apiService.logout();
    } catch {
      /* local navigation still protects the UI */
    }
    clearAdminSession();
    navigate("/login", { replace: true });
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "var(--surface-subtle)",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: isSidebarOpen ? "260px" : "0px",
          backgroundColor: "var(--primary-900)",
          color: "white",
          transition: "width 0.3s ease",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 200,
          boxShadow: "4px 0 15px rgba(0,0,0,0.15)",
        }}
      >
        <div>
          {/* Brand Header */}
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
            }}
          >
            <img
              src="/images/logo.png"
              alt="Jeeva Matric School Logo"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                objectFit: "contain",
                backgroundColor: "white",
                padding: "2px",
                border: "2px solid var(--accent-gold)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                flexShrink: 0,
              }}
            />
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "0.98rem",
                  color: "white",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                JEEVA MATRIC
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "var(--accent-gold-light)",
                  fontWeight: 600,
                }}
              >
                CMS Control Panel
              </div>
            </div>
          </div>

          {/* Nav List */}
          <nav style={{ padding: "1rem 0.75rem" }}>
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: "0.3rem",
                    color: active ? "white" : "#94a3b8",
                    backgroundColor: active
                      ? "var(--primary-700)"
                      : "transparent",
                    fontWeight: active ? 700 : 500,
                    fontSize: "0.92rem",
                    transition: "var(--transition-fast)",
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User info & Logout */}
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--accent-gold), var(--primary-600))",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              {currentUser?.username ? currentUser.username.charAt(0) : "A"}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "white",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentUser?.first_name
                  ? `${currentUser.first_name} ${currentUser.last_name || ""}`.trim()
                  : currentUser?.username || "Administrator"}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--accent-gold-light)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ color: "#10b981" }}>●</span>{" "}
                {currentUser?.is_superuser ? "Super Admin" : "Staff Admin"}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowLogoutConfirmation(true)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.6rem",
              background: "rgba(239, 68, 68, 0.2)",
              color: "#fca5a5",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {showLogoutConfirmation && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
        >
          <div className="modal-content logout-modal">
            <h2 id="logout-title">Logout Confirmation</h2>
            <p>Are you sure you want to logout?</p>
            <div className="logout-modal__actions">
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setShowLogoutConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: isSidebarOpen ? "260px" : "0px",
          transition: "margin-left 0.3s ease",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Topbar */}
        <header
          style={{
            height: "65px",
            background: "white",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            position: "sticky",
            top: 0,
            zIndex: 150,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--primary-900)",
              }}
            >
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <h3 style={{ fontSize: "1.15rem", color: "var(--primary-900)" }}>
              School Management System
            </h3>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--surface-subtle)",
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border-light)",
                fontSize: "0.82rem",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              />
              <span style={{ fontWeight: 600, color: "var(--primary-900)" }}>
                {currentUser?.username || "Admin"}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                ({currentUser?.is_superuser ? "Super" : "Staff"})
              </span>
            </div>

            <Link
              to="/"
              target="_blank"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.88rem",
                color: "var(--primary-600)",
                fontWeight: 600,
                background: "var(--primary-50)",
                padding: "0.4rem 0.9rem",
                borderRadius: "var(--radius-full)",
              }}
            >
              <ExternalLink size={14} /> View Live Website
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: "2rem", flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
