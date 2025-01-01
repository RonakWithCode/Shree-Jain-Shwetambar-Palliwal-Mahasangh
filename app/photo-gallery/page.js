"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PhotoGalleryService } from '@/lib/photo-gallery-service';
import { FaSpinner, FaCamera, FaImage, FaRegImages } from 'react-icons/fa';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function PhotoGallery() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchImages(selectedCategory.$id);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const fetchedCategories = await PhotoGalleryService.getCategories();
    setCategories(fetchedCategories);
    if (fetchedCategories.length > 0) {
      setSelectedCategory(fetchedCategories[0]);
    }
    setLoading(false);
  };

  const fetchImages = async (categoryId) => {
    setLoading(true);
    const fetchedImages = await PhotoGalleryService.getImagesByCategory(categoryId);
    setImages(fetchedImages);
    setLoading(false);
  };

  // Handle image click for lightbox
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  if (loading && categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <FaCamera className="w-12 h-12 text-orange-500 animate-bounce" />
        <FaSpinner className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-0 left-0 w-full h-full opacity-5"
        >
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange-400 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-200 rounded-full blur-3xl" />
        </motion.div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.1 }}
              animate={{
                y: [-20, 20],
                x: [-10, 10],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.5,
              }}
              className="absolute"
              style={{
                left: `${15 + i * 20}%`,
                top: `${10 + i * 15}%`,
              }}
            >
              <FaRegImages className="text-orange-200 w-8 h-8 transform rotate-12" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Enhanced Page Title */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FaCamera className="w-12 h-12 text-orange-300" />
            </motion.div>
          </div>
          <h1 className="text-5xl font-bold mb-3 font-hindi bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 
            text-transparent bg-clip-text relative pt-10">
            फोटो गैलरी
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-600 to-orange-400 mx-auto rounded-full" />
          <motion.div 
            className="w-24 h-1 bg-orange-300 mx-auto rounded-full mt-1"
            animate={{ scaleX: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Enhanced Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 mb-12 relative"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.$id}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 font-hindi
                shadow-md hover:shadow-lg border-2 relative overflow-hidden
                ${selectedCategory?.$id === category.$id 
                  ? 'bg-orange-500 text-white border-orange-500' 
                  : 'bg-white hover:bg-orange-50 text-gray-700 border-orange-200'
                }`}
            >
              <span className="relative z-10">{category.name}</span>
              {selectedCategory?.$id === category.$id && (
                <motion.div
                  layoutId="categoryHighlight"
                  className="absolute inset-0 bg-orange-500"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Image Count */}
        {!loading && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8 text-gray-500"
          >
            <FaImage className="inline-block mr-2 mb-1" />
            <span>{images.length} छवियां</span>
          </motion.div>
        )}

        {/* Enhanced Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {images.map((image, index) => (
              <motion.div
                key={image.$id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                }}
                className="relative aspect-square overflow-hidden rounded-xl shadow-lg 
                  cursor-pointer group bg-white p-2"
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={PhotoGalleryService.getImageUrl(image.fileId)}
                  alt={image.fileName}
                  fill
                  className="object-cover rounded-lg transition-transform duration-500 
                    group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 
                    (max-width: 1024px) 33vw, 25vw"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Images Message */}
        {!loading && images.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center my-16"
          >
            <FaCamera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-hindi text-lg">
              इस श्रेणी में कोई छवि नहीं मिली
            </p>
          </motion.div>
        )}

        {/* Image Lightbox */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center 
              justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={PhotoGalleryService.getImageUrl(selectedImage.fileId)}
                alt={selectedImage.fileName}
                width={1200}
                height={800}
                className="object-contain w-full h-full rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 
                  rounded-full p-2 hover:bg-opacity-75 transition-all"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
