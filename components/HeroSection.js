"use client";
import { useState, useEffect, useCallback, memo } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';

const slides = [
  {
    image: '/images/jain-logo.jpg',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'विधवा पेंशन योजना',
    description: 'साधर्मिक विधवा बहिनों को महासंघ द्वारा मासिक सहायता ',
    gradient: 'from-orange-600 to-red-600'
  },
  {
    image: '/images/sadhrmik.jpeg',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'स्वावलंबन योजना',
    description: 'साधर्मिकों को स्वावलंबन हेतु 50,000 रु. की राशि का ऋण प्रदान करना (बिना ब्याज, पुनर्भरण 6 माह बाद, 2,500 रु. की 20 मासिक किश्तों में)।',
    gradient: 'from-green-600 to-teal-600'
  },
  {
    image: '/images/serve.jpeg',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'सामाजिक सेवा गतिविधियाँ',
    description: 'असहाय साधर्मिक भाई-बहनों को भरण-पोषण हेतु 1,000 रु. प्रति माह सहायता करना।',
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    image: '/images/magazines.png',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'मासिक पत्रिका का प्रकाशन',
    description: 'पल्लीवाल संदेश मासिक पत्रिका के प्रकाशन द्वारा धार्मिक एवं सामाजिक गतिविधियों का प्रचार-प्रसार करना।',
    gradient: 'from-purple-600 to-pink-600'
  },
  { 
    image: '/images/image5.png',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'श्री जोधराज दीवान छात्रवृत्ति योजना',
    description: 'पल्लीवाल शिरोमणि श्री जोधराज दीवान छात्रवृत्ति योजना के अंतर्गत 12वीं कक्षा उत्तीर्ण विद्यार्थियों को 12,000 रु. की एकमुश्त छात्रवृत्ति दी जा रही है।',
    gradient: 'from-yellow-600 to-amber-600'
  },
  {
    // image: '/images/serve.jpeg',
    image: '/images/tirth.jpeg',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'भूखंड क्रय एवं चारदीवारी निर्माण योजना',
    description: 'सिरस तीर्थ पर भूखंड क्रय एवं चारदीवारी निर्माण योजना।',
    gradient: 'from-cyan-600 to-teal-600'
  },
  {
    image: '/images/data.png',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'डेटा संग्रहण योजना',
    description: 'पल्लीवाल जैन समाज के अच्छे पैकेज पर कार्यरत युवाओं का डेटा संग्रहण कार्य किया जा रहा है।',
    gradient: 'from-pink-600 to-rose-600'
  }
];

const NavButton = memo(({ onClick, icon: Icon, direction, disabled }) => (
  <motion.button 
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    disabled={disabled}
    className={`p-3 rounded-full bg-white/90 shadow-lg backdrop-blur-sm
      transition-all duration-300 
      ${disabled ? 'opacity-50' : 'hover:shadow-xl hover:bg-orange-50'}`}
  >
    <Icon className={`text-xl ${disabled ? 'text-gray-400' : 'text-orange-500'}`} />
  </motion.button>
));

const SlideIndicator = memo(({ isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`relative transition-all duration-300 rounded-full overflow-hidden
      ${isActive ? 'w-8 h-2' : 'w-2 h-2'}`}
  >
    <motion.div
      layoutId="indicator"
      className={`h-full w-full ${isActive ? 'bg-orange-500' : 'bg-gray-300'}`}
    />
  </motion.button>
));

const SlideImage = memo(({ src, alt, blurDataURL }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5 }}
    className="relative aspect-[3/4] xs:aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3]
      rounded-lg sm:rounded-xl overflow-hidden bg-orange-50 group
      w-full max-w-[65vw] xs:max-w-[65vw] sm:max-w-[75vw] lg:max-w-none mx-auto"
  >
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="(max-width: 480px) 95vw, 
             (max-width: 640px) 85vw,
             (max-width: 768px) 75vw,
             (max-width: 1024px) 50vw,
             40vw"
      className="object-fill"
      loading="eager"
      placeholder="blur"
      blurDataURL={blurDataURL}
      quality={85}
    />
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"
    />
  </motion.div>
));

const ProgressBar = memo(({ isPlaying }) => (
  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
    <motion.div 
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isPlaying ? 1 : 0 }}
      transition={{ duration: 5, ease: "linear", repeat: isPlaying ? Infinity : 0 }}
      className="h-full bg-gradient-to-r from-orange-500 to-red-500 origin-left"
    />
  </div>
));

const TextContent = memo(({ title, description, gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-3 sm:space-y-4 lg:space-y-6 px-4 sm:px-6 lg:px-0 text-center lg:text-left"
  >
    <motion.h2
      layoutId="title"
      className={`text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl 
        font-bold font-hindi bg-gradient-to-r ${gradient} 
        bg-clip-text text-transparent
        leading-[1.6] xs:leading-[1.7] sm:leading-[1.8] 
        tracking-normal
        py-1 sm:py-2
        max-w-[95vw] xs:max-w-[85vw] sm:max-w-[75vw] lg:max-w-xl mx-auto lg:mx-0`}
    >
      {title}
    </motion.h2>
    <motion.p
      layoutId="description"
      className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-600 
        font-hindi leading-[1.8] xs:leading-[1.9] sm:leading-[2]
        tracking-normal
        max-w-[95vw] xs:max-w-[85vw] sm:max-w-[75vw] lg:max-w-xl mx-auto lg:mx-0"
    >
      {description}
    </motion.p>
  </motion.div>
));

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);

  const handleSlideChange = useCallback((newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentSlide, isTransitioning]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden bg-gradient-to-b from-orange-50/30 to-white
        min-h-[70vh] w-full py-4 sm:py-6"
    >
      <div className="container mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center 
          gap-4 xs:gap-6 sm:gap-8 lg:gap-10 h-full w-full max-w-7xl mx-auto">
          
          {/* Image Section */}
          <motion.div 
            className="w-full lg:w-1/2"
            layoutId="slideContainer"
          >
            <AnimatePresence mode="wait">
              <div className="bg-white p-1 xs:p-2 sm:p-3 rounded-lg sm:rounded-xl 
                shadow-lg hover:shadow-xl transform transition-all duration-500 
                hover:scale-[1.01]">
                <SlideImage
                  key={currentSlide}
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  blurDataURL={slides[currentSlide].blurDataURL}
                />
              </div>
            </AnimatePresence>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 lg:pl-8 space-y-3 xs:space-y-4 sm:space-y-5"
            layoutId="textContainer"
          >
            {/* Slide Counter */}
            <motion.div 
              className="flex items-center space-x-4 px-4 sm:px-6 lg:px-0
                max-w-[95vw] xs:max-w-[85vw] sm:max-w-[75vw] lg:max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.span
                key={currentSlide}
                className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-500"
              >
                {String(currentSlide + 1).padStart(2, '0')}
              </motion.span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
              <span className="text-gray-400">
                {String(slides.length).padStart(2, '0')}
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <TextContent 
                key={currentSlide}
                {...slides[currentSlide]}
              />
            </AnimatePresence>

            {/* Controls */}
            <div className="w-full flex flex-col items-center mt-6 sm:mt-8">
              {/* Progress and Play Controls */}
              <div className="flex items-center justify-center space-x-4 mb-3 sm:mb-4
                w-full max-w-[95vw] xs:max-w-[85vw] sm:max-w-[75vw] lg:max-w-xl">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="p-2 rounded-full hover:bg-orange-50 text-orange-500
                    bg-white/80 backdrop-blur-sm shadow-md"
                >
                  {isAutoPlaying ? <FaPause /> : <FaPlay />}
                </motion.button>
                <div className="flex-1">
                  <ProgressBar isPlaying={isAutoPlaying} />
                </div>
              </div>

              {/* Navigation Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center 
                  space-x-2 xs:space-x-3 sm:space-x-4 
                  bg-white/80 backdrop-blur-sm rounded-full 
                  py-2 px-3 shadow-lg mx-auto
                  w-auto"
              >
                <NavButton 
                  onClick={prevSlide} 
                  icon={FaChevronLeft} 
                  direction="previous"
                  disabled={isTransitioning}
                />
                
                <div className="flex space-x-1 xs:space-x-2">
                  {slides.map((_, index) => (
                    <SlideIndicator
                      key={index}
                      isActive={index === currentSlide}
                      onClick={() => handleSlideChange(index)}
                    />
                  ))}
                </div>

                <NavButton 
                  onClick={nextSlide} 
                  icon={FaChevronRight} 
                  direction="next"
                  disabled={isTransitioning}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default memo(HeroSection);
