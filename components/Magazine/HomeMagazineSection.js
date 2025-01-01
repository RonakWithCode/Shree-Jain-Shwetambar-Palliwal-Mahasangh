"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { databases, DATABASE_ID, MAGAZINE_COLLECTION_ID, Query } from '@/lib/appwrite';
import MagazineCard from './MagazineCard';
import { FaOm } from 'react-icons/fa';
import { SiJoplin } from 'react-icons/si';

export default function HomeMagazineSection() {
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentMagazines = async () => {
            try {
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    MAGAZINE_COLLECTION_ID,
                    [
                        Query.orderDesc('publishDate'),
                        Query.limit(4)
                    ]
                );
                setMagazines(response.documents);
            } catch (error) {
                console.error('Error fetching magazines:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentMagazines();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin text-saffron-600">
                    <FaOm size={40} />
                </div>
            </div>
        );
    }

    return (
        <section id="magazine-section" className="py-12 px-4 bg-gradient-to-b from-amber-50 to-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        {/* <SiJoplin className="text-saffron-600" size={24} />
            <h2 className="text-4xl font-bold">॥ नमो नमः॥</h2>

<SiJoplin className="text-saffron-600" size={24} /> */}
                        <h2 className="text-4xl font-bold">श्वेताम्बर पल्लीवाल जैन संदेश</h2>

                    </div>
                    {/* <h2 className="text-3xl font-bold text-center">श्रमणोपासक</h2> */}
                    <div className="w-24 h-1 bg-saffron-500 mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {magazines.map((magazine) => (
                        <MagazineCard key={magazine.$id} magazine={magazine} />
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/magazines"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-saffron-500 to-orange-500 text-white rounded-full hover:from-saffron-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
                    >
                        <span>सभी पत्रिकाएं देखें</span>
                        <SiJoplin size={16} />
                    </Link>
                </div>

                {/* <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">॥ धर्म की जय हो ॥</p>
        </div> */}
            </div>
        </section>
    );
}
