const InfoCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src="/logo-circle.png" 
          alt="Logo" 
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-hindi text-orange-500">बिहार जानकारी</h2>
          <p className="text-red-500">24-07-2024</p>
        </div>
      </div>
      <div className="font-hindi">
        <p>आदि गुण - 14 वाद्यवृत्त हेतु</p>
        <p>विवरण @स्थान - अनिशा भवन,आर.के. - आर.एस.याम कॉलोनी,</p>
        <p>छोटे पुलिया के पास, भीलवाड़ा, जिला-भीलवाड़ा, राज्य.</p>
      </div>
    </div>
  );
};

export default InfoCard;
