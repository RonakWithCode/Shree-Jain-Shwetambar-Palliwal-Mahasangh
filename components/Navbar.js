"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', label: 'मुखपृष्ठ' },
  { 
    href: '/acharyadev', 
    label: 'श्री जोधराज दीवान',
    subItems: [
      { href: '/acharyadev/mahaveer', label: 'जोधराज दीवान जीवन परिचय।' },
    ]
  },
  { 
    href: '/sangh', 
    label: 'महासंघ',
    subItems: [
      
      { href: '/sangh/parichay', label: 'महासंघ परिचय' },
      { href: '/sangh/parichay', label: 'महासंघ उद्देश्य' },
      { href: '/sangh/parichay', label: 'पूर्व अध्यक्ष गण' },
      { href: '/current-executive', label: 'वर्तमान कार्यकारिणी' },
      { href: '/magazine-officer', label: 'पत्रिका पदाधिकारी' },
      { href: '/sangh/a', label: 'महासंघ की शाखाएं' },

    ]
  },
  { href: '/photo-gallery', label: 'फोटो गैलरी' },
  { href: '/federation-activity', label: 'महासंघ गतिविधि' },
  { href: '/application-form', label: 'आवेदन प्रपत्र' },
  { href: '/donation', label: 'अर्थ सहयोग' },
  { href: '/contact', label: 'संपर्क' },
];

// Add this helper component for the arrow
const DownArrow = () => (
  <svg 
    className="w-4 h-4 inline-block ml-1" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
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

  const handleLinkClick = (href) => {
    setIsOpen(false); // Close mobile menu when link is clicked
    setActiveDropdown(null); // Close dropdowns
  };

  // Helper function to check if a link is active
  const isLinkActive = (href, subItems) => {
    if (href === pathname) return true;
    if (subItems) {
      return subItems.some(item => item.href === pathname);
    }
    return false;
  };

  return (
    <nav className={`fixed w-full top-0 z-[100] transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-1.5 px-4 text-center">
        <span className="font-hindi text-sm sm:text-base">जय जिनेन्द्र 🙏 जय महावीर</span>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 md:py-3">
          {/* Logo Section */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/" 
              onClick={() => handleLinkClick('/')}
              className="flex items-center space-x-2 sm:space-x-3 group"
            >
              <div className="relative overflow-hidden ">
                <Image 
                  src="/images/jain-logo.jpg" 
                  alt="श्री जैन श्वेतांबर पल्लीवाल महासंघ Logo" 
                  width={60} 
                  height={60} 
                  priority 
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 ring-2 ring-orange-500/50 rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 
                  bg-clip-text text-transparent font-hindi transition-all duration-300 group-hover:from-red-600 group-hover:to-orange-600
                  leading-tight">
                  श्री जैन श्वेतांबर पल्लीवाल महासंघ
                </span>
                {/* <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-600 font-hindi">
                
                </span> */}
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {item.subItems ? (
                  <button 
                    onClick={() => toggleDropdown(item.href)}
                    className={`px-3 py-2 rounded-lg font-hindi text-base relative group
                      transition-all duration-300 hover:text-orange-600 flex items-center
                      ${isLinkActive(item.href, item.subItems) ? 'text-orange-600' : 'text-gray-900'}`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <DownArrow />
                    <span className="absolute inset-0 bg-orange-50 rounded-lg opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300" />
                  </button>
                ) : (
                  <Link 
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={`px-3 py-2 rounded-lg font-hindi text-base relative group
                      transition-all duration-300 hover:text-orange-600 block
                      ${isLinkActive(item.href) ? 'text-orange-600' : 'text-gray-900'}`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-0 bg-orange-50 rounded-lg opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300" />
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.subItems && activeDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border-t-2 border-orange-500
                        backdrop-blur-lg backdrop-saturate-150 bg-white/90"
                    >
                      <div className="py-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => handleLinkClick(subItem.href)}
                            className={`block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600
                              font-hindi transition-colors duration-200 relative group
                              ${pathname === subItem.href ? 'text-orange-600' : 'text-gray-900'}`}
                          >
                            <span className="relative z-10 ml-4">{subItem.label}</span>
                            <span className="absolute left-2 top-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full 
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
            className="lg:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-gray-900"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1.5">
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
            className="lg:hidden bg-white border-t overflow-hidden shadow-lg"
          >
            <div className="px-4 py-2 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.subItems ? (
                    <button
                      onClick={() => toggleDropdown(item.href)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg font-hindi text-base
                        hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200
                        flex items-center justify-between
                        ${isLinkActive(item.href, item.subItems) ? 'text-orange-600' : 'text-gray-900'}`}
                    >
                      {item.label}
                      <DownArrow />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className={`block w-full px-4 py-2.5 rounded-lg font-hindi text-base
                        hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200
                        ${isLinkActive(item.href) ? 'text-orange-600' : 'text-gray-900'}`}
                    >
                      {item.label}
                    </Link>
                  )}
                  
                  {/* Mobile Dropdown Items */}
                  <AnimatePresence>
                    {item.subItems && activeDropdown === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="pl-6 space-y-1 mt-1 border-l-2 border-orange-500 ml-4"
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => handleLinkClick(subItem.href)}
                            className={`block px-4 py-2 text-sm hover:text-orange-600
                              rounded-lg hover:bg-orange-50 transition-colors duration-200 font-hindi
                              ${pathname === subItem.href ? 'text-orange-600' : 'text-gray-900'}`}
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
