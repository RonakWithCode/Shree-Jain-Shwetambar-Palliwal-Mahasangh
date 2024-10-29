const LayeredWave = ({ className = "", baseColor = "#FFE169" }) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg className="w-full" viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M0,96 C320,32 480,96 720,96 C960,96 1120,32 1440,96 V150 H0 V96Z" 
          fill={baseColor} 
          fillOpacity="0.3"
        />
        <path 
          d="M0,64 C160,96 400,32 720,64 C1040,96 1280,32 1440,64 V150 H0 V64Z" 
          fill={baseColor} 
          fillOpacity="0.5"
        />
        <path 
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 V150 H0 V32Z" 
          fill={baseColor}
        />
      </svg>
    </div>
  );
};

export default LayeredWave;

