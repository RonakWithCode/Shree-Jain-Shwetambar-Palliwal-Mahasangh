"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaWhatsapp, FaFacebook } from 'react-icons/fa';

// Define news content types
const NEWS_TYPES = {
  TEXT_ONLY: 'TEXT_ONLY',           // Title + Paragraph
  IMAGE_ONLY: 'IMAGE_ONLY',         // Image only
  IMAGE_TITLE: 'IMAGE_TITLE',       // Image + Title
  IMAGE_TITLE_TEXT: 'IMAGE_TITLE_TEXT' // Image + Title + Paragraph
};

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentNews, setCurrentNews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news from MongoDB
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setNewsItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const nextNews = () => {
    setCurrentNews((prev) => (prev + 1) % newsItems.length);
  };

  const prevNews = () => {
    setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  // Render news content based on type
  const renderNewsContent = (newsItem) => {
    switch (newsItem.type) {
      case NEWS_TYPES.TEXT_ONLY:
        return (
          <div className="px-8 py-4">
            <h3 className="text-orange-500 text-xl mb-4 font-hindi text-center">
              {newsItem.title}
            </h3>
            <p className="text-gray-700 font-hindi text-center">
              {newsItem.content}
            </p>
          </div>
        );

      case NEWS_TYPES.IMAGE_ONLY:
        return (
          <div className="relative w-full h-[300px] mb-6">
            <Image 
              src={newsItem.image}
              alt={newsItem.alt || "News Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-contain rounded-lg transition-opacity duration-300"
              unoptimized={true}
            />
          </div>
        );

      case NEWS_TYPES.IMAGE_TITLE:
        return (
          <div className="px-8">
            <h3 className="text-orange-500 text-xl mb-4 font-hindi text-center">
              {newsItem.title}
            </h3>
            <div className="relative w-full h-[300px] mb-6">
              <Image 
                src={newsItem.image}
                alt={newsItem.alt || newsItem.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-contain rounded-lg transition-opacity duration-300"
                unoptimized={true}
              />
            </div>
          </div>
        );

      case NEWS_TYPES.IMAGE_TITLE_TEXT:
        return (
          <div className="px-8">
            <h3 className="text-orange-500 text-xl mb-4 font-hindi text-center">
              {newsItem.title}
            </h3>
            <div className="relative w-full h-[300px] mb-6">
              <Image 
                src={newsItem.image}
                alt={newsItem.alt || newsItem.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-contain rounded-lg transition-opacity duration-300"
                unoptimized={true}
              />
            </div>
            <p className="text-gray-700 font-hindi text-center mt-4">
              {newsItem.content}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <p className="text-red-500 text-center">Error loading news: {error}</p>
      </div>
    );
  }

  if (!newsItems.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <p className="text-gray-500 text-center">No news available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-red-500 text-2xl font-hindi text-center mb-6">समाचार</h2>
      
      {/* News Content with Navigation */}
      <div className="relative">
        {/* Navigation Buttons */}
        {newsItems.length > 1 && (
          <>
            <button 
              onClick={prevNews}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full 
                       shadow-md hover:shadow-lg transition-all z-10"
              aria-label="Previous news"
            >
              <FaChevronLeft className="text-orange-500 text-xl" />
            </button>

            <button 
              onClick={nextNews}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full 
                       shadow-md hover:shadow-lg transition-all z-10"
              aria-label="Next news"
            >
              <FaChevronRight className="text-orange-500 text-xl" />
            </button>
          </>
        )}

        {/* News Content */}
        {renderNewsContent(newsItems[currentNews])}

        {/* News Indicators */}
        {newsItems.length > 1 && (
          <div className="flex justify-center gap-2 mb-4">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentNews(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                  ${index === currentNews ? 'bg-orange-500 w-5' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to news ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Social Share Buttons */}
      <div className="flex gap-4 justify-center mt-4">
        <button 
          onClick={() => handleShare('whatsapp', newsItems[currentNews])}
          className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600 transition-colors"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6" />
        </button>
        <button 
          onClick={() => handleShare('facebook', newsItems[currentNews])}
          className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
          aria-label="Share on Facebook"
        >
          <FaFacebook className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default NewsSection;
