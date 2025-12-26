import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Papa from 'papaparse';
import RoadTripMap from './components/RoadTripMap';
import { ImageWithLoading, TimelineItem } from './components/NewsletterComponents';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const GOOGLE_SHEET_CSV_URL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL || '';

export default function App() { 
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const audioRef = useRef(new Audio('/tranquil.mp3'));
  
  const DEFAULT_YEAR = '2025';
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
      let loadedTimeline = [];
      let loadedStops = [];

      try {
        // 1. Primary logic for 2026: Try Google Sheets first
        if (yr === '2026') {
          try {
            const response = await fetch(GOOGLE_SHEET_CSV_URL);
            console.log("Here it is", response);
            
            if (!response.ok) throw new Error("Sheet fetch failed");

            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('text/html')) {
              const html = await response.text();
              console.warn('Spreadsheet URL returned HTML — likely an invalid URL or missing VITE_ prefix. Response snippet:', html.slice(0, 400));
              throw new Error('Spreadsheet returned HTML instead of CSV');
            }
            
            const csvText = await response.text();
            const result = Papa.parse(csvText, { 
              header: true, 
              skipEmptyLines: true 
            });
            console.log("Here is the result", result);

            if (result.errors && result.errors.length) {
              console.warn('Papa.parse errors:', result.errors);
              // optionally: throw new Error('CSV parse errors');
            }            

            // Map sheet columns to component props
            loadedTimeline = result.data.map(row => ({
              month: row.month,
              title: row.title,
              content: row.content,
              type: row.type,
              imageUrl: row.imageUrl,
              isPortrait: row['Image Orientation (isPortrait)']?.toUpperCase() === 'TRUE'
            }));

            if (loadedTimeline.length === 0) throw new Error("Sheet is empty");
            console.log("Loaded 2026 data from Google Sheets.");
          } catch (sheetErr) {
            console.warn("Spreadsheet load failed, falling back to local 2026.js", sheetErr);
            // Fall through to local file loading logic
          }
        }

        // 2. Local File Loading (Fallback for 2026 or primary for other years)
        if (loadedTimeline.length === 0) {
          const module = await import(`./data/${yr}.js`);
          
          // Use specific TIMELINE_YYYY key or generic TIMELINE
          const timelineKey = `TIMELINE_${yr}`;
          loadedTimeline = module[timelineKey] || module.TIMELINE || [];
          
          const stopsKey = Object.keys(module).find(k => k.endsWith('_STOPS'));
          loadedStops = module[stopsKey] || [];
          console.log(`Loaded ${yr} from local data file.`);
        }

        if (!isMounted) return;

        setYear(yr);
        setTimeline(loadedTimeline);
        setStops(loadedStops);
        document.title = `Botero Family - ${yr}`;
        setNotFoundYear(null);

      } catch (err) {
        console.warn(`No data for year ${yr}, falling back to ${DEFAULT_YEAR}`, err);
        if (yr !== DEFAULT_YEAR) {
          handleRedirect(yr);
        }
      }
    };

    const handleRedirect = (yr) => {
      if (redirectTimerRef.current) clearInterval(redirectTimerRef.current);
      setNotFoundYear(yr);
      let secs = 7;
      setRedirectCountdown(secs);

      loadYear(DEFAULT_YEAR);

      redirectTimerRef.current = setInterval(() => {
        secs -= 1;
        setRedirectCountdown(secs);
        if (secs <= 0) {
          clearInterval(redirectTimerRef.current);
          window.history.replaceState({}, '', `/${DEFAULT_YEAR}`);
          setNotFoundYear(null);
        }
      }, 1000);
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
      if (redirectTimerRef.current) clearInterval(redirectTimerRef.current);
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
      <button 
        onClick={() => { setIsPlaying(!isPlaying); isPlaying ? audioRef.current.pause() : audioRef.current.play(); }}
        className="fixed bottom-23 right-6 z-50 p-4 bg-white rounded-full shadow-xl border border-stone-200"
      >
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
            <p className="tracking-[0.3em] uppercase text-stone-500 text-sm">
              {`The Botero Family - ${year}`}
            </p>
            <p className="tracking-[0.3em] text-stone-400 mt-6 text-xs">
              (scroll down to see the news!)
            </p>
          </div>
        </motion.div>
      </header>

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
              <button onClick={() => {
                if (redirectTimerRef.current) clearInterval(redirectTimerRef.current);
                window.history.replaceState({}, '', `/${DEFAULT_YEAR}`);
                setNotFoundYear(null);
              }} className="px-3 py-1 bg-green-600 text-white rounded shadow hover:bg-green-700">Go now</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 2. Chronological Timeline */}
      <main className="max-w-4xl mx-auto py-24 px-6 space-y-48">
        {timeline.map((entry, i) => (
          <TimelineItem 
            key={i} 
            entry={entry} 
            onOpenTrip={() => {setShowMap(true); setMapTitle(entry.title)}} 
          />
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