"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', label: 'मुखपृष्ठ' },
  { 
    href: '/acharyadev', 
    label: 'श्री जोधराज दीवान',
    subItems: [
      { href: '/acharyadev/mahaveer', label: 'चरम तीर्थेश भगवान महावीर' },
    ]
  },
  { 
    href: '/sangh', 
    label: 'संघ',
    subItems: [
      { href: '/sangh/parichay', label: 'परिचय' },
      { href: '/sangh/karyakarini', label: 'कार्यकारिणी' },
    ]
  },
  { href: '/photo-gallery', label: 'फोटो गैलरी' },
  { href: '/sangh-gatividhi', label: 'संघ गतिविधि' },
  { href: '/aavedan-prapatra', label: 'आवेदन प्रपत्र' },
  { href: '/donation', label: 'अर्थ सहयोग' },
  { href: '/sampark', label: 'संपर्क' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (href) => {
    setActiveDropdown(activeDropdown === href ? null : href);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-1 px-4 text-center text-sm">
        <span className="font-hindi">जय जिनेन्द्र 🙏 जय महावीर</span>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative overflow-hidden rounded-full">
                <Image 
                  src="/images/jain-logo.jpg" 
                  alt="श्री जैन श्वेतांबर पल्लीवाल महासंघ Logo" 
                  width={60} 
                  height={60} 
                  priority 
                  className="w-12 h-12 md:w-16 md:h-16 transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 ring-2 ring-orange-500/50 rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 
                  bg-clip-text text-transparent font-hindi transition-all duration-300 group-hover:from-red-600 group-hover:to-orange-600">
                  श्री जैन श्वेतांबर
                </span>
                <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-600 font-hindi">
                  पल्लीवाल महासंघ
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <button 
                  onClick={() => toggleDropdown(item.href)}
                  className="px-4 py-2 rounded-lg font-hindi text-lg relative group
                    transition-all duration-300 hover:text-orange-600"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 bg-orange-100 rounded-lg opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300" />
                  {item.subItems && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 
                      group-hover:scale-x-100 transition-transform duration-300" />
                  )}
                </button>

                <AnimatePresence>
                  {item.subItems && activeDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border-t-4 border-orange-500
                        backdrop-blur-lg backdrop-saturate-150 bg-white/90"
                    >
                      <div className="py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600
                              font-hindi transition-colors duration-200 relative group"
                          >
                            <span className="relative z-10">{subItem.label}</span>
                            <span className="absolute left-2 top-1/2 w-2 h-2 bg-orange-500 rounded-full 
                              transform -translate-y-1/2 scale-0 opacity-0 group-hover:scale-100 
                              group-hover:opacity-100 transition-all duration-300" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none w-10 h-10 flex items-center justify-center
              rounded-lg hover:bg-orange-50 transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5 relative">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-gray-600 block transform origin-center transition-transform"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-gray-600 block"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-gray-600 block transform origin-center transition-transform"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => toggleDropdown(item.href)}
                    className="w-full text-left px-4 py-3 rounded-lg font-hindi text-lg
                      hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                  
                  <AnimatePresence>
                    {item.subItems && activeDropdown === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="pl-8 space-y-1 mt-1 border-l-2 border-orange-500 ml-4"
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-600 hover:text-orange-600
                              rounded-lg hover:bg-orange-50 transition-colors duration-200 font-hindi"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
