'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  const isActive = (path) => pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <div className="flex items-center justify-between px-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-md hover:bg-gray-700"
          >
            ×
          </button>
        </div>
        
        <nav className="mt-8">
          <Link 
            href="/admin" 
            className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/admin') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </div>
          </Link>
          <Link 
            href="/admin/animals" 
            className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/admin/animals') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Animals
            </div>
          </Link>
          <Link 
            href="/admin/brands" 
            className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/admin/brands') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Brands
            </div>
          </Link>
          <Link 
            href="/admin/seo" 
            className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/admin/seo') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              SEO Settings
            </div>
          </Link>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full flex items-center justify-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Nav Toggle Button */}
      <div className="md:hidden absolute top-4 left-4 z-10">
        {!isSidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <header className="bg-white shadow-sm mb-6 p-4 flex justify-between items-center rounded">
          <h1 className="text-2xl font-semibold text-gray-800">
            {pathname === '/admin' && 'Dashboard'}
            {pathname === '/admin/animals' && 'Animal Management'}
            {pathname === '/admin/brands' && 'Brand Management'}
            {pathname === '/admin/seo' && 'SEO Settings'}
          </h1>
          {/* <div className="text-sm text-gray-600">
            Admin User
          </div> */}
        </header>
        <main className="bg-white p-6 rounded shadow">
          {children}
        </main>
      </div>
    </div>
  );
}