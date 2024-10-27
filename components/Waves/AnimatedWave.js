const AnimatedWave = ({ className = "", fill = "#f8d100" }) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="relative">
        <svg 
          className="w-full" 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            className="animate-wave-slow"
            d="M0,60 C240,150 480,0 720,60 C960,120 1200,0 1440,60 V120 H0 V60Z" 
            fill={fill} 
            fillOpacity="0.4"
          />
          <path 
            className="animate-wave"
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 V120 H0 V60Z" 
            fill={fill}
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedWave;
