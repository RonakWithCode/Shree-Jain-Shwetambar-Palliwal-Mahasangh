"use client";
import { useState, useEffect } from 'react';
import { FaNewspaper, FaBook, FaUsers, FaImages } from 'react-icons/fa';
import { databases, Query } from '@/lib/appwrite';
import Link from 'next/link';
import {
  DATABASE_ID,
  COLLECTION_ID,
  MAGAZINE_COLLECTION_ID,
  CONTACT_COLLECTION_ID,
  PHOTO_GALLERY_COLLECTION_ID,
} from '@/lib/appwrite';

const StatCard = ({ icon: Icon, title, count, href }) => (
  <Link href={href} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{count}</h3>
      </div>
      <div className="bg-blue-50 p-3 rounded-full">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
    </div>
  </Link>
);

const QuickAction = ({ href, label, icon: Icon }) => (
  <Link href={href} 
    className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
    <Icon className="w-5 h-5 text-blue-500 mr-3" />
    <span>{label}</span>
  </Link>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    news: 0,
    magazines: 0,
    contacts: 0,
    gallery: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [news, magazines, contacts, gallery] = await Promise.all([
          databases.listDocuments(DATABASE_ID, COLLECTION_ID),
          databases.listDocuments(DATABASE_ID, MAGAZINE_COLLECTION_ID),
          databases.listDocuments(DATABASE_ID, CONTACT_COLLECTION_ID),
          databases.listDocuments(DATABASE_ID, PHOTO_GALLERY_COLLECTION_ID)
        ]);

        setStats({
          news: news.total,
          magazines: magazines.total,
          contacts: contacts.total,
          gallery: gallery.total
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={FaNewspaper} title="Total News" count={stats.news} href="/admin/news" />
        <StatCard icon={FaBook} title="Magazines" count={stats.magazines} href="/admin/magazines" />
        <StatCard icon={FaUsers} title="Contacts" count={stats.contacts} href="/admin/contacts" />
        <StatCard icon={FaImages} title="Gallery Items" count={stats.gallery} href="/admin/photo-gallery" />
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <QuickAction href="/admin/news?action=new" label="Add News" icon={FaNewspaper} />
        <QuickAction href="/admin/magazines?action=new" label="Upload Magazine" icon={FaBook} />
        <QuickAction href="/admin/photo-gallery?action=new" label="Add Photos" icon={FaImages} />
        <QuickAction href="/admin/contacts" label="View Contacts" icon={FaUsers} />
      </div>
    </div>
  );
}
