"use client";
import { useEffect, useState } from 'react';
import { databases, DATABASE_ID, MAGAZINE_COLLECTION_ID, Query } from '@/lib/appwrite';
import MagazineCard from '@/components/Magazine/MagazineCard';
import Image from 'next/image';
import { FaOm } from 'react-icons/fa';

export default function MagazinesPage() {
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllMagazines = async () => {
            try {
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    MAGAZINE_COLLECTION_ID,
                    [Query.orderDesc('publishDate')]
                );
                setMagazines(response.documents);
            } catch (error) {
                console.error('Error fetching magazines:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllMagazines();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-50 to-amber-100">
                <div className="animate-spin text-amber-600">
                    {/* <FaOm size={60} /> */}
                    <Image src="/images/jainlogo/Jainism.svg" alt="Jain Symbol" width={60} height={60} />
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
            {/* Enhanced Decorative Header */}
            <div className="absolute top-0 left-0 w-full h-[400px] overflow-hidden">
                {/* Layered Ornamental Background */}
                <div className="absolute inset-0 bg-white">
                    {/* Primary Pattern */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(30deg, transparent 49.5%, rgba(218, 165, 32, 0.2) 49.5%, rgba(218, 165, 32, 0.2) 50.5%, transparent 50.5%),
                            linear-gradient(150deg, transparent 49.5%, rgba(255, 215, 0, 0.15) 49.5%, rgba(255, 215, 0, 0.15) 50.5%, transparent 50.5%),
                            linear-gradient(90deg, transparent 49.5%, rgba(240, 230, 140, 0.1) 49.5%, rgba(240, 230, 140, 0.1) 50.5%, transparent 50.5%)
                        `,
                        backgroundSize: '30px 30px, 25px 25px, 35px 35px'
                    }} />

                    {/* Secondary Decorative Elements */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            radial-gradient(circle at 100% 0%, rgba(218, 165, 32, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 0% 100%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)
                        `
                    }} />

                    {/* Mandala Pattern */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 25H25L30 5zm0 50L25 35h10L30 55zm25-25L35 35V25l20-5zM5 30l20-5v10L5 30z' fill='%23B8860B' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                {/* Enhanced Om Symbol with Glow */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <Image className="text-amber-800 opacity-5" src="/images/jainlogo/Jainism.svg" alt="Jain Symbol" width={400} height={400} />
                        {/* <FaOm size={400} className="text-amber-800 opacity-5" /> */}
                        <div className="absolute inset-0 blur-xl bg-amber-500 opacity-10" />
                    </div>
                </div>

                {/* Enhanced Curved Bottom Border */}
                <div className="absolute bottom-0 left-0 w-full">
                    <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto transform scale-y-150 relative z-10"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,90.7C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                            fill="white"
                            className="transition-all duration-300"
                        />
                    </svg>
                </div>
            </div>

            {/* Enhanced Content Section */}
            <div className="relative pt-[250px] pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        {/* Enhanced Decorative Top Element */}
                        <div className="mb-6 relative">
                            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-2"></div>
                            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                {/* <FaOm size={16} className="text-amber-600" /> */}
                                {/* <Image src="/images/jainlogo/Jainism.svg" alt="Jain Symbol" width={16} height={16} /> */}
                            </div>
                        </div>

                        {/* Enhanced Title */}
                        <h1 className="text-5xl font-bold text-amber-800 mb-4 font-serif relative">
                            <span className="relative">
                                पत्रिकाएं
                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-50"></div>
                            </span>
                        </h1>

                        {/* Enhanced Decorative Bottom Element */}
                        <div className="mt-6 relative">
                            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-2"></div>
                            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 rotate-180">
                                <FaOm size={16} className="text-amber-600" />
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Magazine Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Decorative Corner Elements */}
                        <div className="absolute -top-8 -left-8 w-16 h-16 border-t-2 border-l-2 border-amber-300 opacity-50" />
                        <div className="absolute -top-8 -right-8 w-16 h-16 border-t-2 border-r-2 border-amber-300 opacity-50" />
                        <div className="absolute -bottom-8 -left-8 w-16 h-16 border-b-2 border-l-2 border-amber-300 opacity-50" />
                        <div className="absolute -bottom-8 -right-8 w-16 h-16 border-b-2 border-r-2 border-amber-300 opacity-50" />

                        {magazines.map((magazine) => (
                            <div key={magazine.$id} className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                <MagazineCard magazine={magazine} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Decorative Footer */}
            <div className="absolute bottom-0 left-0 w-full">
                <div className="h-1 bg-gradient-to-r from-amber-200 via-amber-600 to-amber-200" />
                <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mt-1" />
            </div>
        </div>
    );
}

