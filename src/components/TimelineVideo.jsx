import React, { useEffect, useRef } from 'react';

const TimelineVideo = ({ publicId, inView, title }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (inView) {
      videoRef.current?.play().catch(() => {}); // Play when month is in view
    } else {
      videoRef.current?.pause(); // Pause when user scrolls away
    }
  }, [inView]);

  const handleVideoEnd = () => {
    // Wait 5 seconds before restarting the loop
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 5000);
  };

  // Cloudinary optimized URLs
  const videoUrl = `https://res.cloudinary.com/dhuaoanpn/video/upload/f_auto,q_auto/${publicId}.mp4`;
  const posterUrl = `https://res.cloudinary.com/dhuaoanpn/video/upload/f_auto,q_auto/${publicId}.jpg`;

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      poster={posterUrl}
      muted
      playsInline
      onEnded={handleVideoEnd}
      className="w-full h-full object-cover"
      aria-label={title}
    />
  );
};

export default TimelineVideo;