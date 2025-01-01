import { memo } from 'react';
import Image from 'next/image';

// Constants
const INSTITUTIONS = [
  'श्री श्वेताम्बर जैन पल्लीवाल धर्मशाला, श्रीमहावीरजी',
  'श्री लब्धि विक्रम राजयशसूरि श्वेताम्बर जैन गौशाला समिति'
];

// Separate SVG components for better reusability
const CalendarIcon = memo(() => (
  <svg 
    className="w-5 h-5 text-orange-500" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
    />
  </svg>
));

CalendarIcon.displayName = 'CalendarIcon';

// Institution list item component
const InstitutionItem = memo(({ text }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors">
    <span className="w-2 h-2 mt-2 rounded-full bg-orange-400" />
    <p className="text-gray-700">{text}</p>
  </div>
));

InstitutionItem.displayName = 'InstitutionItem';

const InfoCard = memo(() => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Decorative Top */}
      <div className="h-2 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400" />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full animate-pulse" />
            <Image 
              src="/InfoCard-logo-circle.png" 
              alt="Logo" 
              width={80}
              height={80}
              className="relative rounded-full object-cover border-4 border-white shadow-md"
              priority
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold font-hindi bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            सहयोगी संस्थाएं
            </h2>
            <div className="flex items-center gap-2 bg-orange-100 rounded-full px-4 py-1">
              {/* <CalendarIcon /> */}
              {/* <p className="text-orange-600 font-semibold">24-07-2024</p> */}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 font-hindi">
          {INSTITUTIONS.map((text, index) => (
            <InstitutionItem key={index} text={text} />
          ))}
        </div>
      </div>
    </div>
  );
});

InfoCard.displayName = 'InfoCard';

export default InfoCard;
