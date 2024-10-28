"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import image1 from "@/public/images/vidhva.jpg"
import image2 from "@/public/images/sadhrmik.jpeg"
import image3 from "@/public/images/serve.jpeg"
import image4 from "@/public/images/serve.jpeg"
import image5 from "@/public/images/serve.jpeg"
import image6 from "@/public/images/serve.jpeg"
import image7 from "@/public/images/tirth.jpeg"

const slides = [
  {
    image: image1,
    title: 'संघ द्वारा संचालित प्रवृत्तियां',
    description: 'विधवा पैंशन योजना प्रतिमाह 1000 रु. (इस समय 70 विधवाओं को पैंशन दी जा रही है).'
  },
  {
    image: image2,
    title: 'धार्मिक शिक्षा कार्यक्रम',
    description: 'साधर्मिक का स्वाबलम्बन हेतु 50000 रु. का सशि का ऋण प्रदान करना ( बिना बयाज, पुनर्भरण 6 माह बाद 2500 रु, 20 मासिक किश्तों में )'
  },
  {
    image: image3,
    title: 'सामाजिक सेवा गतिविधियाँ',
    description: 'असहाय साधर्मिक भाई बहिनों को भरण पोषण हेतु 1000 रु. प्रति माह सहायता करना।'
  },
  {
    image: image4,
    title: 'आध्यात्मिक प्रशिक्षण',
    description: 'पल्लीवाल संदेश मासिक पत्रिका के प्रकाशन द्वारा धार्मिक एवं सामाजिक गतिविधियों का प्रचार प्रसार करना।'
  },
  {
    image: image5,
    title: 'सामाजिक सेवा',
    description: 'पल्लीवाल शिरोमणि श्री जोधराज दीवान छात्रवृत्ति योजना में 12वीं कक्षा उत्तीर्ण को 12000 रु. की एक मुश्त छात्रदृति दी जा रही है।'
  },
  {
    image: image6,
    title: 'संघ द्वारा सचालित प्रवृत्तियां',
    description: 'सिरस तीर्थ पर भूखणद क्रय व चारदिवारी निर्माण योजना'
  },
  {
    image: image7,
    title: 'सामाजिक सेवा गतिविधियाँ',
    description: 'पल्लीवाल जैन समाज के अच्छे पैकेज पर काम कर रहें बच्चों का डाटा कलेक्शन का कार्य किया जा रहा हैं।'
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleSlideChange((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSlideChange = (newIndex) => {
    setIsChanging(true);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsChanging(false), 300);
  };

  const nextSlide = () => {
    handleSlideChange((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    handleSlideChange((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative">
      {/* Top banner with smooth sliding text */}
      <div className="bg-[#f8d100] text-jain-black p-2 sticky top-0 z-50 shadow-md overflow-hidden">
        <div className="animate-slide-left">
          <p className="font-hindi text-xs sm:text-lg whitespace-nowrap">
            कायदा/समीक्षा केवल लिखित में ही मान्य होगी। मौखिक सूचना/शिकायत एवं समीक्षा की प्रति उत्तर की जवाबदेही नहीं होगी। कृपया भविष्य में मौखिक के बजाय लिखित रूप में WhatsApp 9602026899 अथवा ईमेल आईडी- helpdesk@sadhumargi.com अथवा Post से।
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6 sm:py-12 relative">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image section */}
          <div className="w-full md:w-1/2">
            <div className="bg-orange-300/20 p-2 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px]">
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={`rounded-xl transition-opacity duration-300 ${
                    isChanging ? 'opacity-50' : 'opacity-100'
                  }`}
                />
              </div>
            </div>
          </div>
          
          {/* Text content */}
          <div className="w-full md:w-1/2 md:pl-8 lg:pl-12">
            <div className={`transition-opacity duration-300 ${
              isChanging ? 'opacity-0' : 'opacity-100'
            }`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-hindi">
                {slides[currentSlide].title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-8 font-hindi">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={prevSlide} 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 sm:p-3 rounded-full 
                     transition-all duration-300 z-10 shadow-md hover:shadow-lg hover:bg-white"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-orange-500 text-lg sm:text-xl" />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 sm:p-3 rounded-full 
                     transition-all duration-300 z-10 shadow-md hover:shadow-lg hover:bg-white"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-orange-500 text-lg sm:text-xl" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                handleSlideChange(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-orange-500 w-4 sm:w-5' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
