import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Map as MapIcon, X } from 'lucide-react';
import SleepFlowChart from './SleepFlowChart';

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


export const TimelineItem = ({ entry, onOpenTrip }) => {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const [showFlow, setShowFlow] = useState(false);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (showFlow && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
    const onKey = (e) => {
      if (e.key === 'Escape' && showFlow) setShowFlow(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showFlow]);

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

        {entry.type === 'flowchart' && (
          <button onClick={() => setShowFlow(true)} className="appearance-none bg-purple-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-purple-700 active:scale-95 transition-all shadow-lg">
            <span className="font-semibold">Open Isabel's Guide</span>
          </button>
        )} 
      </div>
      <div className={`flex-1 w-full max-w-sm mx-auto bg-white p-4 shadow-2xl border-4 border-white transition-all duration-1000 ${inView ? 'rotate-0' : 'rotate-3'} relative overflow-hidden ${entry.isPortrait ? 'aspect-[3/4]' : 'relative h-64 md:h-80'}`}>
        <ImageWithLoading src={entry.imageUrl} alt={entry.title} />
      </div>

      <AnimatePresence>
        {showFlow && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowFlow(false)} />
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} role="dialog" aria-modal="true" className="relative z-10 bg-white rounded-lg w-full max-w-3xl mx-4 p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">{entry.title} — Sleep Flowchart</h3>
                <button ref={closeBtnRef} onClick={() => setShowFlow(false)} className="p-2 rounded hover:bg-stone-100 text-stone-300 text-lg font-bold" aria-label="Close flowchart">
                <span aria-hidden="true">X</span>
              </button>
              </div>
              <div>
                <SleepFlowChart />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};