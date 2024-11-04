"use client";
import React, { useState, useEffect } from 'react';
import { FaBookOpen, FaMapMarkedAlt, FaUsers, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingOptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const options = [
    { 
      label: 'महासंघ गतिविधि', 
      icon: FaBookOpen, 
      color: 'bg-red-500 hover:bg-red-600',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    { 
      label: 'पत्रिका', 
      icon: FaMapMarkedAlt, 
      color: 'bg-yellow-500 hover:bg-yellow-600',
      action: () => {
        const magazineSection = document.getElementById('magazine-section');
        if (magazineSection) {
          magazineSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      label: 'वर्तमान कार्यकारिणी।', 
      icon: FaUsers, 
      color: 'bg-green-500 hover:bg-green-600',
      action: () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex items-center">
      {/* Toggle Button */}
      {isMobile && (
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-l-lg shadow-lg 
            bg-orange-500 text-white cursor-pointer
            transition-all duration-300 hover:bg-orange-600"
          animate={{ x: isOpen ? -8 : 0 }}
        >
          {isOpen ? <FaChevronRight /> : <FaChevronLeft />}
        </motion.button>
      )}

      {/* Options Menu */}
      <AnimatePresence>
        {(!isMobile || isOpen) && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.25 }}
            className="flex flex-col space-y-2"
          >
            {options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  option.action();
                  if (isMobile) {
                    setIsOpen(false);
                  }
                }}
                className={`${option.color} text-white p-3 rounded-l-lg shadow-lg cursor-pointer 
                           transition-all duration-300 flex items-center justify-end 
                           hover:translate-x-2 hover:shadow-lg group`}
              >
                <span className="font-hindi text-sm sm:text-base whitespace-nowrap mr-2 group-hover:animate-hover-bounce">
                  {option.label}
                </span>
                <option.icon className="text-xl sm:text-2xl flex-shrink-0" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingOptions;
