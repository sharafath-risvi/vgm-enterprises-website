import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Discover', path: '/' },
  { label: 'Master Plan', path: '/master-plan' },
  { label: 'Connect', path: '/connect' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const linksRef = useRef([]);
  const navActivatedRef = useRef(false);
  const lastScrollYRef = useRef(0);

  const updatePillToActive = () => {
    const activeIndex = NAV_ITEMS.findIndex(item => 
      item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
    );
    if (activeIndex >= 0 && linksRef.current[activeIndex]) {
      const el = linksRef.current[activeIndex];
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
      });
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  };

  useEffect(() => {
    const timer = setTimeout(updatePillToActive, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const onRouteEnter = () => {
      navActivatedRef.current = false;
      lastScrollYRef.current = window.scrollY;
      setVisible(false);
      setScrolled(false);
      setMenuOpen(false);
    };

    onRouteEnter();
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (!navActivatedRef.current) {
        if (Math.abs(currentScrollY - lastScrollYRef.current) >= 8 || currentScrollY > 8) {
          navActivatedRef.current = true;
          setVisible(true);
        } else {
          lastScrollYRef.current = currentScrollY;
          return;
        }
      }

      setScrolled(currentScrollY > 40);

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 40) {
        setVisible(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        setVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCTA = () => { setMenuOpen(false); navigate('/connect'); };

  const handleMouseEnter = (e) => {
    setPillStyle({
      left: e.currentTarget.offsetLeft,
      width: e.currentTarget.offsetWidth,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    updatePillToActive();
  };

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
          <img src="/vgmlogo.jpeg" alt="VGM Enterprises Logo" className="nav-logo-img" />
        </NavLink>

        <div className="nav-right">
          {/* Desktop Links */}
          <div className={`nav-links${menuOpen ? ' open' : ''}`} onMouseLeave={handleMouseLeave}>
            <div className="nav-pill" style={pillStyle} />
            {NAV_ITEMS.map(({ label, path }, i) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                ref={el => linksRef.current[i] = el}
                onMouseEnter={handleMouseEnter}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <button className="nav-main-cta" onClick={handleCTA}>Schedule Visit</button>
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
      </div>
    </nav>
  );
}
