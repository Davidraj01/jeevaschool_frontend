import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchModal from "./components/SearchModal";

// Public Pages
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import AcademicsPage from "./pages/AcademicsPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import GalleryPage from "./pages/GalleryPage";
import EventsPage from "./pages/EventsPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ContactPage from "./pages/ContactPage";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import DashboardOverview from "./admin/DashboardOverview";
import AdmissionsManager from "./admin/AdmissionsManager";
import BlogManager from "./admin/BlogManager";
import GalleryManager from "./admin/GalleryManager";
import VideoManager from "./admin/VideoManager";
import EventManager from "./admin/EventManager";
import FeedbackManager from "./admin/FeedbackManager";
import SEOManager from "./admin/SEOManager";
import UserManager from "./admin/UserManager";

function PublicLayout({ children, onOpenSearch }) {
  return (
    <>
      <Navbar onOpenSearch={onOpenSearch} />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Router>
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicLayout onOpenSearch={() => setIsSearchOpen(true)}>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout onOpenSearch={() => setIsSearchOpen(true)}>
              <AboutPage />
            </PublicLayout>
          }
        />
        <Route
          path="/academics"
          element={
            <PublicLayout onOpenSearch={() => setIsSearchOpen(true)}>
              <AcademicsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/admissions"
          element={
            <PublicLayout onOpenSearch={() => setIsSearchOpen(true)}>
              <AdmissionsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/gallery"
          element={
            <PublicLayout onOpenSearch={() => setIsSearchOpen(true)}>
              <GalleryPage />
            </PublicLayout>
          }
        />
        <Route
          path="/events"
          element={
            <PublicLayout onOpenSearch={() => setIsSearchOpen(true)}>
              <EventsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <PublicLayout onOpenSearch={() => setIsSearchOpen(true)}>
              <BlogPage />
            </PublicLayout>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PublicLayout onOpenSearch={() => setIsSearchOpen(true)}>
              <BlogDetailPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout onOpenSearch={() => setIsSearchOpen(true)}>
              <ContactPage />
            </PublicLayout>
          }
        />

        {/* Admin Login Route */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Admin Dashboard Protected Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="admissions" element={<AdmissionsManager />} />
          <Route path="blogs" element={<BlogManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="videos" element={<VideoManager />} />
          <Route path="events" element={<EventManager />} />
          <Route path="feedback" element={<FeedbackManager />} />
          <Route path="seo" element={<SEOManager />} />
          <Route path="users" element={<UserManager />} />
        </Route>

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
