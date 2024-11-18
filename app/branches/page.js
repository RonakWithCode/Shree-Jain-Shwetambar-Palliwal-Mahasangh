import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';

const branches = [
  { name: 'जयपुर', region: 'राजस्थान' },
  { name: 'करौली', region: 'राजस्थान' },
  { name: 'खेड़ली', region: 'राजस्थान' },
  { name: 'भरतपुर', region: 'राजस्थान' },
  { name: 'अलवर', region: 'राजस्थान' },
  { name: 'हिंडौन', region: 'राजस्थान' },
  { name: 'बिचगांवा', region: 'राजस्थान' },
  { name: 'गंगापुर', region: 'राजस्थान' },
  { name: 'शेरपुर', region: 'राजस्थान' },
  { name: 'महवा', region: 'राजस्थान' },
];

export default function Branches() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4 font-hindi">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold pt-12 mt-4 bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
            महासंघ की शाखाएं
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="w-16 h-0.5 bg-gradient-to-r from-orange-300 to-red-300"></span>
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-400 animate-pulse"></span>
            <span className="w-16 h-0.5 bg-gradient-to-r from-red-300 to-orange-300"></span>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {branches.map((branch, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 
                        overflow-hidden border border-orange-100 group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <FaMapMarkerAlt className="text-orange-500 text-xl group-hover:text-orange-600 transition-colors" />
                  <span className="text-sm text-gray-500">{branch.region}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                  {branch.name}
                </h3>
                <div className="mt-4 h-1 w-16 bg-gradient-to-r from-orange-400 to-red-400 
                              group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-4">
            अधिक जानकारी के लिए संपर्क करें
          </p>
          <a 
            href="/contact" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 
                     text-white rounded-lg hover:from-orange-600 hover:to-red-600 
                     transition-all duration-300 shadow-md hover:shadow-lg"
          >
            संपर्क करें
          </a>
        </div>
      </div>
    </div>
  )
}
