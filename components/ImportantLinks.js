import Link from 'next/link';

const ImportantLinks = () => {
  const links = [
    { 
      title: 'दान करें',
      icon: '💰',
      slug: '/donation',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'फोटो गैलरी',
      icon: '📸',
      slug: '/photo-gallery',
      gradient: 'from-green-500 to-green-600'
    },
    { 
      title: 'हमसे संपर्क करें',
      icon: '📞',
      slug: '/contact',
      gradient: 'from-yellow-500 to-yellow-600'
    },

  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Decorative Top */}
      <div className="h-2 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400"></div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-4 rounded-xl shadow-md">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold font-hindi bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            महत्वपूर्ण लिंक
          </h2>
        </div>

        {/* Links with enhanced styling */}
        <ul className="space-y-4 font-hindi">
          {links.map((link, index) => (
            <li key={index} className="transform transition-all duration-300 hover:-translate-y-1">
              <Link 
              
                href={link.slug}
                className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-white to-orange-50 border border-orange-100 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r ${link.gradient} text-white shadow-sm group-hover:shadow-md transition-shadow`}>
                  <span className="text-2xl">{link.icon}</span>
                </div>
                <span className="text-gray-700 group-hover:text-orange-600 transition-colors">
                  {link.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImportantLinks;

