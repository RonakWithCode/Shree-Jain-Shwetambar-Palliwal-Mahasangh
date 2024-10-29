import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// Jain Symbol SVG Component
const JainSymbol = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path
      fill="currentColor"
      d="M50 5C25.2 5 5 25.2 5 50s20.2 45 45 45 45-20.2 45-45S74.8 5 50 5zm0 80c-19.3 0-35-15.7-35-35s15.7-35 35-35 35 15.7 35 35-15.7 35-35 35z"
    />
    <path
      fill="currentColor"
      d="M50 25c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm0 40c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z"
    />
    <circle fill="currentColor" cx="50" cy="50" r="8" />
  </svg>
);

// AhimsaHand SVG Component
const AhimsaHand = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
    <path
      fill="currentColor"
      d="M50 5C25.2 5 5 25.2 5 50s20.2 45 45 45 45-20.2 45-45S74.8 5 50 5zm25 45c0 13.8-11.2 25-25 25s-25-11.2-25-25 11.2-25 25-25 25 11.2 25 25zM50 35c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15z"
    />
    <path
      fill="currentColor"
      d="M65 50c0 8.3-6.7 15-15 15s-15-6.7-15-15 6.7-15 15-15 15 6.7 15 15zm-25 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z"
    />
  </svg>
);

const footerLinks = [
  { href: '/about', label: 'हमारे बारे में', labelEn: 'About Us' },
  { href: '/contact', label: 'संपर्क करें', labelEn: 'Contact' },
  { href: '/privacy', label: 'गोपनीयता नीति', labelEn: 'Privacy Policy' },
  { href: '/terms', label: 'नियम और शर्तें', labelEn: 'Terms and Conditions' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-orange-50 via-white to-orange-100 text-gray-800">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-300 via-yellow-500 to-orange-300" />
      
      {/* Background Pattern with SVG */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          <AhimsaHand />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-10 h-10 mr-3 text-orange-600">
                <JainSymbol />
              </div>
              <h3 className="text-2xl font-bold text-orange-800">श्री दिगम्बर जैन समाज</h3>
            </div>
            <p className="text-orange-700 mb-4 font-semibold">
              अहिंसा परमो धर्मः
              <span className="block text-sm mt-1 text-orange-600">सर्वभूतहिते रताः</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-orange-800 flex items-center justify-center md:justify-start">
              <span className="w-8 h-0.5 bg-orange-400 mr-3"></span>
              महत्वपूर्ण लिंक
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-orange-700 hover:text-orange-500 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-orange-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-orange-800 flex items-center justify-center md:justify-start">
              <span className="w-8 h-0.5 bg-orange-400 mr-3"></span>
              संपर्क सूत्र
            </h4>
            <address className="not-italic space-y-3 text-orange-700">
              <p className="flex items-center">
                <FaMapMarkerAlt className="text-orange-500 mr-3" />
                श्री दिगम्बर जैन मंदिर के पास,<br />
                नई दिल्ली, भारत
              </p>
              <p className="flex items-center">
                <FaPhone className="text-orange-500 mr-3" />
                +91 98765 43210
              </p>
              <p className="flex items-center">
                <FaEnvelope className="text-orange-500 mr-3" />
                contact@jainsamaj.org
              </p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-orange-800 flex items-center justify-center md:justify-start">
              <span className="w-8 h-0.5 bg-orange-400 mr-3"></span>
              समाचार पत्र
            </h4>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="आपका ईमेल"
                className="w-full px-4 py-2 bg-white/80 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 text-orange-900"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors"
              >
                सदस्यता लें
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar - Simplified */}
        <div className="mt-8 pt-4 border-t border-orange-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 text-orange-600">
              <JainSymbol />
            </div>
          </div>
          <p className="text-orange-700">
            &copy; {new Date().getFullYear()} श्री दिगम्बर जैन समाज। सर्वाधिकार सुरक्षित।
          </p>
        </div>
      </div>
    </footer>
  );
}
