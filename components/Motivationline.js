"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const quotes = [
  { 
    text: "यदि क्षुधा से कम ग्रहण किया तो वह भी तप है।", 
    author: "आचार्य श्री" 
  },
  { 
    text: "अहिंसा ही सबसे बड़ा धर्म है।", 
    author: "महावीर स्वामी" 
  },
  { 
    text: "जिसने अपने मन को वश में कर लिया, उसने परमात्मा को पा लिया।", 
    author: "महावीर स्वामी" 
  }
];

const Motivationline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative w-full overflow-hidden bg-white py-4 sm:py-8 md:py-12 lg:py-16">
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12">
          {/* Left Flower */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative hover:scale-110 transition-transform duration-300">
            <div className="animate-spin-slow">
              <Image
                src="/images/red-flower.png"
                alt="Red decorative flower"
                width={112}
                height={112}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Center Quote with Navigation */}
          <div className="flex-1 relative">
            <button 
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full 
                       shadow-lg hover:shadow-xl transition-all z-10 hover:bg-orange-50"
              aria-label="Previous quote"
            >
              <FaChevronLeft className="text-orange-500 text-xl" />
            </button>

            <div className="overflow-hidden relative">
              <div 
                className={`
                  transform transition-transform duration-500 ease-in-out
                  ${isAnimating && direction === 'next' ? 'animate-slide-exit-left' : ''}
                  ${isAnimating && direction === 'prev' ? 'animate-slide-exit-right' : ''}
                  ${!isAnimating && direction === 'next' ? 'animate-slide-from-right' : ''}
                  ${!isAnimating && direction === 'prev' ? 'animate-slide-from-left' : ''}
                  text-center max-w-2xl mx-auto px-12
                `}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
                  <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl 
                    font-hindi font-bold text-orange-600 leading-relaxed
                    tracking-wide antialiased"
                  >
                    {quotes[currentIndex].text}
                  </h2>
                  <p className="text-orange-500 mt-4 font-hindi 
                    text-sm sm:text-base md:text-lg lg:text-xl 
                    font-medium tracking-wide antialiased"
                  >
                    – {quotes[currentIndex].author}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full 
                       shadow-lg hover:shadow-xl transition-all z-10 hover:bg-orange-50"
              aria-label="Next quote"
            >
              <FaChevronRight className="text-orange-500 text-xl" />
            </button>
          </div>

          {/* Right Flower */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative hover:scale-110 transition-transform duration-300">
            <div className="animate-spin-slow-reverse">
              <Image
                src="/images/green-flower.png"
                alt="Green decorative flower"
                width={112}
                height={112}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Add subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 via-transparent to-orange-50/20 pointer-events-none" />
    </div>
  );
};

export default Motivationline;
