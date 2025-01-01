"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  FaNewspaper, FaUsers, FaTachometerAlt, FaBars,
  FaUpload, FaBook, FaSignOutAlt, FaTimes,
  FaImages, FaPlus, FaList
} from 'react-icons/fa';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { AuthProvider } from '@/context/authContext';
import useAuth from '@/context/useAuth';
import { logout } from '@/lib/auth-service';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { href: '/admin/news', label: 'News', icon: FaNewspaper },
  { href: '/admin/new-updates', label: 'New Updates', icon: FaUpload },
  { href: '/admin/magazines', label: 'Magazine management', icon: FaBook },
  { href: '/admin/photo-gallery', label: 'Photo Gallery', icon: FaImages},
  { href: '/admin/contacts', label: 'Contacts', icon: FaUsers },
  { href: '/admin/application-forms', label: 'Application Forms', icon: FaUsers },
];

const quickActions = [
  { href: '/admin/news?action=new', label: 'Add News', icon: FaPlus },
  { href: '/admin/magazines?action=new', label: 'Add Magazine', icon: FaPlus },
  { href: '/admin/photo-gallery?action=new', label: 'Add Photo', icon: FaImages },
  { href: '/admin/application-forms', label: 'View Forms', icon: FaList },
];

function AdminLayoutContent({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setAuthStatus } = useAuth();

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setAuthStatus(false);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Return login page without admin layout
  if (pathname === '/admin/login') return children;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-30 h-16">
          <div className="flex items-center justify-between px-4 h-full">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="lg:hidden text-gray-600 p-2"
              >
                {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
              <Link href="/admin/dashboard" className="font-semibold text-xl text-gray-800 ml-2">
              Mahasangh Admin
              </Link>
            </div>
            
            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-lg transform 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-200 ease-in-out`}
        >
          <div className="h-16 flex items-center justify-center border-b">
            <Link href="/admin/dashboard" className="text-xl font-bold text-gray-800">
              Dashboard
            </Link>
          </div>
          <nav className="mt-6">
            <div className="px-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors
                      ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-64 pt-16 min-h-screen transition-all duration-200 ease-in-out">
          <div className="p-6">
            {children}
          </div>
        </main>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}

export default function AdminLayout({ children }) {
  const [authStatus, setAuthStatus] = useState(false);
  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
