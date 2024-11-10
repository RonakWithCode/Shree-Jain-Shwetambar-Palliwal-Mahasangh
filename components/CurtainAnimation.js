"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const CurtainAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof  window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !hasInteracted) {
        startAnimation();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [hasInteracted]);

  const startAnimation = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setIsVisible(false);
        localStorage.setItem('hasSeenAnimation', 'true');
        onComplete?.();
      }, 4000);
    }
  };

  const leftCurtainVariants = {
    initial: {
      x: 0,
      skewX: 0,
      rotateY: 0,
      opacity: 1,
    },
    animate: {
      x: '-100%',
      skewX: -8,
      rotateY: 40,
      opacity: 0.7,
      transition: {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 2, delay: 0.3 }
      }
    }
  };

  const rightCurtainVariants = {
    initial: {
      x: 0,
      skewX: 0,
      rotateY: 0,
      opacity: 1,
    },
    animate: {
      x: '100%',
      skewX: 8,
      rotateY: -40,
      opacity: 0.7,
      transition: {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 2, delay: 0.3 }
      }
    }
  };

  const decorativePatternVariants = {
    initial: { scaleY: 1, opacity: 0.3 },
    animate: { scaleY: 0, opacity: 0 }
  };

  if (!isMounted) return null;
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden cursor-pointer perspective-[2000px] bg-transparent"
      onClick={startAnimation}
    >
      {/* Background with Om Symbol - make it semi-transparent */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/90 to-gray-900/90"
        initial={{ opacity: 1 }}
        animate={hasInteracted ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          initial={{ opacity: 0.1, scale: 1, rotate: 0 }}
          animate={hasInteracted ? { 
            opacity: 0,
            scale: 2,
            rotate: 360
          } : { 
            opacity: 0.1,
            scale: 1,
            rotate: 0
          }}
          transition={{ duration: 2.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-[20rem] text-white opacity-20">ॐ</span>
        </motion.div>
      </motion.div>

      {/* Confetti with better colors */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          colors={['#FFD700', '#FFA500', '#FF6B6B', '#4CAF50', '#FF4081']}
          numberOfPieces={300}
          gravity={0.25}
          recycle={false}
          tweenDuration={4000}
        />
      )}

      {/* Left Curtain */}
      <motion.div
        variants={leftCurtainVariants}
        initial="initial"
        animate={hasInteracted ? "animate" : "initial"}
        className="absolute left-0 top-0 w-1/2 h-full transform-gpu origin-left"
        style={{
          background: `linear-gradient(90deg, 
            rgba(139,0,0,0.95) 0%,
            rgba(165,42,42,0.95) 100%)`,
          boxShadow: '2px 0 15px rgba(0,0,0,0.7)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Enhanced Curtain Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-pattern opacity-10" />
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              variants={decorativePatternVariants}
              initial="initial"
              animate={hasInteracted ? "animate" : "initial"}
              transition={{ duration: 2, delay: i * 0.05 }}
              className="absolute w-full h-2"
              style={{
                top: `${i * 4}%`,
                background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent)',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)'
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Right Curtain - Mirror of Left */}
      <motion.div
        variants={rightCurtainVariants}
        initial="initial"
        animate={hasInteracted ? "animate" : "initial"}
        className="absolute right-0 top-0 w-1/2 h-full transform-gpu origin-right"
        style={{
          background: `linear-gradient(270deg, 
            rgba(139,0,0,0.95) 0%,
            rgba(165,42,42,0.95) 100%)`,
          boxShadow: '-2px 0 15px rgba(0,0,0,0.7)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Mirror of Left Curtain Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-pattern opacity-10" />
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              variants={decorativePatternVariants}
              initial="initial"
              animate={hasInteracted ? "animate" : "initial"}
              transition={{ duration: 2, delay: i * 0.05 }}
              className="absolute w-full h-2"
              style={{
                top: `${i * 4}%`,
                background: 'linear-gradient(270deg, transparent, rgba(255, 215, 0, 0.3), transparent)',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)'
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced Center Content */}
      <motion.div
        initial={{ opacity: 1, scale: 1, y: 0 }}
        animate={hasInteracted ? { 
          opacity: 0,
          scale: 1.5,
          y: -50
        } : { 
          opacity: 1,
          scale: 1,
          y: 0
        }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center px-4 select-none"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white mb-6 font-hindi drop-shadow-lg"
          style={{
            textShadow: '0 0 20px rgba(255,215,0,0.5)'
          }}
        >
          श्री जैन श्वेतांबर पल्लीवाल महासंघ
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-white font-hindi mt-8"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {isMobile ? 'आगे बढ़ने के लिए टच करें' : 'आगे बढ़ने के लिए Enter दबाएं'}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default CurtainAnimation;
