"use client"
import React from 'react';
import Image from 'next/image';

const executives = [
  {
    role: 'अध्यक्ष',
    name: 'राजेन्द्र कुमार जैन',
    address: 'बी- 142, सूर्यनगर, अलवर',
    phone: '9413304075',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    role: 'महामंत्री',
    name: 'मनोज कुमार जैन',
    address: '2/488, काला कुआँ, अलवर',
    phone: '9413446149',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500',
  },
  {
    role: 'कोषाध्यक्ष',
    name: 'विपिन जैन',
    address: 'जैन कॉलोनी, हिण्डौन सिटी, करौली',
    phone: '9694433733',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-500',
  },
  {
    role: 'उपाध्यक्ष',
    name: 'सुधीर जैन',
    address: 'भिवाड़ी',
    phone: '9783273303',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-500',
  },
  {
    role: 'उपाध्यक्ष',
    name: 'रिखब चन्द जैन',
    address: 'खेरलीगंज',
    phone: '9414854387',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-500',
  },
  {
    role: 'सहमंत्री',
    name: 'कमलेश चन्द जैन',
    address: 'मई',
    phone: '9461642390',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-500',
  },
  {
    role: 'सहमंत्री',
    name: 'महेश चन्द जैन',
    address: 'मण्डावर',
    phone: '9950113580',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-500',
  },
  {
    role: 'संगठन मंत्री',
    name: 'विमल चन्द जैन',
    address: 'गंगापुर सिटी',
    phone: '9414846512',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-500',
  },
  {
    role: 'संगठन मंत्री',
    name: 'अनिल कुमार जैन',
    address: 'बयाना',
    phone: '9414485724',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-500',
  },
  {
    role: 'प्रचार मंत्री',
    name: 'योगेश कुमार जैन',
    address: 'खेड़लीगंज',
    phone: '9413634244',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-500',
  },
];

const members = [
  {
    name: 'भागचन्द जैन',
    address: 'हिण्डौन सिटी',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    name: 'भागचन्द जैन',
    address: 'अलवर',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    name: 'मनोज कुमार जैन',
    address: 'नदबई',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    name: 'रिखब चन्द जैन',
    address: 'जयपुर',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    name: 'पारस मल जैन',
    address: 'गंगापुर सिटी',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    name: 'पदम चन्द जैन',
    address: 'नदबई',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    name: 'नरेश कुमार जैन',
    address: 'खोह',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    name: 'सतीश चन्द जैन',
    address: 'महवा',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    name: 'नरेश कुमार जैन',
    address: 'खेरली',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    name: 'राजेश जैन',
    address: 'करौली',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  {
    name: 'राजेन्द्र कुमार जैन',
    address: 'भरतपुर',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
  }
];

const nominatedMembers = [
  {
    name: 'प्रदीप कुमार जैन',
    address: 'बिचगांवा',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500',
  },
  {
    name: 'आदित्य जैन',
    address: 'हिण्डौन',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500',
  },
  {
    name: 'मनीष जैन',
    address: 'नदबई',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500',
  },
  {
    name: 'दिनेश जैन',
    address: 'खेरली',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500',
  },
  {
    name: 'सुरेश चन्द जैन',
    address: 'अलवर',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500',
  },
  {
    name: 'विमल चन्द जैन',
    address: '(बड़ौदाकान) जयपुर',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500',
  }
];

export default function CurrentExecutive() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with enhanced styling */}
        <div className="text-center mb-20">
          <h1 className="p-10 text-5xl font-bold text-gray-900 font-hindi mb-6 
            bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            वर्तमान कार्यकारिणी
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Executive Members with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {executives.map((executive, index) => (
            <div
              key={index}
              className={`relative ${executive.bgColor} rounded-2xl shadow-xl overflow-hidden 
                transform hover:scale-105 transition-all duration-300 
                border-l-4 ${executive.borderColor} hover:shadow-2xl`}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-black"></div>
              </div>

              <div className="relative p-8">
                {/* Image Section */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur"></div>
                    <div className="relative">
                      <Image
                        src="/images/Profile_avatar_placeholder_large.png"
                        // src={`/images/executives/${executive.name.replace(/\s+/g, '-').toLowerCase()}.jpg`}
                        alt={executive.name}
                        width={128}
                        height={128}
                        className="rounded-full object-cover border-4 border-white shadow-lg"
                        onError={(e) => {
                          e.target.src = '/images/Profile_avatar_placeholder_large.png'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="text-center font-hindi">
                  <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold 
                    bg-white/90 text-gray-700 mb-3 shadow-sm backdrop-blur-sm">
                    {executive.role}
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {executive.name}
                  </h4>
                  <p className="text-gray-600 mb-3">
                    {executive.address}
                  </p>
                  <a
                    href={`tel:${executive.phone}`}
                    className="inline-flex items-center justify-center px-4 py-2 
                      bg-white/80 backdrop-blur-sm rounded-full text-gray-700 
                      hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {executive.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regular Members with enhanced styling */}
        <div className="mb-20 bg-white rounded-3xl shadow-lg p-10">
          <h2 className="text-3xl font-bold text-gray-900 font-hindi mb-10 text-center">
            सदस्य
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div key={index}
                className={`${member.bgColor} p-6 rounded-xl shadow-sm hover:shadow-md 
                  transition-all duration-300 border-l-4 ${member.borderColor}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={`/images/members/${member.name.replace(/\s+/g, '-').toLowerCase()}.jpg`}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover border-2 border-white shadow-md"
                      onError={(e) => {
                        e.target.src = '/images/Profile_avatar_placeholder_large.png'
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-gray-800 font-hindi text-lg font-medium">{member.name}</p>
                    <p className="text-gray-600 font-hindi text-sm">{member.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nominated Members with enhanced styling */}
        <div className="bg-white rounded-3xl shadow-lg p-10">
          <h2 className="text-3xl font-bold text-gray-900 font-hindi mb-10 text-center">
            मनोनित सदस्य
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nominatedMembers.map((member, index) => (
              <div key={index}
                className={`${member.bgColor} p-6 rounded-xl shadow-sm hover:shadow-md 
                  transition-all duration-300 border-l-4 ${member.borderColor}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={`/images/nominated-members/${member.name.replace(/\s+/g, '-').toLowerCase()}.jpg`}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover border-2 border-white shadow-md"
                      onError={(e) => {
                        e.target.src = '/images/Profile_avatar_placeholder_large.png'
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-gray-800 font-hindi text-lg font-medium">{member.name}</p>
                    <p className="text-gray-600 font-hindi text-sm">{member.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
