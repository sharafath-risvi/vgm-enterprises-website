import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useScrollReveal, useTiltCards } from '../components/useAnimations';
import './MasterPlan.css';

const ZONES = [
  { id: 'plots', label: 'Residential Plots', color: '#C8A96A', icon: '🏠', count: '180+', size: '1200–3600 sq.ft' },
  { id: 'park', label: 'Central Park', color: '#2A9D6E', icon: '🌳', count: '2 Acres', size: 'Open Green Space' },
  { id: 'club', label: 'Clubhouse', color: '#1F7A5A', icon: '🏛️', count: '8000 sq.ft', size: 'Premium Amenities' },
  { id: 'roads', label: 'Internal Roads', color: '#145A41', icon: '🛣️', count: '30/40 ft', size: 'BT Roads' },
  { id: 'water', label: 'Water Bodies', color: '#0B3D2E', icon: '💧', count: '0.5 Acres', size: 'Harvesting Pond' },
];

const SPECS = [
  { label: 'Total Area', value: '15 Acres' },
  { label: 'No. of Plots', value: '200+' },
  { label: 'Plot Sizes', value: '1200–3600 sq.ft' },
  { label: 'Road Width', value: '30ft / 40ft' },
  { label: 'Green Cover', value: '40% Min' },
  { label: 'Approval', value: 'DTCP + RERA' },
  { label: 'Possession', value: 'Ready to Register' },
  { label: 'Price Range', value: '₹25L – ₹90L' },
];

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

const DISTANCES = [
  { place: 'Aalam International School', dist: '400 m', time: '2 min' },
  { place: 'Sri Srinivasa Clinic', dist: '2 km', time: '5 min' },
  { place: 'Takshashila University', dist: '5 km', time: '8 min' },
  { place: 'SRM Agriculture College', dist: '8 km', time: '12 min' },
  { place: 'Saraswathy Law College', dist: '10 km', time: '15 min' },
  { place: 'Melmaruvathur Medical College', dist: '12 km', time: '18 min' },
];

// Cross-browser rounded rect helper
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function InteractiveLayoutCanvas({ activeZone, setActiveZone }) {
  const canvasRef = useRef(null);
  const animRef = useRef({ t: 0, raf: null, activeZone: null });

  // Sync activeZone prop into ref so canvas doesn't need to remount
  useEffect(() => { animRef.current.activeZone = activeZone; }, [activeZone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const VW = canvas.offsetWidth;
    const VH = canvas.offsetHeight;
    canvas.width = VW * dpr;
    canvas.height = VH * dpr;
    ctx.scale(dpr, dpr);

    const anim = animRef.current;

    const layout = {
      roads: [
        { x: VW * 0.06, y: VH * 0.15, w: VW * 0.88, h: VH * 0.07 },
        { x: VW * 0.06, y: VH * 0.78, w: VW * 0.88, h: VH * 0.07 },
        { x: VW * 0.06, y: VH * 0.15, w: VW * 0.07, h: VH * 0.70 },
        { x: VW * 0.87, y: VH * 0.15, w: VW * 0.07, h: VH * 0.70 },
        { x: VW * 0.35, y: VH * 0.15, w: VW * 0.05, h: VH * 0.70 },
        { x: VW * 0.60, y: VH * 0.15, w: VW * 0.05, h: VH * 0.70 },
      ],
      park: { x: VW * 0.40, y: VH * 0.30, w: VW * 0.20, h: VH * 0.40 },
      club: { x: VW * 0.42, y: VH * 0.50, w: VW * 0.16, h: VH * 0.16 },
      water: { x: VW * 0.45, y: VH * 0.32, w: VW * 0.10, h: VH * 0.10 },
      plots: [],
    };

    for (let col = 0; col < 3; col++)
      for (let row = 0; row < 5; row++)
        layout.plots.push({ x: VW * 0.13 + col * VW * 0.07, y: VH * 0.25 + row * VH * 0.10, w: VW * 0.06, h: VH * 0.08 });

    for (let col = 0; col < 3; col++)
      for (let row = 0; row < 5; row++)
        layout.plots.push({ x: VW * 0.65 + col * VW * 0.07, y: VH * 0.25 + row * VH * 0.10, w: VW * 0.06, h: VH * 0.08 });

    const draw = () => {
      const t = anim.t;
      const az = anim.activeZone;
      ctx.clearRect(0, 0, VW, VH);
      ctx.fillStyle = 'rgba(11,61,46,0.04)';
      ctx.fillRect(0, 0, VW, VH);

      // Grid
      ctx.strokeStyle = 'rgba(11,61,46,0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < VW; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, VH); ctx.stroke(); }
      for (let y = 0; y < VH; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(VW, y); ctx.stroke(); }

      // Roads
      layout.roads.forEach((r) => {
        ctx.fillStyle = az === 'roads' ? 'rgba(20,90,65,0.5)' : 'rgba(20,90,65,0.25)';
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.setLineDash([8, 8]);
        ctx.strokeStyle = 'rgba(200,169,106,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (r.w > r.h) { ctx.moveTo(r.x, r.y + r.h / 2); ctx.lineTo(r.x + r.w, r.y + r.h / 2); }
        else { ctx.moveTo(r.x + r.w / 2, r.y); ctx.lineTo(r.x + r.w / 2, r.y + r.h); }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Park
      const pk = layout.park;
      ctx.fillStyle = az === 'park' ? 'rgba(42,157,110,0.55)' : 'rgba(42,157,110,0.3)';
      rrect(ctx, pk.x, pk.y, pk.w, pk.h, 6); ctx.fill();
      for (let ti = 0; ti < 12; ti++) {
        const tx = pk.x + 10 + (ti % 4) * (pk.w - 20) / 3;
        const ty = pk.y + 10 + Math.floor(ti / 4) * (pk.h - 20) / 2;
        const pulse = 0.5 + Math.sin(t * 0.04 + ti) * 0.3;
        ctx.beginPath(); ctx.arc(tx, ty, 5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(11,61,46,${0.5 * pulse})`; ctx.fill();
      }

      // Water
      const wa = layout.water;
      const wAlpha = 0.6 + Math.sin(t * 0.06) * 0.2;
      ctx.fillStyle = `rgba(31,122,90,${wAlpha * 0.5})`;
      ctx.beginPath();
      ctx.ellipse(wa.x + wa.w / 2, wa.y + wa.h / 2, wa.w / 2, wa.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(31,122,90,${wAlpha})`; ctx.lineWidth = 1.5; ctx.stroke();

      // Clubhouse
      const cl = layout.club;
      ctx.fillStyle = az === 'club' ? 'rgba(200,169,106,0.7)' : 'rgba(200,169,106,0.4)';
      rrect(ctx, cl.x, cl.y, cl.w, cl.h, 4); ctx.fill();
      ctx.strokeStyle = 'rgba(200,169,106,0.8)'; ctx.lineWidth = 1.5;
      rrect(ctx, cl.x, cl.y, cl.w, cl.h, 4); ctx.stroke();
      ctx.font = `${az === 'club' ? 'bold ' : ''}11px Space Grotesk, sans-serif`;
      ctx.fillStyle = '#0B3D2E'; ctx.textAlign = 'center';
      ctx.fillText('Clubhouse', cl.x + cl.w / 2, cl.y + cl.h / 2 + 4);

      // Plots
      layout.plots.forEach((p, i) => {
        const pulse = az === 'plots' ? 0.7 + Math.sin(t * 0.04 + i * 0.5) * 0.3 : 0.6;
        ctx.fillStyle = `rgba(200,169,106,${pulse * 0.35})`;
        rrect(ctx, p.x + 2, p.y + 2, p.w - 4, p.h - 4, 2); ctx.fill();
        ctx.strokeStyle = `rgba(200,169,106,${pulse * 0.7})`; ctx.lineWidth = 1;
        rrect(ctx, p.x + 2, p.y + 2, p.w - 4, p.h - 4, 2); ctx.stroke();
      });

      // Animated car dot
      const roadProgress = (t * 0.8) % (VW * 0.88);
      ctx.beginPath(); ctx.arc(VW * 0.06 + roadProgress, VH * 0.185, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#C8A96A'; ctx.shadowColor = '#C8A96A'; ctx.shadowBlur = 10;
      ctx.fill(); ctx.shadowBlur = 0;

      anim.t++;
      anim.raf = requestAnimationFrame(draw);
    };
    draw();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const CW = canvas.offsetWidth, CH = canvas.offsetHeight;
      if (mx > CW * 0.13 && mx < CW * 0.34 && my > CH * 0.25) setActiveZone('plots');
      else if (mx > CW * 0.65 && my > CH * 0.25) setActiveZone('plots');
      else if (mx > CW * 0.40 && mx < CW * 0.60 && my > CH * 0.30 && my < CH * 0.70) setActiveZone('park');
      else if (mx > CW * 0.42 && mx < CW * 0.58 && my > CH * 0.50 && my < CH * 0.66) setActiveZone('club');
      else if (my < CH * 0.22 || my > CH * 0.78) setActiveZone('roads');
      else setActiveZone(null);
    };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', () => setActiveZone(null));

    return () => {
      cancelAnimationFrame(anim.raf);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', () => setActiveZone(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="master-canvas" aria-label="Interactive master plan layout" />;
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
    <section ref={secRef} id="connected-ecosystem" className="cle-section" aria-label="Connected Living Ecosystem">
      <div className="cle-bg-mesh" aria-hidden="true" />

      <div className="section-wrap-master">
        {/* Heading */}
        <div className="cle-header">
          <div className="section-eyebrow cle-eyebrow">Connected Living Ecosystem</div>
          <h2 className="cle-main-title">
            <span className="cle-title-plain">Your Plot.</span>
            <br />
            <span className="cle-title-gold-serif">The Center</span>
            {' '}
            <span className="cle-title-green">of Everything.</span>
          </h2>
          <p className="cle-subtitle">
            Everything around your plot is thoughtfully designed, connected, and built for a premium lifestyle.
          </p>
        </div>

        {/* Radial diagram */}
        <div className={`cle-stage${active ? ' cle-active' : ''}`}>

          {/* ── SVG: land block + lines + rings ── */}
          <svg
            className="cle-svg"
            viewBox={`0 0 ${CLE_W} ${CLE_H}`}
            fill="none"
            aria-hidden="true"
          >
            <defs>
              {/* Glow filter */}
              <filter id="cle-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {/* Soft glow filter for hub */}
              <filter id="cle-hub-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {/* Stage radial fade */}
              <radialGradient id="cleStageFade" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C8A96A" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#C8A96A" stopOpacity="0" />
              </radialGradient>
              {/* Hub gradient */}
              <linearGradient id="cleHubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a5c3a" />
                <stop offset="100%" stopColor="#0d3a24" />
              </linearGradient>
              {/* Land block face gradient */}
              <linearGradient id="cleLandTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2d7a50" />
                <stop offset="100%" stopColor="#1a5c3a" />
              </linearGradient>
              <linearGradient id="cleLandLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f3d27" />
                <stop offset="100%" stopColor="#071e16" />
              </linearGradient>
              <linearGradient id="cleLandRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#164f32" />
                <stop offset="100%" stopColor="#0a2b1a" />
              </linearGradient>
              {/* ── VGM SITE Location Marker gradients ── */}
              <radialGradient id="cleMarkerGlow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#f5e4a0" stopOpacity="0.88" />
                <stop offset="50%" stopColor="#C8A96A" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#8B6914" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="clePinBody" x1="15%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#f0d878" />
                <stop offset="32%" stopColor="#C8A96A" />
                <stop offset="68%" stopColor="#9a7428" />
                <stop offset="100%" stopColor="#5e420f" />
              </linearGradient>
              <linearGradient id="clePinInner" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#0f3d27" />
                <stop offset="100%" stopColor="#061710" />
              </linearGradient>
              <radialGradient id="clePlatformRad" cx="50%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#f0d878" stopOpacity="0.55" />
                <stop offset="55%" stopColor="#C8A96A" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#C8A96A" stopOpacity="0.02" />
              </radialGradient>
              <radialGradient id="clePinShine" cx="32%" cy="26%" r="52%">
                <stop offset="0%" stopColor="#fffbe8" stopOpacity="0.78" />
                <stop offset="55%" stopColor="#f5e4a0" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#C8A96A" stopOpacity="0" />
              </radialGradient>
              {/* Per-node line gradients */}
              {CLE_NODES.map(n => {
                const p = clePos(n.angle);
                return (
                  <linearGradient
                    key={`clg-${n.id}`}
                    id={`cleLineGrad-${n.id}`}
                    x1={CLE_CX} y1={CLE_CY} x2={p.x} y2={p.y}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#C8A96A" stopOpacity={hovered === n.id ? 1.0 : 0.55} />
                    <stop offset="100%" stopColor="#C8A96A" stopOpacity={hovered === n.id ? 0.6 : 0.15} />
                  </linearGradient>
                );
              })}
            </defs>

            {/* Background radial glow */}
            <circle cx={CLE_CX} cy={CLE_CY} r={400} fill="url(#cleStageFade)" />

            {/* ── Single premium glowing ring around center ── */}
            <circle cx={CLE_CX} cy={CLE_CY} r={155}
              stroke="#C8A96A" strokeWidth="2" strokeOpacity="0.60"
              strokeDasharray="6 10"
              filter="url(#cle-glow)"
              className={active ? 'cle-orbit-cw' : ''}
            />

            {/* ── Connection lines ── */}
            {CLE_NODES.map((n, i) => {
              const p = clePos(n.angle);
              const isH = hovered === n.id;
              const rad = cleDeg(n.angle - 90);
              const perp = rad + Math.PI / 2;
              const ctrl = 48;
              const mx = (CLE_CX + p.x) / 2 + ctrl * Math.cos(perp);
              const my = (CLE_CY + p.y) / 2 + ctrl * Math.sin(perp);
              const pd = `M ${CLE_CX} ${CLE_CY} Q ${mx} ${my} ${p.x} ${p.y}`;
              const pid = `cle-ln-${n.id}`;
              return (
                <g key={n.id}>
                  <path
                    id={pid}
                    d={pd}
                    stroke={`url(#cleLineGrad-${n.id})`}
                    strokeWidth={isH ? 3.2 : 1.8}
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 400,
                      strokeDashoffset: active ? 0 : 400,
                      transition: `stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.11}s, stroke-width 0.3s`,
                      filter: isH ? 'url(#cle-glow)' : 'none',
                    }}
                  />
                  {/* Endpoint dot */}
                  <circle cx={p.x} cy={p.y} r={isH ? 5.5 : 3.5}
                    fill="#C8A96A" fillOpacity={isH ? 1 : 0.45}
                    style={{ transition: 'r 0.3s, fill-opacity 0.3s' }}
                  />
                  {/* Flowing light dot */}
                  {active && (
                    <circle r={isH ? 4 : 2.2} fill="#C8A96A" fillOpacity={isH ? 1 : 0.6}>
                      <animateMotion
                        dur={`${2.6 + i * 0.28}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.35}s`}
                      >
                        <mpath xlinkHref={`#${pid}`} />
                      </animateMotion>
                    </circle>
                  )}
                </g>
              );
            })}

            {/* ── Premium VGM SITE Location Image ── */}

            {/* Stable center group without floating animation */}
            <g className="cle-center-image-group">
              {/* Ambient glow halo behind the image */}
              <circle cx={CLE_CX} cy={CLE_CY} r={115}
                fill="url(#cleMarkerGlow)"
              />

              <image
                className="cle-center-image"
                href="/locationwithname.webp"
                x={CLE_CX - 170}
                y={CLE_CY - 175}
                width={340}
                height={340}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          </svg>

          {/* ── Feature node cards (image-based) ── */}
          {CLE_NODES.map((n, i) => {
            const p = clePos(n.angle);
            const isH = hovered === n.id;
            return (
              <div
                key={n.id}
                className={`cle-node${active ? ' cle-node-in' : ''}${isH ? ' cle-node-lit' : ''}`}
                style={{
                  left: `${(p.x / CLE_W) * 100}%`,
                  top: `${(p.y / CLE_H) * 100}%`,
                  animationDelay: `${i * 0.09 + 0.25}s`,
                }}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Background image layer */}
                <div
                  className="cle-node-img"
                  style={{ backgroundImage: `url('${n.img}')` }}
                />
                {/* Dark gradient overlay */}
                <div className="cle-node-overlay" />
                {/* Content — text only, no icons */}
                <div className="cle-node-content">
                  <span className="cle-node-label">{n.label}</span>
                  <span className="cle-node-desc">{n.desc}</span>
                </div>
              </div>
            );
          })}

        </div>{/* cle-stage */}
      </div>
    </section>
  );
}


const SUSTAIN_STORIES = [
  {
    id: 'sus-0',
    label: 'Sustainable Living',
    title: 'Sustainable Living For Generations',
    desc: 'A community built not just for today, but for every generation that calls VGM Nagar home — green, responsible, and enduring.',
    img: '/SUSTAINABLE CROUSEL-images-0.jpg',
  },
  {
    id: 'sus-1',
    label: 'Designed Around Nature',
    title: 'Designed Around Nature',
    desc: 'Every road, plot, and open space is thoughtfully laid out to honour the natural landscape and bring it closer to your doorstep.',
    img: '/SUSTAINABLE CROUSEL-images-1.jpg',
  },
  {
    id: 'sus-2',
    label: 'Infrastructure',
    title: 'Premium Roads. Better Connectivity.',
    desc: 'Wide BT roads, underground utilities, and planned traffic flow ensure seamless movement within and around VGM Nagar.',
    img: '/SUSTAINABLE CROUSEL-images-2.jpg',
  },
  {
    id: 'sus-3',
    label: 'Smart Living',
    title: 'Smart Infrastructure For Modern Living',
    desc: 'From underground cabling to sensor-based street lighting — every detail is engineered for the modern, connected lifestyle.',
    img: '/SUSTAINABLE CROUSEL-images-3.jpg',
  },
  {
    id: 'sus-4',
    label: 'Water Security',
    title: 'Water Security For Every Home',
    desc: 'Rainwater harvesting ponds and planned water distribution ensure your home never faces a shortage — today or in the future.',
    img: '/SUSTAINABLE CROUSEL-images-4.jpg',
  },
  {
    id: 'sus-5',
    label: 'Green Spaces',
    title: 'Green Spaces That Breathe Luxury',
    desc: 'Curated parks, tree-lined avenues, and landscaped open areas make every morning a walk through nature\'s finest work.',
    img: '/SUSTAINABLE CROUSEL-images-5.jpg',
  },
  {
    id: 'sus-6',
    label: 'Community Planning',
    title: 'Future-Ready Community Planning',
    desc: 'Zoning, setbacks, and civic spaces are designed to global standards — giving your investment a permanent edge in value.',
    img: '/SUSTAINABLE CROUSEL-images-6.jpg',
  },
  {
    id: 'sus-7',
    label: 'Investment Value',
    title: 'Investment Backed By Sustainability',
    desc: 'When a community is built right — with greenery, infrastructure, and foresight — your land grows in more ways than one.',
    img: '/SUSTAINABLE CROUSEL-images-7.jpg',
  },
];

function SustainableLivingShowcase() {
  const outerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const wheelBufferRef = useRef(0);
  const touchStartYRef = useRef(null);
  const touchLockedRef = useRef(false);
  const transitionTimerRef = useRef(null);
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const N = SUSTAIN_STORIES.length;
    const TRANSITION_MS = 820;
    const WHEEL_THRESHOLD = 80;
    const TOUCH_THRESHOLD = 56;

    const isPinned = () => {
      const rect = outer.getBoundingClientRect();
      return rect.top <= 0 && rect.bottom >= window.innerHeight;
    };

    const syncImmersiveState = () => {
      document.body.classList.toggle('sls-nav-hidden', isPinned());
    };

    const goToSlide = (nextIdx) => {
      if (nextIdx < 0 || nextIdx >= N || nextIdx === activeIdxRef.current) return false;

      isAnimatingRef.current = true;
      wheelBufferRef.current = 0;
      setActiveIdx(nextIdx);

      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, TRANSITION_MS);

      return true;
    };

    const onWheel = (event) => {
      if (!isPinned()) {
        wheelBufferRef.current = 0;
        return;
      }

      const direction = Math.sign(event.deltaY);
      if (direction === 0) return;

      const atStart = activeIdxRef.current === 0;
      const atEnd = activeIdxRef.current === N - 1;
      const tryingToLeave = (direction < 0 && atStart) || (direction > 0 && atEnd);

      if (tryingToLeave && !isAnimatingRef.current) {
        wheelBufferRef.current = 0;
        return;
      }

      event.preventDefault();

      if (isAnimatingRef.current) return;

      wheelBufferRef.current += event.deltaY;

      if (Math.abs(wheelBufferRef.current) < WHEEL_THRESHOLD) return;

      goToSlide(activeIdxRef.current + (wheelBufferRef.current > 0 ? 1 : -1));
    };

    const onTouchStart = (event) => {
      if (!isPinned()) return;
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      touchLockedRef.current = false;
    };

    const onTouchMove = (event) => {
      if (!isPinned() || touchStartYRef.current == null) return;

      const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
      const deltaY = touchStartYRef.current - currentY;

      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

      const direction = Math.sign(deltaY);
      const atStart = activeIdxRef.current === 0;
      const atEnd = activeIdxRef.current === N - 1;
      const tryingToLeave = (direction < 0 && atStart) || (direction > 0 && atEnd);

      if (tryingToLeave && !isAnimatingRef.current) {
        touchStartYRef.current = currentY;
        return;
      }

      event.preventDefault();

      if (!touchLockedRef.current && !isAnimatingRef.current) {
        touchLockedRef.current = goToSlide(activeIdxRef.current + direction);
      }
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
      touchLockedRef.current = false;
    };

    outer.addEventListener('wheel', onWheel, { passive: false });
    outer.addEventListener('touchstart', onTouchStart, { passive: true });
    outer.addEventListener('touchmove', onTouchMove, { passive: false });
    outer.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('scroll', syncImmersiveState, { passive: true });
    window.addEventListener('resize', syncImmersiveState);
    syncImmersiveState();

    return () => {
      document.body.classList.remove('sls-nav-hidden');
      window.clearTimeout(transitionTimerRef.current);
      outer.removeEventListener('wheel', onWheel);
      outer.removeEventListener('touchstart', onTouchStart);
      outer.removeEventListener('touchmove', onTouchMove);
      outer.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('scroll', syncImmersiveState);
      window.removeEventListener('resize', syncImmersiveState);
    };
  }, []);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  return (
    <section
      ref={outerRef}
      className="sls-outer"
      aria-label="Sustainable Living Story"
      style={{ height: '220vh' }}
    >
      <div className="sls-sticky">
        <div className="sls-stage-bg" aria-hidden="true" />
        <div className="sls-stage-grain" aria-hidden="true" />

        <div className="sls-progress-dots" aria-hidden="true">
          {SUSTAIN_STORIES.map((story, i) => (
            <span
              key={story.id}
              className={`sls-progress-dot${i === activeIdx ? ' is-active' : ''}`}
            />
          ))}
        </div>

        <div className="sls-counter" aria-hidden="true">
          <span className="sls-counter-cur">{String(activeIdx + 1).padStart(2, '0')}</span>
          <span className="sls-counter-sep">/{String(SUSTAIN_STORIES.length).padStart(2, '0')}</span>
        </div>

        {SUSTAIN_STORIES.map((s, i) => (
          <div
            key={s.id}
            className={[
              'sls-slide',
              i === activeIdx ? 'is-active' : '',
              i < activeIdx ? 'is-before' : '',
              i > activeIdx ? 'is-after' : '',
            ].filter(Boolean).join(' ')}
            aria-hidden={i !== activeIdx}
          >
            <div className="sls-slide-media">
              <div className="sls-slide-img-wrap">
                <img
                  src={s.img}
                  alt={s.title}
                  className="sls-img-el"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className="sls-slide-overlay" />
                <div className="sls-slide-overlay-bottom" />


              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MasterPlan() {
  useScrollReveal();
  useTiltCards();
  const [activeZone, setActiveZone] = useState(null);
  const activeZoneData = ZONES.find((z) => z.id === activeZone);

  const mapCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = mapCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const nodes = [
      { x: W * 0.5, y: H * 0.5, label: 'VGM\nNagar', main: true },
      { x: W * 0.12, y: H * 0.15, label: 'Airport' },
      { x: W * 0.88, y: H * 0.20, label: 'OMR IT' },
      { x: W * 0.10, y: H * 0.70, label: 'GST Road' },
      { x: W * 0.90, y: H * 0.78, label: 'Mahindra' },
      { x: W * 0.5, y: H * 0.92, label: 'Chengalpet' },
    ];

    let t = 0;
    let raf;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      nodes.slice(1).forEach((node) => {
        const center = nodes[0];
        const grad = ctx.createLinearGradient(center.x, center.y, node.x, node.y);
        grad.addColorStop(0, 'rgba(200,169,106,1)');
        grad.addColorStop(1, 'rgba(31,122,90,0.8)');

        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([8, 6]);

        ctx.shadowColor = 'rgba(200,169,106,0.6)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        const progress = (t * 0.012) % 1;
        const px = center.x + (node.x - center.x) * progress;
        const py = center.y + (node.y - center.y) * progress;

        ctx.beginPath();
        const tailProgress = Math.max(0, progress - 0.15);
        const tx = center.x + (node.x - center.x) * tailProgress;
        const ty = center.y + (node.y - center.y) * tailProgress;
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = 'rgba(200,169,106,0.9)';
        ctx.lineWidth = 3.5;
        ctx.setLineDash([]);
        ctx.shadowColor = '#C8A96A';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#C8A96A';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      nodes.forEach((n) => {
        if (n.main) {
          const pingR = 25 + Math.sin(t * 0.05) * 12;
          ctx.beginPath();
          ctx.arc(n.x, n.y, pingR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,169,106,${Math.max(0, 0.25 - (pingR - 25) / 40)})`;
          ctx.fill();
          ctx.strokeStyle = 'rgba(200,169,106,0.6)';
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#C8A96A';
          ctx.shadowColor = '#C8A96A';
          ctx.shadowBlur = 20;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = '#1F7A5A';
          ctx.shadowColor = '#1F7A5A';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();
        }

        ctx.fillStyle = n.main ? '#C8A96A' : 'rgba(255,255,255,0.95)';
        ctx.font = `bold ${n.main ? 14 : 11}px Space Grotesk, sans-serif`;
        ctx.textAlign = 'center';

        if (n.main) {
          ctx.shadowColor = 'rgba(0,0,0,0.8)';
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }

        const lines = n.label.split('\n');
        lines.forEach((line, i) => {
          ctx.fillText(line, n.x, n.y + 26 + i * 16);
        });
        ctx.shadowBlur = 0;
      });


      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
      nodes[0] = { ...nodes[0], x: W * 0.5, y: H * 0.5 };
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);


  return (
    <div className="master-plan-page page-enter">


      {/* ===== CONNECTED LIVING ECOSYSTEM ===== */}
      <ConnectedEcosystemSection />

      {/* ===== SUSTAINABLE LIVING SHOWCASE ===== */}
      <SustainableLivingShowcase />


      {/* ===== ACTUAL LAYOUT IMAGE ===== */}
      <section className="master-image-section" aria-label="Actual layout">
        <div className="section-wrap">
          <div className="master-image-grid">
            <div className="reveal-left">
              <div className="section-eyebrow">Official Layout</div>
              <h2 className="section-title">
                The <span className="highlight">Approved</span><br />Site Layout
              </h2>
              <div className="gold-divider" />
              <p className="section-subtitle" style={{ marginTop: 16 }}>
                Approved by DTCP authorities. Every plot number, road, and utility line
                is legally documented and registered.
              </p>
              <div className="master-layout-actions">
                <NavLink to="/connect" className="btn-primary" id="master-book-btn">Book Your Plot →</NavLink>
                <a href="#specs" className="btn-outline" id="master-spec-btn">View Specs</a>
              </div>
            </div>
            <div className="master-actual-img-wrap reveal-right">
              <img src="/site-img-6.jpg" alt="Approved site layout" className="master-actual-img" />
              <div className="master-img-badge">DTCP Approved Layout</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="discover-cta-strip" aria-label="Master plan CTA">
        <div className="cta-strip-inner reveal">
          <div>
            <h2 className="cta-strip-title">Choose Your Plot Today</h2>
            <p className="cta-strip-sub">Corner plots, park-facing, road-facing — limited availability.</p>
          </div>
          <div className="cta-strip-actions">
            <NavLink to="/connect" className="btn-gold" id="master-cta-visit">Book Site Visit →</NavLink>
            <a href="tel:+919876543210" className="btn-outline-gold" id="master-cta-call">📞 Enquire Now</a>
          </div>
        </div>
      </section>
    </div>
  );
}
