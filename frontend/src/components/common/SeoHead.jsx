import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SeoHead({ title, description, keywords, canonical }) {
  const location = useLocation();

  useEffect(() => {
    // 1. Dynamic Page Title
    if (title) {
      document.title = title;
    }

    // 2. Dynamic Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }

    // 3. Dynamic Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      const fullCanonical = canonical || `https://namechecker.shopapplabs.com${location.pathname}`;
      canonicalLink.setAttribute('href', fullCanonical);
    }
  }, [title, description, keywords, canonical, location]);

  return null;
}
