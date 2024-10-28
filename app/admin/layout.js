"use client";
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaNewspaper, FaCalendarAlt, FaUsers, FaCog, FaTachometerAlt, FaBars, FaTimes } from 'react-icons/fa';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { href: '/admin/news', label: 'News Management', icon: FaNewspaper },
  { href: '/admin/events', label: 'Events', icon: FaCalendarAlt },
  { href: '/admin/members', label: 'Members', icon: FaUsers },
  { href: '/admin/settings', label: 'Settings', icon: FaCog },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Don't wrap the login page with ProtectedRoute
  if (pathname === '/admin/login') {
    return children;
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out
        `}>
          <div className="p-6 bg-blue-600 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <button 
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars size={24} />
            </button>
          </div>
          
          <nav className="mt-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                <div className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer
                  ${pathname === item.href ? 'bg-gray-100 border-l-4 border-blue-600' : ''}`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>
          
          <div className="absolute bottom-0 w-64 p-6">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
