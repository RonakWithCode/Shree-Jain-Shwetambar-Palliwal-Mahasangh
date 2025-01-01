import Image from 'next/image';
import { FaWhatsapp, FaFacebook, FaEye, FaOm } from 'react-icons/fa';
import { RiShareForwardLine } from 'react-icons/ri';
import { SiJoplin } from 'react-icons/si';

export default function MagazineCard({ magazine }) {
  // Function to replace IP with cloud.appwrite.io
  const getModifiedUrl = (url) => {
    return url ? url.replace('88.222.215.5/v1', 'cloud.appwrite.io/v1') : '';
  };

  // Updated to use website URL instead of direct PDF
  const getMagazineViewUrl = () => {
    // magazines
    return `https://shwetambarpalliwalmahasangh.in/magazines/${magazine.$id}`;
  };



  const handlePdfView = () => {
    // Check if we have a PDF URL
    if (magazine.pdfFileUrl) {
      const pdfUrl = getModifiedUrl(magazine.pdfFileUrl);
      window.open(pdfUrl, '_blank');
    } else {
      console.error('PDF URL not found');
    }
  };


  const handleShare = async (platform) => {
    // Use website URL instead of PDF URL
    const shareUrl = getMagazineViewUrl();
    const text = `॥ जैन सन्देश पत्रिका -  ${magazine.title}\n\nपढ़ें: `;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'जैन सन्देश पत्रिका',
              text: text,
              url: shareUrl,
            });
          } catch (error) {
            console.error('Error sharing:', error);
          }
        }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-duration-300 border-t-4 border-saffron-500">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={getModifiedUrl(magazine.coverImageUrl)}
          alt={magazine.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4 space-y-3 bg-gradient-to-b from-white to-amber-50">
        <div className="flex items-center justify-center gap-2">
          <SiJoplin className="text-saffron-600" size={16} />
          <h3 className="text-xl font-bold text-center">जैन संदेश पत्रिका</h3>
          <SiJoplin className="text-saffron-600" size={16} />
        </div>
        <p className="text-blue-600 text-center font-semibold">
          {new Date(magazine.publishDate).toLocaleDateString('hi-IN')}
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => handleShare('whatsapp')}
            className="text-green-600 hover:text-green-700 transition-colors"
            title="WhatsApp पर शेयर करें"
          >
            <FaWhatsapp size={24} />
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="text-blue-600 hover:text-blue-700 transition-colors"
            title="Facebook पर शेयर करें"
          >
            <FaFacebook size={24} />
          </button>
          <button
            onClick={() => handleShare()}
            className="text-blue-600 hover:text-blue-700 transition-colors"
            title="शेयर करें"
          >
            <RiShareForwardLine size={24} />
          </button>
          <button
            onClick={handlePdfView}
            className="text-orange-600 hover:text-orange-700 transition-colors"
            title="पत्रिका पढ़ें"
          >
            <FaEye size={24} />
          </button>
        </div>
      </div>
    </div>
  );
} 