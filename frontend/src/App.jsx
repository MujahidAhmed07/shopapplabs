import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CheckerPage from './pages/CheckerPage';
import ProductsPage from './pages/ProductsPage';
import PlatformDirectoryPage from './pages/PlatformDirectoryPage';
import SinglePlatformCheckerPage from './pages/SinglePlatformCheckerPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
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
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
