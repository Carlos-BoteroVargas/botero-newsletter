import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Map as MapIcon } from 'lucide-react';

export const Shimmer = () => (
  <div className="w-full h-full bg-stone-200 relative overflow-hidden">
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      animate={{ x: ['-100%', '100%'] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    />
  </div>
);

export const ImageWithLoading = ({ src, alt, className }) => {
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

export const TidePool = ({ inView, src }) => (
  <div className="relative w-full h-full bg-stone-100 overflow-hidden rounded-lg shadow-inner">
    <div className="absolute inset-0 z-0">
      <ImageWithLoading src={src} alt="Tide Pool" className="w-full h-full object-cover" />
    </div>
    <motion.div 
      initial={{ height: "100%" }}
      animate={inView ? { height: "0%" } : { height: "100%" }}
      transition={{ duration: 6, ease: [0.45, 0.05, 0.55, 0.95] }}
      className="absolute top-0 left-0 right-0 bg-blue-600/40 backdrop-blur-[4px] z-20 flex items-center justify-center border-b-2 border-white/30"
    >
      {!inView && (
        <motion.div className="text-white font-serif italic text-xl drop-shadow-lg text-center px-4">
          The Bay of Fundy <br/> <span className="text-xs tracking-widest uppercase opacity-80">High Tide</span>
        </motion.div>
      )}
    </motion.div>
  </div>
);

export const TimelineItem = ({ entry, onOpenTrip }) => {
  const { ref, inView } = useInView({ threshold: 0.4 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      className="flex flex-col md:flex-row gap-12 items-center">
      <div className="flex-1">
        <h3 className="text-blue-600 font-bold mb-2 tracking-tighter uppercase text-sm">{entry.month}</h3>
        <h2 className="text-4xl font-serif mb-6">{entry.title}</h2>
        <p className="text-stone-600 mb-8 leading-relaxed">{entry.content}</p>
        {entry.type === 'trip' && (
          <button onClick={onOpenTrip} className="appearance-none !bg-stone-900 text-white px-8 py-4 rounded-full flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all shadow-lg">
            <MapIcon size={18} /> <span className="font-semibold">View Driving Route</span>
          </button>
        )}
      </div>
      <div className={`flex-1 w-full max-w-sm mx-auto bg-white p-4 shadow-2xl border-4 border-white transition-all duration-1000 ${inView ? 'rotate-0' : 'rotate-3'} relative overflow-hidden ${entry.isPortrait ? 'aspect-[3/4]' : 'relative h-64 md:h-80'}`}>
        {entry.type === 'tide' ? <TidePool inView={inView} src={entry.imageUrl} /> : <ImageWithLoading src={entry.imageUrl} alt={entry.title} />}
      </div>
    </motion.div>
  );
};