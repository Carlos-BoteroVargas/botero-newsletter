import React, { useState, useRef, useEffect } from 'react';
import { Map, Source, Layer, Marker, Popup, NavigationControl } from 'react-map-gl/mapbox'; 
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import IconFor from './Icons.jsx';

export default function RoadTripMap({ 
  isOpen, 
  onClose, 
  stops = [], 
  title = "Our Road Trip",
  mapboxToken 
}) {
  const [routeData, setRouteData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef();

  // Calculate the Center (Average) of all stops
  const getInitialCenter = () => {
    if (!stops.length) return { longitude: -67, latitude: 44 };
    
    const sum = stops.reduce(
      (acc, stop) => ({
        lng: acc.lng + stop.coords[0],
        lat: acc.lat + stop.coords[1],
      }),
      { lng: 0, lat: 0 }
    );

    return {
      longitude: (sum.lng / stops.length),
      latitude: (sum.lat / stops.length) - 1,
    };
  };

  const center = getInitialCenter();
  
  // Dynamic Zoom for Mobile (smaller zoom = wider view)
  const initialZoom = typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 5.5;

  // Independent Route Fetching logic based on provided stops
  useEffect(() => {
    if (!isOpen || stops.length < 2) return;

    const fetchRoute = async () => {
      // Mapbox Directions API expects "lng,lat;lng,lat"
      const coordsQuery = stops.map(s => s.coords.join(',')).join(';');
      try {
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${coordsQuery}?geometries=geojson&access_token=${mapboxToken}`
        );
        const data = await query.json();
        if (data.routes && data.routes[0]) {
          setRouteData(data.routes[0].geometry);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [isOpen, stops, mapboxToken]);

  const navigateStop = (direction) => {
    if (!selectedLocation) return;
  
    const totalStops = stops.length;
    let newIdx = direction === 'next' 
      ? (selectedLocation.index + 1) % totalStops 
      : (selectedLocation.index - 1 + totalStops) % totalStops;
  
    const nextStop = stops[newIdx];
    
    mapRef.current?.flyTo({ 
      center: nextStop.coords, 
      zoom: 7,
      duration: 2000, 
      essential: true 
    });
  
    setSelectedLocation({
      longitude: nextStop.coords[0],
      latitude: nextStop.coords[1],
      index: newIdx,
      title: nextStop.title,
      img: nextStop.imageId,
      desc: nextStop.description,
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 bg-white flex flex-col"
    >
      {/* Header Area */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-serif text-xl">{title}</h2>
        <button 
          onClick={onClose} 
          className="p-1 bg-transparent border-0 text-stone-500 hover:text-stone-800 transition-colors appearance-none outline-none"
        >
          <X size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Map Area */}
      <div className="flex-1">
        <Map 
          ref={mapRef} 
          initialViewState={{ 
            ...center, // Uses the calculated average Lng/Lat
            zoom: initialZoom,
            pitch: 50,    // 50 degrees tilt for a 3D look
            bearing: -10  // Slight rotation 
          }}
          mapStyle="mapbox://styles/mapbox/outdoors-v12" //light-v11 dark-v11 outdoors-v11 satellite-streets-v11
          mapboxAccessToken={mapboxToken}
        >
          <NavigationControl position="top-right" visualizePitch={true} />

          {routeData && (
            <>
              <Source type="geojson" data={routeData}>
                <Layer type="line" paint={{ 'line-color': '#2563eb', 'line-width': 2 }} />
              </Source>
              <Source type="geojson" data={routeData}>
                <Layer
                  id="road-single"
                  type="line"
                  layout={{ 'line-cap': 'round', 'line-join': 'round' }}
                  paint={{ 'line-color': '#374151', 'line-width': 8, 'line-blur': 0.6, 'line-opacity': 0.95 }}
                />
              </Source>
            </>
          )}

          {stops.map((stop, idx) => (
            <Marker key={idx} longitude={stop.coords[0]} latitude={stop.coords[1]}>
              <button
                onClick={() => { mapRef.current.flyTo({ center: stop.coords, zoom: 7.5 }); setSelectedLocation({ 
                    longitude: stop.coords[0], 
                    latitude: stop.coords[1], 
                    index: idx,
                    title: stop.title,
                    img: stop.imageId,
                    desc: stop.description,
                  }); }}
                className="group min-w-[44px] min-h-[44px] p-0 rounded-full flex items-center justify-center touch-manipulation"
                aria-label={stop.title}
                style={{ background: 'transparent', border: 0 }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12">
                  <IconFor name={stop.icon} className="w-full h-full" title={stop.title} idx={idx} />
                </div>
              </button>
            </Marker>
          ))}

          {selectedLocation && (
            <Popup
              longitude={selectedLocation.longitude}
              latitude={selectedLocation.latitude}
              anchor="bottom"
              onClose={() => setSelectedLocation(null)}
              closeOnClick={false}
              maxWidth="350px"
            >
              <div className="flex items-center gap-1 max-w-[16rem]">
                {/* Left Button */}
                {selectedLocation.index !== 0 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigateStop('prev'); }}
                    className="p-1 hover:scale-110 transition-transform bg-transparent border-none cursor-pointer outline-none"
                    style={{ backgroundColor: "transparent", border: "0" }}
                  >
                    <p className="text-stone-600 text-[18px]">{"<"}</p>
                  </button>
                )}

                {/* Content */}
                <div className="flex-1 bg-white p-1">
                  <h3 className="font-serif font-bold text-sm mb-2 text-stone-800 border-b pb-1">
                    {selectedLocation.title}
                  </h3>
                  <img 
                    src={selectedLocation.img.startsWith("https") ? selectedLocation.img : `https://res.cloudinary.com/dhuaoanpn/image/upload/w_400,c_fill/${selectedLocation.img}.jpg`} 
                    alt={selectedLocation.title} 
                    className="rounded mb-2 w-full h-full object-cover shadow-sm"
                  />
                  <p className="text-[12px] font-sans italic text-stone-500 leading-tight">
                    Stop #{selectedLocation.index + 1}: {selectedLocation.desc}
                  </p>
                </div>

                {/* Right Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); navigateStop('next'); }}
                  className="p-1 hover:scale-110 transition-transform bg-transparent border-none cursor-pointer outline-none"
                  style={{ backgroundColor: "transparent", border: "0" }}
                >
                  <p className="text-stone-600 text-[18px]">{">"}</p>
                </button>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </motion.div>
  );
}