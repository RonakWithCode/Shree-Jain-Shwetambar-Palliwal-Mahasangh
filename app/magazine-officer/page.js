"use client"
import React from 'react';
import Image from 'next/image';

export default function MagazineOfficers() {
  const officers = [
    {
      title: 'संयोजक',
      name: 'श्री दीनदयाल जैन',
      address: '7, गणेश कॉलोनी, झोटवाडा, जयपुर',
      mobile: '9414068802',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-500',
      titleBg: 'bg-blue-500',
    },
    {
      title: 'सह संयोजक',
      name: 'श्री पदम चन्द जैन',
      address: 'टेलीफोन टावर के पास, सिद्धार्थ नगर, हिण्डौन सिटी, जिला-करौली (राज.)',
      mobile: '9460628671',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      borderColor: 'border-purple-500',
      titleBg: 'bg-purple-500',
    },
    {
      title: 'सम्पादक',
      name: 'श्री वीरेंद्र जैन कर्मयोगी',
      address: 'ग्राम/पोस्ट-बरगमाँ, तह.-श्रीमहावीरजी, जिला-करौली (राज.)',
      mobile: '9413146140',
      email: 'virendrakarmyogi@gmail.com',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      borderColor: 'border-green-500',
      titleBg: 'bg-green-500',
    },
    {
      title: 'सह सम्पादक',
      name: 'श्री गोपाल लाल जैन',
      address: 'मैसर्स-पन्नालाल हुकमचन्द जैन नई मण्डी, हिण्डौन सिटी, जिला-करोली',
      mobile: '9413650916',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      borderColor: 'border-orange-500',
      titleBg: 'bg-orange-500',
    },
    {
      title: 'सह सम्पादक',
      name: 'सी.ए. धीरज जैन',
      address: '10, बोदन कॉलोनी, जयपुर रोड, अलवर',
      mobile: '8005688506',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      borderColor: 'border-orange-500',
      titleBg: 'bg-orange-500',
    }
  ];

  // Split officers into two groups: upper (2) and lower (3)
  const upperOfficers = officers.slice(0, 2);
  const lowerOfficers = officers.slice(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with decorative elements */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-hindi relative inline-block">
            पत्रिका अधिकारी
            <div className="absolute -bottom-4 left-0 right-0 mx-auto w-3/4 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          </h1>
        </div>

        {/* Upper Row - 2 Officers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {upperOfficers.map((officer, index) => (
            <div key={index} className="flex">
              <OfficerCard officer={officer} />
            </div>
          ))}
        </div>

        {/* Lower Row - 3 Officers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {lowerOfficers.map((officer, index) => (
            <div key={index} className="flex">
              <OfficerCard officer={officer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OfficerCard({ officer }) {
  return (
    <div className={`w-full bg-white rounded-xl shadow-md hover:shadow-xl
      transform transition-all duration-300 hover:-translate-y-1
      border-l-4 ${officer.borderColor}`}
    >
      <div className={`${officer.bgColor} p-5 sm:p-6 h-full rounded-r-xl`}>
        {/* Title Badge */}
        <div className="mb-4">
          <span className={`${officer.titleBg} text-white text-sm font-medium px-4 py-1.5 rounded-full
            shadow-sm inline-block`}>
            {officer.title}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 relative rounded-full border-4 border-white shadow-md overflow-hidden">
              <Image
                src="/images/Profile_avatar_placeholder_large.png"
                alt={officer.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-bold text-gray-900 font-hindi mb-1">
              {officer.name}
            </h4>
            <p className="text-sm text-gray-600 font-hindi break-words">
              {officer.address}
            </p>
            
            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <a href={`tel:${officer.mobile}`} 
                className="inline-flex items-center justify-center px-4 py-2 
                  bg-white rounded-lg text-gray-700 hover:bg-gray-50 
                  transition-colors duration-200 border border-gray-200
                  text-sm whitespace-nowrap group">
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-2 text-blue-500 group-hover:text-blue-600" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{officer.mobile}</span>
              </a>
              
              {/* {officer.email && (
                <a href={`mailto:${officer.email}`} 
                  className="inline-flex items-center justify-center px-4 py-2 
                    bg-white rounded-lg text-gray-700 hover:bg-gray-50 
                    transition-colors duration-200 border border-gray-200
                    text-sm group">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-2 text-blue-500 group-hover:text-blue-600" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate max-w-[180px]">{officer.email}</span>
                </a> 
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
