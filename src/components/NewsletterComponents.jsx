import React, { useState, useRef, useEffect } from 'react';
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

  // Styles for the Modal Overlay and Box to ensure visibility
  const modalStyles = {
    overlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px'
    },
    box: {
      backgroundColor: 'white',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '700px',
      padding: '24px',
      position: 'relative',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    closeBtn: {
      position: 'absolute', top: '16px', right: '16px',
      background: '#f3f4f6', // Light gray bg
      border: 'none',
      borderRadius: '50%',
      width: '36px', height: '36px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer',
      color: '#1f2937', // Dark gray icon
      transition: 'background 0.2s'
    }
  };

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
          <button 
            onClick={() => setShowFlow(true)} 
            className="appearance-none bg-purple-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-purple-700 active:scale-95 transition-all shadow-lg"
          >
            <span className="font-semibold">Open Isabel's Guide</span>
          </button>
        )} 
      </div>
      
      <div className={`flex-1 w-full max-w-sm mx-auto bg-white p-4 shadow-2xl border-4 border-white transition-all duration-1000 ${inView ? 'rotate-0' : 'rotate-3'} relative overflow-hidden ${entry.isPortrait ? 'aspect-[3/4]' : 'relative h-64 md:h-80'}`}>
        <ImageWithLoading src={entry.imageUrl} alt={entry.title} />
      </div>

      <AnimatePresence>
        {showFlow && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            style={modalStyles.overlay}
          >
            {/* Click backdrop to close */}
            <div className="absolute inset-0" onClick={() => setShowFlow(false)} />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} 
              role="dialog" 
              aria-modal="true" 
              style={modalStyles.box}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
                
                {/* HIGH CONTRAST CLOSE BUTTON */}
                <button 
                  ref={closeBtnRef} 
                  onClick={() => setShowFlow(false)} 
                  style={modalStyles.closeBtn}
                  aria-label="Close flowchart"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Render the Flowchart Component */}
              <SleepFlowChart />
           
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
