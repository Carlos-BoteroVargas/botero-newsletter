import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { TIMELINE_2025, PEI_STOPS } from './data/PEI';
import RoadTripMap from './components/RoadTripMap';
import { ImageWithLoading, TimelineItem } from './components/NewsletterComponents';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function App() { 
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const audioRef = useRef(new Audio('/tranquil.mp3'));

  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 pb-24">
      {/* Audio Control */}
      <button onClick={() => { setIsPlaying(!isPlaying); isPlaying ? audioRef.current.pause() : audioRef.current.play(); }}
        className="fixed bottom-23 right-6 z-50 p-4 bg-white rounded-full shadow-xl border border-stone-200">
        {isPlaying ? <Volume2 className="text-blue-600" /> : <VolumeX className="text-stone-400" />}
      </button>

      {/* 1. Postcard Hero */}
      <header className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithLoading src="/images/hero.png" alt="Botero Family Hero" className="brightness-75" />
        </div>
        <div className="absolute inset-0 bg-black/20 z-10" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-20 text-center px-6">
          <div className="bg-white/90 backdrop-blur-md p-8 md:p-16 shadow-2xl border-8 border-white">
            <h1 className="text-5xl md:text-7xl font-serif mb-4 italic">Merry Christmas!</h1>
            <p className="tracking-[0.3em] uppercase text-stone-500 text-sm">The Botero Family 2025</p>
          </div>
        </motion.div>
      </header>

      {/* 2. Chronological Timeline */}
      <main className="max-w-4xl mx-auto py-24 px-6 space-y-48">
        {TIMELINE_2025.map((entry, i) => (
          <TimelineItem key={i} entry={entry} onOpenTrip={() => setShowMap(true)} />
        ))}
      </main>

      {/* 3. The Reusable Map Component */}
      <AnimatePresence>
        {showMap && (
          <RoadTripMap 
            isOpen={showMap}
            onClose={() => setShowMap(false)}
            stops={PEI_STOPS}
            title="Our August Road Trip to PEI"
            mapboxToken={MAPBOX_TOKEN}
          />
        )}
      </AnimatePresence>

      {/* 4. Footer Overlay */}
      <AnimatePresence>
        {showFooter && (
          <motion.footer initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t py-4 text-center">
            <p className="font-serif italic text-stone-700 text-sm md:text-base">
              "For to us a child is born... <span className="font-bold">Prince of Peace</span>."
            </p>
            <p className="uppercase tracking-widest text-[10px] text-stone-400 mt-2">Isaiah 9:6</p>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}