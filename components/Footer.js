import Image from 'next/image';
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
  { href: '/contact', label: 'संपर्क करें', labelEn: 'Contact' },
  { href: '/current-executive', label: 'वर्तमान कार्यकारिणी', labelEn: 'Contact' },
  { href: '/magazine-officer', label: 'पत्रिका', labelEn: 'Contact' },
  // { href: 'https://www.ronosoft.com', label: 'हमारी एजेंसी', labelEn: 'Our Agency' }, // Link to Ronosoft
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
                {/* <JainSymbol /> */}
                {/* <img src="/images/jain-logo.jpg" alt="Jain Logo" className="w-25 h-24" /> */}
                <Image src="/images/jain-logo.jpg" alt="Jain Logo" width={150} height={150} />
              </div>
              <h3 className="text-2xl font-bold text-orange-800">श्री जैन श्वेतांबर पल्लीवाल महासंघ</h3>
            </div>
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
                    target={link.href.includes('http') ? '_blank' : '_self'} // Opens external link in a new tab
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
                जैन श्वेताम्बर उपाश्रय केशवपुरा, हिण्डौन सिटी करौली
              </p>
              <p className="flex items-center">
                <FaPhone className="text-orange-500 rotate-90 mr-3" />
                +91 9413304075
              </p>
              <p className="flex items-center">
                <FaEnvelope className="text-orange-500 mr-3" />
                palliwalmahasangh@gmail.com
              </p>
            </address>
          </div>

          {/* Developed by Ronosoft
          // <div>
          //   <h4 className="text-xl font-semibold mb-6 text-orange-800 flex items-center justify-center md:justify-start">
          //     <span className="w-8 h-0.5 bg-orange-400 mr-3"></span>
          //     Developed By
          //   </h4>
          
          <p className="text-orange-700">
              This website is developed by Ronosoft.
            </p>
             <Link 
              href="https://www.ronosoft.com" 
              className="text-orange-700 hover:text-orange-500 transition-colors mt-2 inline-block"
              target="_blank"
              rel="noopener noreferrer" // Added for security best practices
            >
              Visit Our Website
            </Link>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-orange-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 text-orange-600">
              {/* <JainSymbol /> */}
              <Image src="/images/jain-logo.jpg" alt="Jain Logo" width={150} height={150} />
            </div>
          </div>
          <p className="text-orange-700">
            &copy; {new Date().getFullYear()} श्री जैन श्वेतांबर पल्लीवाल महासंघ
          </p>
        </div>
      </div>
    </footer>
  );
}
