export default function ArthSahyog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-5"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 right-0">
          <svg className="w-full h-32 md:h-40 text-yellow-100/70" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-100 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-red-100 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 relative">
          {/* Page Title with Animation */}
          <div className="text-center mb-16 animate-fade-in-down">
            <h1 className="pt-10 text-4xl md:text-6xl font-bold font-hindi text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-6">
              अर्थ सहयोग
            </h1>
            <div className="flex items-center justify-center gap-3">
              <span className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-orange-300 to-red-300"></span>
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-400 animate-pulse"></span>
              <span className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-red-300 to-orange-300"></span>
            </div>
          </div>

          {/* Description with Animation */}
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <p className="text-gray-600 font-hindi text-lg md:text-xl leading-relaxed">
              यदि आप की ओर से राशि का सहयोग मिलता है तो आपको धन्यवाद। 
              <br className="hidden md:block" />
              हम आपके सहयोग का सदुपयोग करेंगे।
            </p>
          </div>

          {/* Donation Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* QR Code Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 animate-fade-in-up">
              <div className="h-2 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400"></div>
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-6 flex items-center gap-4 font-hindi">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-red-50 rounded-lg">
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                  QR कोड
                </h2>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl shadow-inner">
                  <img 
                    src="/images/qrcode.png" 
                    alt="QR Code for donation" 
                    className="w-full max-w-[250px] mx-auto hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-center text-gray-600 mt-6 font-hindi text-lg">
                  स्कैन करके दान करें
                </p>
              </div>
            </div>

            {/* Bank Details Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 animate-fade-in-up delay-200">
              <div className="h-2 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400"></div>
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-6 flex items-center gap-4 font-hindi">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-red-50 rounded-lg">
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  बैंक विवरण
                </h2>
                <div className="space-y-4 text-gray-600">
                  {[
                    { label: 'बैंक का नाम', value: 'PNB Bank' },
                    { label: 'खाता संख्या', value: '06252191091242' },
                    { label: 'IFSC कोड', value: 'PUNB0062510' },
                    { label: 'शाखा', value: 'HINDAUN CITY' }
                  ].map((detail, index) => (
                    <div key={index} 
                         className="flex justify-between items-center p-4 rounded-lg hover:bg-gradient-to-br from-orange-50 to-red-50 transition-colors">
                      <span className="font-hindi text-lg">{detail.label}:</span>
                      <span className="font-medium text-orange-900">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

