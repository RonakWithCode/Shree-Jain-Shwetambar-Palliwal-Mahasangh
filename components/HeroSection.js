"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
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
    description: 'साधर्मिक का स्वाबलम्बन हेतु 50000 रु. का सशि का ऋण प्रदान करना ( बिना ब्याज, पुनर्भरण 6 माह बाद 2500 रु, 20 मासिक किश्तों में )'
  },
  {
    image: image3,
    title: 'सामाजिक सेवा गतिविधियाँ',
    description: 'असहाय साधर्मिक भाई बहिनों को भरण पोषण हेतु 1000 रु. प्रति माह सहायता करना।'
  },
  {
    image: image3,
    title: 'आध्यात्मिक प्रशिक्षण',
    description: 'पल्लीवाल संदेश मासिक पत्रिका के प्रकाशन द्वारा धार्मिक एवं सामाजिक गतिविधियों का प्रचार प्रसार करना।'
  },
  {
    image: image6,
    title: 'सामाजिक सेवा गतिविधियाँ',
    description: 'पल्लीवाल शिरोमणि श्री जोधराज दीवान छात्रवृत्ति योजना में 12वीं कक्षा उत्तीर्ण को 12000 रु. की एक मुश्त छात्रदृति दी जा रही है।'
  },
  {
    image: image6,
    title: 'संघ द्वारा संचालित प्रवृत्तियां',
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
    <div className="relative bg-gradient-to-br from-orange-50 via-yellow-100 to-orange-200">
      {/* Top banner */}
      <div className="bg-jain-red text-jain-white p-2 text-center text-xs sm:text-sm sticky top-0 z-50 shadow-md">
        <p className="font-hindi">कायदा/समीक्षा केवल लिखित में ही मान्य होगी। मौखिक सूचना/शिकायत एवं समीक्षा की प्रति उत्तर की जवाबदेही नहीं होगी। कृपया भविष्य में मौखिक के बजाय लिखित रूप में WhatsApp 9602026899 अथवा ईमेल आईडी- helpdesk@sadhumargi.com अथवा Post से।</p>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 relative">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <motion.div 
              className="bg-orange-300 p-2 sm:p-4 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                width={800}
                height={600}
                className="rounded-xl w-full h-auto transform hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>
          
          {/* Right side - Text content */}
          <div className="w-full md:w-1/2 md:pl-8 lg:pl-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <FaQuoteLeft className="text-4xl text-orange-400 mb-4" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mb-6 font-hindi leading-tight">{slides[currentSlide].title}</h1>
                <p className="text-lg sm:text-xl text-gray-700 mb-8 font-hindi">{slides[currentSlide].description}</p>
                <motion.button 
                  className="bg-jain-red text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-jain-red/90 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  अधिक जानें
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation arrows */}
        <motion.button 
          onClick={prevSlide} 
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-colors z-10 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft className="text-orange-500 text-xl sm:text-2xl" />
        </motion.button>
        <motion.button 
          onClick={nextSlide} 
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-colors z-10 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight className="text-orange-500 text-xl sm:text-2xl" />
        </motion.button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-jain-red' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>

      {/* Wave pattern */}
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 1440 120" className="w-full h-auto fill-current text-orange-200">
          <path d="M0,96L48,101.3C96,107,192,117,288,112C384,107,480,85,576,80C672,75,768,85,864,90.7C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
