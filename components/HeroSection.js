"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    image: 'https://placehold.co/800x600/orange/white?text=Activities+by+the+Association',
    title: 'संघ द्वारा संचालित प्रवृत्तियां',
    description: 'श्री अ.भा.सा.जैन संघ के साथ महिला व युवा संघ के माध्यम से 30 से अधिक प्रवृत्तियों और आयामों पर देशभर में लोक कल्याणकारी कार्य किए जा रहे हैं।'
  },
  {
    image: 'https://placehold.co/800x600/purple/white?text=Religious+Education+Programs',
    title: 'धार्मिक शिक्षा कार्यक्रम',
    description: 'हमारे धार्मिक शिक्षा कार्यक्रम युवाओं को जैन धर्म के मूल्यों और सिद्धांतों से परिचित कराते हैं, जिससे वे अपने जीवन में इनका अनुसरण कर सकें।'
  },
  {
    image: 'https://placehold.co/800x600/green/white?text=Social+Service+Activities',
    title: 'सामाजिक सेवा गतिविधियाँ',
    description: 'हमारी सामाजिक सेवा गतिविधियों में गरीबों की सहायता, शिक्षा प्रोत्साहन, और स्वास्थ्य शिविरों का आयोजन शामिल है।'
  },
  {
    image: 'https://placehold.co/800x600/blue/white?text=Spiritual+Training',
    title: 'आध्यात्मिक प्रशिक्षण',
    description: 'हमारे आध्यात्मिक प्रशिक्षण कार्यक्रम व्यक्तियों को आंतरिक शांति और आत्म-जागरूकता प्राप्त करने में मदद करते हैं।'
  },
  {
    image: 'https://placehold.co/800x600/teal/white?text=Environmental+Conservation+Initiative',
    title: 'पर्यावरण संरक्षण पहल',
    description: 'हमारी पर्यावरण संरक्षण पहल के तहत वृक्षारोपण, जल संरक्षण, और प्लास्टिक मुक्त अभियान चलाए जाते हैं।'
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative bg-gradient-to-b from-yellow-100 to-orange-100">
      {/* Top banner */}
      <div className="bg-jain-red text-jain-white p-2 text-center text-xs sm:text-sm">
        <p className="font-hindi">कायदा/समीक्षा केवल लिखित में ही मान्य होगी। मौखिक सूचना/शिकायत एवं समीक्षा की प्रति उत्तर की जवाबदेही नहीं होगी। कृपया भविष्य में मौखिक के बजाय लिखित रूप में WhatsApp 9602026899 अथवा ईमेल आईडी- helpdesk@sadhumargi.com अथवा Post से।</p>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 relative">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="bg-orange-300 p-2 sm:p-4 rounded-lg">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                width={800}
                height={600}
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
          
          {/* Right side - Text content */}
          <div className="w-full md:w-1/2 md:pl-8 lg:pl-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-4 sm:mb-6 font-hindi">{slides[currentSlide].title}</h1>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 font-hindi">{slides[currentSlide].description}</p>
          </div>
        </div>

        {/* Navigation arrows */}
        <button onClick={prevSlide} className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10">
          <FaChevronLeft className="text-orange-500 text-xl sm:text-2xl" />
        </button>
        <button onClick={nextSlide} className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10">
          <FaChevronRight className="text-orange-500 text-xl sm:text-2xl" />
        </button>
      </div>

      {/* Wave pattern */}
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="#FCD34D" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
