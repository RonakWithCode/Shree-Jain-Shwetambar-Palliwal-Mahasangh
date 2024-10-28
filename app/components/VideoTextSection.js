"use client";
import React from 'react';
import Image from 'next/image';

const VideoTextSection = () => {
  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-center">
          {/* Text Content Section */}
          <div className="w-full max-w-3xl">
            <div className="border-2 border-[#C4A484] rounded-lg p-6 relative">
              {/* Corner Decorations with Transformations */}
              <div className="absolute top-0 left-0 w-8 h-8 transform rotate-0">
                <Image src="/corner-decoration.svg" alt="" width={32} height={32} />
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 transform rotate-90">
                <Image src="/corner-decoration.svg" alt="" width={32} height={32} />
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8 transform -rotate-90 ">
                <Image src="/corner-decoration.svg" alt="" width={32} height={32} />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 transform rotate-180">
                <Image src="/corner-decoration.svg" alt="" width={32} height={32} />
              </div>

              {/* Text Content */}
              <div className="space-y-4 font-hindi text-justify">
                <p className="relative text-center leading-relaxed text-[#FF0000]">
                  जैन धर्म के साधुमार्गी श्वेतांबर संप्रदाय की प्रतिनिधि संस्था है ‘श्री अखिल भारतवर्षीय साधुमार्गी जैन संघ।’ सन् 1962 में स्थापित इस संघ का उद्देश्य है सम्यक् ज्ञान, दर्शन और चारित्र के रास्ते राष्ट्र का उत्थान।<br />
                  भगवान महावीर के अनुपम विरासत के अनुरूप अध्यात्म, शुद्ध संयम व सशक्त अनुशासन की पुनस्र्थापना के काम में लगे इस संघ के आध्यात्मिक मूल स्रोत भगवान महावीर के पाट परम्परा पर विराजमान आचार्य हैं। अभी इस पाट पर आचार्य श्री रामेश विराजमान हैं।<br />
                  यह संघ देश भर में 350 से अधिक शाखाओं के माध्यम से धार्मिक एवं सामाजिक कार्यक्रमों में भागीदारी निभा रहा है। बिना रुके, बिना थके समाज एवं राष्ट्र के उत्थान में लगे संघ की शाखाएं अमेरिका, इंग्लैंड, नेपाल और भूटान समेत कई और देशों में भी है।<br />
                  ‘महिला समिति’ तथा ‘समता युवा संघ’ के रूप में अपनी दो भुजाओं की शक्ति के साथ संघ 35 से अधिक प्रकल्प संचालित कर रहा है। इनमें आध्यात्मिक, शैक्षणिक, जीव दया जैसे लोकोपकारी प्रकल्प लोगों का लगातार हित कर रहे हैं। सामाजिक कुरीतियों के उन्मूलन में भी संघ लगातार प्रयासरत है।
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
