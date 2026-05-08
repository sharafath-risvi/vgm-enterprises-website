import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Discover from './pages/Discover';
import Location from './pages/Location';
import MasterPlan from './pages/MasterPlan';
import Connect from './pages/Connect';

// Scroll to top on route change
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
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
