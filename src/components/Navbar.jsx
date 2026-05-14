import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Discover', path: '/' },
  { label: 'Master Plan', path: '/master-plan' },
  { label: 'Connect', path: '/connect' },
];

const MOBILE_NAV_MQ = '(max-width: 900px)';

function useMobileNavLayout() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_NAV_MQ).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_NAV_MQ);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navigate = useNavigate();
  const location = useLocation();

  const linksRef = useRef([]);
  const lastScrollYRef = useRef(0);
  const isMobileNav = useMobileNavLayout();

  const updatePillToActive = useCallback(() => {
    const activeIndex = NAV_ITEMS.findIndex(item =>
      item.path === '/'
        ? location.pathname === '/'
        : location.pathname.startsWith(item.path)
    );
    if (activeIndex >= 0 && linksRef.current[activeIndex]) {
      const el = linksRef.current[activeIndex];
      setPillStyle({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(updatePillToActive, 50);
    return () => clearTimeout(timer);
  }, [updatePillToActive]);

  // Close menu and show navbar on every route change
  useEffect(() => {
    setMenuOpen(false);
    setVisible(true);
  }, [location.pathname]);

  // Scroll show/hide
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (menuOpen) {
        lastScrollYRef.current = currentScrollY;
        return;
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

  const goTo = useCallback((path) => {
    navigate(path);
    setMenuOpen(false);
  }, [navigate]);

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

  const checkIsActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav
      className={'navbar' + (scrolled ? ' scrolled' : '')}
      role="navigation"
      aria-label="Main navigation"
      style={{
        transform: visible || menuOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s ease, background-color 0.3s ease, padding 0.3s ease',
      }}
    >
      <div className="navbar-inner">

        {/* LOGO — works on both mobile and desktop */}
        <NavLink
          to="/"
          className="nav-logo"
          onClick={(e) => {
            if (isMobileNav) {
              e.preventDefault();
              goTo('/');
            }
          }}
        >
          <img src="/vgmlogo.png" alt="VGM Enterprises Logo" className="nav-logo-img" />
        </NavLink>

        <div className="nav-right">
          <div
            className={'nav-links' + (menuOpen ? ' open' : '')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="nav-pill" style={pillStyle} />

            {isMobileNav ? (
              <>
                <button
                  type="button"
                  className={'nav-link' + (checkIsActive('/') ? ' active' : '')}
                  onClick={() => goTo('/')}
                >
                  Discover
                </button>
                <button
                  type="button"
                  className={'nav-link' + (checkIsActive('/master-plan') ? ' active' : '')}
                  onClick={() => goTo('/master-plan')}
                >
                  Master Plan
                </button>
                <button
                  type="button"
                  className={'nav-link' + (checkIsActive('/connect') ? ' active' : '')}
                  onClick={() => goTo('/connect')}
                >
                  Connect
                </button>
              </>
            ) : (
              NAV_ITEMS.map((item, i) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  ref={el => (linksRef.current[i] = el)}
                  onMouseEnter={handleMouseEnter}
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                >
                  {item.label}
                </NavLink>
              ))
            )}

            <button
              type="button"
              className="nav-main-cta"
              onClick={() => goTo('/connect')}
            >
              Schedule Visit
            </button>
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