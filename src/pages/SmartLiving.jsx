import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useScrollReveal, useTiltCards } from '../components/useAnimations';
import './SmartLiving.css';

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

export default function SmartLiving() {
    useScrollReveal();
    useTiltCards();

    return (
        <div className="smart-living-page page-enter">
            {/* ===== PAGE HERO ===== */}
            <section className="page-hero smart-hero" aria-label="Smart Living hero">
                <div className="smart-hero-bg">
                    <div className="smart-hero-grid" aria-hidden="true">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div key={i} className="smart-grid-dot" style={{
                                animationDelay: `${i * 0.12}s`,
                                animationDuration: `${2 + (i % 4) * 0.5}s`
                            }} />
                        ))}
                    </div>
                </div>
                <div className="page-hero-overlay" style={{ background: 'linear-gradient(135deg, rgba(11,61,46,0.97), rgba(11,61,46,0.80))' }} />
                <div className="page-hero-content" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="section-eyebrow reveal" style={{ color: '#C8A96A', justifyContent: 'center' }}>
                        Sustainable Living
                    </div>
                    <h1 className="page-hero-title reveal delay-1">
                        Built Smart.<br />
                        <span style={{ color: '#C8A96A', fontStyle: 'italic' }}>Lived Better.</span>
                    </h1>
                    <p className="page-hero-subtitle reveal delay-2">
                        Every system in VGM Nagar is engineered for sustainability — from the air you breathe
                        to the water you drink and the energy you use.
                    </p>
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
            <section className="sustainability-circle-section" aria-label="Sustainability diagram">
                <div className="section-wrap">
                    <div className="sustain-wrap">
                        <div className="reveal-left">
                            <div className="section-eyebrow">Circular Economy</div>
                            <h2 className="section-title">
                                Zero Waste.<br /><span className="highlight">Full Circle.</span>
                            </h2>
                            <div className="gold-divider" />
                            <p className="section-subtitle" style={{ marginTop: 16 }}>
                                Our sustainability model creates a closed loop — waste becomes energy, rain becomes water,
                                sun becomes power, and nature becomes community.
                            </p>
                            <div style={{ marginTop: 32 }}>
                                {['Rain → Recharge → Irrigation', 'Waste → Biogas → Cooking Fuel', 'Sun → Solar → Street Lights', 'Trees → Air Quality → Health'].map((flow, i) => (
                                    <div key={flow} className={`sustain-flow reveal delay-${i + 1}`}>
                                        <span className="sustain-flow-icon">⟳</span>
                                        {flow}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sustain-circle-wrap reveal-right">
                            <SustainCircle />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="discover-cta-strip" aria-label="Smart living CTA">
                <div className="cta-strip-inner reveal">
                    <div>
                        <h2 className="cta-strip-title">Experience Smart Living</h2>
                        <p className="cta-strip-sub">Visit our model community and see the future in action.</p>
                    </div>
                    <div className="cta-strip-actions">
                        <NavLink to="/connect" className="btn-gold" id="smart-cta-visit">Book a Tour →</NavLink>
                        <NavLink to="/master-plan" className="btn-outline-gold" id="smart-cta-plan">View Layout</NavLink>
                    </div>
                </div>
            </section>
        </div>
    );
}

function SustainCircle() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const S = canvas.width = canvas.height = Math.min(canvas.offsetWidth, 400);
        const cx = S / 2, cy = S / 2, R = S * 0.35;
        let t = 0, raf;

        const icons = ['💧', '☀️', '🌿', '📡', '🏘️', '🌳'];
        const colors = ['#1F7A5A', '#C8A96A', '#2A9D6E', '#0B3D2E', '#C8A96A', '#145A41'];

        const draw = () => {
            ctx.clearRect(0, 0, S, S);

            // Rotating outer ring
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(t * 0.005);
            ctx.strokeStyle = 'rgba(200,169,106,0.15)';
            ctx.lineWidth = 1;
            ctx.setLineDash([6, 12]);
            ctx.beginPath();
            ctx.arc(0, 0, R * 1.25, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // Inner circles
            [1, 0.65, 0.35].forEach((r, i) => {
                ctx.beginPath();
                ctx.arc(cx, cy, R * r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(11,61,46,${0.1 + i * 0.1})`;
                ctx.lineWidth = 1;
                ctx.setLineDash([]);
                ctx.stroke();
            });

            // Center
            ctx.beginPath();
            ctx.arc(cx, cy, 28, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(11,61,46,0.1)';
            ctx.fill();
            ctx.font = '20px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🌿', cx, cy);

            // Orbiting feature nodes
            icons.forEach((icon, i) => {
                const angle = (i / icons.length) * Math.PI * 2 + t * 0.008;
                const x = cx + Math.cos(angle) * R;
                const y = cy + Math.sin(angle) * R;

                // Connection line
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(x, y);
                ctx.strokeStyle = `${colors[i]}40`;
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 8]);
                ctx.stroke();
                ctx.setLineDash([]);

                // Node circle
                ctx.beginPath();
                ctx.arc(x, y, 22, 0, Math.PI * 2);
                ctx.fillStyle = `${colors[i]}18`;
                ctx.fill();
                ctx.strokeStyle = colors[i];
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.font = '16px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(icon, x, y);
            });

            t++;
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(raf);
    }, []);

    return <canvas ref={canvasRef} className="sustain-canvas" aria-hidden="true" />;
}
