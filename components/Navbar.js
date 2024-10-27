"use client";
import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'मुखपृष्ठ' },
  { href: '/acharyadev', label: 'आचार्यदेव', subItems: [
    { href: '/acharyadev/mahaveer', label: 'चरम तीर्थेश भगवान महावीर' },
    { href: '/acharyadev/pat-parampara', label: 'भगवान महावीर पाट परम्परा' },
    { href: '/acharyadev/hukmichand', label: 'आचार्य श्री हुकमीचन्दजी म. सा.' },
    { href: '/acharyadev/shivlal', label: 'आचार्य श्री शिवलाल जी म. सा.' },
    { href: '/acharyadev/udaysagar', label: 'आचार्य श्री उदयसागरजी म. सा.' },
    { href: '/acharyadev/chouthmal', label: 'आचार्य श्री चौथमलजी म. सा.' },
    { href: '/acharyadev/shrilal', label: 'आचार्य श्री श्रीलालजी म. सा.' },
    { href: '/acharyadev/javaharlal', label: 'आचार्य श्री जवाहरलालजी म. सा.' },
    { href: '/acharyadev/ganeshlal', label: 'आचार्य श्री गणेशलालजी म. सा.' },
    { href: '/acharyadev/nanalal', label: 'आचार्य श्री नानालालजी म. सा.' },
    { href: '/acharyadev/ramlal', label: 'आचार्य श्री रामलाल जी म. सा.' },
  ]},
  { href: '/sangh', label: 'संघ', subItems: [
    { href: '/sangh/parichay', label: 'परिचय' },
    { href: '/sangh/karyakarini', label: 'कार्यकारिणी' },
  ]},
  { href: '/photo-gallery', label: 'फोटो गैलरी' },
  { href: '/sangh-gatividhi', label: 'संघ गतिविधि' },
  { href: '/aavedan-prapatra', label: 'आवेदन प्रपत्र' },
  { href: '/arth-sahyog', label: 'अर्थ सहयोग' },
  { href: '/sampark', label: 'संपर्क' },
];

const DropdownMenu = ({ subItems, isOpen }) => (
  <div className={`absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 border-t-4 border-orange-500 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
    <div className="py-1" role="menu" aria-orientation="vertical">
      {subItems.map((subItem) => (
        <Link
          key={subItem.href}
          href={subItem.href}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 hover:text-jain-red font-hindi transition duration-300"
          role="menuitem"
        >
          {subItem.label}
        </Link>
      ))}
    </div>
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = useCallback((href) => {
    setActiveDropdown(activeDropdown === href ? null : href);
  }, [activeDropdown]);

  const memoizedNavItems = useMemo(() => navItems.map((item) => (
    <div key={item.href} className="relative group">
      <button 
        onClick={() => toggleDropdown(item.href)}
        className="text-gray-800 hover:text-jain-red font-hindi py-2 px-3 rounded-full transition duration-300 focus:outline-none hover:bg-orange-300 group"
      >
        {item.label}
        {item.subItems && (
          <svg 
            className={`w-4 h-4 ml-1 inline-block transition-transform duration-300 ${activeDropdown === item.href ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      {item.subItems && <DropdownMenu subItems={item.subItems} isOpen={activeDropdown === item.href} />}
    </div>
  )), [activeDropdown, toggleDropdown]);

  return (
    <nav className="bg-gradient-to-r from-orange-100 to-orange-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2 mb-4 lg:mb-0">
            <div className="transition-transform duration-300 hover:scale-110">
              <Image src="/images/jain-logo.jpg" alt="श्री जैन श्वेतांबर पल्लीवाल महासंघ Logo" width={80} height={80} priority sizes="(max-width: 768px) 60px, 80px" className="rounded-full border-4 border-orange-400" />
            </div>
            <span className="text-xl lg:text-2xl font-bold text-jain-red font-hindi">श्री जैन श्वेतांबर पल्लीवाल महासंघ</span>
          </Link>
          <div className="hidden lg:flex space-x-1">
            {memoizedNavItems}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none bg-orange-300 p-2 rounded-full transition-transform duration-300 hover:scale-110"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6 fill-current text-gray-800" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className={`lg:hidden bg-orange-50 border-t-2 border-orange-200 transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.href}>
              <button
                onClick={() => toggleDropdown(item.href)}
                className="w-full text-left text-gray-800 hover:text-jain-red block px-3 py-2 rounded-md text-base font-medium font-hindi hover:bg-orange-100 transition duration-300"
              >
                {item.label}
                {item.subItems && (
                  <svg 
                    className={`w-4 h-4 ml-1 inline-block transition-transform duration-300 ${activeDropdown === item.href ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
              {item.subItems && (
                <div className={`pl-4 border-l-4 border-orange-500 mt-2 bg-orange-100 rounded-r-md transition-all duration-300 ${activeDropdown === item.href ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="text-gray-700 hover:text-jain-red block px-3 py-2 rounded-md text-sm font-hindi hover:bg-orange-200 transition duration-300"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
