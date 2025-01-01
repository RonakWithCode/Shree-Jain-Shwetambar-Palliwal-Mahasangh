import Link from 'next/link';
import Image from 'next/image';
import { SiJoplin } from 'react-icons/si';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100 relative">
          {/* Top Ornamental Design */}
          <div className="h-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />

          <div className="p-8 md:p-12 text-center relative z-10">
            {/* Jain Symbol */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 relative">
                <Image
                  src="/images/jainlogo/Jainism.svg"
                  alt="Jain Symbol"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-4 mb-8">
              <h1 className="text-6xl font-bold text-amber-800">404</h1>
              <h2 className="text-2xl font-semibold text-gray-700">पृष्ठ नहीं मिला</h2>
              <p className="text-gray-600">
                क्षमा करें, आपके द्वारा खोजा गया पृष्ठ मौजूद नहीं है।
              </p>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-0.5 w-12 bg-amber-200"></div>
              <SiJoplin className="text-amber-400" size={20} />
              <div className="h-0.5 w-12 bg-amber-200"></div>
            </div>

            {/* Back to Home Button */}
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 
                         text-white px-8 py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 
                         transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-lg">मुख्य पृष्ठ पर जाएं</span>
            </Link>
          </div>

          {/* Bottom Ornamental Design */}
          <div className="h-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />

          {/* Decorative Background Elements */}
          <div className="absolute top-20 left-0 w-32 h-32 bg-amber-100 rounded-full opacity-20 blur-2xl" />
          <div className="absolute bottom-20 right-0 w-32 h-32 bg-amber-200 rounded-full opacity-20 blur-2xl" />
        </div>

        {/* Additional Decorative Elements */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-amber-200 rounded-full opacity-20 blur-3xl" />
      </div>
    </div>
  );
} 