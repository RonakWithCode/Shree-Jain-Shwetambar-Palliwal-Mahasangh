const ImportantLinks = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-orange-300 p-4 rounded-full">
          <img 
            src="/link-icon.svg" 
            alt="Links" 
            className="w-8 h-8"
          />
        </div>
        <h2 className="text-xl font-hindi text-red-500">महत्वपूर्ण लिंक</h2>
      </div>
      <ul className="space-y-2 font-hindi">
        <li>• सेंटर पोर्टल</li>
        <li>• साधुर्मार्ग प्रोफेशनल फोरम</li>
        <li>• श्री अम.आ.स. जैन सद्भावना युवा संघ</li>
        <li>• श्री अम.आ.स. जैन महिला समिति</li>
      </ul>
    </div>
  );
};

export default ImportantLinks;

