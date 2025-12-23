import React, { useState, useRef, useEffect } from 'react';
import { Map, Source, Layer, Marker, Popup } from 'react-map-gl/mapbox'; 
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Map as MapIcon, X } from 'lucide-react';
import { TIMELINE_2025, PEI_COORDS, PEI_STOPS, imageMap } from './data';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;



// Reusable Image component with Shimmer Loading
const ImageWithLoading = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!isLoaded && !error && <Shimmer />}
      <img
        src={error ? "https://via.placeholder.com/800x600?text=Image+Coming+Soon" : src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

// Helper to generate Cloudinary URLs
const getCloudinaryUrl = (index) => {
  const cloudName = 'dhuaoanpn';
  
  const publicId = imageMap[index];

  // We keep the w_400 transformation so the popups load fast!
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_400,c_fill/${publicId}.jpg`;
};

export default function App() { 
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const audioRef = useRef(new Audio('/tranquil.mp3'));
  const mapRef = useRef();

  useEffect(() => {
    const fetchRoute = async () => {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${PEI_COORDS.join(';')}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
      );
      const data = await query.json();
      setRouteData(data.routes[0].geometry);
    };
    if (showMap) fetchRoute();
  }, [showMap]);

  useEffect(() => {
    const handleScroll = () => {
      // Show footer after user scrolls past the first 80% of the Hero height
      if (window.scrollY > window.innerHeight * 0.8) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 pb-24">
      {/* Audio Control */}
      <button onClick={() => { setIsPlaying(!isPlaying); isPlaying ? audioRef.current.pause() : audioRef.current.play(); }}
        className="fixed bottom-6 right-6 z-50 p-4 bg-white rounded-full shadow-xl border border-stone-200">
        {isPlaying ? <Volume2 className="text-blue-600" /> : <VolumeX className="text-stone-400" />}
      </button>

      {/* 1. Postcard Hero with Text Overlay */}
      <header className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        {/* The Background Image Container */}
        <div className="absolute inset-0 z-0">
          <ImageWithLoading 
            src="/images/hero.png" 
            alt="Botero Family Hero" 
            className="w-full h-full object-cover brightness-75" // Darkened slightly for text readability
          />
        </div>

        {/* Subtle Overlay to ensure text pops */}
        <div className="absolute inset-0 bg-black/20 z-10" />

        {/* The Text Content - Layered on top */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-20 text-center px-6"
        >
          <div className="bg-white/90 backdrop-blur-md p-8 md:p-16 shadow-2xl border-8 border-white inline-block">
            <h1 className="text-5xl md:text-7xl font-serif mb-4 italic text-stone-800">
              Merry Christmas!
            </h1>
            <p className="tracking-[0.3em] uppercase text-stone-500 font-medium text-sm md:text-base">
              The Botero Family 2025
            </p>
          </div>
        </motion.div>
      </header>

      {/* 2. Chronological Timeline */}
      <main className="max-w-4xl mx-auto py-24 px-6 space-y-48">
        {TIMELINE_2025.map((entry, i) => (
          <TimelineItem key={i} entry={entry} onOpenTrip={() => setShowMap(true)} />
        ))}
      </main>

      {/* 3. The Map Modal (Unchanged) */}
      <AnimatePresence>
      {showMap && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-white flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-serif text-xl">Our Road Trip to PEI</h2>
            <button 
              onClick={() => setShowMap(false)} 
              className="p-1 bg-transparent hover:bg-stone-100 border-none text-stone-500 hover:text-stone-800 transition-colors"
            >
              <X size={28} />
            </button>
          </div>
          <div className="flex-1">
            <Map ref={mapRef} initialViewState={{ longitude: -67, latitude: 44, zoom: 5.5 }}
              mapStyle="mapbox://styles/mapbox/outdoors-v12" mapboxAccessToken={MAPBOX_TOKEN}>
              
              {/* Route Line remains the same using PEI_COORDS */}
              {routeData && (
                <Source type="geojson" data={routeData}>
                  <Layer type="line" paint={{ 'line-color': '#2563eb', 'line-width': 3 }} />
                </Source>
              )}

              {/* Updated Marker Loop using PEI_STOPS */}
              {PEI_STOPS.map((stop, idx) => (
                <Marker key={idx} longitude={stop.coords[0]} latitude={stop.coords[1]}>
                  <MapPin 
                    className="text-orange-600 hover:text-green-700 transition-colors cursor-pointer" 
                    size={34}
                    onClick={() => {
                      mapRef.current.flyTo({ center: stop.coords, zoom: 7 });
                      // We now save the title into the state
                      setSelectedLocation({ 
                        longitude: stop.coords[0], 
                        latitude: stop.coords[1], 
                        index: idx,
                        title: stop.title 
                      });
                    }} 
                  />
                </Marker>
              ))}

              {/* Updated Popup with Title and Cloudinary Image */}
              {selectedLocation && (
                <Popup
                  longitude={selectedLocation.longitude}
                  latitude={selectedLocation.latitude}
                  anchor="bottom"
                  onClose={() => setSelectedLocation(null)}
                  closeOnClick={false}
                >
                  <div className="p-2 max-w-[220px]">
                    <h3 className="font-serif font-bold text-sm mb-2 text-stone-800 border-b pb-1">
                      {selectedLocation.title}
                    </h3>
                    <img 
                      src={getCloudinaryUrl(selectedLocation.index)} 
                      alt={selectedLocation.title} 
                      className="rounded mb-2 w-full h-32 object-cover shadow-sm"
                    />
                    <p className="text-[10px] font-sans italic text-stone-500 leading-tight">
                      Stop #{selectedLocation.index + 1} of our journey through Canada and back!
                    </p>
                  </div>
                </Popup>
              )}
            </Map>
          </div>
        </motion.div>
      )}
        {showFooter && (
          <motion.footer
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-stone-200 py-4 px-6 md:px-12 flex items-center justify-center shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)]"
          >
            <div className="max-w-4xl text-center">
              <p className="font-serif italic text-stone-700 text-sm md:text-base leading-relaxed">
                "For to us a child is born, to us a son is given... and his name shall be called... {" "}
                <span className="font-bold"> 
                  {/* Wonderful Counselor, Mighty God, Everlasting Father,  */}
                   Prince of Peace</span>."
              </p>
              <p className="uppercase tracking-widest text-[10px] text-stone-400 mt-2">
                Isaiah 9:6
              </p>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}

const TidePool = ({ inView, src }) => {
  return (
    <div className="relative w-full h-full bg-stone-100 overflow-hidden rounded-lg shadow-inner">
      {/* 1. The Revealed Image (Ocean Floor) */}
      <div className="absolute inset-0 z-0">
        <ImageWithLoading 
          src={src} 
          alt="The revealed ocean floor at Bay of Fundy" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. The Receding Water Overlay */}
      <motion.div 
        initial={{ height: "100%" }}
        animate={inView ? { height: "0%" } : { height: "100%" }}
        transition={{ duration: 6, ease: [0.45, 0.05, 0.55, 0.95] }}
        className="absolute top-0 left-0 right-0 bg-blue-600/40 backdrop-blur-[4px] z-20 flex items-center justify-center border-b-2 border-white/30"
      >
        {!inView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white font-serif italic text-xl drop-shadow-lg text-center px-4"
          >
            The Bay of Fundy <br/> 
            <span className="text-xs tracking-widest uppercase opacity-80">High Tide</span>
          </motion.div>
        )}
      </motion.div>

      {/* 3. Traveling Foam Line (The "Edge" of the tide) */}
      <motion.div 
        initial={{ top: "100%" }}
        animate={inView ? { top: "0%" } : { top: "100%" }}
        transition={{ duration: 6, ease: [0.45, 0.05, 0.55, 0.95] }}
        className="absolute left-0 right-0 h-2 bg-white/50 blur-sm z-30"
      />
    </div>
  );
};

function TimelineItem({ entry, onOpenTrip }) {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const isTide = entry.type === 'tide';
  const isPortrait = entry.isPortrait;

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      className="flex flex-col md:flex-row gap-12 items-center">
      
      <div className="flex-1">
        <h3 className="text-blue-600 font-bold mb-2 tracking-tighter uppercase text-sm">{entry.month}</h3>
        <h2 className="text-4xl font-serif mb-6">{entry.title}</h2>
        <p className="text-stone-600 mb-8 leading-relaxed">{entry.content}</p>
        {entry.type === 'trip' && (
          <button onClick={onOpenTrip} className="bg-stone-900 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <MapIcon size={18} /> View Driving Route
          </button>
        )}
      </div>

      <div className={`flex-1 w-full max-w-sm mx-auto bg-white p-4 shadow-2xl border-4 border-white transition-all duration-1000 
        ${inView ? 'rotate-0' : 'rotate-3'} relative overflow-hidden
        ${isPortrait ? 'aspect-[3/4]' : 'relative h-64 md:h-80 overflow-hidden'}`}> {/* Vertical vs Horizontal aspect ratio */}
        
        {isTide ? (
          <TidePool inView={inView} src={entry.imageUrl} />
        ) : (
          <ImageWithLoading src={entry.imageUrl} alt={entry.title} />
        )}
      </div>
    </motion.div>
  );
}

const Shimmer = () => (
  <div className="w-full h-full bg-stone-200 relative overflow-hidden">
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      animate={{ x: ['-100%', '100%'] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    />
  </div>
);