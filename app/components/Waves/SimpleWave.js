const SimpleWave = ({ className = "", fill = "#FFE169" }) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg className="w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M0,60 C240,150 480,0 720,60 C960,120 1200,0 1440,60 V120 H0 V60Z" 
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default SimpleWave;

