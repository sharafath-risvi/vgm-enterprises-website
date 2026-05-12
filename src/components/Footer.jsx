import { NavLink } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-logo" >
              <img src="/vgmlogo.png" alt="VGM Enterprises Logo" className="footer-logo-img" />
            </div>
            <p className="footer-brand-desc">
              Premium Plots at Archapakkam Thozhupedu — Your Dream Plot, Your Future Address.
              DTCP &amp; RERA approved. Well Connected. Well Developed. Well Worth It.
            </p>
            <div className="footer-badges" style={{ marginTop: 24 }}>
              <span className="footer-badge">DTCP</span>
              <span className="footer-badge">RERA</span>
              <span className="footer-badge">ISO</span>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="footer-heading">Navigate</h3>
            <ul className="footer-links">
              <li><NavLink to="/">Discover</NavLink></li>
              <li><NavLink to="/master-plan">Master Plan</NavLink></li>
              <li><NavLink to="/connect">Connect</NavLink></li>
            </ul>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="footer-heading">Amenities</h3>
            <ul className="footer-links">
              <li><NavLink to="/master-plan#connected-ecosystem">Rainwater Harvesting</NavLink></li>
              <li><NavLink to="/master-plan#connected-ecosystem">Sustainable Living</NavLink></li>
              <li><NavLink to="/master-plan#connected-ecosystem">Smart Electricity</NavLink></li>
              <li><NavLink to="/master-plan#connected-ecosystem">24×7 CCTV Security</NavLink></li>
              <li><NavLink to="/master-plan#connected-ecosystem">Planned Community</NavLink></li>
              <li><NavLink to="/master-plan#connected-ecosystem">Tree Plantation</NavLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-heading">Get in Touch</h3>
            <div className="footer-contact-item">
              <span className="icon-circle">📍</span>
              <span>VGM Nagar, Archapakkam Thozhupedu, Near GST Road, Tamil Nadu</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon-circle">📞</span>
              <span>+91 98765 43210</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon-circle">✉️</span>
              <span>info@vgmenterprises.in</span>
            </div>
            <NavLink
              to="/connect#site-visit-form"
              className="btn-gold"
              style={{ marginTop: 20, fontSize: 13, padding: '12px 28px' }}
            >
              Book Site Visit →
            </NavLink>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© {year} VGM Enterprises. All rights reserved.</span>
          <span>DTCP Approved · RERA Registered · Archapakkam Thozhupedu</span>
        </div>
      </div>
    </footer>
  );
}
