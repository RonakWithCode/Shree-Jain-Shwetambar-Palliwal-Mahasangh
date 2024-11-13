'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { appwriteService } from '@/services/contact-service';

// Dynamically import MapContainer to avoid SSR issues
const MapWithNoSSR = dynamic(
  () => import('@/components/Map'),
  { ssr: false }
);

const LOCATION = {
  lat: 27.5530,
  lng: 76.6346,
  address: "श्री दिगम्बर जैन मंदिर, जयपुर",
  phone: "+91 9413304075",
  email: "palliwalmahasangh@gmail.com"
}; 

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      // console.log(data);
      
      await appwriteService.submitContactForm(data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setError('कुछ गलत हो गया। कृपया पुनः प्रयास करें।');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 py-16"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 font-hindi">
            हमसे संपर्क करें
          </h1>
          <p className="text-white text-center max-w-2xl mx-auto font-hindi">
            आपके विचारों और प्रश्नों का स्वागत है। कृपया नीचे दिए गए फॉर्म का उपयोग करें या सीधे हमसे संपर्क करें।
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold mb-6 font-hindi">संदेश भेजें</h2>
            
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg font-hindi"
              >
                आपका संदेश सफलतापूर्वक भेज दिया गया है।
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-hindi">नाम</label>
                <input
                  {...register("name", { required: "नाम आवश्यक है" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
                {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-hindi">ईमेल</label>
                <input
                  {...register("email", { 
                    required: "ईमेल आवश्यक है",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "अमान्य ईमेल पता"
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-hindi">फ़ोन नंबर</label>
                <input
                  {...register("phone", { 
                    required: "फ़ोन नंबर आवश्यक है",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "अमान्य फ़ोन नंबर"
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
                {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-hindi">संदेश</label>
                <textarea
                  {...register("message", { 
                    required: "संदेश आवश्यक है",
                    minLength: {
                      value: 10,
                      message: "संदेश कम से कम 10 अक्षरों का होना आवश्यक है"
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  rows="4"
                ></textarea>
                {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'भेज रहा है...' : 'संदेश भेजें'}
              </motion.button>
            </form>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg font-hindi"
              >
                {error}
              </motion.div>
            )}
          </motion.div>

          {/* Contact Information and Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Contact Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6 font-hindi">संपर्क जानकारी</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">फ़ोन</h3>
                    <p className="text-gray-600">+91 9413304075</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.992L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">ईमेल</h3>
                    <p className="text-gray-600">palliwalmahasangh@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">एड्रेस</h3>
                    <p className="text-gray-600">जैन श्वेताम्बर उपाश्रय केशवपुरा, हिण्डौन सिटी करौली</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            {/* <div className="bg-white rounded-xl shadow-lg p-8 h-[400px] hover:shadow-xl transition-shadow duration-300">
              <MapWithNoSSR location={LOCATION} />
            </div> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
