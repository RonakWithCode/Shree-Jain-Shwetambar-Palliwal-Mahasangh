"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from "@/public/images/jain-logo.jpg"
import image2 from "@/public/images/sadhrmik.jpeg"
import image3 from "@/public/images/serve.jpeg"
import image4 from "@/public/images/serve.jpeg"
import image5 from "@/public/images/serve.jpeg"
import image6 from "@/public/images/serve.jpeg"
import image7 from "@/public/images/tirth.jpeg"

const slides = [
  {
    image: image1,
    title: 'महासंघ द्वारा संचालित प्रवृत्तियां',
    description: 'श्री अ.भा.सा.जैन महासंघ के साथ महिला व युवा महासंघ के माध्यम से 30 से अधिक प्रवृत्तियों और आयामों पर देशभर में लोक कल्याणकारी कार्य किए जा रहे हैं। जिसमें धार्मिक, आध्यात्मिक व सामाजिक कार्य शामिल है। जैसे इदं न मम्, जीवदया, विहार सेवा, उच्च शिक्षा योजना, साहित्य व आगम साहित्य, सर्वधर्मी सहयोग, गुणशील, साधुमार्गी प्रोफेशन फॉर्म आदि प्रवृतियों व आयामों के माध्यम से जन सेवा का कार्य वृहद् स्तर पर किया जा रहा है।.'
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
    <div className="relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200/20 rounded-full blur-3xl translate-y-1/2" />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:py-16 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
        >
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3]">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-lg" />
              
              <div className="relative bg-white p-2 rounded-2xl shadow-xl overflow-hidden 
                transform hover:scale-[1.02] transition-all duration-500 h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ 
                        objectFit:"fill",
                        objectPosition: 'center'
                      }}
                      className="rounded-xl "
                    />
                    
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                      rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Slide Counter */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl font-bold text-orange-500">
                    {String(currentSlide + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
                  <span className="text-gray-400">
                    {String(slides.length).padStart(2, '0')}
                  </span>
                </div>

                <h2 className="pt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 font-hindi
                  bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent
                  leading-relaxed min-h-[3rem] break-words">
                  {slides[currentSlide].title}
                </h2>

                <p className="text-base sm:text-lg text-gray-600 font-hindi leading-relaxed
                  break-words whitespace-pre-wrap min-h-[8rem]">
                  {slides[currentSlide].description}
                </p>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, repeat: isAutoPlaying ? Infinity : 0 }}
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl 
              transform hover:scale-110 transition-all duration-300"
          >
            <FaChevronLeft className="text-orange-500" />
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 h-2 bg-orange-500'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                } rounded-full`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl 
              transform hover:scale-110 transition-all duration-300"
          >
            <FaChevronRight className="text-orange-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
