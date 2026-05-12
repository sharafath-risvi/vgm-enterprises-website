import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Discover', path: '/' },
  { label: 'Master Plan', path: '/master-plan' },
  { label: 'Connect', path: '/connect' },
];

const MOBILE_NAV_MQ = '(max-width: 900px)';

function isNavPathActive(path, pathname) {
  return path === '/' ? pathname === '/' : pathname.startsWith(path);
}

function useMobileNavLayout() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_NAV_MQ).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_NAV_MQ);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

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
  const mobileNavTimerRef = useRef(null);
  const isMobileNav = useMobileNavLayout();

  const updatePillToActive = useCallback(() => {
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
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(updatePillToActive, 50);
    return () => clearTimeout(timer);
  }, [updatePillToActive]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMenuOpen(false);
      setVisible(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (mobileNavTimerRef.current != null) {
        clearTimeout(mobileNavTimerRef.current);
        mobileNavTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (menuOpen) {
        lastScrollYRef.current = currentScrollY;
        return;
      }

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
  }, [menuOpen]);

  const scheduleMobileNavigate = useCallback(
    path => {
      if (mobileNavTimerRef.current != null) {
        clearTimeout(mobileNavTimerRef.current);
        mobileNavTimerRef.current = null;
      }
      setMenuOpen(false);
      mobileNavTimerRef.current = window.setTimeout(() => {
        mobileNavTimerRef.current = null;
        navigate(path);
      }, 150);
    },
    [navigate]
  );

  const handleMobileNavAnchorClick = useCallback(
    path => event => {
      event.preventDefault();
      event.stopPropagation();
      scheduleMobileNavigate(path);
    },
    [scheduleMobileNavigate]
  );

  const handleCTA = event => {
    if (isMobileNav) {
      event.preventDefault();
      scheduleMobileNavigate('/connect');
    } else {
      navigate('/connect');
    }
  };

  const handleMouseEnter = e => {
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
        transform: (visible || menuOpen) ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s ease, background-color 0.3s ease, padding 0.3s ease'
      }}
    >
      <div className="navbar-inner">
        {isMobileNav ? (
          <a href="/" className="nav-logo" onClick={handleMobileNavAnchorClick('/')}>
            <img src="/vgmlogo.png" alt="VGM Enterprises Logo" className="nav-logo-img" />
          </a>
        ) : (
          <NavLink to="/" className="nav-logo">
            <img src="/vgmlogo.png" alt="VGM Enterprises Logo" className="nav-logo-img" />
          </NavLink>
        )}

        <div className="nav-right">
          <div className={`nav-links${menuOpen ? ' open' : ''}`} onMouseLeave={handleMouseLeave}>
            <div className="nav-pill" style={pillStyle} />
            {isMobileNav
              ? NAV_ITEMS.map(({ label, path }) => {
                  const active = isNavPathActive(path, location.pathname);
                  return (
                    <a
                      key={path}
                      href={path}
                      className={`nav-link${active ? ' active' : ''}`}
                      aria-current={active ? 'page' : undefined}
                      onClick={handleMobileNavAnchorClick(path)}
                    >
                      {label}
                    </a>
                  );
                })
              : NAV_ITEMS.map(({ label, path }, i) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    ref={el => (linksRef.current[i] = el)}
                    onMouseEnter={handleMouseEnter}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    {label}
                  </NavLink>
                ))}
            <button type="button" className="nav-main-cta" onClick={handleCTA}>Schedule Visit</button>
          </div>

          <button
            type="button"
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
