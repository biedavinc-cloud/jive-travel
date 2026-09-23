import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

// 20 real country / landmark images (Unsplash — external host, plain <img> is correct)
const SLIDES = [
  { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80", label: "Paris, France", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1600&q=80", label: "New York, United States", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1513635262778-9c6b2b3d3b3b?w=1600&q=80", label: "London, United Kingdom", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1600&q=80", label: "Toronto, Canada", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1506973035872-a4ec0b3558f0?w=1600&q=80", label: "Sydney, Australia", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1540959733332-eab4ffabeeaf?w=1600&q=80", label: "Mount Fuji, Japan", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1525629205452-419fe9e326e7?w=1600&q=80", label: "Marina Bay, Singapore", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600&q=80", label: "Great Wall, China", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80", label: "Dubai, United Arab Emirates", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1483729558449-25a6c7778b48?w=1600&q=80", label: "Rio de Janeiro, Brazil", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1508009703855-80849d926b6e?w=1600&q=80", label: "Bangkok, Thailand", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1524231757912-59f371a2116e?w=1600&q=80", label: "Istanbul, Turkey", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1580060839134-75a5edca2e81?w=1600&q=80", label: "Cape Town, South Africa", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1564507592333-c6065745f8d5?w=1600&q=80", label: "Taj Mahal, India", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&q=80", label: "Rome, Italy", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1600&q=80", label: "Barcelona, Spain", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1560969184-10bd22042f5f?w=1600&q=80", label: "Berlin, Germany", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1547448415-e9f5b88e54b6?w=1600&q=80", label: "Moscow, Russia", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1539650116574-75c6ba616f6d?w=1600&q=80", label: "Pyramids of Giza, Egypt", fallback: "#1a1a2e" },
  { url: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1600&q=80", label: "Seoul, South Korea", fallback: "#1a1a2e" },
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="absolute inset-0 bg-navy">
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundColor: s.fallback }}
        >
          <img
            src={s.url}
            alt={s.label}
            className="w-full h-full object-cover"
            loading={i < 3 ? "eager" : "lazy"}
            onLoad={() => setLoadedImages((p) => ({ ...p, [i]: true }))}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      ))}

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* Navigation arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white items-center justify-center hover:bg-white/20 transition z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white items-center justify-center hover:bg-white/20 transition z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Current location caption */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-white/80 text-xs font-500 z-20">
        <MapPin className="w-3.5 h-3.5 text-green" />
        <span className="transition-all duration-500">{SLIDES[index].label}</span>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 max-w-full overflow-x-auto no-scrollbar px-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 shrink-0 ${i === index ? "w-8 bg-green" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}