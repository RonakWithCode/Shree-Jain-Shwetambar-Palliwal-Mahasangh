"use client";
import { useState, useEffect } from 'react';
import { applicationFormService } from '@/services/applicationFormService';
import { toast } from 'react-hot-toast';

export default function ApplicationForms() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const data = await applicationFormService.getActiveForms();
      setForms(data);
    } catch (error) {
      toast.error('Failed to load application forms');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative Wave Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-transparent to-blue-50/30">
          <svg className="absolute bottom-0 w-full h-48 animate-wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="rgba(96, 165, 250, 0.1)" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg className="absolute bottom-0 w-full h-48 animate-wave-slow" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="rgba(147, 197, 253, 0.1)" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header with Gradient */}
          <div className="text-center mb-16">
            <h1 className="pt-10 text-5xl sm:text-6xl font-bold mb-6 font-hindi 
              bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
              animate-fade-in-down">
              आवेदन प्रपत्र
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4 animate-fade-in-up">
              नीचे दिए गए आवेदन प्रपत्र डाउनलोड करें। कृपया जमा करने से पहले सभी आवश्यक जानकारी भरें।
            </p>
          </div>

          {forms.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-gray-500 text-lg">इस समय कोई आवेदन पत्र उपलब्ध नहीं है।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {forms.map((form, index) => (
                <div
                  key={form.$id}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl 
                    transform hover:-translate-y-1 transition-all duration-300 
                    animate-fade-in border border-blue-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {form.title}
                        </h3>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(form.uploadedAt).toLocaleDateString('hi-IN')}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            {form.mimeType.split('/')[1].toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <a
                        href={form.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center justify-center 
                          p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200
                          border border-blue-100"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        पूर्वावलोकन
                      </a>
                      
                      <a
                        href={form.downloadUrl}
                        className="inline-flex items-center justify-center w-full px-6 py-3 
                          text-base font-medium rounded-lg text-white
                          bg-gradient-to-r from-blue-600 to-purple-600 
                          hover:from-blue-700 hover:to-purple-700
                          transform hover:scale-[1.02] transition-all duration-200 
                          shadow-md hover:shadow-lg"
                        download={form.fileName}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        फॉर्म डाउनलोड करें
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
