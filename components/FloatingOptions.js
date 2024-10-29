"use client";
import React from 'react';
import { FaBookOpen, FaMapMarkedAlt, FaUsers } from 'react-icons/fa';

const FloatingOptions = () => {
  const options = [
    { label: 'प्रवचन का सार', icon: FaBookOpen, color: 'bg-red-500 hover:bg-red-600' },
    { label: 'विहार जानकारी', icon: FaMapMarkedAlt, color: 'bg-yellow-500 hover:bg-yellow-600' },
    { label: 'श्रमणोपासक', icon: FaUsers, color: 'bg-green-500 hover:bg-green-600' },
  ];

  return (
    <div className="animate-slide-down fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-2">
        {options.map((option, index) => (
          <div
            key={index}
            className={`${option.color} text-white p-3 rounded-l-lg shadow-lg cursor-pointer 
                       transition-all duration-300 flex items-center justify-end 
                       hover:translate-x-2 hover:shadow-lg group`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <span className="font-hindi text-sm sm:text-base whitespace-nowrap mr-2 group-hover:animate-hover-bounce">
              {option.label}
            </span>
            <option.icon className="text-xl sm:text-2xl flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingOptions;
