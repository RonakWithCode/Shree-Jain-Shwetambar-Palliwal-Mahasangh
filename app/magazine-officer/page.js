"use client"
import React from 'react';
import Image from 'next/image';

export default function MagazineOfficers() {
  // Group officers by their roles
  const officerGroups = {
    mainOfficers: [
      {
        title: 'संयोजक',
        name: 'श्री दीनदयाल जैन',
        address: '7, गणेश कॉलोनी, झोटवाडा, जयपुर',
        mobile: '9414068802',
        bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
        borderColor: 'border-blue-500',
        titleBg: 'bg-blue-500',
      }
    ],
    deputyCoordinators: [
      {
        title: 'सह संयोजक',
        name: 'श्री पदम धन्द जैन',
        address: 'टेलीफोन वक्र के पास, सिद्धार्थ नगर, हिण्डौन सिटी, जिला-करौली (सन.)',
        mobile: '9460628671',
        bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
        borderColor: 'border-purple-500',
        titleBg: 'bg-purple-500',
      }
    ],
    chiefEditor: [
      {
        title: 'प्रधान सम्पादक',
        name: 'श्री वीरेंद्र जैन कर्मयोगी',
        address: 'काम/पोस्ट-बरगमाँ, तह.-श्रीमहावीरत्री, जिला-कसैली (राज.)',
        mobile: '9413146140',
        email: 'virendrakarmyogi@gmail.com',
        bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
        borderColor: 'border-green-500',
        titleBg: 'bg-green-500',
      }
    ],
    coEditors: [
      {
        title: 'सह सम्पादक',
        name: 'श्री गोपाल लाल जैन',
        address: 'मैसर्स-पन्नालाल हुकमचन्द मैन नई मण्डी, हिण्डौन सिटी, जिला-करोली',
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
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 font-hindi">
            पत्रिका अधिकारी
          </h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        <div className="relative">
          {/* Main Coordinator */}
          <div className="flex flex-col items-center mb-16">
            <div className="w-full max-w-xl">
              {officerGroups.mainOfficers.map((officer, index) => (
                <OfficerCard key={index} officer={officer} />
              ))}
            </div>
            {/* Vertical Line */}
            <div className="h-16 w-0.5 bg-gray-300 my-4"></div>
          </div>

          {/* Deputy Coordinator */}
          <div className="flex flex-col items-center mb-16">
            <div className="w-full max-w-xl">
              {officerGroups.deputyCoordinators.map((officer, index) => (
                <OfficerCard key={index} officer={officer} />
              ))}
            </div>
            {/* Vertical Line */}
            <div className="h-16 w-0.5 bg-gray-300 my-4"></div>
          </div>

          {/* Chief Editor */}
          <div className="flex flex-col items-center mb-16">
            <div className="w-full max-w-xl">
              {officerGroups.chiefEditor.map((officer, index) => (
                <OfficerCard key={index} officer={officer} />
              ))}
            </div>
            {/* Branch Lines */}
            <div className="relative h-16 w-full max-w-4xl my-4">
              <div className="absolute left-1/2 h-full w-0.5 bg-gray-300"></div>
              <div className="absolute bottom-0 left-1/2 w-full h-0.5 bg-gray-300 transform -translate-x-1/2"></div>
              <div className="absolute bottom-0 left-1/4 h-full w-0.5 bg-gray-300"></div>
              <div className="absolute bottom-0 right-1/4 h-full w-0.5 bg-gray-300"></div>
            </div>
          </div>

          {/* Co-Editors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex justify-end">  {/* Left co-editor */}
              <div className="w-full max-w-md">
                <OfficerCard officer={officerGroups.coEditors[0]} />
              </div>
            </div>
            <div className="flex justify-start">  {/* Right co-editor */}
              <div className="w-full max-w-md">
                <OfficerCard officer={officerGroups.coEditors[1]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Update OfficerCard component with a more compact design
function OfficerCard({ officer }) {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden
      transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
      border-l-4 ${officer.borderColor}`}
    >
      <div className={`${officer.bgColor} p-4`}>
        {/* Title Badge - Moved to top of card */}
        <div className="mb-4">
          <span className={`${officer.titleBg} text-white text-sm font-medium px-4 py-1.5 rounded-full`}>
            {officer.title}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src="/images/Profile_avatar_placeholder_large.png"
              alt={officer.name}
              width={64}
              height={64}
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>
          
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 font-hindi">{officer.name}</h4>
            <p className="text-sm text-gray-600 font-hindi mt-1">{officer.address}</p>
            
            <div className="flex items-center mt-3 space-x-3">
              <a href={`tel:${officer.mobile}`} 
                className="flex items-center justify-center px-4 py-2 
                  bg-white rounded-md text-gray-700 hover:bg-gray-50 
                  transition-colors duration-200 flex-1 border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {officer.mobile}
              </a>
              
              {officer.email && (
                <a href={`mailto:${officer.email}`} 
                  className="flex items-center justify-center px-4 py-2 
                    bg-white rounded-md text-gray-700 hover:bg-gray-50 
                    transition-colors duration-200 flex-1 border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{officer.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
