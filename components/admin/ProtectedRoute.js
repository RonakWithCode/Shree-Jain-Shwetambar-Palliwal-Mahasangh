"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/check-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!res.ok) {
          throw new Error('Authentication failed');
        }

        const data = await res.json();

        if (!data.success) {
          router.push(`/admin/login?from=${pathname}`);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return children;
}
