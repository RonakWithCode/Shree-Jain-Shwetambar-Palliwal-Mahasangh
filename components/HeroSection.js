"use client";
import { useState, useEffect, useCallback, memo } from 'react';
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    image: '/images/jain-logo.jpg',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'महासंघ द्वारा संचालित प्रवृत्तियां',
    description: 'श्री अ.भा.सा.जैन महासंघ के साथ महिला व युवा महासंघ के माध्यम से...'
  },
  {
    image: '/images/sadhrmik.jpeg',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'धार्मिक शिक्षा कार्यक्रम',
    description: 'साधर्मिक का स्वाबलम्बन हेतु 50000 रु. का सशि का ऋण प्रदान करना ( बिना बयाज, पुनर्भरण 6 माह बाद 2500 रु, 20 मासिक किश्तों में )'
  },
  {
    image: '/images/serve.jpeg',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'सामाजिक सेवा गतिविधियाँ',
    description: 'असहाय साधर्मिक भाई बहिनों को भरण पोषण हेतु 1000 रु. प्रति माह सहायता करना।'
  },
  {
    image: '/images/serve.jpeg',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'आध्यात्मिक प्रशिक्षण',
    description: 'पल्लीवाल संदेश मासिक पत्रिका के प्रकाशन द्वारा धार्मिक एवं सामाजिक गतिविधियों का प्रचार प्रसार करना।'
  },
  {
    image: '/images/serve.jpeg',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'सामाजिक सेवा',
    description: 'पल्लीवाल शिरोमणि श्री जोधराज दीवान छात्रवृत्ति योजना में 12वीं कक्षा उत्तीर्ण को 12000 रु. की एक मुश्त छात्रदृति दी जा रही है।'
  },
  {
    image: '/images/serve.jpeg',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'संघ द्वारा सचालित प्रवृत्तियां',
    description: 'सिरस तीर्थ पर भूखणद क्रय व चारदिवारी निर्माण योजना'
  },
  {
    image: '/images/tirth.jpeg',
    blurDataURL: "data:image/jpeg;base64,/9j...",
    title: 'सामाजिक सेवा गतिविधियाँ',
    description: 'पल्लीवाल जैन समाज के अच्छे पैकेज पर काम कर रहें बच्चों का डाटा कलेक्शन का कार्य किया जा रहा हैं।'
  }
];

const NavButton = memo(({ onClick, icon: Icon, direction }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl 
      transform hover:scale-105 active:scale-95
      transition-all duration-300 ease-out"
    aria-label={`${direction} slide`}
  >
    <Icon className="text-orange-500 transition-colors duration-300" />
  </button>
));

const SlideIndicator = memo(({ isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`transform transition-all duration-300 ease-out rounded-full
      hover:scale-110 active:scale-95
      ${isActive 
        ? 'w-8 h-2 bg-orange-500 shadow-lg' 
        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`}
    aria-label={`Go to slide ${isActive ? '(current)' : ''}`}
  />
));

const SlideImage = memo(({ src, alt, blurDataURL }) => (
  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-orange-50
    transform transition-transform duration-500 ease-out hover:scale-[1.02]">
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-fill transform transition-transform duration-700 ease-out
        group-hover:scale-110"
      loading="eager"
      placeholder="blur"
      blurDataURL={blurDataURL}
      quality={90}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
));

const ProgressBar = memo(({ isPlaying }) => (
  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
    <div 
      className={`h-full bg-gradient-to-r from-orange-500 to-red-500
        transform origin-left transition-transform ease-linear
        ${isPlaying ? 'duration-[5000ms] scale-x-100' : 'scale-x-0 duration-300'}`}
    />
  </div>
));

const TextContent = memo(({ title, description }) => (
  <div className="space-y-4 transform transition-all duration-500 ease-out">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-hindi
      bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent
      animate-gradient hover:scale-[1.01] transition-transform duration-300">
      {title}
    </h2>
    <p className="text-base sm:text-lg text-gray-600 font-hindi leading-relaxed
      transform hover:scale-[1.01] transition-transform duration-300">
      {description}
    </p>
  </div>
));

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSlideChange = useCallback((newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

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
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/30 to-white">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8
          transform transition-all duration-500 ease-out">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 group">
            <div className="bg-white p-2 rounded-xl shadow-lg hover:shadow-xl
              transform transition-all duration-500 ease-out hover:scale-[1.01]">
              <SlideImage
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                blurDataURL={slides[currentSlide].blurDataURL}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 lg:pl-8 space-y-6
            transform transition-all duration-500 ease-out">
            {/* Slide Counter */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-orange-500
                transform transition-all duration-300 hover:scale-110">
                {String(currentSlide + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
              <span className="text-gray-400">
                {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            <TextContent 
              title={slides[currentSlide].title}
              description={slides[currentSlide].description}
            />

            <ProgressBar isPlaying={isAutoPlaying} />
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4
          transform transition-all duration-500 ease-out hover:scale-105">
          <NavButton onClick={prevSlide} icon={FaChevronLeft} direction="previous" />
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <SlideIndicator
                key={index}
                isActive={index === currentSlide}
                onClick={() => handleSlideChange(index)}
              />
            ))}
          </div>

          <NavButton onClick={nextSlide} icon={FaChevronRight} direction="next" />
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
