"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  FaNewspaper, 
  FaCalendarAlt, 
  FaUsers, 
  FaCog, 
  FaTachometerAlt, 
  FaBars,
  FaUpload, 
  FaBook,
  FaSignOutAlt,
  FaTimes
} from 'react-icons/fa';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { AuthProvider } from '@/context/authContext';
import useAuth from '@/context/useAuth';
import { logout } from '@/lib/auth-service';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { href: '/admin/news', label: 'News', icon: FaNewspaper },
  { href: '/admin/new-updates', label: 'Updates', icon: FaUpload },
  { href: '/admin/magazines', label: 'श्रमणोपासक', icon: FaBook },
  { href: '/admin/hero-slider', label: 'Hero Slider', icon: FaNewspaper },
  { href: '/admin/events', label: 'Events', icon: FaCalendarAlt },
  { href: '/admin/members', label: 'Members', icon: FaUsers },
  { href: '/admin/settings', label: 'Settings', icon: FaCog },
];

function AdminLayoutContent({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setAuthStatus } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      const { success } = await logout();
      if (success) {
        setAuthStatus(false);
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (pathname === '/admin/login') return children;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
          <span className="font-semibold text-xl text-gray-800">Admin Panel</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
            {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Sidebar Backdrop */}
        {sidebarOpen && isMobile && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-white border-r transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-center border-b">
            <h1 className="text-xl font-bold text-gray-800">Sadhumargi Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="py-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                <div className={`
                  flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer
                  ${pathname === item.href ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}
                `}>
                  <item.icon className="w-5 h-5" />
                  <span className="ml-3">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-0 w-full p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`
          transition-all duration-200 ease-in-out
          ${sidebarOpen ? 'lg:ml-64' : 'ml-0 lg:ml-64'}
        `}>
          <div className="p-6 pt-20 lg:pt-6">
            {children}
          </div>
        </main>
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
