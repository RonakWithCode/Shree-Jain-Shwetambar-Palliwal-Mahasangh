"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { newsService } from '@/services/newsService';

const NEWS_TYPES = {
  TEXT_ONLY: 'TEXT_ONLY',
  IMAGE_ONLY: 'IMAGE_ONLY',
  IMAGE_TITLE: 'IMAGE_TITLE',
  IMAGE_TITLE_TEXT: 'IMAGE_TITLE_TEXT'
};

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentNews, setCurrentNews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsService.getNews();
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
  const getModifiedUrl = (url) => {
    return url ? url.replace('88.222.215.5/v1', 'cloud.appwrite.io/v1') : '';
  };


  const prevNews = () => {
    setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  const handleShare = (platform, newsItem) => {
    const shareText = `${newsItem.title}\n${newsItem.content || ''}`;
    const shareUrl = window.location.href;

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    }
  };

  const renderNewsContent = (newsItem) => {
    const containerClasses = "min-h-[400px] md:min-h-[500px] lg:min-h-[600px] w-full flex flex-col justify-center items-center px-4 md:px-8 py-6";
    
    switch (newsItem.type) {
      case NEWS_TYPES.TEXT_ONLY:
        return (
          <div className={containerClasses}>
            <div className="w-full max-w-3xl mx-auto h-full flex flex-col justify-center">
              <h3 className="text-orange-500 text-2xl md:text-3xl lg:text-4xl mb-6 font-hindi text-center">
                {newsItem.title}
              </h3>
              <div className="max-h-[300px] md:max-h-[400px] lg:max-h-[450px] overflow-y-auto">
                <p className="text-gray-700 font-hindi text-lg md:text-xl text-center leading-relaxed">
                  {newsItem.content}
                </p>
              </div>
            </div>
          </div>
        );

      case NEWS_TYPES.IMAGE_ONLY:
        return (
          <div className={containerClasses}>
            <div className="relative w-full max-w-4xl mx-auto h-[300px] md:h-[400px] lg:h-[500px]">
              <Image 
                src={getModifiedUrl(newsItem.image)}
                alt={newsItem.alt || "News Image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
                className="object-contain rounded-lg transition-opacity duration-300 hover:scale-105 "
                unoptimized={true}
              />
            </div>
          </div>
        );

      case NEWS_TYPES.IMAGE_TITLE:
        return (
          <div className={containerClasses}>
            <div className="w-full max-w-4xl mx-auto space-y-6">
              <h3 className="text-orange-500 text-2xl md:text-3xl lg:text-4xl mb-6 font-hindi text-center">
                {newsItem.title}
              </h3>
              <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px]">
                <Image 
                src={getModifiedUrl(newsItem.image)}
                alt={newsItem.alt || newsItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                  className="object-contain rounded-lg transition-all duration-300 hover:scale-105"
                  unoptimized={true}
                />
              </div>
            </div>
          </div>
        );

      case NEWS_TYPES.IMAGE_TITLE_TEXT:
        return (
          <div className={containerClasses}>
            <div className="w-full max-w-4xl mx-auto space-y-6">
              <h3 className="text-orange-500 text-2xl md:text-3xl lg:text-4xl mb-4 font-hindi text-center">
                {newsItem.title}
              </h3>
              <div className="relative w-full h-[200px] md:h-[300px] lg:h-[350px]">
                <Image 
                src={getModifiedUrl(newsItem.image)}
                alt={newsItem.alt || newsItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                  className="object-contain rounded-lg transition-opacity duration-300 hover:scale-105"
                  unoptimized={true}
                />
              </div>
              <p className="text-gray-700 font-hindi text-center mt-4">
                {newsItem.content}
              </p>
            </div>
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
      
      <div className="relative">
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

        {renderNewsContent(newsItems[currentNews])}

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
