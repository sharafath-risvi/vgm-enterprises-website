import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useScrollReveal, useTiltCards } from '../components/useAnimations';
import './Location.css';

const DISTANCES = [
  { place: 'Aalam International School', dist: '400 m', time: '2 min' },
  { place: 'Sri Srinivasa Clinic', dist: '2 km', time: '5 min' },
  { place: 'Takshashila University', dist: '5 km', time: '8 min' },
  { place: 'SRM Agriculture College', dist: '8 km', time: '12 min' },
  { place: 'Saraswathy Law College', dist: '10 km', time: '15 min' },
  { place: 'Melmaruvathur Medical College', dist: '12 km', time: '18 min' },
];

export default function Location() {
  useScrollReveal();
  useTiltCards();

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
          ctx.fillStyle = `rgba(200,169,106,${Math.max(0, 0.25 - (pingR - 25)/40)})`;
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
    <div className="location-page page-enter">
      {/* ===== PAGE HERO ===== */}
      <section className="page-hero location-hero" aria-label="Location hero">
        <div className="page-hero-bg">
          <img src="/site-img-2.jpg" alt="Location overview" className="page-hero-img" />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content">
          <div className="section-eyebrow reveal" style={{ color: '#C8A96A', justifyContent: 'center' }}>
            Strategic Location
          </div>
          <h1 className="page-hero-title reveal delay-1">
            At the Heart of<br />
            <span style={{ color: '#C8A96A', fontStyle: 'italic' }}>Chennai's Growth Corridor</span>
          </h1>
          <p className="page-hero-subtitle reveal delay-2">
            VGM Nagar sits at the confluence of GST Road and the upcoming Metro expansion —
            putting you minutes from everything that matters.
          </p>
        </div>
      </section>

      {/* ===== ANIMATED MAP ===== */}
      <section className="location-map-section" aria-label="Connectivity map">
        <div className="section-wrap">
          <div className="map-grid">
            <div className="map-canvas-wrap reveal-left">
              <div className="map-canvas-label">Connectivity Map</div>
              <canvas ref={mapCanvasRef} className="map-canvas" aria-label="Animated connectivity map" />
              <div className="map-canvas-legend">
                <span><span className="legend-dot gold" />VGM Nagar</span>
                <span><span className="legend-dot green" />Key Locations</span>
                <span><span className="legend-dash" />Routes</span>
              </div>
            </div>
            <div className="map-distances reveal-right">
              <div className="section-eyebrow">Distance Chart</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                Everything is <span className="highlight">Close</span>
              </h2>
              <div className="gold-divider" />
              <div className="distance-list" style={{ marginTop: 32 }}>
                {DISTANCES.map((d, i) => {
                  let meters = 0;
                  if (d.dist.includes('km')) meters = parseFloat(d.dist) * 1000;
                  else if (d.dist.includes('m')) meters = parseFloat(d.dist);
                  const wPct = Math.min(100, Math.max(15, 100 - (meters / 12000) * 85));
                  
                  return (
                  <div key={d.place} className={`distance-item reveal delay-${i + 1}`}>
                    <div className="distance-place">{d.place}</div>
                    <div className="distance-meta">
                      <span className="distance-km">{d.dist}</span>
                      <span className="distance-time">⏱ {d.time}</span>
                    </div>
                    <div className="distance-bar">
                      <div className="distance-fill" style={{ width: `${wPct}%` }} />
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FUTURE GROWTH ===== */}
      <section className="future-growth-section" aria-label="Future growth">
        <div className="future-bg">
          <img src="/site-img-7.jpg" alt="GST Road future development" className="future-img" />
          <div className="future-overlay" />
        </div>
        <div className="section-wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="future-content">
            <div className="reveal">
              <div className="section-eyebrow" style={{ color: '#C8A96A' }}>Future Growth & Appreciation</div>
              <h2 className="section-title" style={{ color: '#fff' }}>
                Future Metro.<br /><span style={{ color: '#C8A96A' }}>Stronger Tomorrow.</span>
              </h2>
            </div>
            <div className="future-cards" style={{ marginTop: 48 }}>
              {[
                { icon: '🛣️', title: 'Direct Access to GST Road', desc: 'Excellent highway connectivity to Chennai and beyond. Fast, smooth travel to all major destinations from your doorstep.' },
                { icon: '🚉', title: 'Proposed Metro Rail Corridor', desc: 'Upcoming Metro Rail corridor along GST Road will dramatically boost connectivity, cut commute times, and drive massive property appreciation.' },
                { icon: '🏥', title: 'Healthcare Access Nearby', desc: 'Sri Srinivasa Clinic (2 KM), Sri Sakthi Clinic (5 KM), and multiple clinics within 6.5 KM for quick medical access and family safety.' },
                { icon: '🎓', title: 'Near Schools & Colleges', desc: 'Aalam International School (400m), Takshashila University (5 KM), SRM Agriculture College (8 KM) — ideal for families and students.' },
              ].map((f, i) => (
                <div key={f.title} className={`future-card glass-card reveal delay-${i + 1}`}>
                  <div className="future-card-icon">{f.icon}</div>
                  <h3 className="future-card-title">{f.title}</h3>
                  <p className="future-card-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
