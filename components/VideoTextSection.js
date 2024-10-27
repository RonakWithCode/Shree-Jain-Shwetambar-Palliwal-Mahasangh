"use client";
import React from 'react';

const VideoTextSection = () => {
  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-center">
          {/* Text Content Section */}
          <div className="w-full max-w-3xl">
            <div className="border-2 border-[#C4A484] rounded-lg p-6 relative">
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-8 h-8">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M10 90 C 10 70, 15 60, 25 50 C 35 40, 45 35, 60 35 C 50 35, 40 30, 35 20 C 30 10, 35 5, 40 5 C 45 5, 50 10, 50 15 C 50 20, 45 25, 40 25 C 50 25, 60 30, 70 40 C 80 50, 85 60, 85 70 C 85 75, 80 80, 75 80 C 70 80, 65 75, 65 70 C 65 65, 70 60, 75 60 C 65 60, 55 65, 45 75 C 35 85, 30 90, 30 90"
                    stroke="#C4A484"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
                  <path 
                    d="M10 90 C 10 70, 15 60, 25 50 C 35 40, 45 35, 60 35 C 50 35, 40 30, 35 20 C 30 10, 35 5, 40 5 C 45 5, 50 10, 50 15 C 50 20, 45 25, 40 25 C 50 25, 60 30, 70 40 C 80 50, 85 60, 85 70 C 85 75, 80 80, 75 80 C 70 80, 65 75, 65 70 C 65 65, 70 60, 75 60 C 65 60, 55 65, 45 75 C 35 85, 30 90, 30 90"
                    stroke="#C4A484"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="-rotate-90">
                  <path 
                    d="M10 90 C 10 70, 15 60, 25 50 C 35 40, 45 35, 60 35 C 50 35, 40 30, 35 20 C 30 10, 35 5, 40 5 C 45 5, 50 10, 50 15 C 50 20, 45 25, 40 25 C 50 25, 60 30, 70 40 C 80 50, 85 60, 85 70 C 85 75, 80 80, 75 80 C 70 80, 65 75, 65 70 C 65 65, 70 60, 75 60 C 65 60, 55 65, 45 75 C 35 85, 30 90, 30 90"
                    stroke="#C4A484"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                  <path 
                    d="M10 90 C 10 70, 15 60, 25 50 C 35 40, 45 35, 60 35 C 50 35, 40 30, 35 20 C 30 10, 35 5, 40 5 C 45 5, 50 10, 50 15 C 50 20, 45 25, 40 25 C 50 25, 60 30, 70 40 C 80 50, 85 60, 85 70 C 85 75, 80 80, 75 80 C 70 80, 65 75, 65 70 C 65 65, 70 60, 75 60 C 65 60, 55 65, 45 75 C 35 85, 30 90, 30 90"
                    stroke="#C4A484"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Text Content */}
              <div className="space-y-4 font-hindi text-justify">
                <p className="text-base leading-relaxed text-gray-800">
                  जैन पंथ के सादुमार्गी संप्रदाय संस्कार की प्रतिष्ठित संस्था है। यह अखिल भारतवर्षीय सादुमार्गी जैन संघ। सन् 1962 में स्थापित हुआ तब से उद्देश्य है समाज वाद, व्यवहार और धार्मिक के सभी पक्ष का उत्कर्ष।
                </p>
                <p className="text-base leading-relaxed text-gray-800">
                  भगवान महावीर के अनुपम विरासत के अनुरूप अध्यात्म, मूल संयम व संयमित अनुशासन की मूलप्रवृत्ति के काम में हम हर तरह के आध्यात्मिक मूल यहाँ भगवान महावीर के पट परम्परा पर विराजमान आचार्य हैं। अभी इस पट पर आचार्य श्री रोहित विजयजी हैं।
                </p>
                <p className="text-base leading-relaxed text-gray-800">
                  यह संघ देश भर में 350 से अधिक साधकों की सुरक्षा में धार्मिक एवं सामाजिक कार्यक्रमों में पल्लीवाल मिला रहा है। दिल्ली, जैपुर, विजय वाड़ा समान एवं नए के उत्सव में लगे संघ की आधार अमेरिका, कनाडा, नेपाल और सूरत भरी वर्ष और देश में पड़ी है।
                </p>
                <p className="text-base leading-relaxed text-[#FF0000]">
                  "महिला समिति" तथा "रक्षा एवं संघ" के रूप में अपनी दो पुत्राओं की शक्ति के साथ संघ 35 से अधिक छात्र सहायता कर रहा है। इनमें आध्यात्मिक, शैक्षणिक, वीर्य दान जैसे लोकोपकारी अध्यन बोध का आधार मिल कर रहे हैं। सामाजिक कृतित्वों के उत्कर्ष में भी संघ सहायक प्रभावक है।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTextSection;
