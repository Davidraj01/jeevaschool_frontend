import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import GallerySection from '../components/GallerySection';
import VideoSection from '../components/VideoSection';
import EventSection from '../components/EventSection';
import BlogSection from '../components/BlogSection';
import FeedbackSection from '../components/FeedbackSection';
import ContactSection from '../components/ContactSection';
import AdmissionForm from '../components/AdmissionForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <FeaturesSection />

      {/* Quick Admission Banner */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', color: 'white' }}>
        <div className="container">
          <AdmissionForm />
        </div>
      </section>

      <GallerySection />
      <VideoSection />
      <EventSection />
      <BlogSection />
      <FeedbackSection />
      <ContactSection />
    </main>
  );
}
