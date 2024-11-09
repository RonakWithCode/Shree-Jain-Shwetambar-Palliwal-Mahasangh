"use client";
import { useState, useEffect } from 'react';
import CurtainAnimation from './CurtainAnimation';

export default function AnimatedWrapper({ children }) {
  const [showContent, setShowContent] = useState(false);
  const [shouldShowCurtain, setShouldShowCurtain] = useState(true);

  useEffect(() => {
    const hasSeenAnimation = localStorage.getItem('hasSeenAnimation');
    if (hasSeenAnimation) {
      setShouldShowCurtain(false);
      setShowContent(true);
      document.body.style.overflow = 'auto';
    } else {
      // Prevent scrolling during animation
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAnimationComplete = () => {
    setShowContent(true);
    setShouldShowCurtain(false);
    // Enable scrolling after animation
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  return (
    <>
      <div className={`${showContent ? '' : 'opacity-30'}`}>
        {children}
      </div>
      {shouldShowCurtain && (
        <CurtainAnimation onComplete={handleAnimationComplete} />
      )}
    </>
  );
}
