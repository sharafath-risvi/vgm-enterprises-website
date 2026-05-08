import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useScrollReveal, useParallax, useTiltCards, useCounters } from '../components/useAnimations';
import './Discover.css';
import './SmartLiving.css';


const TRUST_WHEEL_ITEMS = [
  {
    id: 'prime-location',
    title: 'Prime Location',
    desc: 'Strategically positioned at Archapakkam Thozhupedu on the high-growth GST Road corridor — minutes from IT parks, schools, hospitals, and the proposed Metro Rail station. Every direction leads to opportunity.',
    bullets: [
      'Direct GST Road access',
      'Near schools, hospitals, and IT hubs',
      'Proposed Metro corridor advantage',
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&fit=crop',
    alt: 'Premium villa exterior with landscaped driveway',
  },
  {
    id: 'roads',
    title: 'Wide Black Top Roads',
    desc: 'Every arterial road inside VGM Nagar is engineered to premium standards — wide BT roads with proper camber, storm drains, underground utility ducts, and LED street lighting for round-the-clock comfort.',
    bullets: [
      'Premium-width BT internal roads',
      'Drainage and utility-ready planning',
      'LED-lit access throughout the layout',
    ],
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=900&q=80&fit=crop',
    alt: 'Wide premium roadway leading through a modern community',
  },
  {
    id: 'water',
    title: 'Good Water Facility',
    desc: 'A meticulously planned water infrastructure — including overhead tanks, rainwater harvesting pits, and a dedicated supply network — ensures your community never faces a water shortage, even in dry seasons.',
    bullets: [
      'Dedicated supply infrastructure',
      'Rainwater harvesting support',
      'Reliable long-term water availability',
    ],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&q=80&fit=crop',
    alt: 'Calm water feature and lush landscape representing water availability',
  },
  {
    id: 'security',
    title: 'Secured Community',
    desc: 'DTCP & RERA approved, with encumbrance-free clear titles and 24×7 CCTV surveillance across the entire layout. Every plot is legally transparent — protected by documentation, monitored by technology.',
    bullets: [
      'DTCP and RERA approved',
      'Clear-title, encumbrance-free plots',
      '24x7 CCTV-backed monitoring',
    ],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&fit=crop',
    alt: 'Gated premium residential community entrance',
  },
  {
    id: 'green-cover',
    title: 'Green Cover & Plantation',
    desc: 'Every plot boundary and road median is enriched with native trees and curated landscaping. A living green canopy improves air quality, moderates temperature, and creates a sanctuary that grows more beautiful every year.',
    bullets: [
      'Native tree plantation throughout',
      'Cooler, greener living environment',
      'Landscaped roads and plot edges',
    ],
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80&fit=crop',
    alt: 'Green landscaped environment with dense natural plantation',
  },
  {
    id: 'connectivity',
    title: 'Excellent Connectivity',
    desc: 'VGM Nagar sits at the intersection of today\'s infrastructure and tomorrow\'s expansion. With GST Road at your doorstep and the proposed Metro corridor nearby, your investment is positioned for exponential appreciation.',
    bullets: [
      'Fast access to major growth corridors',
      'Metro-linked future appreciation potential',
      'Well-positioned for daily convenience',
    ],
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80&fit=crop',
    alt: 'Major road network and city connectivity corridor at dusk',
  },
];

const TRUST_STORY_ITEMS = TRUST_WHEEL_ITEMS.slice(0, 5);

const VISION_POINTS = [
  {
    id: 'location',
    title: 'Prime Location',
    desc: 'Strategically located at Archapakkam Thozhupedu with excellent connectivity to GST Road, schools, colleges, hospitals, and travel hubs.',
    paths: [
      'M24 182 C 58 173 86 171 118 176 C 147 181 178 183 214 177',
      'M36 197 C 74 192 118 191 153 196 C 180 199 200 199 216 195',
      'M48 178 L 120 116 L 192 178',
      'M62 172 V 182 H 178 V 172',
      'M66 174 V 130 H 174 V 174',
      'M98 182 V 146 H 126 V 182',
      'M78 144 H 94 V 160 H 78 Z',
      'M146 144 H 162 V 160 H 146 Z',
      'M152 130 V 105 H 164 V 140',
      'M200 182 V 154',
      'M200 154 C 190 145 186 136 186 127 C 186 117 193 109 200 109 C 207 109 214 117 214 127 C 214 136 210 145 200 154 Z',
      'M120 38 C 108 38 98 48 98 61 C 98 80 120 104 120 104 C 120 104 142 80 142 61 C 142 48 132 38 120 38 Z',
      'M120 104 V 116',
    ],
    circles: [{ cx: 120, cy: 61, r: 7 }],
  },
  {
    id: 'roads',
    title: 'Wide Black Top Roads',
    desc: 'Wide BT roads with proper drainage, street lighting, and underground utilities ensure a smooth, premium lifestyle for every resident.',
    paths: [
      /* ── Horizon / sky line ── */
      'M30 92 Q 120 82 210 92',

      /* ── Outer road edges: vanishing point ~(120,88), spread at bottom ── */
      /* Left outer edge */
      'M30 92 C 50 110 55 150 42 215',
      /* Right outer edge */
      'M210 92 C 190 110 185 150 198 215',

      /* ── Inner lane dividers ── */
      /* Left inner */
      'M78 92 C 88 110 86 150 72 215',
      /* Right inner */
      'M162 92 C 152 110 154 150 168 215',

      /* ── Centre dashes — perspective-scaled, converge to VP ── */
      'M120 94  L 120 106',
      'M120 114 L 119 128',
      'M119 136 L 118 152',
      'M118 160 L 117 178',
      'M117 186 L 116 206',

      /* ── Left shoulder dashes ── */
      'M54 96  L 53 108',
      'M51 118 L 50 132',
      'M48 142 L 46 158',

      /* ── Right shoulder dashes ── */
      'M186 96  L 187 108',
      'M189 118 L 190 132',
      'M192 142 L 194 158',

      /* ── Left streetlight: pole → curved arm → pendant drop ── */
      'M62 92 V 38',
      'M62 38 Q 62 28 76 28 H 94',
      'M94 28 V 36',
      /* Arm brace */
      'M62 52 L 80 40',

      /* ── Right streetlight: pole → curved arm → pendant drop ── */
      'M178 92 V 38',
      'M178 38 Q 178 28 164 28 H 146',
      'M146 28 V 36',
      /* Arm brace */
      'M178 52 L 160 40',

      /* ── Left tree: double trunk + canopy arc ── */
      'M28 92 V 62',
      'M34 92 V 66',
      'M20 62 Q 31 44 42 62',

      /* ── Right tree: double trunk + canopy arc ── */
      'M212 92 V 62',
      'M206 92 V 66',
      'M200 62 Q 209 44 220 62',

      /* ── Kerb / ground line ── */
      'M26 215 H 214',

      /* ── Road surface texture: two faint transverse lines ── */
      'M48 155 Q 120 148 192 155',
      'M44 185 Q 120 178 196 185',
    ],
    circles: [
      /* Left lamp globe  */ { cx: 94, cy: 32, r: 5 },
      /* Right lamp globe */ { cx: 146, cy: 32, r: 5 },
    ],
  },
  {
    id: 'water',
    title: 'Good Water Facility',
    desc: 'Rainwater harvesting and well-planned water supply ensure consistent, long-term water availability for every plot.',
    paths: [
      /* ── Overhead tank body ── */
      /* Tank top ellipse arc */
      'M68 46 Q 68 30 120 30 Q 172 30 172 46',
      /* Tank left wall */
      'M68 46 V 86',
      /* Tank right wall */
      'M172 46 V 86',
      /* Tank bottom arc */
      'M68 86 Q 68 100 120 100 Q 172 100 172 86',
      /* Tank band / mid-line */
      'M68 66 Q 120 72 172 66',
      /* Tank support leg left */
      'M86 100 L 80 148',
      /* Tank support leg right */
      'M154 100 L 160 148',
      /* Crossbrace */
      'M86 100 L 160 148',
      'M154 100 L 80 148',
      /* ── Main down-pipe from tank ── */
      'M112 100 V 148',
      'M128 100 V 148',
      /* Horizontal main pipe */
      'M80 148 H 160',
      /* ── Branch pipes ── */
      /* Branch left — feeds tap */
      'M90 148 V 170 H 54 V 188',
      /* Branch centre */
      'M120 148 V 210',
      /* Branch right */
      'M150 148 V 170 H 186 V 188',
      /* ── Tap / valve symbols ── */
      'M46 188 H 62',          /* left tap bar */
      'M54 188 V 198',         /* left tap stem */
      'M178 188 H 194',        /* right tap bar */
      'M186 188 V 198',        /* right tap stem */
      /* ── Drip drops ── */
      'M54 204 Q 54 210 58 212 Q 62 210 62 204 Q 62 198 58 196 Q 54 198 54 204 Z',
      'M116 216 Q 116 222 120 224 Q 124 222 124 216 Q 124 210 120 208 Q 116 210 116 216 Z',
      'M182 204 Q 182 210 186 212 Q 190 210 190 204 Q 190 198 186 196 Q 182 198 182 204 Z',
      /* ── Ground line ── */
      'M20 228 H 220',
    ],
    circles: [
      /* Tank inlet cap */ { cx: 120, cy: 30, r: 7 },
    ],
  },
  {
    id: 'security',
    title: 'Secured Community',
    desc: 'DTCP & RERA approved with clear legal title — a 100% transparent and encumbrance-free investment backed by law.',
    paths: [
      'M24 192 H 66',
      'M174 192 H 216',
      'M24 192 V 154 H 66 V 192',
      'M174 192 V 154 H 216 V 192',
      'M54 192 V 104 H 86 V 192',
      'M154 192 V 104 H 186 V 192',
      'M48 104 H 92 V 90 H 48 Z',
      'M148 104 H 192 V 90 H 148 Z',
      'M86 112 C 106 92 134 92 154 112',
      'M86 124 H 154',
      'M86 192 V 124',
      'M154 192 V 124',
      'M98 192 V 130',
      'M110 192 V 130',
      'M120 192 V 130',
      'M130 192 V 130',
      'M142 192 V 130',
      'M98 158 H 142',
      'M188 42 L 170 50 V 72 C 170 89 177 103 188 110 C 199 103 206 89 206 72 V 50 L 188 42 Z',
      'M188 56 V 94',
      'M178 74 H 198',
    ],
    circles: [],
  },
];

function VisionIllustration({ point, animKey }) {
  return (
    <div className="vi-illus-inner" key={animKey}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="vi-svg"
        aria-hidden="true"
      >
        <g stroke="#C8A96A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {point.paths.map((d, i) => (
            <path key={i} d={d} className="vi-path" style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
          {point.circles.map((c, i) => (
            <circle
              key={`c${i}`} cx={c.cx} cy={c.cy} r={c.r}
              className="vi-path"
              style={{ animationDelay: `${(point.paths.length + i) * 0.18}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

function VisionSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [fading, setFading] = useState(false);

  // Auto-switch control refs
  const intervalRef = useRef(null);
  const hoveredRef = useRef(false);
  const lockedRef = useRef(false);   // true after a user click
  const inViewRef = useRef(false);
  const sectionRef = useRef(null);
  const activeIdxRef = useRef(0);       // mirror of state for use inside interval

  // Keep ref in sync with state
  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  const TRANSITION_MS = 500;

  const activate = (idx, isClick = false) => {
    if (idx === activeIdxRef.current && !isClick) return;
    setFading(true);
    setTimeout(() => {
      setActiveIdx(idx);
      activeIdxRef.current = idx;
      setAnimKey(k => k + 1);
      setFading(false);
    }, TRANSITION_MS / 2);
  };

  const startAuto = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (!hoveredRef.current && !lockedRef.current && inViewRef.current) {
        const next = (activeIdxRef.current + 1) % VISION_POINTS.length;
        activate(next);
      }
    }, 10000); // 10 seconds per topic
  };

  const stopAuto = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // ── Scroll-lock helpers ──────────────────────────────
  const scrollLockRef = useRef(false);
  const hasLockedOnceRef = useRef(false);   // only lock the very first entry
  const preventScrollRef = useRef(null);    // store handler so we can remove it

  /** Compute total draw duration in ms for a given vision point */
  const getDrawDuration = (pt) => {
    const totalElements = pt.paths.length + pt.circles.length;
    const lastDelay = (totalElements - 1) * 0.18;   // 0.18s per-element stagger
    const baseDraw = 3;                              // 3s base animation
    return (lastDelay + baseDraw) * 1000;                // convert to ms
  };

  const lockScroll = () => {
    if (scrollLockRef.current) return;
    scrollLockRef.current = true;
    const handler = (e) => e.preventDefault();
    preventScrollRef.current = handler;
    window.addEventListener('wheel', handler, { passive: false });
    window.addEventListener('touchmove', handler, { passive: false });
  };

  const unlockScroll = () => {
    if (!scrollLockRef.current) return;
    scrollLockRef.current = false;
    if (preventScrollRef.current) {
      window.removeEventListener('wheel', preventScrollRef.current);
      window.removeEventListener('touchmove', preventScrollRef.current);
      preventScrollRef.current = null;
    }
  };

  // ── Auto-scroll state ──────────────────────────────
  const [countdown, setCountdown] = useState(false);   // show countdown bar
  const autoScrollFiredRef = useRef(false);     // single-run guard
  const autoScrollCancelledRef = useRef(false);     // user cancelled
  const autoScrollTimerRef = useRef(null);      // setTimeout handle
  const countdownTimerRef = useRef(null);      // animation frame / interval

  const cancelAutoScroll = () => {
    autoScrollCancelledRef.current = true;
    setCountdown(false);
    if (autoScrollTimerRef.current) { clearTimeout(autoScrollTimerRef.current); autoScrollTimerRef.current = null; }
    if (countdownTimerRef.current) { clearTimeout(countdownTimerRef.current); countdownTimerRef.current = null; }
  };

  const triggerAutoScroll = () => {
    if (autoScrollFiredRef.current || autoScrollCancelledRef.current) return;
    autoScrollFiredRef.current = true;

    // Show countdown bar for 10 seconds, then scroll
    setCountdown(true);

    autoScrollTimerRef.current = setTimeout(() => {
      if (autoScrollCancelledRef.current) return;
      setCountdown(false);
      const next = document.querySelector('.discover-ecosystem');
      if (next) {
        next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 10000);
  };

  // IntersectionObserver — start/stop auto based on visibility
  // 200ms page-load guard: prevents any scroll-lock from firing during
  // the initial render / Hero section paint before the user has scrolled.
  const mountedRef = useRef(false);
  useEffect(() => {
    const mountTimer = setTimeout(() => { mountedRef.current = true; }, 200);
    return () => clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAuto();
          // Trigger auto-scroll countdown (no scroll-lock — removed to fix Hero→Vision freeze)
          if (mountedRef.current && !hasLockedOnceRef.current) {
            hasLockedOnceRef.current = true;
            const firstPt = VISION_POINTS[activeIdxRef.current];
            const drawMs = getDrawDuration(firstPt);
            const GRACE_MS = 750;
            setTimeout(() => {
              if (!inViewRef.current) return;
              triggerAutoScroll();   // start the 10s countdown → scroll
            }, drawMs + GRACE_MS);
          }
        } else {
          stopAuto();
          // No scroll to unlock — lock was removed
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    // Cancel auto-scroll if user touches wheel/keyboard
    const onUserScroll = () => cancelAutoScroll();
    window.addEventListener('wheel', onUserScroll);
    window.addEventListener('keydown', onUserScroll);
    window.addEventListener('touchstart', onUserScroll);

    return () => {
      observer.disconnect();
      stopAuto();
      cancelAutoScroll();
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('keydown', onUserScroll);
      window.removeEventListener('touchstart', onUserScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMouseEnter = (idx) => {
    hoveredRef.current = true;
    activate(idx);
  };

  const handleMouseLeave = () => {
    hoveredRef.current = false;
    // If not locked, resume — interval keeps ticking already
  };

  const handleClick = (idx) => {
    lockedRef.current = true;
    activate(idx, true);
    // Unlock after a full 10s cycle
    setTimeout(() => { lockedRef.current = false; }, 10000 * VISION_POINTS.length);
  };

  const pt = VISION_POINTS[activeIdx];

  return (
    <section className="discover-vision" aria-label="Project vision" ref={sectionRef}>
      <div className="vision-wrap">

        {/* ── Section heading ── */}
        <div className="vision-head reveal">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Our Vision</div>
          <h2 className="section-title text-center" style={{ marginBottom: 0 }}>
            Where <span className="highlight">Nature</span> Meets<br />
            <span className="gold">Modern Infrastructure</span>
          </h2>
        </div>

        {/* ── 3-Column Layout ── */}
        <div className="vision-3col">

          {/* LEFT — Feature List */}
          <div className="vision-feature-list">
            {VISION_POINTS.map((v, i) => {
              const isActive = activeIdx === i;
              return (
                <button
                  key={v.id}
                  className={`vision-feature-item${isActive ? ' vision-feature-item--active' : ''}`}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(i)}
                  onFocus={() => handleMouseEnter(i)}
                  onBlur={handleMouseLeave}
                  aria-pressed={isActive}
                  tabIndex={0}
                >
                  <span className="vision-feature-num">0{i + 1}</span>
                  <span className="vision-feature-title">{v.title}</span>
                  <span className="vision-feature-arrow" aria-hidden="true">→</span>
                </button>
              );
            })}

            {/* Progress bar strip */}
            <div className="vision-progress-bar" aria-hidden="true">
              <div
                className="vision-progress-fill"
                style={{ width: `${((activeIdx + 1) / VISION_POINTS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* CENTER — Illustration with premium frame */}
          <div className={`vision-illus-center${fading ? ' vision-illus-center--fade' : ''}`}>

            {/* Premium corner frame */}
            <div className="vi-frame" aria-hidden="true" key={animKey}>

              {/* Top-left corner */}
              <svg className="vi-corner vi-corner-tl" viewBox="0 0 56 56" fill="none">
                <path d="M54 2 H 2 V 54" stroke="#C8A96A" strokeWidth="1.5" strokeLinecap="square" className="vi-corner-path" />
              </svg>
              {/* Top-right corner */}
              <svg className="vi-corner vi-corner-tr" viewBox="0 0 56 56" fill="none">
                <path d="M2 2 H 54 V 54" stroke="#C8A96A" strokeWidth="1.5" strokeLinecap="square" className="vi-corner-path" />
              </svg>
              {/* Bottom-left corner */}
              <svg className="vi-corner vi-corner-bl" viewBox="0 0 56 56" fill="none">
                <path d="M54 54 H 2 V 2" stroke="#C8A96A" strokeWidth="1.5" strokeLinecap="square" className="vi-corner-path" />
              </svg>
              {/* Bottom-right corner */}
              <svg className="vi-corner vi-corner-br" viewBox="0 0 56 56" fill="none">
                <path d="M2 54 H 54 V 2" stroke="#C8A96A" strokeWidth="1.5" strokeLinecap="square" className="vi-corner-path" />
              </svg>

              {/* Blueprint grid */}
              <svg className="vi-grid" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <pattern id="vi-grid-pat" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40 M 40 40 L 40 0" fill="none" stroke="#C8A96A" strokeWidth="0.4" />
                  </pattern>
                </defs>
                <rect width="440" height="440" fill="url(#vi-grid-pat)" />
              </svg>

              {/* Centre focus radial */}
              <div className="vi-focus-glow" />
            </div>

            <div className="vision-glow" aria-hidden="true" />
            <VisionIllustration point={pt} animKey={animKey} />
          </div>

          {/* RIGHT — Description Panel */}
          <div className={`vision-desc-panel${fading ? ' vision-desc-panel--fade' : ''}`} aria-live="polite">
            <div className="vision-desc-inner">
              <span className="vision-desc-eyebrow">0{activeIdx + 1} / 04</span>
              <h3 className="vision-desc-heading">{pt.title}</h3>
              <div className="vision-desc-divider" />
              <p className="vision-desc-body">{pt.desc}</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Countdown indicator ── */}
      {countdown && (
        <div className="vision-countdown-bar" aria-hidden="true">
          <div className="vision-countdown-fill" />
        </div>
      )}
    </section>
  );
}


const STATS = [
  { count: 200, suffix: '+', label: 'Premium Plots' },
  { count: 15, suffix: ' Acres', label: 'Total Area' },
  { count: 30, suffix: '%+', label: 'Appreciation' },
  { count: 10, suffix: ' Yrs', label: 'Trusted Since' },
];

// 8 nodes arranged at 45° intervals around the center
const ECO_NODES = [
  { id: 'water', angle: 0, label: 'Water Management', sub: 'Rainwater harvesting', icon: '💧' },
  { id: 'solar', angle: 45, label: 'Solar Energy', sub: 'Eco-powered community', icon: '☀️' },
  { id: 'security', angle: 90, label: 'Security', sub: 'CCTV & gated access', icon: '🛡️' },
  { id: 'connect', angle: 135, label: 'Connectivity', sub: 'GST Road & Metro access', icon: '📡' },
  { id: 'infra', angle: 180, label: 'Infrastructure', sub: 'Underground utilities', icon: '🏗️' },
  { id: 'community', angle: 225, label: 'Community Living', sub: 'Clubhouse & social spaces', icon: '🏘️' },
  { id: 'roads', angle: 270, label: 'Roads & Drainage', sub: 'BT roads & storm drainage', icon: '🛣️' },
  { id: 'green', angle: 315, label: 'Green Spaces', sub: 'Curated landscape & parks', icon: '🌿' },
];

// Radial layout constants (all in px within a 800×800 stage)
const CX = 400, CY = 400;   // center of stage
const NODE_R = 315;          // distance from center to node center

function degToRad(d) { return (d * Math.PI) / 180; }

function nodePos(angle) {
  const rad = degToRad(angle - 90); // -90 so 0° is top
  return {
    x: CX + NODE_R * Math.cos(rad),
    y: CY + NODE_R * Math.sin(rad),
  };
}

// SVG viewBox coordinates for center + node endpoint
const SVG_W = 800, SVG_H = 800;

function EcosystemSection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const hubR = 92; // center hub radius in SVG px (reduced ~15% for breathing room)

  return (
    <section ref={sectionRef} className="discover-ecosystem" aria-label="Smart Living Ecosystem">
      <div className="eco-bg-grid" aria-hidden="true" />

      <div className="section-wrap">
        {/* Premium heading */}


        {/* Radial diagram stage */}
        <div className={`eco-radial-stage${active ? ' eco-radial-active' : ''}`}>

          {/* ── SVG layer: hub + lines ── */}
          <svg
            className="eco-radial-svg"
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="gold-glow2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C8A96A" stopOpacity="0.45" />
                <stop offset="55%" stopColor="#0d4a35" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#071e16" stopOpacity="1" />
              </radialGradient>
              <radialGradient id="stageFade" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C8A96A" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#C8A96A" stopOpacity="0" />
              </radialGradient>
              {/* Per-node line gradients */}
              {ECO_NODES.map(n => {
                const p = nodePos(n.angle);
                return (
                  <linearGradient
                    key={`lg-${n.id}`}
                    id={`lineGrad2-${n.id}`}
                    x1={CX} y1={CY} x2={p.x} y2={p.y}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#C8A96A" stopOpacity={hovered === n.id ? 1.0 : 0.6} />
                    <stop offset="100%" stopColor="#C8A96A" stopOpacity={hovered === n.id ? 0.65 : 0.22} />
                  </linearGradient>
                );
              })}
            </defs>

            {/* Large background glow — expanded */}
            <circle cx={CX} cy={CY} r={360} fill="url(#stageFade)" />

            {/* ── Connection lines ── */}
            {ECO_NODES.map((n, i) => {
              const p = nodePos(n.angle);
              const isHov = hovered === n.id;
              // Slight bezier curve using a control point offset perpendicular to the line
              const rad = degToRad(n.angle - 90);
              const perpRad = rad + Math.PI / 2;
              const ctrlDist = 40;
              const midX = (CX + p.x) / 2 + ctrlDist * Math.cos(perpRad);
              const midY = (CY + p.y) / 2 + ctrlDist * Math.sin(perpRad);
              const pathD = `M ${CX} ${CY} Q ${midX} ${midY} ${p.x} ${p.y}`;
              const pathId = `rl-${n.id}`;
              return (
                <g key={n.id}>
                  {/* Base curve */}
                  <path
                    d={pathD}
                    id={pathId}
                    stroke={`url(#lineGrad2-${n.id})`}
                    strokeWidth={isHov ? 3.5 : 2}
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 420,
                      strokeDashoffset: active ? 0 : 420,
                      transition: `stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s, stroke-width 0.3s`,
                      filter: isHov ? 'url(#gold-glow2)' : 'none',
                    }}
                  />
                  {/* Flowing dot along curve */}
                  {active && (
                    <circle r={isHov ? 3.5 : 2} fill="#C8A96A" fillOpacity={isHov ? 1 : 0.55}>
                      <animateMotion
                        dur={`${2.4 + i * 0.3}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.4}s`}
                      >
                        <mpath xlinkHref={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                  )}
                  {/* Node endpoint dot */}
                  <circle
                    cx={p.x} cy={p.y}
                    r={isHov ? 5.5 : 3.5}
                    fill="#C8A96A"
                    fillOpacity={isHov ? 1 : 0.5}
                    style={{ transition: 'r 0.3s, fill-opacity 0.3s' }}
                  />
                </g>
              );
            })}

            {/* Outermost dashed orbit — bright, glowing */}
            <circle cx={CX} cy={CY} r={138}
              stroke="#C8A96A" strokeWidth="2" strokeOpacity="0.45"
              strokeDasharray="6 12"
              filter="url(#gold-glow2)"
              className={active ? 'eco-orbit-spin' : ''}
            />
            {/* Second orbit */}
            <circle cx={CX} cy={CY} r={114}
              stroke="#C8A96A" strokeWidth="2" strokeOpacity="0.55"
              strokeDasharray="3 7"
              filter="url(#gold-glow2)"
              className={active ? 'eco-orbit-spin-rev' : ''}
            />
            {/* Solid inner ring */}
            <circle cx={CX} cy={CY} r={98}
              stroke="#C8A96A" strokeWidth="2" strokeOpacity="0.55"
              filter="url(#gold-glow2)"
            />
            {/* Glow fill */}
            <circle cx={CX} cy={CY} r={hubR + 8} fill="url(#hubGlow)" />
            {/* Border ring */}
            <circle cx={CX} cy={CY} r={hubR}
              stroke="#C8A96A" strokeWidth={hovered ? 3.5 : 2.8} strokeOpacity="0.9"
              filter="url(#gold-glow2)"
              style={{
                transform: hovered ? 'scale(1.03)' : 'scale(1)',
                transformOrigin: `${CX}px ${CY}px`,
                transition: 'transform 0.4s ease, stroke-width 0.3s',
              }}
            />
            {/* Pulse ring */}
            <circle cx={CX} cy={CY} r={hubR}
              fill="none" stroke="#C8A96A" strokeWidth="6" strokeOpacity="0.38"
              className={active ? 'eco-pulse-ring' : ''}
            />

            {/* Hub: image via foreignObject clipped to circle */}
            <defs>
              <clipPath id="hubClip">
                <circle cx={CX} cy={CY} r={hubR - 3} />
              </clipPath>
            </defs>
            <image
              href="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80&fit=crop"
              x={CX - (hubR - 3)} y={CY - (hubR - 3)}
              width={(hubR - 3) * 2} height={(hubR - 3) * 2}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#hubClip)"
              style={{ opacity: 0.55 }}
            />
            {/* Dark green overlay on image */}
            <circle cx={CX} cy={CY} r={hubR - 3}
              fill="rgba(7, 30, 22, 0.62)"
              clipPath="url(#hubClip)"
            />

            {/* Hub text — gold, glowing */}
            <text x={CX} y={CY - 24} textAnchor="middle"
              fill="#C8A96A" fontSize="26" fontWeight="700"
              fontFamily="'Cormorant Garamond', 'Georgia', serif" letterSpacing="3"
              filter="url(#gold-glow2)">
              VGM
            </text>
            <text x={CX} y={CY + 6} textAnchor="middle"
              fill="rgba(200,169,106,0.85)" fontSize="10.5" fontWeight="500"
              fontFamily="'Inter', sans-serif" letterSpacing="4">
              SMART LIVING
            </text>
            <text x={CX} y={CY + 26} textAnchor="middle"
              fill="rgba(200,169,106,0.5)" fontSize="8.5" fontWeight="400"
              fontFamily="'Inter', sans-serif" letterSpacing="3">
              ECOSYSTEM
            </text>
          </svg>

          {/* ── Radial node cards ── */}
          {ECO_NODES.map((n, i) => {
            const p = nodePos(n.angle);
            const isHov = hovered === n.id;
            // Convert SVG px → % of stage
            const leftPct = (p.x / SVG_W) * 100;
            const topPct = (p.y / SVG_H) * 100;
            return (
              <div
                key={n.id}
                className={`eco-node-card${active ? ' eco-node-in' : ''}${isHov ? ' eco-node-lit' : ''}`}
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  animationDelay: `${i * 0.1 + 0.3}s`,
                }}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="eco-node-icon">{n.icon}</span>
                <span className="eco-node-label">{n.label}</span>
                <span className="eco-node-sub">{n.sub}</span>
              </div>
            );
          })}

        </div>{/* eco-radial-stage */}
      </div>
    </section>
  );
}

// ============================================================
// CONNECTED LIVING ECOSYSTEM
// ============================================================
const CLE_NODES = [
  { id: 'rainwater', angle: 0, label: 'Rainwater Harvesting', desc: 'Smart water conservation for sustainable living.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=85&fit=crop' },
  { id: 'electric', angle: 45, label: 'Smart Electricity', desc: 'Reliable power systems built for modern lifestyles.', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&q=85&fit=crop' },
  { id: 'biogas', angle: 90, label: 'Biogas System', desc: 'Eco-friendly energy solutions for greener communities.', img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=500&q=85&fit=crop' },
  { id: 'trees', angle: 135, label: 'Tree Plantation', desc: 'Greener surroundings for healthier living.', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=85&fit=crop' },
  { id: 'cctv', angle: 180, label: '24×7 CCTV Security', desc: 'Advanced surveillance for safer communities.', img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&q=85&fit=crop' },
  { id: 'community', angle: 225, label: 'Planned Community', desc: 'Thoughtfully designed spaces for premium lifestyles.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=85&fit=crop' },
  { id: 'planning', angle: 270, label: 'Global Standard Planning', desc: 'International-quality infrastructure and planning.', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=85&fit=crop' },
  { id: 'sustain', angle: 315, label: 'Sustainable Living', desc: 'Balanced modern living with nature and comfort.', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&q=85&fit=crop' },
];

const CLE_CX = 440, CLE_CY = 440;   // SVG center
const CLE_R = 310;                  // node orbit radius
const CLE_W = 880, CLE_H = 880;    // viewBox

function cleDeg(angle) { return (angle * Math.PI) / 180; }
function clePos(angle) {
  const r = cleDeg(angle - 90);
  return { x: CLE_CX + CLE_R * Math.cos(r), y: CLE_CY + CLE_R * Math.sin(r) };
}

function ConnectedEcosystemSection() {
  const secRef = useRef(null);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <></>
  );
}

// ============================================================
// SUSTAINABLE LIVING SHOWCASE — Cinematic Parallax Storytelling
// ============================================================
const SUSTAIN_STORIES = [
  {
    id: 'green-canopy',
    heading: 'Green Canopy Living',
    desc: 'Native trees line every road and boundary — a living, breathing canopy that cools the air, deepens roots, and transforms the neighbourhood into a verdant sanctuary year after year.',
    img: '/SUSTAINABLE CROUSEL-images-0.jpg',
  },
  {
    id: 'rainwater',
    heading: 'Rainwater Harvesting',
    desc: 'Precision-engineered harvesting pits capture every monsoon drop, recharging groundwater reserves and delivering reliable, self-sustaining water security for every resident.',
    img: '/SUSTAINABLE CROUSEL-images-1.jpg',
  },
  {
    id: 'solar-power',
    heading: 'Solar-Ready Infrastructure',
    desc: 'Streets and community spaces are designed to receive solar integration — clean, silent energy woven seamlessly into the architecture of daily life.',
    img: '/SUSTAINABLE CROUSEL-images-2.jpg',
  },
  {
    id: 'open-spaces',
    heading: 'Curated Open Spaces',
    desc: 'Parklands and quiet zones are thoughtfully preserved, giving residents breathing room — generous green corridors that nurture community and calm in equal measure.',
    img: '/SUSTAINABLE CROUSEL-images-3.jpg',
  },
  {
    id: 'clean-roads',
    heading: 'Premium BT Roads',
    desc: 'Wide black-top roads with engineered storm drainage, underground utility ducts, and LED-lit medians ensure every journey through VGM Nagar is smooth and premium.',
    img: '/SUSTAINABLE CROUSEL-images-4.jpg',
  },
  {
    id: 'community',
    heading: 'Planned Community Living',
    desc: 'Every social space — from gathering plazas to shaded walkways — is designed with intention, creating a neighbourhood that feels both exclusive and warmly connected.',
    img: '/SUSTAINABLE CROUSEL-images-5.jpg',
  },
  {
    id: 'smart-infra',
    heading: 'Smart Underground Utilities',
    desc: 'Electricity, drainage, and communications travel invisibly underground — no cables overhead, no disruptions underfoot. Infrastructure as elegant as the landscape above it.',
    img: '/SUSTAINABLE CROUSEL-images-6.jpg',
  },
  {
    id: 'nature-balance',
    heading: 'Nature in Balance',
    desc: 'Modern comfort and natural landscapes coexist in perfect equilibrium — a community where sustainable choices are not compromises, but the very foundation of premium living.',
    img: '/SUSTAINABLE CROUSEL-images-7.jpg',
  },
];


// ============================================================
// LIVING AROUND YOUR PLOT — Scroll Story
// ============================================================
const LAP_STEPS = [
  { num: '01', title: 'Modern Infrastructure', desc: 'Sleek, multi-story urban homes designed for contemporary comfort, integrated directly into the community fabric.', x: 120, y: 150 },
  { num: '02', title: 'Retail & Wellness', desc: 'Dynamic commercial hubs and health spaces, ensuring daily needs and recreation are just a short walk away.', x: 680, y: 150 },
  { num: '03', title: 'Community Greenery', desc: 'Lush parklands and quiet zones, thoughtfully preserved to ensure a serene and breathable living environment.', x: 400, y: 60 },
];

function ScrollStorySection() {
  const outerRef = useRef(null);
  const [step, setStep] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      if (hasAnimated) return;

      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, -top / (height - vh)));
      const calculatedStep = Math.round(progress * 3);

      setStep(prev => {
        if (isScrollingDown) {
          const next = Math.max(prev, calculatedStep);
          if (next >= 3) {
            setHasAnimated(true);
            return 3;
          }
          return next;
        }
        // When scrolling up, do not decrease step to prevent reverse animation
        return prev;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasAnimated]);

  return (
    <section className="lap-outer" ref={outerRef}>
      {/* ── TOP HEADING BLOCK ── */}
      <div className="lap-top-heading">
        <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Living Around Your Plot</p>
        <h2 className="section-title text-center" style={{ marginBottom: 0 }}>
          Your land. <span className="gold">At the center of everything.</span>
        </h2>
      </div>

      <div className="lap-diagram-section">
        <svg className="lap-svg" viewBox="0 0 900 580" fill="none" aria-hidden="true">
          <defs>
            <filter id="lap-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="lap-glow-soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="7" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="lapBgGlow" cx="50%" cy="55%" r="48%">
              <stop offset="0%" stopColor="#C8A96A" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#C8A96A" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lapLandTop" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2d7a50" /><stop offset="100%" stopColor="#1a5c3a" /></linearGradient>
            <linearGradient id="lapLandL" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#0f3d27" /><stop offset="100%" stopColor="#071e16" /></linearGradient>
            <linearGradient id="lapLandR" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#164f32" /><stop offset="100%" stopColor="#0a2b1a" /></linearGradient>
            <linearGradient id="lapB1T" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#245c3a" /><stop offset="100%" stopColor="#173d28" /></linearGradient>
            <linearGradient id="lapB1L" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#0c2e1e" /><stop offset="100%" stopColor="#061510" /></linearGradient>
            <linearGradient id="lapB1R" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#133625" /><stop offset="100%" stopColor="#081a12" /></linearGradient>
            <linearGradient id="lapB2T" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2a4a5a" /><stop offset="100%" stopColor="#1a303e" /></linearGradient>
            <linearGradient id="lapB2L" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#0d1f2a" /><stop offset="100%" stopColor="#050e16" /></linearGradient>
            <linearGradient id="lapB2R" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#152533" /><stop offset="100%" stopColor="#08131d" /></linearGradient>
            <linearGradient id="lapB3G" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2d7a50" /><stop offset="100%" stopColor="#1a5c3a" /></linearGradient>
            <linearGradient id="lapB3H" x1="0%" y1="100%" x2="50%" y2="0%"><stop offset="0%" stopColor="#1a5c3a" /><stop offset="100%" stopColor="#3a9e62" /></linearGradient>
            <linearGradient id="lapB3T" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#2d7a50" /><stop offset="100%" stopColor="#145a35" /></linearGradient>
          </defs>

          <circle cx="450" cy="330" r="440" fill="url(#lapBgGlow)" />

          {/* ── Connection Lines — 1.8x longer, buildings spread wide ── */}
          <path id="lap-line-1" d="M 398 349 Q 280 310 118 264"
            stroke="#C8A96A" strokeWidth="1.6" strokeLinecap="round"
            className={`lap-conn-line ${step >= 1 ? 'lap-conn-line-in' : ''}`} />
          {step >= 1 && (
            <>
              <circle cx="118" cy="264" r="3.5" fill="#C8A96A" fillOpacity="0.85" className="lap-node-dot" />
              <circle r="3" fill="#C8A96A" filter="url(#lap-glow)">
                <animateMotion dur="2s" repeatCount="indefinite">
                  <mpath xlinkHref="#lap-line-1" />
                </animateMotion>
              </circle>
            </>
          )}

          <path id="lap-line-2" d="M 502 349 Q 622 310 782 268"
            stroke="#C8A96A" strokeWidth="1.6" strokeLinecap="round"
            className={`lap-conn-line ${step >= 2 ? 'lap-conn-line-in' : ''}`} />
          {step >= 2 && (
            <>
              <circle cx="782" cy="268" r="3.5" fill="#C8A96A" fillOpacity="0.85" className="lap-node-dot" />
              <circle r="3" fill="#C8A96A" filter="url(#lap-glow)">
                <animateMotion dur="2s" repeatCount="indefinite">
                  <mpath xlinkHref="#lap-line-2" />
                </animateMotion>
              </circle>
            </>
          )}

          <path id="lap-line-3" d="M 450 287 Q 450 190 450 88"
            stroke="#C8A96A" strokeWidth="1.6" strokeLinecap="round"
            className={`lap-conn-line ${step >= 3 ? 'lap-conn-line-in' : ''}`} />
          {step >= 3 && (
            <>
              <circle cx="450" cy="88" r="3.5" fill="#C8A96A" fillOpacity="0.85" className="lap-node-dot" />
              <circle r="3" fill="#C8A96A" filter="url(#lap-glow)">
                <animateMotion dur="2s" repeatCount="indefinite">
                  <mpath xlinkHref="#lap-line-3" />
                </animateMotion>
              </circle>
            </>
          )}

          {/* ══ BUILDING 1 — LEFT — Premium Residential ══ */}
          <g className={`lap-b1${step >= 1 ? ' lap-b-in' : ''}`} style={{ '--tx': '-65px', '--ty': '14px' }}>
            <ellipse cx="118" cy="348" rx="52" ry="11" fill="rgba(0,0,0,0.18)" />
            <path d="M70,195 L118,170 L166,195 L166,316 L118,340 L70,316 Z" fill="url(#lapB1L)" />
            <path d="M166,195 L214,170 L214,290 L166,316 Z" fill="url(#lapB1R)" />
            <path d="M70,195 L118,170 L214,170 L166,195 Z" fill="url(#lapB1T)" />
            {[222, 250, 278].map(y => <path key={y} d={`M70,${y} L118,${y - 25} L166,${y - 25}`} stroke="#C8A96A" strokeWidth="0.5" strokeOpacity="0.2" />)}
            {[208, 236, 264].map(wy => [84, 104, 126, 146].map(wx => (
              <rect key={`${wx}-${wy}`} x={wx} y={wy} width="12" height="16" fill="rgba(200,169,106,0.18)" stroke="#C8A96A" strokeWidth="0.4" strokeOpacity="0.3" />
            )))}
            {[208, 236, 264].map(wy => [174, 194].map(wx => (
              <rect key={`r${wx}-${wy}`} x={wx} y={wy} width="11" height="14" fill="rgba(200,169,106,0.13)" stroke="#C8A96A" strokeWidth="0.4" strokeOpacity="0.24" />
            )))}
            <path d="M70,195 L70,146 L104,130 L138,146 L138,195" fill="url(#lapB1L)" stroke="#C8A96A" strokeWidth="0.7" strokeOpacity="0.36" />
            <path d="M70,146 L104,130 L138,146 L104,162 Z" fill="url(#lapB1T)" stroke="#C8A96A" strokeWidth="0.9" strokeOpacity="0.55" filter="url(#lap-glow)" />
            <line x1="104" y1="130" x2="104" y2="107" stroke="#C8A96A" strokeWidth="0.8" strokeOpacity="0.5" />
            <circle cx="104" cy="106" r="2" fill="#C8A96A" fillOpacity="0.6" />
            <path d="M70,195 L118,170 L214,170 L166,195 Z" stroke="#C8A96A" strokeWidth="1.2" strokeOpacity="0.62" fill="none" filter="url(#lap-glow)" />
            <line x1="70" y1="195" x2="70" y2="316" stroke="#C8A96A" strokeWidth="0.9" strokeOpacity="0.3" />
            <line x1="166" y1="195" x2="166" y2="316" stroke="#C8A96A" strokeWidth="0.9" strokeOpacity="0.3" />
            <line x1="214" y1="170" x2="214" y2="290" stroke="#C8A96A" strokeWidth="0.9" strokeOpacity="0.26" />
            <path d="M70,316 L118,340 L214,290" stroke="#C8A96A" strokeWidth="0.9" strokeOpacity="0.26" />
          </g>

          {/* ══ BUILDING 2 — RIGHT — Commercial / Infrastructure ══ */}
          <g className={`lap-b2${step >= 2 ? ' lap-b-in' : ''}`} style={{ '--tx': '65px', '--ty': '14px' }}>
            <ellipse cx="780" cy="342" rx="58" ry="12" fill="rgba(0,0,0,0.18)" />
            <path d="M730,172 L780,148 L830,172 L830,318 L780,342 L730,318 Z" fill="url(#lapB2L)" />
            <path d="M830,172 L880,148 L880,294 L830,318 Z" fill="url(#lapB2R)" />
            <path d="M730,172 L780,148 L880,148 L830,172 Z" fill="url(#lapB2T)" />
            {[194, 218, 242, 266, 290, 314].map(y => (
              <path key={y} d={`M730,${y} L780,${y - 24} L830,${y - 24}`} stroke="rgba(100,160,200,0.22)" strokeWidth="0.8" />
            ))}
            {[748, 768, 788, 808, 826].map(x => (
              <line key={x} x1={x} y1="172" x2={x} y2="318" stroke="rgba(100,160,200,0.14)" strokeWidth="0.6" />
            ))}
            {[182, 210, 238, 266, 294].map(wy => [736, 754, 774, 794, 814].map(wx => (
              <rect key={`${wx}-${wy}`} x={wx} y={wy} width="14" height="18" fill="rgba(100,180,220,0.14)" stroke="rgba(200,169,106,0.18)" strokeWidth="0.4" />
            )))}
            {[182, 216, 250, 284].map(wy => [840, 862].map(wx => (
              <rect key={`r${wx}-${wy}`} x={wx} y={wy} width="12" height="24" fill="rgba(100,180,220,0.11)" stroke="rgba(200,169,106,0.16)" strokeWidth="0.4" />
            )))}
            <path d="M742,172 L742,134 L830,134 L830,172" fill="rgba(21,37,51,0.9)" stroke="#C8A96A" strokeWidth="0.8" strokeOpacity="0.36" />
            <path d="M742,134 L780,118 L880,118 L830,134 Z" fill="url(#lapB2T)" stroke="#C8A96A" strokeWidth="1" strokeOpacity="0.55" filter="url(#lap-glow)" />
            <line x1="780" y1="118" x2="780" y2="86" stroke="#C8A96A" strokeWidth="1" strokeOpacity="0.55" />
            <line x1="780" y1="102" x2="764" y2="94" stroke="#C8A96A" strokeWidth="0.6" strokeOpacity="0.3" />
            <line x1="780" y1="102" x2="796" y2="94" stroke="#C8A96A" strokeWidth="0.6" strokeOpacity="0.3" />
            <circle cx="780" cy="85" r="2.5" fill="#C8A96A" fillOpacity="0.7" />
            {[742, 762, 782, 802].map(x => (
              <rect key={x} x={x} y="318" width="7" height="20" fill="rgba(21,37,51,0.9)" stroke="#C8A96A" strokeWidth="0.5" strokeOpacity="0.26" />
            ))}
            <path d="M730,172 L780,148 L880,148 L830,172 Z" stroke="#C8A96A" strokeWidth="1.2" strokeOpacity="0.65" fill="none" filter="url(#lap-glow)" />
            <line x1="730" y1="172" x2="730" y2="318" stroke="#C8A96A" strokeWidth="0.9" strokeOpacity="0.33" />
            <line x1="830" y1="172" x2="830" y2="318" stroke="#C8A96A" strokeWidth="0.9" strokeOpacity="0.33" />
            <line x1="880" y1="148" x2="880" y2="294" stroke="#C8A96A" strokeWidth="0.9" strokeOpacity="0.26" />
            <path d="M730,318 L780,342 L880,294" stroke="#C8A96A" strokeWidth="0.9" strokeOpacity="0.26" />
          </g>

          {/* ══ BUILDING 3 — TOP — Green / Eco Landscape ══ */}
          <g className={`lap-b3${step >= 3 ? ' lap-b-in' : ''}`} style={{ '--tx': '0px', '--ty': '-60px' }}>
            <path d="M362,118 L538,118 L538,148 L362,148 Z" fill="url(#lapB3G)" fillOpacity="0.55" />
            <path d="M362,148 Q394,84 426,92 Q442,98 450,84 Q462,72 480,80 Q510,89 538,148 Z" fill="url(#lapB3H)" fillOpacity="0.88" />
            <path d="M362,148 Q392,137 412,140 Q432,143 450,135 Q470,128 490,138 Q516,146 538,148 Z" fill="#2d7a50" fillOpacity="0.65" />
            <line x1="374" y1="140" x2="374" y2="112" stroke="#0d3a22" strokeWidth="2.2" strokeOpacity="0.7" />
            <ellipse cx="374" cy="104" rx="15" ry="19" fill="url(#lapB3T)" fillOpacity="0.92" />
            <ellipse cx="374" cy="104" rx="15" ry="19" stroke="#C8A96A" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
            <line x1="396" y1="138" x2="396" y2="103" stroke="#0d3a22" strokeWidth="2.4" strokeOpacity="0.72" />
            <ellipse cx="396" cy="93" rx="18" ry="23" fill="url(#lapB3T)" fillOpacity="0.95" />
            <line x1="420" y1="136" x2="420" y2="98" stroke="#0d3a22" strokeWidth="2.2" strokeOpacity="0.7" />
            <ellipse cx="420" cy="87" rx="16" ry="21" fill="#3a9e62" fillOpacity="0.9" />
            <line x1="450" y1="132" x2="450" y2="83" stroke="#0d3a22" strokeWidth="2.8" strokeOpacity="0.78" />
            <ellipse cx="450" cy="71" rx="20" ry="26" fill="url(#lapB3T)" fillOpacity="1" />
            <ellipse cx="450" cy="71" rx="20" ry="26" stroke="#C8A96A" strokeWidth="0.9" strokeOpacity="0.42" fill="none" filter="url(#lap-glow)" />
            <line x1="478" y1="134" x2="478" y2="97" stroke="#0d3a22" strokeWidth="2.2" strokeOpacity="0.7" />
            <ellipse cx="478" cy="86" rx="16" ry="21" fill="#2d7a50" fillOpacity="0.9" />
            <line x1="504" y1="138" x2="504" y2="106" stroke="#0d3a22" strokeWidth="2" strokeOpacity="0.7" />
            <ellipse cx="504" cy="96" rx="15" ry="20" fill="url(#lapB3T)" fillOpacity="0.88" />
            <line x1="526" y1="140" x2="526" y2="115" stroke="#0d3a22" strokeWidth="1.8" strokeOpacity="0.68" />
            <ellipse cx="526" cy="106" rx="13" ry="18" fill="#1a5c3a" fillOpacity="0.9" />
            <path d="M432,148 Q441,139 450,135 Q459,131 468,148" stroke="rgba(200,169,106,0.48)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <ellipse cx="450" cy="108" rx="86" ry="44" fill="rgba(45,122,80,0.07)" filter="url(#lap-glow-soft)" />
            <path d="M362,118 L538,118" stroke="#C8A96A" strokeWidth="1" strokeOpacity="0.42" filter="url(#lap-glow)" />
            <path d="M362,148 L538,148" stroke="#C8A96A" strokeWidth="0.7" strokeOpacity="0.22" />
          </g>

          {/* ── Center VGM Land Block ── */}
          <g transform="translate(0, 45)">
            <ellipse cx="450" cy="430" rx="114" ry="23" fill="rgba(0,0,0,0.2)" />
            <path d="M450,242 L344,298 L450,354 L556,298 Z" fill="url(#lapLandTop)" />
            <path d="M344,298 L344,384 L450,440 L450,354 Z" fill="url(#lapLandL)" />
            <path d="M450,354 L450,440 L556,384 L556,298 Z" fill="url(#lapLandR)" />
            <path d="M398,270 L502,270" stroke="#C8A96A" strokeWidth="0.7" strokeOpacity="0.2" />
            <path d="M398,326 L502,326" stroke="#C8A96A" strokeWidth="0.7" strokeOpacity="0.2" />
            <path d="M450,242 L344,298 L450,354 L556,298 Z" stroke="#C8A96A" strokeWidth="1.5" strokeOpacity="0.72" fill="none" filter="url(#lap-glow)" />
            <line x1="344" y1="298" x2="344" y2="384" stroke="#C8A96A" strokeWidth="1.2" strokeOpacity="0.42" />
            <line x1="556" y1="298" x2="556" y2="384" stroke="#C8A96A" strokeWidth="1.2" strokeOpacity="0.42" />
            <path d="M344,384 L450,440 L556,384" stroke="#C8A96A" strokeWidth="1.2" strokeOpacity="0.36" />
            <text x="450" y="290" textAnchor="middle" fill="#C8A96A" fontSize="13" fontWeight="700"
              fontFamily="'Cormorant Garamond','Georgia',serif" letterSpacing="2" filter="url(#lap-glow)">VGM</text>
            <text x="450" y="308" textAnchor="middle" fill="rgba(200,169,106,0.62)" fontSize="7.5"
              fontWeight="500" fontFamily="'Inter',sans-serif" letterSpacing="3">PREMIUM PLOTS</text>
          </g>
        </svg>

        {/* ── Per-building labels ── */}
        <div className="lap-building-labels" aria-live="polite">
          <div className={`lap-blabel${step >= 1 ? ' lap-blabel-show' : ''}`}
            style={{ left: '13%', top: '62%' }}>
            <div className="lap-blabel-top">01 / 03</div>
            <h3 className="lap-blabel-title">Premium Residential</h3>
            <div className="lap-blabel-rule" />
            <div className="lap-blabel-desc">Curated zones with modern infrastructure &amp; premium landscaping.</div>
          </div>
          <div className={`lap-blabel${step >= 2 ? ' lap-blabel-show' : ''}`}
            style={{ left: '87%', top: '62%' }}>
            <div className="lap-blabel-top">02 / 03</div>
            <h3 className="lap-blabel-title">Infrastructure Hub</h3>
            <div className="lap-blabel-rule" />
            <div className="lap-blabel-desc">Commercial &amp; civic infrastructure powering the community.</div>
          </div>
          <div className={`lap-blabel${step >= 3 ? ' lap-blabel-show' : ''}`}
            style={{ left: '50%', top: '22%' }}>
            <div className="lap-blabel-top">03 / 03</div>
            <h3 className="lap-blabel-title">Green Eco Spaces</h3>
            <div className="lap-blabel-rule" />
            <div className="lap-blabel-desc">Native trees, parks &amp; fresh-air avenues for healthy living.</div>
          </div>
        </div>

        <div className="lap-dots" aria-hidden="true">
          {[0, 1, 2, 3].map(i => <div key={i} className={`lap-dot${step >= i ? ' lap-dot-active' : ''}`} />)}
        </div>
        <div className="lap-progress-track" aria-hidden="true">
          <div className="lap-progress-fill" style={{ height: `${(step / 3) * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SITE SHOWCASE — Premium Alternating Image-Content Rows
// ============================================================
const SITE_SHOWCASE_ROWS = [
  {
    id: 'schools',
    heading: '3 Schools Within 800m',
    subheading: 'Education · Schools',
    descParts: [
      'Quality education is never far from home at VGM Nagar. With ',
      { gold: '3 reputed schools' },
      ' located within just ',
      { gold: '800 metres' },
      ' — including Aalam International (CBSC) School at ',
      { gold: '400 m' },
      ' and Government School at ',
      { gold: '800 m' },
      ' — your children\'s daily commute is short, safe, and stress-free. This is the educational convenience that defines a truly ',
      { gold: 'family-friendly investment' },
      '.',
    ],
    bullets: [
      'Premium educational access within 800 m',
      'Safe, walkable daily school commute',
      'Ideal family-friendly investment location',
    ],
    img: '/site-img-1.jpg',
    alt: 'Schools near VGM Nagar — 3 schools within 800 metres',
  },
  {
    id: 'college',
    heading: 'Colleges & Universities, 5–12 km Away',
    subheading: 'Higher Education · Colleges',
    descParts: [
      'VGM Nagar sits within reach of some of the region\'s most prestigious institutions. ',
      { gold: 'Takshashila University' },
      ' is just ',
      { gold: '5 km' },
      ' away, ',
      { gold: 'Saraswathy Law College' },
      ' at ',
      { gold: '10 km' },
      ', and ',
      { gold: 'SRM Agriculture College' },
      ' at ',
      { gold: '8 km' },
      '. Key locations spanning ',
      { gold: '5 to 12 km' },
      ' ensure your family\'s higher education aspirations are always within convenient reach.',
    ],
    bullets: [
      'Multiple premier colleges within 5–12 km',
      'Law, agriculture & university options nearby',
      'Smart location for long-term family growth',
    ],
    img: '/site-img-2.jpg',
    alt: 'Colleges and universities near VGM Nagar within 5–12 km',
  },
  {
    id: 'dd-travels',
    heading: 'Inter-City Travel via DD Travels',
    subheading: 'Transport · DD Travels',
    descParts: [
      'Your journey beyond the city begins conveniently from VGM Nagar. ',
      { gold: 'DD Travels' },
      ' and associated inter-city operators provide direct, comfortable connections to major destinations across Tamil Nadu. Well-connected transport hubs within a ',
      { gold: 'short driving distance' },
      ' mean your long-distance travel is always simple, reliable, and ',
      { gold: 'stress-free' },
      ' — whether for business or leisure.',
    ],
    bullets: [
      'Direct inter-city travel from nearby hubs',
      'Convenient connectivity across Tamil Nadu',
      'Premium transport access for residents',
    ],
    img: '/site-img-3.jpg',
    alt: 'DD Travels and inter-city transport connectivity near VGM Nagar',
  },
  {
    id: 'bus-stop',
    heading: 'Bus Connectivity on the GST Road',
    subheading: 'Public Transport · Bus Connectivity',
    descParts: [
      'Everyday commuting from VGM Nagar is straightforward and efficient. A ',
      { gold: 'well-served bus stop' },
      ' within close proximity provides frequent services along the ',
      { gold: 'GST Road corridor' },
      ', connecting residents to Chennai city, IT parks, commercial centres, and beyond. Combined with the proposed ',
      { gold: 'Metro Rail corridor' },
      ' nearby, public transport options here are among the strongest in the region.',
    ],
    bullets: [
      'Frequent bus services on GST Road corridor',
      'Quick city access for daily commuters',
      'Future Metro Rail connectivity advantage',
    ],
    img: '/site-img-4.jpg',
    alt: 'Bus stop and public transport connectivity near VGM Nagar',
  },
  {
    id: 'post-office',
    heading: 'Post Office & Civic Services Nearby',
    subheading: 'Civic Amenities · Post Office',
    descParts: [
      'A functioning ',
      { gold: 'post office' },
      ' within the locality ensures that banking, postal, and government-related services are readily accessible to every VGM Nagar resident. Proximity to key ',
      { gold: 'civic amenities' },
      ' reflects the community\'s excellent urban planning — essential services available without long travel, contributing to an exceptionally ',
      { gold: 'convenient daily lifestyle' },
      '.',
    ],
    bullets: [
      'Post office services within easy reach',
      'Government & civic conveniences nearby',
      'Well-planned urban civic infrastructure',
    ],
    img: '/site-img-5.jpg',
    alt: 'Post office and civic amenities near VGM Nagar',
  },
  {
    id: 'religious',
    heading: 'Religious Centers Across All Faiths',
    subheading: 'Religious Centers · Spiritual Living',
    descParts: [
      'VGM Nagar is surrounded by places of worship that reflect the rich cultural fabric of the region. ',
      { gold: 'Temples, mosques, and churches' },
      ' are all located within a comfortable distance, ensuring that residents of every faith can practice their traditions with ease. A spiritually enriching environment that fosters ',
      { gold: 'peace, harmony' },
      ', and a deep sense of belonging within the community.',
    ],
    bullets: [
      'Multi-faith religious centers close by',
      'Peaceful, spiritually enriching environment',
      'Strong community & cultural harmony',
    ],
    img: '/site-img-6.jpg',
    alt: 'Religious centers and places of worship near VGM Nagar',
  },
  {
    id: 'healthcare',
    heading: 'Quality Healthcare Within 12 km',
    subheading: 'Healthcare · Medical Facilities',
    descParts: [
      'The health and wellbeing of your family is protected by excellent medical infrastructure near VGM Nagar. ',
      { gold: 'Melmaruvathur Adhiparasakthi Institute of Medical Science & College' },
      ' is within ',
      { gold: '12 km' },
      ', with additional quality healthcare facilities along the ',
      { gold: 'GST Road corridor' },
      '. Rapid access to hospitals and clinics ensures your family\'s health needs are always met swiftly — a ',
      { gold: 'life-critical advantage' },
      ' for every resident.',
    ],
    bullets: [
      'Premium medical college hospital within 12 km',
      'Multiple clinics & health centres nearby',
      'Life-critical healthcare access assured',
    ],
    img: '/site-img-7.jpg',
    alt: 'Healthcare and hospitals near VGM Nagar',
  },
];

function SiteShowcaseSection() {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const cinemaRef = useRef(null);
  const cinemaWrapRef = useRef(null);
  const rafRef = useRef(null);

  // ── Row reveal via IntersectionObserver ──
  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    if (!rows.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ssc-row--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  // ── Cinematic scroll zoom ──
  useEffect(() => {
    const wrap = cinemaWrapRef.current;
    const img = cinemaRef.current;
    if (!wrap || !img) return;

    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when top of wrap enters viewport bottom, 1 when centre hits centre
      const raw = 1 - (rect.top / (vh * 0.85));
      const prog = Math.min(Math.max(raw, 0), 1);
      // ease: smooth cubic
      const eased = prog < 0.5
        ? 2 * prog * prog
        : 1 - Math.pow(-2 * prog + 2, 2) / 2;

      const minW = 46;   // %
      const maxW = 90;   // %
      const width = minW + (maxW - minW) * eased;
      const radius = 24 - 8 * eased;     // 24px → 16px

      wrap.style.width = `${width}%`;
      wrap.style.borderRadius = `${radius}px`;
      img.style.transform = 'none';   // no inner scale — prevent all cropping
      rafRef.current = null;
    };

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // initial
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="site-showcase-section"
      aria-label="VGM Nagar site showcase"
    >
      {/* ── Section Heading ── */}
      <div className="ssc-heading-wrap">
        <div className="ssc-eyebrow">Site Gallery &amp; Stories</div>
        <h2 className="ssc-main-title">
          <span className="trust-head-ink">Where Every </span>
          <span className="ssc-head-gold-word">Plot </span>
          <span className="trust-head-green">Tells a Story</span>
        </h2>
        <p className="ssc-subtitle">
          Walk through VGM Nagar — and discover a community shaped by craftsmanship,
          nature, and a relentless pursuit of <em>premium living</em>.
        </p>
        <div className="ssc-heading-accent" aria-hidden="true" />
      </div>
      {/* ── Cinematic Scroll Image ── */}
      <div className="ssc-cinema-outer">
        <div
          ref={cinemaWrapRef}
          className="ssc-cinema-wrap"
          aria-hidden="true"
        >
          <img
            ref={cinemaRef}
            src="/site-img-0.jpg"
            alt="VGM Nagar — premium plotted development aerial view"
            className="ssc-cinema-img"
            loading="lazy"
          />
          <div className="ssc-cinema-overlay" />
        </div>
      </div>

      {/* ── Alternating Rows ── */}
      <div className="ssc-rows-wrap">
        {SITE_SHOWCASE_ROWS.map((row, i) => {
          const isEven = i % 2 === 0; // even → image left, odd → image right
          return (
            <div
              key={row.id}
              ref={(el) => (rowRefs.current[i] = el)}
              className={`ssc-row${isEven ? ' ssc-row--img-left' : ' ssc-row--img-right'}`}
              id={`ssc-row-${row.id}`}
            >
              {/* Image card */}
              <div className="ssc-img-col">
                <div className="ssc-img-card">
                  <img
                    src={row.img}
                    alt={row.alt}
                    className="ssc-img"
                    loading="lazy"
                  />
                  <div className="ssc-img-overlay" aria-hidden="true" />
                  <div className="ssc-img-number" aria-hidden="true">
                    0{i + 1}
                  </div>
                </div>
              </div>

              {/* Content card */}
              <div className="ssc-content-col">
                <div className="ssc-content-inner">
                  <div className="ssc-content-eyebrow">{row.subheading}</div>
                  <div className="ssc-content-accent-line" aria-hidden="true" />
                  <h3 className="ssc-content-heading">{row.heading}</h3>
                  <p className="ssc-content-desc">
                    {row.descParts
                      ? row.descParts.map((part, pi) =>
                        typeof part === 'string'
                          ? part
                          : <span key={pi} className="ssc-gold-word">{part.gold}</span>
                      )
                      : row.desc}
                  </p>
                  {row.bullets && (
                    <ul className="ssc-bullets" aria-label="Key highlights">
                      {row.bullets.map((b) => (
                        <li key={b} className="ssc-bullet-item">
                          <span className="ssc-bullet-diamond" aria-hidden="true">◆</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="ssc-content-glow" aria-hidden="true" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Discover() {
  useScrollReveal();
  const navigate = useNavigate();
  useParallax();
  useTiltCards();
  useCounters();

  const heroRef = useRef(null);
  const particleRef = useRef(null);
  const heroVideoRef = useRef(null);
  const lastScrollY = useRef(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const heroBottom = windowHeight * 2;
      
      if (scrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      const video = heroVideoRef.current;
      if (!video) return;

      const isInsideHero = scrollY > 50 && scrollY < heroBottom;

      if (isInsideHero) {
        if (video.paused && !video.ended) {
          video.play().catch(e => console.log('Play blocked', e));
        }
      } else if (scrollY <= 50) {
        if (!video.paused) {
          video.pause();
        }
        if (video.currentTime > 0) {
          video.currentTime = 0;
        }
      } else if (scrollY >= heroBottom) {
        if (!video.paused) {
          video.pause();
        }
      }

      lastScrollY.current = scrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoEnded = () => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: windowHeight * 2 + 5, // slightly past the wrapper to ensure next section triggers
      behavior: 'smooth'
    });
  };

  const [activeTrustIndex, setActiveTrustIndex] = useState(0);
  const trustPauseUntilRef = useRef(0);

  const activateTrustCard = (index) => {
    trustPauseUntilRef.current = Date.now() + 8000;
    setActiveTrustIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() >= trustPauseUntilRef.current) {
        setActiveTrustIndex((prev) => (prev + 1) % TRUST_STORY_ITEMS.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeTrustItem = TRUST_STORY_ITEMS[activeTrustIndex];

  // Hero parallax on mouse move
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const { clientX, clientY, currentTarget } = e;
      const { offsetWidth, offsetHeight } = currentTarget;
      const xPct = (clientX / offsetWidth - 0.5) * 20;
      const yPct = (clientY / offsetHeight - 0.5) * 20;
      const img = hero.querySelector('.hero-parallax-img');
      if (img) img.style.transform = `scale(1.08) translate(${xPct * 0.4}px, ${yPct * 0.4}px)`;
    };
    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  // Floating particles
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      alpha: Math.random() * 0.5 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,169,106,${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.y < 0) { p.y = H; p.x = Math.random() * W; }
        if (p.x < 0 || p.x > W) p.vx *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <div className="discover-page page-enter">
      {/* ===== HERO WRAPPER ===== */}
      <div className="discover-hero-scroll-wrapper">
        <section className="discover-video-hero" aria-label="Discover cinematic video hero">
          <video
            ref={heroVideoRef}
            muted
            playsInline
            className="dvh-video"
            onEnded={handleVideoEnded}
            // loop removed to naturally stop on final frame
            // autoPlay removed to start frozen
          >
            <source src="/videos/vgmvideo.mp4" type="video/mp4" />
          </video>
          
          <div className="dvh-overlay-global" />
          <div className={`dvh-overlay-gradient ${hasScrolled ? 'faded' : ''}`} />
          
          <div className={`dvh-interactive-content ${hasScrolled ? 'faded' : ''}`}>
            <div className="dvh-badge reveal">PREMIUM PLOTTED DEVELOPMENT</div>
            
            <h1 className="dvh-title reveal delay-1">
              Where Every<br />
              <span className="dvh-title-gold">Investment Finds</span><br />
              Its Future
            </h1>
            
            <p className="dvh-subtitle reveal delay-2">
              Experience the epitome of luxury real estate. Discover meticulously planned landscapes and world-class infrastructure designed to elevate your standard of living.
            </p>
            
            <div className="dvh-actions reveal delay-3">
              <NavLink to="/master-plan" className="btn-gold">Explore Master Plan</NavLink>
            </div>
          </div>

          <div className={`dvh-scroll-indicator reveal delay-3 ${hasScrolled ? 'faded' : ''}`}>
            <span>Scroll to Discover</span>
            <div className="dvh-scroll-line"></div>
          </div>
        </section>
      </div>
      {/* ===== VISION ===== */}
      <VisionSection />

      {/* Smart Living Ecosystem section removed */}

      {/* ===== TESTIMONIAL / TRUST ===== */}
      <section className="discover-trust" aria-label="Trust indicators">
        <div className="trust-story-wrap">

          {/* Heading */}
          <div className="trust-story-head reveal">
            <div className="trust-story-copy">
              <div className="section-eyebrow">Why Investors Trust Us</div>
              <h2 className="section-title">
                <span className="trust-head-ink">Built on </span>
                <span className="trust-head-green">Integrity</span>
                <span className="trust-head-ink">, </span>
                <span className="trust-head-gold">Backed by Law</span>
              </h2>
              <div className="trust-story-dynamic" key={activeTrustItem.id}>
                <h3 className="trust-story-dynamic-title">{activeTrustItem.title}</h3>
                <p className="trust-story-dynamic-desc">{activeTrustItem.desc}</p>
                <ul className="trust-story-dynamic-bullets" aria-label={`${activeTrustItem.title} highlights`}>
                  {activeTrustItem.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="trust-story-visual reveal delay-1">
              <div className="trust-story-wheel" aria-label="Investor trust highlights">
                <div className="trust-story-arc trust-story-arc--outer" aria-hidden="true" />
                <div className="trust-story-arc trust-story-arc--inner" aria-hidden="true" />
                <div className="trust-story-glow" aria-hidden="true" />

                {TRUST_STORY_ITEMS.map((item, index) => {
                  const offset = (index - activeTrustIndex + TRUST_STORY_ITEMS.length) % TRUST_STORY_ITEMS.length;
                  const signedOffset = offset > TRUST_STORY_ITEMS.length / 2
                    ? offset - TRUST_STORY_ITEMS.length
                    : offset;
                  const positionMap = {
                    '-2': { right: -50, y: -268, rotate: '9deg', scale: 0.9, opacity: 0.66, z: 8 },
                    '-1': { right: -24, y: -148, rotate: '6deg', scale: 0.95, opacity: 0.82, z: 12 },
                    '0': { right: 76, y: 0, rotate: '2deg', scale: 1, opacity: 1, z: 20 },
                    '1': { right: -18, y: 148, rotate: '-3deg', scale: 0.95, opacity: 0.82, z: 12 },
                    '2': { right: -50, y: 268, rotate: '-5deg', scale: 0.9, opacity: 0.66, z: 8 },
                  };
                  const position = positionMap[String(signedOffset)] ?? positionMap['0'];
                  const blurMap = {
                    '-2': 0.55,
                    '-1': 0,
                    '0': 0,
                    '1': 0,
                    '2': 0.55,
                  };
                  const blur = blurMap[String(signedOffset)] ?? 0;
                  const isActive = index === activeTrustIndex;
                  const renderedScale = isActive ? 1.08 : position.scale;
                  const renderedRotate = isActive ? '0deg' : position.rotate;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`trust-story-image-card${isActive ? ' is-active' : ''}`}
                      style={{
                        right: `${position.right}px`,
                        transform: `translate3d(0, calc(-50% + ${position.y}px), 0) rotate(${renderedRotate}) scale(${renderedScale})`,
                        opacity: position.opacity,
                        filter: `blur(${blur}px)`,
                        zIndex: isActive ? 30 : position.z,
                      }}
                      onClick={() => activateTrustCard(index)}
                      aria-pressed={isActive}
                      aria-label={item.title}
                    >
                      <span className="trust-story-card-media">
                        <img src={item.image} alt={item.alt} loading="lazy" />
                      </span>
                      <span className="trust-story-card-body">
                        <span className="trust-story-image-caption">{item.title}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== SITE SHOWCASE ===== */}
      <SiteShowcaseSection />

      {/* ===== CONNECTED LIVING ECOSYSTEM ===== */}
      <ConnectedEcosystemSection />




      {/* ===== PARALLAX SHOWCASE ===== */}
      <section className="discover-showcase" aria-label="Site showcase">
        <div className="showcase-parallax parallax-container">
          <img
            src="bgimage.png"
            alt="VGM site landscape"
            className="showcase-bg-img"
            data-parallax="0.25"
          />
          <div className="showcase-overlay" />
          <div className="showcase-content reveal">
            <div className="section-eyebrow" style={{ color: '#C8A96A', justifyContent: 'center' }}>
              The Investment of a Lifetime
            </div>
            <h2 className="showcase-headline">
              Your Dream Plot.<br />Your Future Address.
            </h2>
            <p className="showcase-text">
              Well Connected. Well Developed. Well Worth It. — Premium Plots at Archapakkam
              Thozhupedu on the high-growth GST Road corridor with proposed Metro Rail connectivity.
            </p>
            <NavLink to="/location" className="btn-gold" id="showcase-location-btn">
              Explore Location →
            </NavLink>
          </div>
        </div>
      </section>



      {/* ===== INTRO BANNER ===== */}
      <section className="smart-banner" aria-label="Smart living intro">
        <div className="section-wrap">
          <div className="smart-banner-inner">
            <div className="reveal-left">
              <div className="section-eyebrow">Our Commitment</div>
              <h2 className="section-title">
                A Community Designed for<br />
                <span className="highlight">Future Generations</span>
              </h2>
              <div className="gold-divider" />
              <p className="section-subtitle" style={{ marginTop: 16 }}>
                Every infrastructure decision at VGM Nagar is made with a 50-year horizon in mind.
                We don't just build for today — we engineer for tomorrow.
              </p>
            </div>
            <div className="smart-banner-stats reveal-right">
              {[
                { n: '70%', label: 'Energy from Solar' },
                { n: '100%', label: 'Waste Managed' },
                { n: '500+', label: 'Trees Planted' },
                { n: '24/7', label: 'Security Active' },
              ].map((s) => (
                <div key={s.label} className="smart-stat">
                  <div className="smart-stat-num">{s.n}</div>
                  <div className="smart-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURE CARDS GRID ===== */}
      <section className="smart-features-section" aria-label="Smart features">
        <div className="section-wrap">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <span>6 Pillars of Smart Living</span>
            </div>
            <h2 className="section-title text-center">
              Every Feature.<br /><span className="gold">Every Detail.</span>
            </h2>
          </div>
          <div className="smart-features-grid">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.id} f={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CIRCULAR SUSTAINABILITY DIAGRAM ===== */}

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="discover-cta-strip" aria-label="Call to action">
        <div className="cta-strip-inner reveal">
          <div>
            <h2 className="cta-strip-title">Secure Your Plot at Archapakkam Thozhupedu</h2>
            <p className="cta-strip-sub">DTCP & RERA Approved · Clear Title · Limited Plots · High Appreciation</p>
          </div>
          <div className="cta-strip-actions">
            <button className="btn-gold" onClick={() => navigate('/connect')} id="nav-site-visit-btn">
              Book Site Visit
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

const FEATURES = [
  {
    id: 'rainwater',
    icon: '💧',
    title: 'Rainwater Harvesting',
    subtitle: 'Water Conservation',
    desc: 'Stores rainwater through engineered recharge pits and collection channels, reduces groundwater usage, and ensures a long-term, reliable water supply for the entire community.',
    animation: 'water',
    color: '#1F7A5A',
  },
  {
    id: 'solar',
    icon: '☀️',
    title: 'Renewable Energy',
    subtitle: 'Clean Power',
    desc: 'Sustainable renewable energy source powers common areas and street lights, promoting eco-friendly usage and significantly lowering electricity costs for every resident.',
    animation: 'solar',
    color: '#C8A96A',
  },
  {
    id: 'biogas',
    icon: '🌿',
    title: 'Biogas Plant',
    subtitle: 'Waste-to-Energy',
    desc: 'Reduces LPG dependency by converting organic community waste into clean cooking fuel — an eco-friendly solution that benefits both residents and the environment.',
    animation: 'biogas',
    color: '#2A9D6E',
  },
  {
    id: 'trees',
    icon: '🌳',
    title: 'Tree Plantation Drive',
    subtitle: 'Green Air Quality',
    desc: 'Extensive tree plantation across the layout improves air quality, reduces heat, and creates a healthier, cooler living environment for every family in the community.',
    animation: 'wind',
    color: '#145A41',
  },
  {
    id: 'cctv',
    icon: '📡',
    title: '24×7 CCTV Security',
    subtitle: 'Smart Safety',
    desc: '24×7 CCTV surveillance with continuous monitoring at all entry points and common areas ensures completely safe surroundings and total peace of mind for residents.',
    animation: 'radar',
    color: '#0B3D2E',
  },
  {
    id: 'community',
    icon: '🏘️',
    title: 'Planned Community',
    subtitle: 'Better Lifestyle',
    desc: 'An open, walkable environment with wide roads, parks, and social spaces — designed to a global standard with modern layouts and a future-ready, long-term vision.',
    animation: 'pulse',
    color: '#C8A96A',
  },
];


function FeatureCard({ f, index }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    let raf, t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (f.animation === 'water') {
        // Water drops falling
        for (let i = 0; i < 5; i++) {
          const x = W * (0.15 + i * 0.17);
          const y = ((t * 1.5 + i * 30) % H);
          ctx.beginPath();
          ctx.ellipse(x, y, 3, 6, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(31,122,90,${0.6 - i * 0.05})`;
          ctx.fill();
        }
        // Flow line
        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y = H * 0.7 + Math.sin((x / 30) + t * 0.05) * 8;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(31,122,90,0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (f.animation === 'solar') {
        // Sun rays
        const cx = W / 2, cy = H * 0.4;
        const numRays = 8;
        for (let i = 0; i < numRays; i++) {
          const angle = (i / numRays) * Math.PI * 2 + t * 0.01;
          const innerR = 18 + Math.sin(t * 0.05) * 3;
          const outerR = 40 + Math.sin(t * 0.05 + i) * 8;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
          ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
          ctx.strokeStyle = `rgba(200,169,106,${0.6})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, 15 + Math.sin(t * 0.05) * 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,169,106,0.85)';
        ctx.fill();
        // Light beam downward
        const grad = ctx.createLinearGradient(cx, cy, cx, H);
        grad.addColorStop(0, 'rgba(200,169,106,0.25)');
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(cx - 20, cy);
        ctx.lineTo(cx + 20, cy);
        ctx.lineTo(cx + 40, H);
        ctx.lineTo(cx - 40, H);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      if (f.animation === 'biogas') {
        // Bubbles rising
        for (let i = 0; i < 8; i++) {
          const x = W * (0.1 + (i / 8) * 0.8);
          const y = H - ((t * 0.8 + i * 20) % H);
          const r = 4 + (i % 3) * 3;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(42,157,110,0.5)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        // Circular flow arrow
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, 30, t * 0.02, t * 0.02 + Math.PI * 1.5);
        ctx.strokeStyle = 'rgba(42,157,110,0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (f.animation === 'wind') {
        // Wind lines
        for (let i = 0; i < 6; i++) {
          const offset = ((t * 1.5 + i * 15) % W);
          const y = H * (0.2 + i * 0.12);
          const len = 40 + Math.sin(t * 0.05 + i) * 20;
          ctx.beginPath();
          ctx.moveTo(offset - len, y);
          ctx.bezierCurveTo(offset - len / 2, y - 6, offset + len / 2, y + 6, offset + len, y);
          ctx.strokeStyle = `rgba(20,90,65,${0.4 + i * 0.07})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      if (f.animation === 'radar') {
        const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.4;
        // Rings
        [0.35, 0.65, 1].forEach((r) => {
          ctx.beginPath();
          ctx.arc(cx, cy, R * r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(11,61,46,0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
        // Rotating sweep
        const angle = (t * 0.02) % (Math.PI * 2);
        const sweepGrad = ctx.createConicalGradient ? undefined : null;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, angle - 0.8, angle);
        ctx.closePath();
        ctx.fillStyle = 'rgba(11,61,46,0.25)';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
        ctx.strokeStyle = 'rgba(200,169,106,0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,169,106,0.9)';
        ctx.fill();
      }

      if (f.animation === 'pulse') {
        const cx = W / 2, cy = H / 2;
        for (let i = 0; i < 4; i++) {
          const r = 15 + i * 20 + (t * 0.5) % 20;
          const alpha = Math.max(0, 0.5 - (r - 15) / 100);
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(200,169,106,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,169,106,0.8)';
        ctx.fill();
      }

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [f.animation]);

  return (
    <div className={`smart-card tilt-card reveal delay-${(index % 3) + 1}`}>
      <div className="smart-card-canvas-wrap" style={{ background: `${f.color}18` }}>
        <canvas ref={canvasRef} className="smart-card-canvas" aria-hidden="true" />
        <div className="smart-card-icon-overlay">{f.icon}</div>
      </div>
      <div className="smart-card-body">
        <div className="smart-card-subtitle">{f.subtitle}</div>
        <h3 className="smart-card-title">{f.title}</h3>
        <p className="smart-card-desc">{f.desc}</p>
        <div className="smart-card-bar" style={{ background: `${f.color}22` }}>
          <div className="smart-card-fill" style={{ background: f.color }} />
        </div>
      </div>
    </div>
  );
}

function SustainCircle() {
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);
  const hoverRef = useRef({ idx: 0, prog: 0 }); // Start with first item for auto-rotate
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    if (!canvas || !tooltip) return;

    // We maintain aspect ratio using parent size.
    const S = canvas.width = canvas.height = 400; // Fixed canvas internal size
    const cx = S / 2, cy = S / 2, R = S * 0.35;
    let t = 0, raf;

    const icons = ['💧', '☀️', '🌿', '🌳', '📡', '🏘️'];
    const tooltipLabels = ['Water Management', 'Renewable Energy', 'Biogas System', 'Air Quality', '24x7 Safety', 'Planned Community'];
    const colors = ['#1F7A5A', '#C8A96A', '#2A9D6E', '#145A41', '#0B3D2E', '#C8A96A'];

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };
    const handleLeave = () => { mouseRef.current = { x: -100, y: -100 }; };

    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleLeave);

    let autoIndex = 0;
    let lastAutoTime = Date.now();
    let isUserHovering = false;

    const draw = () => {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, S, S);

      // Rotating outer ring - Restored dark lines for visibility
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.005);
      ctx.strokeStyle = 'rgba(11,61,46,0.6)'; // Uniform medium opacity
      ctx.lineWidth = 1.5; // Consistent thickness
      ctx.setLineDash([8, 12]);
      ctx.shadowColor = 'transparent'; // No glow
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Inner concentric circles (Visual depth) - Restored all layers
      [1, 0.75, 0.5, 0.25].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, R * r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(11,61,46,0.6)'; // Uniform medium opacity
        ctx.lineWidth = 1.5; // Consistent thickness
        ctx.setLineDash([]);
        ctx.shadowColor = 'transparent'; // No glow
        ctx.shadowBlur = 0;
        ctx.stroke();

        const innerGrad = ctx.createRadialGradient(cx, cy, R * r * 0.9, cx, cy, R * r);
        innerGrad.addColorStop(0, 'transparent');
        innerGrad.addColorStop(1, `rgba(11,61,46,0.03)`); // Soft depth fill
        ctx.fillStyle = innerGrad;
        ctx.fill();
      });

      // Animated flow along circular path
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 0.015);
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.65, 0, Math.PI * 0.5);
      ctx.strokeStyle = 'rgba(200,169,106,0.5)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#C8A96A';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // Center circle (kept exactly as requested)
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(11,61,46,0.1)';
      ctx.shadowColor = 'rgba(11,61,46,0.2)';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      const pulseR = 15 + Math.sin(t * 0.04) * 6;
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,169,106,${0.1 + (pulseR - 15) / 40})`;
      ctx.fill();

      ctx.font = '22px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🌿', cx, cy);

      // --- Auto-Rotate vs User Hover Logic ---
      let now = Date.now();
      let targetHover = -1;

      if (mouseRef.current.x !== -100) {
        icons.forEach((icon, i) => {
          const angle = (i / icons.length) * Math.PI * 2 + t * 0.008;
          const x = cx + Math.cos(angle) * R;
          const y = cy + Math.sin(angle) * R;
          if (Math.hypot(mouseRef.current.x - x, mouseRef.current.y - y) < 30) {
            targetHover = i;
          }
        });
      }

      if (targetHover !== -1) {
        isUserHovering = true;
        if (hoverRef.current.idx !== targetHover) {
          hoverRef.current = { idx: targetHover, prog: 0 };
        }
        hoverRef.current.prog = Math.min(1, hoverRef.current.prog + 0.1);
        canvas.style.cursor = 'pointer';
        lastAutoTime = now; // reset timer
      } else {
        isUserHovering = false;
        canvas.style.cursor = 'default';

        // Auto rotate logic every 2.5 seconds
        if (now - lastAutoTime > 2500) {
          autoIndex = (autoIndex + 1) % icons.length;
          lastAutoTime = now;
        }

        if (hoverRef.current.idx !== autoIndex) {
          hoverRef.current.prog -= 0.1;
          if (hoverRef.current.prog <= 0) {
            hoverRef.current = { idx: autoIndex, prog: 0 };
          }
        } else {
          hoverRef.current.prog = Math.min(1, hoverRef.current.prog + 0.08);
        }
      }

      // Ensure tooltip gets updated outside canvas loop
      let tooltipUpdated = false;

      // Orbiting feature nodes
      icons.forEach((icon, i) => {
        const angle = (i / icons.length) * Math.PI * 2 + t * 0.008;
        const x = cx + Math.cos(angle) * R;
        const y = cy + Math.sin(angle) * R;

        const isHovered = hoverRef.current.idx === i;
        const prog = isHovered ? hoverRef.current.prog : 0;
        const scale = 1 + (prog * 0.15);

        // Connection line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(200,169,106,${0.65 + prog * 0.35})`; // Soft premium gold with subtle hover variation
        ctx.lineWidth = 2.0; // Thicker for better visibility
        ctx.lineCap = 'round'; // Elegant soft ends for dots
        ctx.setLineDash([4, 10]); // Consistent, well-spaced dots
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.lineCap = 'butt'; // Reset

        // Animated connection dot
        const dotProg = (t * 0.01 + i * 0.2) % 1;
        const dotX = cx + (x - cx) * dotProg;
        const dotY = cy + (y - cy) * dotProg;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = colors[i];
        ctx.fill();

        // Hover Laser Line
        if (isHovered && prog > 0) {
          const outAngle = angle;
          const lineLen = 35 * prog;
          const endX = x + Math.cos(outAngle) * lineLen;
          const endY = y + Math.sin(outAngle) * lineLen;

          ctx.beginPath();
          ctx.moveTo(x + Math.cos(outAngle) * 24, y + Math.sin(outAngle) * 24);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = colors[i];
          ctx.lineWidth = 2;
          ctx.shadowColor = colors[i];
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;

          // External Tooltip Handling
          if (prog > 0.4) {
            const tipProg = (prog - 0.4) / 0.6;

            // Convert canvas coordinates to percentage for absolute positioning
            // Position it OUTSIDE the circle ring (R + 60)
            const outR = R + 65;
            const tipX = cx + Math.cos(outAngle) * outR;
            const tipY = cy + Math.sin(outAngle) * outR;

            tooltip.style.opacity = tipProg;
            tooltip.style.left = `${(tipX / S) * 100}%`;
            tooltip.style.top = `${(tipY / S) * 100}%`;
            tooltip.style.transform = `translate(-50%, -50%) scale(${0.9 + 0.1 * tipProg})`;
            tooltip.style.borderColor = colors[i];
            tooltip.style.boxShadow = `0 8px 24px ${colors[i]}33`;
            tooltip.textContent = tooltipLabels[i];

            tooltipUpdated = true;
          }
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(x, y, 22 * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

        // Reduced border thickness and opacity to soften the harshness
        ctx.strokeStyle = `${colors[i]}A0`; // Opacity reduced
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.shadowColor = colors[i];
        ctx.shadowBlur = isHovered ? 12 * prog : 0;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.font = `${18 * scale}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(icon, x, y);
      });

      if (!tooltipUpdated) {
        tooltip.style.opacity = 0;
      }

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto', aspectRatio: '1/1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <canvas ref={canvasRef} className="sustain-canvas" aria-hidden="true" style={{ width: '100%', height: '100%' }} />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          background: '#fff',
          color: '#0B3D2E',
          padding: '8px 16px',
          borderRadius: '8px',
          fontWeight: '700',
          fontSize: '13px',
          border: '2px solid transparent',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          zIndex: 10,
          whiteSpace: 'nowrap',
          fontFamily: '"Space Grotesk", sans-serif'
        }}
      />
    </div>
  );
}
