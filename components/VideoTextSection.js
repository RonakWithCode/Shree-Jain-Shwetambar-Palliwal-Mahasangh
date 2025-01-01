"use client";
import React from 'react';

const VideoTextSection = () => {
  // Decorative Corner SVG Component
  const CornerDecoration = ({ className }) => (
    <svg 
      className={className} 
      width="32" 
      height="32" 
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M1 1h12c0 6.627 5.373 12 12 12V25"
        stroke="#C4A484"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="w-full bg-gradient-to-b from-orange-50 to-white py-16 px-4">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {/* Decorative Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-orange-800 mb-2">हमारा परिचय</h2>
              <div className="flex items-center justify-center">
                <span className="w-16 h-0.5 bg-orange-300"></span>
                <span className="w-3 h-3 mx-2 rounded-full bg-orange-400"></span>
                <span className="w-16 h-0.5 bg-orange-300"></span>
              </div>
            </div>

            {/* Main Content Box */}
            <div className="relative bg-white border-2 border-orange-200 rounded-lg p-8 shadow-lg">
              {/* Decorative Corners */}
              <CornerDecoration className="absolute top-0 left-0 transform rotate-0" />
              <CornerDecoration className="absolute top-0 right-0 transform rotate-90" />
              <CornerDecoration className="absolute bottom-0 left-0 transform -rotate-90" />
              <CornerDecoration className="absolute bottom-0 right-0 transform rotate-180" />

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(#C4A484 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              {/* Text Content */}
              <div className="relative space-y-6 font-hindi text-justify">
                <p className="text-gray-800 leading-relaxed text-lg">
                पल्लीवाल जैन समाज के श्वेतांबर संप्रदाय की प्रतिनिधि संस्था है "श्री जैन श्वेतांबर पल्लीवाल महासंघ।"
                </p>
                
                <p className="text-gray-800 leading-relaxed text-lg">
                सन् 1993 में स्थापित इस महासंघ का उद्देश्य है सम्यक् ज्ञान, दर्शन और चारित्र के रास्ते राष्ट्र का उत्थान व समाज का विकास। 
                </p>

                <p className="text-gray-800 leading-relaxed text-lg">
                भगवान महावीर के अनुपम विरासत के अनुरूप अध्यात्म, सामाजिक सद्भावना व सशक्त अनुशासन की पुनस्र्थापना के काम में लगे इस महासंघ के सदस्य व कार्यकर्ता। 
                </p>

                <p className="text-gray-800 leading-relaxed text-lg">
                यह महासंघ देश भर में 15 से अधिक शाखाओं के माध्यम से धार्मिक एवं सामाजिक कार्यक्रमों में भागीदारी निभा रहा है। बिना रुके, बिना थके समाज एवं राष्ट्र के उत्थान में लगे संघ की शाखाएं सम्पूर्ण पल्लीवाल क्षेत्र में फैली हुई है। 
                </p>
                <p className="text-gray-800 leading-relaxed text-lg">
                महिला शक्ति तथा युवा शक्ति के रूप में अपनी दो भुजाओं की शक्ति के साथ संघ 8 से अधिक प्रकल्प संचालित कर रहा है। इनमें आध्यात्मिक, शैक्षणिक, सामाजिक, मानवीय, जीवदया जैसे लोकोपकारी प्रकल्प लोगों का लगातार हित कर रहे हैं। सामाजिक कुरीतियों के उन्मूलन में भी महासंघ लगातार प्रयासरत है।
                </p>
              </div>

              {/* Decorative Bottom */}
              <div className="flex items-center justify-center mt-8">
                <span className="w-16 h-0.5 bg-orange-300"></span>
                <span className="w-3 h-3 mx-2 rounded-full bg-orange-400"></span>
                <span className="w-16 h-0.5 bg-orange-300"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTextSection;
