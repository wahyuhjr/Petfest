'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SeoSettings() {
  const [settings, setSettings] = useState({
    siteTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
    twitterHandle: '',
    googleAnalyticsId: '',
    facebookPixelId: '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ show: false, type: '', message: '' });
  const [charCount, setCharCount] = useState({
    metaDescription: 0,
    siteTitle: 0
  });

  // Fetch current SEO settings
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await axios.get('/api/seo');
        if (res.data) {
          setSettings(res.data);
          setCharCount({
            metaDescription: res.data.metaDescription?.length || 0,
            siteTitle: res.data.siteTitle?.length || 0
          });
        }
      } catch (error) {
        showNotification('error', 'Failed to load SEO settings');
        console.error('Error fetching SEO settings:', error);
      }
    }
    
    fetchSettings();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update character count for tracked fields
    if (name === 'metaDescription' || name === 'siteTitle') {
      setCharCount(prev => ({
        ...prev,
        [name]: value.length
      }));
    }
  };
  
  const showNotification = (type, message) => {
    setSaveStatus({ show: true, type, message });
    setTimeout(() => setSaveStatus({ show: false, type: '', message: '' }), 5000);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await axios.post('/api/seo', settings);
      showNotification('success', 'SEO settings saved successfully!');
    } catch (error) {
      showNotification('error', error.response?.data?.message || 'Error saving settings');
      console.error('Error saving SEO settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // Create a preview of the meta tags
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${settings.siteTitle}</title>
        <meta name="description" content="${settings.metaDescription}">
        <meta name="keywords" content="${settings.keywords}">
        <meta property="og:title" content="${settings.siteTitle}">
        <meta property="og:description" content="${settings.metaDescription}">
        <meta property="og:image" content="${settings.ogImage}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="${settings.twitterHandle}">
      </head>
      <body>
        <h1>SEO Preview</h1>
        <p>This is a preview of how your meta tags will appear.</p>
        <button onclick="window.close()">Close</button>
      </body>
      </html>
    `;
    
    const previewWindow = window.open('', 'SEO Preview', 'width=800,height=600');
    previewWindow.document.write(html);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">SEO Settings</h1>
        <button 
          onClick={handlePreview}
          type="button"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Preview Meta Tags
        </button>
      </div>
      
      {saveStatus.show && (
        <div className={`p-4 mb-6 rounded-md ${saveStatus.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {saveStatus.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{saveStatus.message}</p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic SEO Section */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Basic SEO Settings</h3>
            <p className="mt-1 text-sm text-gray-500">Core meta information for search engines.</p>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Site Title <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="siteTitle"
                  value={settings.siteTitle}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className={`text-xs ${charCount.siteTitle > 60 ? 'text-red-500' : 'text-gray-500'}`}>
                    {charCount.siteTitle}/60
                  </span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Your website's title, displayed in browser tabs and search results (recommended: 50-60 characters)
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meta Description <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <textarea
                  name="metaDescription"
                  value={settings.metaDescription}
                  onChange={handleChange}
                  rows="3"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  required
                ></textarea>
                <div className="absolute bottom-2 right-2 pointer-events-none">
                  <span className={`text-xs ${charCount.metaDescription > 160 ? 'text-red-500' : charCount.metaDescription < 120 ? 'text-yellow-500' : 'text-green-500'}`}>
                    {charCount.metaDescription}/160
                  </span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Concise description of your site (recommended: 120-160 characters)
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Keywords
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="keywords"
                  value={settings.keywords}
                  onChange={handleChange}
                  placeholder="e.g. animals, pets, voting, cute"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Comma-separated keywords related to your site
              </p>
            </div>
          </div>
        </div>
        
        {/* Social Media Section */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Social Media Settings</h3>
            <p className="mt-1 text-sm text-gray-500">Information for social media sharing.</p>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OG Image URL
              </label>
              <div className="mt-1">
                <div className="flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="ogImage"
                    value={settings.ogImage}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-l-md sm:text-sm border-gray-300 p-2 border"
                  />
                  <button
                    type="button"
                    onClick={() => window.open(settings.ogImage)}
                    disabled={!settings.ogImage}
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm disabled:opacity-50"
                  >
                    Preview
                  </button>
                </div>
                {settings.ogImage && (
                  <div className="mt-2">
                    <img src={settings.ogImage} alt="OG Preview" className="h-24 object-cover rounded-md" />
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Image URL shown when your site is shared on social media (optimal size: 1200x630 pixels)
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Twitter Handle
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">@</span>
                </div>
                <input
                  type="text"
                  name="twitterHandle"
                  value={settings.twitterHandle}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md p-2 border"
                  placeholder="yourtwitterhandle"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Analytics Section */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Analytics Settings</h3>
            <p className="mt-1 text-sm text-gray-500">Tracking and analytics configuration.</p>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Google Analytics ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="googleAnalyticsId"
                  value={settings.googleAnalyticsId}
                  onChange={handleChange}
                  placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facebook Pixel ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="facebookPixelId"
                  value={settings.facebookPixelId}
                  onChange={handleChange}
                  placeholder="XXXXXXXXXXXXXXXX"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save SEO Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}