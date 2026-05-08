import { useState, useRef, useEffect } from 'react';
import { useScrollReveal, useTiltCards } from '../components/useAnimations';
import './Connect.css';

const FORM_FIELDS = [
  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
  { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number', required: true },
  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: false },
  { id: 'budget', label: 'Investment Budget', type: 'select', options: ['Below ₹30L', '₹30L – ₹50L', '₹50L – ₹75L', '₹75L+'], required: false },
  { id: 'plotType', label: 'Preferred Plot', type: 'select', options: ['1200 sq.ft', '1500 sq.ft', '2400 sq.ft', '3000+ sq.ft', 'Any'], required: false },
  { id: 'visitDate', label: 'Preferred Visit Date', type: 'date', placeholder: '', required: false },
];

export default function Connect() {
  useScrollReveal();
  useTiltCards();

  const [form, setForm] = useState({
    name: '', phone: '', email: '', budget: '', plotType: '', visitDate: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const successCanvasRef = useRef(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  // Success confetti
  useEffect(() => {
    if (!submitted) return;
    const canvas = successCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const pieces = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: -20 - Math.random() * 80,
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      r: 4 + Math.random() * 6,
      color: ['#C8A96A', '#1F7A5A', '#2A9D6E', '#E5C990'][Math.floor(Math.random() * 4)],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pieces.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.rect(-p.r / 2, -p.r / 2, p.r, p.r * 1.5);
        ctx.fill();
        ctx.restore();
        p.x += p.vx; p.y += p.vy; p.rot += p.rotSpeed;
        p.vy += 0.1;
        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; p.vy = 2 + Math.random() * 4; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const t = setTimeout(() => cancelAnimationFrame(raf), 5000);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [submitted]);

  return (
    <div className="connect-page page-enter">
      {/* ===== PAGE HERO ===== */}
      <section className="connect-hero" aria-label="Connect hero">
        <div className="connect-hero-bg" aria-hidden="true">
          <img
            src="bg3image.png"
            alt="Luxury Architectural Real Estate"
            className="connect-hero-img"
          />
          <div className="connect-hero-overlay" />
          <div className="connect-hero-gradient-bottom" />
        </div>

        <div className="connect-hero-content">
          <div className="connect-hero-label reveal">Premium Plotted Development</div>

          <h1 className="connect-hero-title reveal delay-1">
            Where Luxury Living<br />
            <span className="connect-hero-title-italic">Meets </span>
            <span className="connect-hero-title-gold">Smart Investment</span>
          </h1>

          <p className="connect-hero-subtitle reveal delay-2">
            Secure your future in a meticulously planned, highly appreciating community.
            Experience world-class infrastructure designed for the elite.
          </p>

          <div className="connect-hero-actions reveal delay-3">
            <a href="#site-visit-form" className="ch-btn ch-btn-primary">
              Schedule Site Visit
            </a>
            <a href="tel:+919876543210" className="ch-btn ch-btn-secondary">
              Contact Our Team
            </a>
          </div>
        </div>
      </section>

      {/* ===== MAIN SECTION ===== */}
      <section className="connect-main" aria-label="Contact form and map">
        <div className="section-wrap">
          <div className="connect-grid">

            {/* FORM */}
            <div className="connect-form-wrap reveal-left">
              <div className="connect-form-header">
                <div className="section-eyebrow">Book a Visit</div>
                <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                  Schedule Your<br /><span className="highlight">Site Visit</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', marginTop: 12, fontSize: 14 }}>
                  Fill in your details and we'll personally confirm your slot within 2 hours.
                </p>
              </div>

              {submitted ? (
                <div className="success-state">
                  <canvas ref={successCanvasRef} className="success-canvas" aria-hidden="true" />
                  <div className="success-icon">✅</div>
                  <h3 className="success-title">We'll be in Touch!</h3>
                  <p className="success-desc">
                    Thank you, {form.name || 'valued client'}! Our team will call you within 2 hours
                    to confirm your site visit details.
                  </p>
                  <button
                    className="btn-primary"
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', budget: '', plotType: '', visitDate: '', message: '' }); }}
                    id="connect-reset-btn"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form className="connect-form" onSubmit={handleSubmit} noValidate id="site-visit-form">
                  <div className="form-grid">
                    {FORM_FIELDS.map((field) => (
                      <div key={field.id} className={`form-group${focused === field.id ? ' focused' : ''}`}>
                        <label htmlFor={field.id} className="form-label">
                          {field.label}
                          {field.required && <span className="form-required">*</span>}
                        </label>
                        {field.type === 'select' ? (
                          <select
                            id={field.id}
                            className="form-select"
                            value={form[field.id]}
                            onChange={handleChange}
                            onFocus={() => setFocused(field.id)}
                            onBlur={() => setFocused(null)}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={field.id}
                            type={field.type}
                            className="form-input"
                            placeholder={field.placeholder}
                            value={form[field.id]}
                            onChange={handleChange}
                            required={field.required}
                            onFocus={() => setFocused(field.id)}
                            onBlur={() => setFocused(null)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="form-group" style={{ marginTop: 4 }}>
                    <label htmlFor="message" className="form-label">Message <span style={{ color: 'var(--text-muted)' }}>(Optional)</span></label>
                    <textarea
                      id="message"
                      className="form-textarea"
                      placeholder="Any specific requirements or questions..."
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <button type="submit" className="form-submit btn-gold" id="connect-submit-btn">
                    {/* <span>📅</span> */}
                    Schedule My Site Visit
                  </button>
                  <p className="form-privacy">
                    🔒 Your information is private and will never be shared with third parties.
                  </p>
                </form>
              )}
            </div>

            {/* INFO PANEL */}
            <div className="connect-info reveal-right">
              <div className="connect-info-card">
                <div className="section-eyebrow">Find Us</div>
                <h3 className="connect-info-title">Our Office &amp;<br />Site Location</h3>
                <div className="gold-divider" />

                {/* Map embed placeholder */}
                <div className="map-embed-wrap">
                  <iframe
                    title="VGM Enterprises Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62288.78099547448!2d79.9284!3d12.6952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f712b82a78bb%3A0x9b1b6b00f6a69bb1!2sGST%20Road%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="240"
                    style={{ border: 'none', borderRadius: 12 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>

                <div className="info-details">
                  {[
                    { icon: '📍', title: 'Site Address', text: 'VGM Nagar, Archapakkam Thozhupedu,\nNear GST Road, Tamil Nadu' },
                    { icon: '⏰', title: 'Office Hours', text: 'Monday – Sunday\n9:00 AM – 7:00 PM (Including Weekends)' },
                    { icon: '🚗', title: 'How to Reach', text: 'Direct access from GST Road.\nNear Aalam International School, Archapakkam.' },
                  ].map((d) => (
                    <div key={d.title} className="info-detail-item">
                      <span className="info-icon">{d.icon}</span>
                      <div>
                        <div className="info-detail-title">{d.title}</div>
                        <div className="info-detail-text">{d.text}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div className="social-row">
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="social-btn" id="social-whatsapp" aria-label="WhatsApp">💬</a>
                  <a href="tel:+919876543210" className="social-btn" id="social-phone" aria-label="Phone">📞</a>
                  <a href="mailto:info@vgmenterprises.in" className="social-btn" id="social-email" aria-label="Email">✉️</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PREMIUM CTA SECTION ===== */}
      <section className="connect-premium-cta" aria-label="Final Call to Action">
        {/* Layered Background */}
        <div className="cta-bg-layer" aria-hidden="true">
          <div className="cta-bg-solid" />
          <div className="cta-bg-glow" />
        </div>

        <div className="cta-container reveal">
          <div className="cta-glass-card">

            {/* Top Badge */}
            <div className="cta-badge">
              <span className="cta-badge-dot"></span>
              LIMITED PLOTS AVAILABLE
            </div>

            {/* Heading */}
            <h2 className="cta-heading">
              The Best Time to Invest<br />
              <span className="cta-heading-italic">in </span>
              <span className="cta-heading-gold">VGM Nagar </span>
              <span className="cta-heading-italic">is </span>
              <span className="cta-heading-gold">Now.</span>
            </h2>

            {/* Subtext */}
            <p className="cta-subtext">
              Secure your premium plot before the next appreciation phase.<br />
              Early investors benefit from rising value, strategic connectivity,<br />
              and a future-ready lifestyle in VGM Nagar.
            </p>

            {/* Buttons */}
            <div className="cta-actions">
              <a href="#site-visit-form" className="cta-btn-primary">
                Schedule Site Visit
              </a>
              <a href="tel:+919876543210" className="cta-btn-secondary">
                Contact Our Team
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
