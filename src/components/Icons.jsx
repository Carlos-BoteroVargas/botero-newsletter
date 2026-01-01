import React from "react";

export function EiffelIcon({ className = "", title = "Eiffel Tower" }) {
  return (
    <img width="100" height="100" src="https://img.icons8.com/comic/100/eiffel-tower.png" alt={title} className={className}/>
  );
}

export function StartIcon({ className = "", title = "Nice Airport" }) {
  return (
    <img width="75" height="75" src="https://img.icons8.com/doodle/48/finish-flag.png" alt={title} className={className}/>
  );
}

export function AqueductIcon({ className = "", title = "Aqueduct" }) {
  return (
    <img width="100" height="100" src="https://img.icons8.com/external-others-pike-picture/50/external-Aqueduct-rome-others-pike-picture.png" alt={title} className={className}/>
  );
}

export function PotteryIcon({ className = "", title = "Pottery" }) {
  return (
    <img width="78" height="78" src="https://img.icons8.com/external-linear-outline-icons-papa-vector/78/external-Porcelain-china-linear-outline-icons-papa-vector.png"  alt={title} className={className} />
  );
}

export function AbbeyIcon({ className = "", title = "Abbey" }) {
  return (
    <img width="75" height="75" src="https://img.icons8.com/doodle/48/national-park.png" alt={title} className={className}/>
  );
}

export function CastleIcon({ className = "", title = "Carcassone" }) {
  return (
    <img width="75" height="75" src="https://res.cloudinary.com/dhuaoanpn/image/upload/v1766795184/castle_dfjcze.jpg" alt={title} className={className}/>
  );
}

export function GuideIcon({ className = "", title = "Isabel's Guide" }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label={title}>
      {/* Top node */}
      <circle cx="10" cy="2" r="1.6" stroke="currentColor" strokeWidth="1.2" fill="none" />

      {/* Middle process box */}
      <rect x="7.5" y="9" width="9" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />

      {/* Bottom node */}
      <circle cx="12" cy="19" r="1.6" stroke="currentColor" strokeWidth="1.2" fill="none" />

      {/* Connectors */}
      <path d="M10 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 13v5.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      {/* Decision branches (little arrows) */}
      <path d="M16 11.5l1-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 11.5l-1-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      {/* Small accents to make it whimsical */}
      <circle cx="20" cy="3" r="0.6" fill="currentColor" />
      <circle cx="5" cy="18" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function DefaultPin({ index, small = false }) {
  const sizeClasses = small ? "w-5 h-5 text-[10px]" : "w-8 h-8 text-xs";
  return (
    <div 
      // className={`flex items-center justify-center ${sizeClasses} bg-orange-400 rounded-full border-2 border-white shadow-lg text-white font-bold ${className}`}
      className={`${sizeClasses} bg-orange-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-all ${!small &&"group-hover:bg-green-700"} group-hover:scale-110 `}
    >
      {index !== null && index !== undefined ? index + 1 : null}
    </div>
  );
};

export default function IconFor({ name, className, title, idx }) {
  const index = typeof idx === 'number' ? idx : null;
  if (!name) return <DefaultPin index={index} className={className} />;

  const n = name.toLowerCase();

  const withBadge = (iconEl) => (
    <div className="relative inline-block">
      {iconEl}
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none">
        <DefaultPin index={index} small />
      </div>
    </div>
  );

  if (n === "eiffel") return withBadge(<EiffelIcon className={className} title={title || "Eiffel Tower"} />);
  if (n === "aqueduct") return withBadge(<AqueductIcon className={className} title={title || "Aqueduct"} />);
  if (n === "pottery") return withBadge(<PotteryIcon className={className} title={title || "Pottery"} />);
  if (n === "abbey") return withBadge(<AbbeyIcon className={className} title={title || "Abbey"} />);
  if (n === "start") return withBadge(<StartIcon className={className} title={title || "Starting Point"} />);
  if (n === "castle") return withBadge(<CastleIcon className={className} title={title || "Carcassone"} />);

  // treat as URL (photo icon)
  if (/^https?:\/\//.test(name)) {
    return withBadge(<img src={name} alt={title || "icon"} className={`${className} rounded-full`} />);
  }

  return <DefaultPin index={index} className={className} />;
}

