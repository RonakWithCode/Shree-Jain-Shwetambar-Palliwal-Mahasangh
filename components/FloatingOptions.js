"use client";
import React, { useState, useEffect } from 'react';
import { FaBookOpen, FaMapMarkedAlt, FaUsers, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingOptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Initial setup
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsMobile(width < 768);
    };

    // Call once on mount
    handleResize();

    // Debounced resize handler
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  const options = [
    { 
      label: 'महासंघ गतिविधियाँ', 
      icon: FaBookOpen, 
      color: 'bg-red-500 hover:bg-red-600',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    { 
      label: 'जैन संदेश पत्रिका', 
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
      action: () => {
        const CommunityLeaders = document.getElementById('CommunityLeaders');
        if (CommunityLeaders) {
          CommunityLeaders.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
  ];

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 24,
        mass: 0.8
      }
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 28,
        mass: 0.8
      }
    }
  };

  const itemVariants = {
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }),
    closed: {
      x: 50,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 28
      }
    }
  };

  return (
    <div className={`fixed ${isMobile ? 'bottom-0 right-0 mb-4 mr-4' : 'right-0 top-1/2 transform -translate-y-1/2'} z-50 flex items-center`}>
      {/* Toggle Button */}
      {isMobile && (
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-lg shadow-lg 
            bg-orange-500 text-white cursor-pointer
            transition-all duration-300 hover:bg-orange-600
            focus:outline-none focus:ring-2 focus:ring-orange-400"
          whileTap={{ scale: 0.95 }}
          animate={{ 
            rotate: isOpen ? 180 : 0,
            x: isOpen ? -8 : 0 
          }}
        >
          {isOpen ? <FaChevronRight /> : <FaChevronLeft />}
        </motion.button>
      )}

      {/* Options Menu */}
      <AnimatePresence mode="wait">
        {(!isMobile || isOpen) && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className={`flex flex-col ${isMobile ? 'space-y-2 absolute bottom-full right-0 mb-2' : 'space-y-2'}`}
          >
            {options.map((option, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  option.action();
                  if (isMobile) {
                    setIsOpen(false);
                  }
                }}
                className={`${option.color} text-white p-3 
                  ${isMobile ? 'rounded-lg' : 'rounded-l-lg'} 
                  shadow-lg cursor-pointer 
                  transition-all duration-300 
                  flex items-center justify-end 
                  hover:translate-x-2 hover:shadow-lg 
                  active:translate-x-1 
                  group`}
                style={{
                  width: isMobile ? `${Math.min(screenWidth - 32, 300)}px` : 'auto',
                  touchAction: 'none'
                }}
              >
                <span className="font-hindi text-sm sm:text-base 
                  whitespace-nowrap mr-2 
                  group-hover:animate-hover-bounce
                  select-none">
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
