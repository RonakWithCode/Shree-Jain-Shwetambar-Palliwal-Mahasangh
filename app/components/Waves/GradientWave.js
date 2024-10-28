const GradientWave = ({ className = "", colors = ["#f8d100", "#ffd700"], rotate = false }) => {
  return (
    <div className={`w-full overflow-hidden relative ${rotate ? 'rotate-180' : ''} ${className}`}
         style={{ marginTop: rotate ? '-1px' : '0' }}
    >
      <svg 
        className="w-full block" 
        viewBox="0 0 1440 140" 
        fill="none" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'translateZ(0)' }} // Forces GPU acceleration
      >
        <defs>
          <linearGradient 
            id={`waveGradient-${rotate ? 'rotated' : 'normal'}`} 
            x1="0%" 
            y1="0%" 
            x2="100%" 
            y2="0%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" style={{ stopColor: colors[0], stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: colors[1], stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: colors[0], stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
        <path 
          d="M0,40 C150,80 350,0 500,40 C650,80 850,0 1000,40 C1150,80 1350,0 1440,40 V140 H0 V40Z"
          fill={`url(#waveGradient-${rotate ? 'rotated' : 'normal'})`}
          style={{ willChange: 'transform' }}
        />
      </svg>
    </div>
  );
};

export default GradientWave;
