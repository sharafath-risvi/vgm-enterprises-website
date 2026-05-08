import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Discover', path: '/' },
  
  { label: 'Master Plan', path: '/master-plan' },
  { label: 'Connect', path: '/connect' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      
      if (currentScrollY > lastScrollY && currentScrollY > 40) {
        // Scrolling down -> hide navbar
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up or at top -> show navbar
        setVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCTA = () => { setMenuOpen(false); navigate('/connect'); };

  return (
    <nav 
      className={`navbar${scrolled ? ' scrolled' : ''}`} 
      role="navigation" 
      aria-label="Main navigation"
      style={{ 
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s ease, background-color 0.3s ease, padding 0.3s ease'
      }}
    >
      <div className="navbar-inner">
        {/* Logo */}
        <NavLink to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <div className="nav-logo-mark">V</div>
          <div className="nav-logo-text">
            <span>VGM Enterprises</span>
            <span>Premium Plotted Developments</span>
          </div>
        </NavLink>

        {/* Desktop Links */}
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_ITEMS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
        </button>
      </div>
    </nav>
  );
}
