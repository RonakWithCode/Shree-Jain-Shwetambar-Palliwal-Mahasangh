"use client";
import { useEffect, useState } from 'react';
import { databases, DATABASE_ID, MAGAZINE_COLLECTION_ID } from '@/lib/appwrite';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { FaEye, FaDownload, FaShare, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaTelegram, FaLinkedin } from 'react-icons/fa';
import { SiJoplin } from 'react-icons/si';

export default function MagazineView() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [magazine, setMagazine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    async function fetchMagazine() {
      if (!id) return;

      try {
        const response = await databases.getDocument(
          DATABASE_ID,
          MAGAZINE_COLLECTION_ID,
          id
        );
        setMagazine(response);
      } catch (error) {
        console.error('Error fetching magazine:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMagazine();
  }, [id]);


  
  const getModifiedUrl = (url) => {
    return url ? url.replace('88.222.215.5/v1', 'cloud.appwrite.io/v1') : '';
  };

  
  // Updated to use website URL instead of direct PDF
  const getMagazineViewUrl = () => {
    // magazines
    return `https://shwetambarpalliwalmahasangh.in/magazines/${magazine.$id}`;
  };

  const handleView = () => {
    // const handlePdfView = () => {
      // Check if we have a PDF URL
      if (magazine.pdfFileUrl) {
        const pdfUrl = getModifiedUrl(magazine.pdfFileUrl);
        window.open(pdfUrl, '_blank');
      } else {
        console.error('PDF URL not found');
      }
    // };
  };

  // const handleShare = async (platform) => {
  //   // Use website URL instead of PDF URL
  //   const shareUrl = getMagazineViewUrl();
  //   const text = `॥ जैन सन्देश पत्रिका -  ${magazine.title}\n\nपढ़ें: `;

  //   switch (platform) {
  //     case 'whatsapp':
  //       window.open(`https://wa.me/?text=${encodeURIComponent(text + shareUrl)}`);
  //       break;
  //     case 'facebook':
  //       window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
  //       break;
  //     default:
  //       if (navigator.share) {
  //         try {
  //           await navigator.share({
  //             title: 'जैन सन्देश पत्रिका',
  //             text: text,
  //             url: shareUrl,
  //           });
  //         } catch (error) {
  //           console.error('Error sharing:', error);
  //         }
  //       }
  //   }
  // };

  const handleShare = async (platform) => {
    const shareUrl = getMagazineViewUrl();
    const text = `॥ जैन सन्देश पत्रिका -  ${magazine.title}\n\nपढ़ें: `;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="animate-spin">
          <Image src="/images/jainlogo/Jainism.svg" alt="Jain Symbol" width={60} height={60} />
        </div>
      </div>
    );
  }

  if (!magazine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-50 to-amber-100">
        <h1 className="text-2xl text-gray-600">पत्रिका नहीं मिली</h1>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Decorative Header with SVG Pattern */}
      <div className="h-32 bg-gradient-to-r from-amber-100 to-amber-200 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="jainPattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              {/* Lotus-inspired geometric pattern */}
              <path
                d="M20 0L40 20L20 40L0 20L20 0Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" />
              <path
                d="M20 14C22 17 22 23 20 26M20 14C18 17 18 23 20 26M14 20C17 22 23 22 26 20M14 20C17 18 23 18 26 20"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#jainPattern)" />
          </svg>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
          {/* Top Ornamental Design */}
          <div className="h-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />

          <div className="p-8 md:p-12">
            {/* Header with Logo */}
            <div className="flex flex-col items-center gap-4 mb-12">
              <div className="w-16 h-16 relative">
                <Image
                  src="/images/jainlogo/Jainism.svg"
                  alt="Jain Symbol"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2">
                  जैन संदेश पत्रिका
                </h1>
                <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              {/* Magazine Cover with Decorative Frame */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  {/* Decorative Frame */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl transform -rotate-1" />
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl 
                               transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                    <Image
                      src={getModifiedUrl(magazine.coverImageUrl)}
                      alt={magazine.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Magazine Details */}
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
                    <h2 className="text-xl font-semibold text-amber-800 mb-2">पत्रिका विवरण</h2>
                    <p className="text-lg text-gray-700">
                      प्रकाशन तिथि: {new Date(magazine.publishDate).toLocaleDateString('hi-IN')}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={handleView}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 
                               text-white py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 
                               transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <FaEye className="text-xl" /> 
                      <span className="text-lg">पत्रिका पढ़ें</span>
                    </button>

                    {/* Share Section */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
                      <h3 className="text-lg font-semibold text-amber-800 mb-4 text-center">
                        पत्रिका शेयर करें
                      </h3>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                            <FaWhatsapp className="text-green-600" size={24} />
                          </div>
                          <span className="text-xs text-gray-600">WhatsApp</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('facebook')}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                            <FaFacebook className="text-blue-600" size={24} />
                          </div>
                          <span className="text-xs text-gray-600">Facebook</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('telegram')}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className="p-3 rounded-full bg-sky-100 group-hover:bg-sky-200 transition-colors">
                            <FaTelegram className="text-sky-600" size={24} />
                          </div>
                          <span className="text-xs text-gray-600">Telegram</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('twitter')}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                            <FaTwitter className="text-blue-400" size={24} />
                          </div>
                          <span className="text-xs text-gray-600">Twitter</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                            <FaLinkedin className="text-blue-700" size={24} />
                          </div>
                          <span className="text-xs text-gray-600">LinkedIn</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            const shareUrl = `https://shwetambarpalliwalmahasangh.in/magazine/${id}`;
                            const text = `॥ जैन सन्देश पत्रिका -  ${magazine.title}\n\nपढ़ें: `;
                            navigator.clipboard.writeText(`${text} ${shareUrl}`);
                            alert('लिंक कॉपी हो गया है!');
                          }}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className="p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">कॉपी करें</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Ornamental Design */}
          <div className="h-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-amber-200 rounded-full opacity-20 blur-3xl" />
      </div>
    </div>
  );
} 