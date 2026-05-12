import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Discover from './pages/Discover';
import Location from './pages/Location';
import MasterPlan from './pages/MasterPlan';
import Connect from './pages/Connect';

// Scroll to top on route change
function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        // Delay slightly to ensure content is rendered
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollReset />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/location" element={<Location />} />
          <Route path="/master-plan" element={<MasterPlan />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
