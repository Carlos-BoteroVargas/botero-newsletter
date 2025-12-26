import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
// import { TIMELINE_2025 } from './data/2025';
import RoadTripMap from './components/RoadTripMap';
import { ImageWithLoading, TimelineItem } from './components/NewsletterComponents';


const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  

export default function App() { 
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const audioRef = useRef(new Audio('/tranquil.mp3'));
  // Dynamic year selection based on the URL path (e.g., /2025)
  const DEFAULT_YEAR = '2026';
  const [year, setYear] = useState(DEFAULT_YEAR);
  const [timeline, setTimeline] = useState([]);
  const [stops, setStops] = useState([]);
  const [mapTitle, setMapTitle] = useState('Road Trip');

  // 404 / redirect state
  const [notFoundYear, setNotFoundYear] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(0);
  const redirectTimerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadYear = async (yr) => {
      try {
        const module = await import(`./data/${yr}.js`);
        const timelineKey = Object.keys(module).find(k => k.startsWith('TIMELINE'));
        const loadedTimeline = module[timelineKey] || module.TIMELINE || [];
        const stopsKey = Object.keys(module).find(k => k.endsWith('_STOPS'));
        const loadedStops = module[stopsKey] || [];
        // const title = module.MAP_TITLE || (yr === '2025' ? 'Our Road Trip to PEI' : 'Our August Road Trip to PEI');

        if (!isMounted) return;
        setYear(yr);
        setTimeline(loadedTimeline);
        setStops(loadedStops);
        // setMapTitle(title);
        document.title = `Botero Family - ${yr}`;
      } catch (err) {
        console.warn(`No data for year ${yr}, falling back to ${DEFAULT_YEAR}`, err);
        if (yr !== DEFAULT_YEAR) {
          // Show a small 404 banner and schedule a redirect to the default year
          if (redirectTimerRef.current) {
            clearInterval(redirectTimerRef.current);
            redirectTimerRef.current = null;
          }
          setNotFoundYear(yr);
          const COUNT = 7; // seconds to redirect
          setRedirectCountdown(COUNT);

          // Load default data immediately so user sees content
          loadYear(DEFAULT_YEAR);

          // Start countdown to replace the URL to the default year
          let secs = COUNT;
          redirectTimerRef.current = setInterval(() => {
            secs -= 1;
            setRedirectCountdown(secs);
            if (secs <= 0) {
              clearInterval(redirectTimerRef.current);
              redirectTimerRef.current = null;
              window.history.replaceState({}, '', `/${DEFAULT_YEAR}`);
              setNotFoundYear(null);
            }
          }, 1000);
        }
      }
    };

    const getYearFromPath = () => {
      const match = window.location.pathname.match(/^\/(\d{4})$/);
      return match ? match[1] : DEFAULT_YEAR;
    };

    const handlePop = () => loadYear(getYearFromPath());

    loadYear(getYearFromPath());
    window.addEventListener('popstate', handlePop);
    return () => { 
      isMounted = false; 
      window.removeEventListener('popstate', handlePop); 
      if (redirectTimerRef.current) { clearInterval(redirectTimerRef.current); redirectTimerRef.current = null; }
    };
  }, []);

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
          <ImageWithLoading src={`/images/hero${year}.png`} alt={`Botero Family Hero ${year}`} className="brightness-75" />
        </div>
        <div className="absolute inset-0 bg-black/20 z-10" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-20 text-center px-6">
          <div className="bg-white/90 backdrop-blur-md p-8 md:p-16 shadow-2xl border-8 border-white">
            <h1 className="text-5xl md:text-7xl font-serif mb-4 italic">Merry Christmas!</h1>
            <p className="tracking-[0.3em] uppercase text-stone-500 text-sm">{`The Botero Family - ${year}`}</p>
            <p className="tracking-[0.3em] text-stone-400 mt-6 text-xs">(scroll down to see the news!)</p>
          </div>
        </motion.div>
      </header>

      {/* 2. Chronological Timeline */}
        {/* Not-found / Redirect Banner */}
        {notFoundYear && (
          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24 px-4 pointer-events-none">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-red-50 via-green-50 to-yellow-50 border-2 border-red-200 p-4 rounded-xl shadow-2xl max-w-xl w-full pointer-events-auto">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-3xl">🎄</motion.div>
                  <div>
                    <h3 className="font-bold text-stone-800">Year {notFoundYear} not found</h3>
                    <p className="text-sm text-stone-600 mt-1">Redirecting to <span className="font-semibold text-stone-800">{DEFAULT_YEAR}</span> in <span className="font-mono">{redirectCountdown}s</span></p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {
                    if (redirectTimerRef.current) { clearInterval(redirectTimerRef.current); redirectTimerRef.current = null; }
                    window.history.replaceState({}, '', `/${DEFAULT_YEAR}`);
                    setNotFoundYear(null);
                  }} className="px-3 py-1 bg-green-600 text-white rounded shadow hover:bg-green-700">Go now</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

      <main className="max-w-4xl mx-auto py-24 px-6 space-y-48">
        {timeline.map((entry, i) => (
          <TimelineItem key={i} entry={entry} onOpenTrip={() => {setShowMap(true); setMapTitle(entry.title)}} />
        ))}
      </main>

      {/* 3. The Reusable Map Component */}
      <AnimatePresence>
        {showMap && (
          <RoadTripMap 
            isOpen={showMap}
            onClose={() => setShowMap(false)}
            stops={stops}
            title={mapTitle}
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