// src/components/SEOHead.js

'use client';
import { useEffect } from 'react';

export default function SEOHead({ seoData }) {
  useEffect(() => {
    if (!seoData) return;
    
    // Update document title
    document.title = seoData.title;
    
    // Update meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);
    
    // Update Open Graph tags
    if (seoData.ogTitle) updateMetaTag('og:title', seoData.ogTitle);
    if (seoData.ogDescription) updateMetaTag('og:description', seoData.ogDescription);
    if (seoData.ogImage) updateMetaTag('og:image', seoData.ogImage);
    
    // Update canonical link
    if (seoData.canonical) updateCanonicalLink(seoData.canonical);
    
    // Add structured data if available
    if (seoData.structuredData) addStructuredData(seoData.structuredData);
    
  }, [seoData]);
  
  // Helper function to update or create meta tags
  function updateMetaTag(name, content) {
    if (!content) return;
    
    // Check if the meta tag already exists
    let metaTag = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
    
    if (metaTag) {
      // Update existing tag
      metaTag.setAttribute('content', content);
    } else {
      // Create new tag
      metaTag = document.createElement('meta');
      if (name.startsWith('og:')) {
        metaTag.setAttribute('property', name);
      } else {
        metaTag.setAttribute('name', name);
      }
      metaTag.setAttribute('content', content);
      document.head.appendChild(metaTag);
    }
  }
  
  // Helper function to update canonical link
  function updateCanonicalLink(url) {
    // Remove any existing canonical links
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    // Create new canonical link
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }
  
  // Helper function to add structured data
  function addStructuredData(data) {
    // Remove any existing structured data
    const existingScript = document.querySelector('#structured-data-script');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Create new structured data script
    const script = document.createElement('script');
    script.setAttribute('id', 'structured-data-script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
  
  // The component doesn't render anything visible
  return null;
}