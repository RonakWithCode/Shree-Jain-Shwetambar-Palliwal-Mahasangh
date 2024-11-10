"use client";
import { useState, useEffect } from 'react';
import { applicationFormService, CATEGORY_LABELS } from '@/services/applicationFormService';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ApplicationForms() {
  const [categorizedForms, setCategorizedForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const data = await applicationFormService.getActiveForms();
      setCategorizedForms(data);
    } catch (error) {
      toast.error('Failed to load application forms');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
      {/* Header Section */}
      <div className="relative py-16 md:py-20">
        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-100 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-red-100 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-hindi">
              आवेदन प्रपत्र
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              जैन समाज के विभिन्न आवेदन पत्र। कृपया आवश्यक जानकारी के साथ भरें।
            </p>
          </motion.div>
        </div>
      </div>

      {/* Forms Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {categorizedForms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">इस समय कोई आवेदन पत्र उपलब्ध नहीं है।</p>
          </div>
        ) : (
          <div className="space-y-12">
            {categorizedForms.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div className="h-8 w-1.5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-900 font-hindi">
                    {category.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.forms.map((form, index) => (
                    <motion.div
                      key={form.$id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 font-hindi">
                        {form.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-6">
                        {new Date(form.uploadedAt).toLocaleDateString('hi-IN')}
                      </p>

                      <div className="space-y-3">
                        <a
                          href={form.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full px-4 py-2 
                            text-orange-600 bg-orange-50 hover:bg-orange-100 
                            rounded-lg transition-colors duration-200"
                        >
                          पूर्वावलोकन
                        </a>

                        <a
                          href={form.downloadUrl}
                          download={form.fileName}
                          className="flex items-center justify-center w-full px-4 py-2
                            text-white bg-gradient-to-r from-orange-500 to-red-500
                            hover:from-orange-600 hover:to-red-600
                            rounded-lg transition-colors duration-200"
                        >
                          फॉर्म डाउनलोड करें
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
