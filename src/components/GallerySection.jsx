import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const schoolGallery = [
  { id: 'campus', title: 'Our Jeeva Campus', image_url: '/media/school-campus.jpeg', category: 'CAMPUS', description: 'The welcoming Jeeva Matric Hr. Sec. School campus at Melpakkam Yard, Arakkonam.' },
  { id: 'primary-class', title: 'Learning Comes Alive', image_url: '/media/primary-classroom.jpeg', category: 'ACADEMICS', description: 'Young learners reading together in a bright, colourful classroom.' },
  { id: 'senior-class', title: 'Focused Classroom Learning', image_url: '/media/senior-classroom.jpeg', category: 'ACADEMICS', description: 'A guided senior classroom session with attentive students.' },
  { id: 'badminton', title: 'Badminton Champions', image_url: '/media/badminton-champions.jpeg', category: 'SPORTS', description: 'Celebrating our students’ badminton achievement with teachers and coaches.' },
  { id: 'trophy', title: 'A Proud Trophy Moment', image_url: '/media/trophy-presentation.jpeg', category: 'SPORTS', description: 'Recognising student effort, talent, and sporting spirit.' },
  { id: 'awards', title: 'Student Achievement Awards', image_url: '/media/student-awards.jpeg', category: 'SPORTS', description: 'Medals and certificates presented to our proud achievers.' },
  { id: 'assembly', title: 'Student Leadership Assembly', image_url: '/media/student-assembly.jpeg', category: 'EVENTS', description: 'Students assembled with pride for a school celebration.' },
  { id: 'leaders', title: 'Independence Day Leaders', image_url: '/media/independence-day-leaders.jpeg', category: 'EVENTS', description: 'Student leaders and teachers at an Independence Day programme.' },
  { id: 'children', title: 'Young Patriots', image_url: '/media/independence-day-children.jpeg', category: 'EVENTS', description: 'Primary students celebrating India’s diversity and unity.' },
  { id: 'bus', title: 'Safe School Transport', image_url: '/media/school-bus.jpeg', category: 'CAMPUS', description: 'Our school bus ready to support safe everyday travel.' },
  { id: 'playground', title: 'Play, Explore & Grow', image_url: '/media/playground.jpeg', category: 'CAMPUS', description: 'A shaded outdoor play area for joyful early learning.' },
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState(null);
  const items = schoolGallery;

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setSelectedImage(null);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const filteredItems = activeTab === 'ALL' ? items : items.filter((item) => item.category?.toUpperCase() === activeTab);
  const move = (direction) => setSelectedImage((current) => filteredItems[(filteredItems.findIndex((item) => item.id === current.id) + direction + filteredItems.length) % filteredItems.length]);

  return <section className="section-padding media-gallery" aria-labelledby="gallery-heading">
    <div className="container">
      <div className="section-header"><span className="section-badge">Life at Jeeva</span><h2 id="gallery-heading" className="section-title">Moments That Matter</h2><p className="section-subtitle">Discover classroom learning, campus spaces, achievements, celebrations, and the everyday joy of school life.</p></div>
      <div className="media-filter" aria-label="Filter gallery photos">
        {['ALL', 'CAMPUS', 'ACADEMICS', 'EVENTS', 'SPORTS'].map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`media-filter__button ${activeTab === tab ? 'is-active' : ''}`} aria-pressed={activeTab === tab}>{tab === 'ALL' ? 'All moments' : tab}</button>)}
      </div>
      <div className="media-grid">
        {filteredItems.map((item, index) => <button key={item.id} className={`media-tile media-tile--${(index % 5) + 1}`} onClick={() => setSelectedImage(item)} aria-label={`View ${item.title}`}>
          <img src={item.image_url} alt={item.title} loading={index < 4 ? 'eager' : 'lazy'} decoding="async" />
          <span className="media-tile__shade" /><span className="media-tile__content"><small>{item.category}</small><strong>{item.title}</strong><em><Maximize2 size={14} aria-hidden="true" /> View photo</em></span>
        </button>)}
      </div>
      {selectedImage && <div className="modal-overlay" onClick={() => setSelectedImage(null)} role="presentation"><section className="media-lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.title} onClick={(event) => event.stopPropagation()}>
        <button className="media-lightbox__close" onClick={() => setSelectedImage(null)} aria-label="Close photo viewer"><X size={22} /></button><img src={selectedImage.image_url} alt={selectedImage.title} />
        <div className="media-lightbox__caption"><span>{selectedImage.category}</span><h3>{selectedImage.title}</h3><p>{selectedImage.description}</p></div>
        {filteredItems.length > 1 && <><button className="media-lightbox__arrow media-lightbox__arrow--previous" onClick={() => move(-1)} aria-label="Previous photo"><ChevronLeft /></button><button className="media-lightbox__arrow media-lightbox__arrow--next" onClick={() => move(1)} aria-label="Next photo"><ChevronRight /></button></>}
      </section></div>}
    </div>
  </section>;
}
