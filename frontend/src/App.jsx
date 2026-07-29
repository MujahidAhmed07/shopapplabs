import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CheckerPage from './pages/CheckerPage';
import ProductsPage from './pages/ProductsPage';
import PlatformDirectoryPage from './pages/PlatformDirectoryPage';
import SinglePlatformCheckerPage from './pages/SinglePlatformCheckerPage';
import NotFoundPage from './pages/NotFoundPage';

/** Wraps every route with a smooth slide-up + fade animation */
function AnimatedPage({ children }) {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });

    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    // RAf ensures the browser paints the initial state before animating
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.38s cubic-bezier(0,0,0.2,1), transform 0.38s cubic-bezier(0,0,0.2,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);

  return <div ref={ref}>{children}</div>;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatedPage key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/checker" element={<CheckerPage />} />
        <Route path="/platforms" element={<PlatformDirectoryPage />} />
        <Route path="/products" element={<ProductsPage />} />

        {/* Dedicated Platform Landing Pages (SEO, AEO, GEO Optimized) */}
        <Route path="/instagram-username-checker" element={<SinglePlatformCheckerPage />} />
        <Route path="/tiktok-username-checker" element={<SinglePlatformCheckerPage />} />
        <Route path="/youtube-username-checker" element={<SinglePlatformCheckerPage />} />
        <Route path="/twitter-username-checker" element={<SinglePlatformCheckerPage />} />
        <Route path="/github-username-checker" element={<SinglePlatformCheckerPage />} />
        <Route path="/domain-availability-checker" element={<SinglePlatformCheckerPage />} />
        <Route path="/:platformSlug-username-checker" element={<SinglePlatformCheckerPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatedPage>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
