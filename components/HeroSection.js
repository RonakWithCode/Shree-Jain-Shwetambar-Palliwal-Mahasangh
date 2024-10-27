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
    image: "/images/hero/vidhva.jpg",
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
    <div className="relative">
      {/* Top banner */}
      <div className="bg-jain-red text-jain-white p-2 text-center text-xs sm:text-sm">
        <p className="font-hindi">कायदा/समीक्षा केवल लिखित में ही मान्य होगी। मौखिक सूचना/शिकायत एवं समीक्षा की प्रति उत्तर की जवाबदेही नहीं होगी। कृपया भविष्य में मौखिक के बजाय लिखित रूप में WhatsApp 9602026899 अथवा ईमेल आईडी- helpdesk@sadhumargi.com अथवा Post से।</p>
      </div>

      <div className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-4 text-center text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-hindi transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 font-hindi max-w-3xl mx-auto transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
                  {slide.description}
                </p>
                <button className="bg-jain-red text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-jain-red/80 transition-colors">
                  अधिक जानें
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-colors">
          <FaChevronLeft className="text-white text-2xl" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-colors">
          <FaChevronRight className="text-white text-2xl" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

