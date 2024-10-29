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
                  जैन धर्म के साधुमार्गी श्वेतांबर संप्रदाय की प्रतिनिधि संस्था है 'श्री अखिल भारतवर्षीय साधुमार्गी जैन संघ।'
                </p>
                
                <p className="text-gray-800 leading-relaxed text-lg">
                  सन् 1962 में स्थापित इस संघ का उद्देश्य है सम्यक् ज्ञान, दर्शन और चारित्र के रास्ते राष्ट्र का उत्थान।
                </p>

                <p className="text-gray-800 leading-relaxed text-lg">
                  भगवान महावीर के अनुपम विरासत के अनुरूप अध्यात्म, शुद्ध संयम व सशक्त अनुशासन की पुनस्र्थापना के काम में लगे इस संघ के आध्यात्मिक मूल स्रोत भगवान महावीर के पाट परम्परा पर विराजमान आचार्य हैं। अभी इस पाट पर आचार्य श्री रामेश विराजमान हैं।
                </p>

                <p className="text-gray-800 leading-relaxed text-lg">
                  यह संघ देश भर में 350 से अधिक शाखाओं के माध्यम से धार्मिक एवं सामाजिक कार्यक्रमों में भागीदारी निभा रहा है। बिना रुके, बिना थके समाज एवं राष्ट्र के उत्थान में लगे संघ की शाखाएं अमेरिका, इंग्लैंड, नेपाल और भूटान समेत कई और देशों में भी है।
                </p>

                <p className="text-gray-800 leading-relaxed text-lg">
                  'महिला समिति' तथा 'समता युवा संघ' के रूप में अपनी दो भुजाओं की शक्ति के साथ संघ 35 से अधिक प्रकल्प संचालित कर रहा है। इनमें आध्यात्मिक, शैक्षणिक, जीव दया जैसे लोकोपकारी प्रकल्प लोगों का लगातार हित कर रहे हैं। सामाजिक कुरीतियों के उन्मूलन में भी संघ लगातार प्रयासरत है।
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
