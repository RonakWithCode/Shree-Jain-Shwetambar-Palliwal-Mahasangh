"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/context/useAuth';
import { checkAuth } from '@/lib/auth-service';

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const { setAuthStatus } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            console.log('Checking authentication...');
            const { success, user } = await checkAuth();
            
            console.log('Auth check result:', { success, user });
            setAuthStatus(success);
            
            if (!success) {
                console.log('Redirecting to login...');
                router.push('/admin/login');
            }
            
            setIsChecking(false);
        };

        verifyAuth();
    }, [router, setAuthStatus]);

    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return children;
}
