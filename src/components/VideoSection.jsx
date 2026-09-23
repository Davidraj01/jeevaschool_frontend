import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const schoolVideos = [{
  id: 'school-highlights', title: 'Jeeva School Highlights', thumbnail_url: '/media/school-campus.jpeg', video_url: '/media/school-highlights.mp4',
  description: 'A video glimpse of the school’s vibrant learning environment and community moments.', category: 'School life',
  caption: 'School highlights video. Visual scenes from Jeeva Matric Hr. Sec. School.'
}];

export default function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videos = schoolVideos;

  return <section className="section-padding media-video-section" aria-labelledby="video-heading"><div className="container">
    <div className="section-header"><span className="section-badge">Watch & Experience</span><h2 id="video-heading" className="section-title">Jeeva in Motion</h2><p className="section-subtitle">A closer look at the people, places, and moments that shape our school community.</p></div>
    <div className="media-video-grid">{videos.map((video) => <article className="media-video-card" key={video.id}>
      <button className="media-video-card__poster" onClick={() => setSelectedVideo(video)} aria-label={`Play ${video.title}`}><img src={video.thumbnail_url} alt="" loading="lazy" decoding="async" /><span className="media-video-card__play"><Play size={24} fill="currentColor" aria-hidden="true" /></span><span className="media-video-card__category">{video.category || 'Video'}</span></button>
      <div className="media-video-card__body"><h3>{video.title}</h3><p>{video.description}</p><button className="media-text-button" onClick={() => setSelectedVideo(video)}><Play size={16} aria-hidden="true" /> Watch video</button></div>
    </article>)}</div>
    {selectedVideo && <div className="modal-overlay" onClick={() => setSelectedVideo(null)} role="presentation"><section className="media-video-modal" role="dialog" aria-modal="true" aria-label={selectedVideo.title} onClick={(event) => event.stopPropagation()}>
      <div className="media-video-modal__header"><h3>{selectedVideo.title}</h3><button onClick={() => setSelectedVideo(null)} aria-label="Close video"><X size={22} /></button></div>
      {selectedVideo.video_url?.endsWith('.mp4') ? <video controls autoPlay playsInline preload="metadata" poster={selectedVideo.thumbnail_url}><source src={selectedVideo.video_url} type="video/mp4" /><p>Your browser does not support MP4 video. <a href={selectedVideo.video_url}>Download the video</a>.</p></video> : <iframe src={`${selectedVideo.video_url}?autoplay=1`} title={selectedVideo.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />}
      <p className="media-video-modal__caption">{selectedVideo.caption || selectedVideo.description}</p>
    </section></div>}
  </div></section>;
}
