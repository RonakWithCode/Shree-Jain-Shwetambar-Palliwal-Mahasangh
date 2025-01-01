"use client";
import React, { useState } from 'react';

const PurposeSection = ({ title, children, isOpen, onClick }) => (
  <div className="mb-8 lg:mb-12 transition-all duration-300 ease-in-out">
    <div 
      onClick={onClick}
      className="border border-jain-red rounded-lg shadow-md bg-white 
        hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center cursor-pointer">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-jain-green 
            border-b border-jain-red pb-2 w-full">
            {title}
          </h2>
          <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
        
        <div className={`transition-all duration-300 overflow-hidden
          ${isOpen ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

const ListItem = ({ children }) => (
  <li className="flex items-start space-x-2 p-2 hover:bg-orange-50 rounded-lg 
    transition-colors duration-200">
    <span className="text-jain-red mt-1">•</span>
    <span className="flex-1">{children}</span>
  </li>
);

export default function Page() {
  const [openSections, setOpenSections] = useState({
    main: true,
    welfare: true,
    economic: true,
    health: true,
    social: true,
    religious: true,
    cultural: true
  });

  const toggleSection = (section) => {
    // setOpenSections(prev => ({
    //   ...prev,
    //   [section]: !prev[section]
    // }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white 
      p-4 sm:p-6 lg:p-8 text-gray-800 font-sans">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 lg:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-jain-red mb-6">
          महासंघ उद्देश्य
        </h1>
        <div className="w-32 h-1 bg-jain-red mx-auto"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Main Purpose */}
        <PurposeSection 
          title="मुख्य उद्देश्य"
          isOpen={openSections.main}
          onClick={() => toggleSection('main')}
        >
          <p className="text-base sm:text-lg leading-relaxed">
            श्री जैन श्वेतांबर पल्लीवाल महासंघ का उद्देश्य देश और विदेश में निवास करने वाले समाज के सकारात्मक सोच रखने वाले, सक्षम, शिक्षित, एवं समाजसेवा की भावना रखने वाले युवाओं को संगठित कर संगठन के सदस्यों और समाज का शिक्षा, स्वास्थ्य, आर्थिक, सामाजिक, सांस्कृतिक, धार्मिक, आध्यात्मिक, राजनीतिक और नैतिक हर क्षेत्र में विकास करना है।
          </p>
        </PurposeSection>

        {/* Welfare */}
        <PurposeSection 
          title="समाज कल्याण"
          isOpen={openSections.welfare}
          onClick={() => toggleSection('welfare')}
        >
          <ul className="space-y-2">
            <ListItem>समाज की असक्षम विधवा माताओं और बहनों को मासिक पेंशन उपलब्ध कराना।</ListItem>
            <ListItem>समाज के असक्षम परिवारों के मेघावी छात्रों और छात्राओं को छात्रवृत्ति देना।</ListItem>
            <ListItem>समाज के ऐसे परिवारों को मासिक पेंशन देना जिनमें कमाने वाला कोई सदस्य नहीं है।</ListItem>
            <ListItem>समाज के शारीरिक और मानसिक रूप से विकलांग लोगों को पेंशन देना।</ListItem>
            <ListItem>समाज के आर्थिक रूप से असक्षम परिवारों का मेडिक्लेम करवाना।</ListItem>
            <ListItem>प्रत्येक चेप्टर में साल में एक बार ब्लड डोनेशन कैम्प आयोजित करना।</ListItem>
            <ListItem>शहर के गरीब लोगों को सर्दी और गर्मी के पुराने कपड़े बांटने की व्यवस्था करना।</ListItem>
            <ListItem>समाज के गरीबों को भोजन और अन्य आवश्यकताओं की मदद देना।</ListItem>
            <ListItem>प्रतिवर्ष अधिकतम दान देने वाले सदस्यों को सम्मानित करना।</ListItem>
          </ul>
        </PurposeSection>

        {/* Economic Development */}
        <PurposeSection 
          title="आर्थिक विकास"
          isOpen={openSections.economic}
          onClick={() => toggleSection('economic')}
        >
          <ul className="space-y-2">
            <ListItem>समाज में छात्रों और छात्राओं के करियर काउंसलिंग कार्यक्रम आयोजित करना।</ListItem>
            <ListItem>असक्षम और मेधावी छात्रों को बिना ब्याज या कम ब्याज पर शिक्षा ऋण उपलब्ध कराना।</ListItem>
            <ListItem>असक्षम महिलाओं को उनकी योग्यता के अनुसार रोजगार दिलाने का प्रयास करना।</ListItem>
          </ul>
        </PurposeSection>

        {/* Health Development */}
        <PurposeSection 
          title="स्वास्थ्य विकास"
          isOpen={openSections.health}
          onClick={() => toggleSection('health')}
        >
          <ul className="space-y-2">
            <ListItem>समाज के लोगों के लिए मेडिकल कैम्प आयोजित करना।</ListItem>
            <ListItem>योग शिविर का आयोजन करना।</ListItem>
            <ListItem>ऑर्गेनिक फूड उपलब्ध करवाने के लिए कार्यक्रम बनाना।</ListItem>
          </ul>
        </PurposeSection>

        {/* Social Development */}
        <PurposeSection 
          title="सामाजिक विकास"
          isOpen={openSections.social}
          onClick={() => toggleSection('social')}
        >
          <ul className="space-y-2">
            <ListItem>समाज में फैली बुराइयों को समाप्त करने का प्रयास करना।</ListItem>
            <ListItem>दहेज प्रथा पर रोक लगाने के प्रयास करना।</ListItem>
            <ListItem>समाज के लोगों में एकता और प्रेम बढ़ाने हेतु कार्यक्रम आयोजित करना।</ListItem>
          </ul>
        </PurposeSection>

        {/* Religious Development */}
        <PurposeSection 
          title="धार्मिक और आध्यात्मिक विकास"
          isOpen={openSections.religious}
          onClick={() => toggleSection('religious')}
        >
          <ul className="space-y-2">
            <ListItem>धार्मिक क्लास और सामूहिक सामयिक का आयोजन करना।</ListItem>
            <ListItem>जैन धर्म के मूल सिद्धांतों के प्रचार प्रसार का कार्य करना।</ListItem>
            <ListItem>पंथवाद से ऊपर उठकर धार्मिक एकता के लिए कार्यक्रम निर्धारित करना।</ListItem>
            <ListItem>साधु-संतों के प्रवचनों का आयोजन और उनकी जरूरतों का ध्यान रखना।</ListItem>
          </ul>
        </PurposeSection>

        {/* Cultural Development */}
        <PurposeSection 
          title="सांस्कृतिक और नैतिक विकास"
          isOpen={openSections.cultural}
          onClick={() => toggleSection('cultural')}
        >
          <ul className="space-y-2">
            <ListItem>समाज की सभ्यता और संस्कृति की सुरक्षा और विकास के लिए कार्य करना।</ListItem>
            <ListItem>सदस्यों और समाज में नैतिक मूल्यों का विकास करना।</ListItem>
            <ListItem>नैतिक शिक्षा के लिए जैन धर्म के सिद्धांतों पर आधारित कार्यक्रम आयोजित करना।</ListItem>
          </ul>
        </PurposeSection>

        {/* Quick Navigation */}
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-jain-red text-white p-3 rounded-full shadow-lg hover:bg-red-700 
              transition-colors duration-300"
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
