import React from 'react';
import './Polaroids.css';

const Polaroids = () => {
  const photos = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dhuaoanpn/image/upload/f_auto,q_auto,c_fill,g_center,w_600,h_600/v1766766750/Baby_cy0cuz.png", // f_auto,q_auto,c_fill,g_center,w_600,h_600/
      caption: "Our baby girl's 1st year",
      rotation: "-2deg"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dhuaoanpn/image/upload/c_crop,g_north_west,h_973,w_974/v1766863557/1766862971817_zzqgj3.png",
      caption: "Summer in Nice & Paris",
      rotation: "3deg"
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dhuaoanpn/image/upload/f_auto,q_auto,c_fill,g_center,w_600,h_600/v1766519623/March2_sdjyga.jpg",
      caption: "26.2 miles in October",
      rotation: "-1deg"
    }
  ];

  return (
    <div className="photo-grid-container">
      {photos.map((photo) => (
        <div 
          key={photo.id} 
          className="polaroid-wrapper" 
          style={{ transform: `rotate(${photo.rotation})` }}
        >
          <div className="polaroid-image-container">
            <img src={photo.src} alt={photo.caption} className="polaroid-img" />
          </div>
          <p className="polaroid-caption">{photo.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default Polaroids;