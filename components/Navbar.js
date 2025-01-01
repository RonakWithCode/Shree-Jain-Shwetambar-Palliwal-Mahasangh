"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Preload logo
const LOGO_URL = "/images/jain-logo.jpg";


const navItems = [
  { href: '/', label: 'मुखपृष्ठ' },
  { 
    href: '/jodhraj-diwan-biography', 
    label: 'श्री जोधराज दीवान',
    subItems: [
      { href: '/jodhraj-diwan-biography', label: 'जोधराज दीवान जीवन परिचय।' },
    ]
  },
  { 
    href: '/sangh', 
    label: 'महासंघ',
    subItems: [
      // { href: '/sangh/parichay', label: 'महासंघ परिचय' },
      { href: '/federation-purpose', label: 'महासंघ उद्देश्य' },
      { href: '/former-president', label: 'पूर्व अध्यक्ष गण' },
      { href: '/current-executive', label: 'वर्तमान कार्यकारिणी' },
      { href: '/magazine-officer', label: 'पत्रिका पदाधिकारी' },
      { href: '/branches', label: 'महासंघ की शाखाएं' },
    ]
  },
  { href: '/photo-gallery', label: 'फोटो गैलरी' },
  { href: '/federation-activity', label: 'महासंघ गतिविधियाँ' },
  { href: '/application-form', label: 'आवेदन प्रपत्र' },
  { href: '/donation', label: 'अर्थ सहयोग' },
  { href: '/contact', label: 'संपर्क' },
];

const DownArrow = () => (
  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Optimize scroll handling
  useEffect(() => {
    // preloadLogo();
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20;
      if (scrolled !== shouldBeScrolled) {
        setScrolled(shouldBeScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLinkClick = useCallback((href) => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, []);

  const toggleDesktopDropdown = useCallback((href) => {
    setActiveDropdown(prev => prev === href ? null : href);
  }, []);

  const toggleMobileDropdown = useCallback((href) => {
    setMobileDropdown(prev => prev === href ? null : href);
  }, []);

  const isLinkActive = useCallback((href, subItems) => {
    if (href === pathname) return true;
    if (subItems?.some(item => item.href === pathname)) return true;
    return false;
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, [pathname]);

  return (
    <nav className={`fixed w-full top-0 z-[100] ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    } transition-colors duration-200`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-1.5 px-4 text-center">
        <span className="font-hindi text-sm sm:text-base">जय जिनेन्द्र 🙏 जय महावीर</span>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 md:py-3">
          {/* Logo Section */}
          <Link 
            href="/" 
            onClick={() => handleLinkClick('/')}
            className="flex items-center space-x-2 sm:space-x-3 group"
          >
            <div className="relative">
              <Image 
                src={LOGO_URL}
                alt="श्री जैन श्वेतांबर पल्लीवाल महासंघ Logo"
                width={60}
                height={60}
                priority
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-transform 
                  duration-200 hover:scale-105 "
              />
              <div className="absolute inset-0 ring-2 ring-orange-500/50 " />
            </div>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold 
              bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent 
              font-hindi transition-colors duration-200">
              श्री जैन श्वेतांबर पल्लीवाल महासंघ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative nav-dropdown">
                {item.subItems ? (
                  <button 
                    onClick={() => toggleDesktopDropdown(item.href)}
                    className={`px-3 py-2 rounded-lg font-hindi text-base flex items-center
                      hover:bg-orange-50 transition-colors duration-200
                      ${isLinkActive(item.href, item.subItems) ? 'text-orange-600' : 'text-gray-900'}`}
                  >
                    {item.label}
                    <DownArrow />
                  </button>
                ) : (
                  <Link 
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={`px-3 py-2 rounded-lg font-hindi text-base block
                      hover:bg-orange-50 transition-colors duration-200
                      ${isLinkActive(item.href) ? 'text-orange-600' : 'text-gray-900'}`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Desktop Dropdown Menu */}
                {item.subItems && activeDropdown === item.href && (
                  <div className="absolute left-0 mt-1 w-64 bg-white/95 rounded-lg shadow-lg 
                    border-t-2 border-orange-500 backdrop-blur-sm py-1 nav-dropdown">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => handleLinkClick(subItem.href)}
                        className={`block px-4 py-2 text-sm hover:bg-orange-50 font-hindi
                          transition-colors duration-200
                          ${pathname === subItem.href ? 'text-orange-600' : 'text-gray-900'}`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-orange-50 rounded-lg transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1.5">
              <span className={`w-full h-0.5 bg-gray-600 transition-transform duration-200
                ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-gray-600 transition-opacity duration-200
                ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-gray-600 transition-transform duration-200
                ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white border-t shadow-lg overflow-hidden
        transition-all duration-300 ease-in-out
        ${isOpen ? 'max-h-[calc(100vh-200px)]' : 'max-h-0'}`}>
        <div className="px-4 py-2 space-y-2">
          {navItems.map((item) => (
            <div key={item.href} className="border-b border-gray-100 last:border-0">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMobileDropdown(item.href)}
                    className={`w-full text-left px-4 py-3 font-hindi text-base
                      flex items-center justify-between
                      ${isLinkActive(item.href, item.subItems) ? 'text-orange-600' : 'text-gray-900'}`}
                  >
                    <span>{item.label}</span>
                    <span className={`transform transition-transform duration-200
                      ${mobileDropdown === item.href ? 'rotate-180' : ''}`}>
                      <DownArrow />
                    </span>
                  </button>

                  <div className={`overflow-hidden transition-all duration-200
                    ${mobileDropdown === item.href ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-6 py-2 space-y-2 border-l-2 border-orange-500 ml-4 
                      bg-orange-50/50 rounded-r-lg mt-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => handleLinkClick(subItem.href)}
                          className={`block px-4 py-2 text-sm font-hindi
                            hover:bg-orange-100 rounded-lg transition-colors duration-200
                            ${pathname === subItem.href ? 'text-orange-600' : 'text-gray-900'}`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`block w-full px-4 py-3 font-hindi text-base
                    hover:bg-orange-50 transition-colors duration-200
                    ${isLinkActive(item.href) ? 'text-orange-600' : 'text-gray-900'}`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
