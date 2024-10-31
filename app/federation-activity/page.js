import React from 'react';
import { FaHandHoldingHeart, FaRegNewspaper, FaAward, FaLandmark, FaDonate, FaUserGraduate, FaStethoscope, FaUsers } from 'react-icons/fa';

const FederationActivity = () => {
  const activities = [
    {
      title: 'विधवा पेंशन योजना',
      description: 'महासंघ द्वारा संचालित विधवा पेंशन योजना, समाज की विधवाओं को आर्थिक संबल प्रदान करती है ताकि वे सम्मानपूर्वक जीवन यापन कर सकें। हर माह 1000 रुपये की पेंशन राशि दी जाती है, जिससे विधवाओं को जीवन की आवश्यकताओं को पूरा करने में सहारा मिलता है। वर्तमान में लगभग 70 विधवाएँ इस योजना का लाभ उठा रही हैं, जिससे उनके जीवन में एक नई आशा का संचार हुआ है।',
      icon: <FaHandHoldingHeart />,
    },
    {
      title: 'स्वाबलम्बन हेतु ऋण योजना',
      description: 'महासंघ का उद्देश्य समाज के साधर्मिक भाई-बहनों को आत्मनिर्भर बनाना है। इस योजना के तहत 50,000 रुपये तक का ऋण बिना ब्याज के प्रदान किया जाता है, जिसे 6 माह बाद 2500 रुपये की 20 मासिक किश्तों में पुनर्भरण किया जा सकता है। इससे समाज के लोग छोटे व्यवसाय या रोजगार शुरू कर सकते हैं, जो आर्थिक स्थिरता को बढ़ावा देता है।',
      icon: <FaDonate />,
    },
    {
      title: 'असहाय साधर्मिक भाई-बहनों के लिए सहायता',
      description: 'महासंघ असहाय और जरूरतमंद साधर्मिक भाई-बहनों को हर माह 1000 रुपये की सहायता राशि प्रदान करता है ताकि उनकी बुनियादी आवश्यकताएं पूरी हो सकें। यह योजना समाज के उन सदस्यों के लिए है जो आर्थिक रूप से कमजोर हैं और आय का स्थिर स्रोत नहीं रखते। इससे उन्हें आत्मसम्मानपूर्वक जीवन जीने में मदद मिलती है।',
      icon: <FaUsers />,
    },
    {
      title: 'चिकित्सा और शैक्षणिक सहायता',
      description: 'महासंघ जरूरतमंद साधर्मिक भाई-बहनों को चिकित्सा एवं शैक्षणिक आवश्यकताओं के लिए भी सहायता प्रदान करता है। जब किसी साधर्मिक परिवार को इलाज या शिक्षा के लिए आर्थिक सहायता की जरूरत होती है, तब महासंघ उनकी मदद के लिए तत्पर रहता है। इससे समाज के सदस्यों को स्वास्थ्य और शिक्षा में सुधार का अवसर मिलता है।',
      icon: <FaStethoscope />,
    },
    {
      title: 'पल्लीवाल संदेश मासिक पत्रिका का प्रकाशन',
      description: 'महासंघ द्वारा प्रकाशित "पल्लीवाल संदेश" मासिक पत्रिका समाज की धार्मिक और सामाजिक गतिविधियों को बढ़ावा देने का कार्य करती है। इस पत्रिका में धार्मिक शिक्षाएँ, समाज की प्रगति और सांस्कृतिक सामग्री होती है, जो समाज को एकजुट करने में सहायक है। यह पत्रिका महासंघ की सक्रियता का परिचय कराती है और समाज में जागरूकता लाती है।',
      icon: <FaRegNewspaper />,
    },
    {
      title: 'पल्लीवाल शिरोमणि श्री जोधराज दीवान छात्रवृत्ति योजना',
      description: 'शिक्षा को बढ़ावा देने के उद्देश्य से, महासंघ 12वीं कक्षा में उत्कृष्ट प्रदर्शन करने वाले छात्रों को 12,000 रुपये की छात्रवृत्ति प्रदान करता है। इस सहायता से समाज के छात्रों को उच्च शिक्षा के अवसर मिलते हैं, विशेष रूप से वे जो आर्थिक रूप से कमजोर हैं। यह पहल युवाओं में शिक्षा के प्रति प्रेरणा को बढ़ावा देती है।',
      icon: <FaUserGraduate />,
    },
    {
      title: 'सिरस तीर्थ पर भूखण्ड क्रय एवं चारदीवारी निर्माण योजना',
      description: 'महासंघ द्वारा सिरस तीर्थ पर एक भूखंड का क्रय एवं चारदीवारी का निर्माण किया जा रहा है ताकि इस पवित्र स्थल को संरक्षित रखा जा सके। इस पहल से तीर्थ स्थल को सुव्यवस्थित और सुरक्षित रखने का प्रयास किया जा रहा है, ताकि तीर्थयात्री शांतिपूर्ण अनुभव कर सकें। यह समाज की धार्मिक प्रतिबद्धता का प्रतीक है।',
      icon: <FaLandmark />,
    },
    {
      title: 'समाज के युवाओं का डाटा कलेक्शन',
      description: 'महासंघ द्वारा समाज के उन युवाओं का डेटा संकलित किया जा रहा है जो उच्च पैकेज पर कार्यरत हैं। यह डेटा अन्य युवाओं के लिए मार्गदर्शन का स्रोत बनेगा और समाज में सकारात्मक सहयोग को बढ़ावा देगा। महासंघ का यह कदम युवाओं में सहयोग और प्रेरणा की भावना को मजबूत करता है।',
      icon: <FaAward />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-16 px-6 font-hindi">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-3 font-hindi bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 
            text-transparent bg-clip-text relative pt-10">
         महासंघ द्वारा संचालित गतिविधियाँ
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-600 to-orange-400 mx-auto rounded-full" />

          {/* <h1 className="text-4xl font-bold text-orange-500 mb-4"></h1> */}
          {/* <div className="w-24 h-1 bg-orange-500 mx-auto"></div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white text-jain-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center text-orange-500 text-4xl mb-4">
                {activity.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-3 text-center">{activity.title}</h2>
              <p className="text-base leading-relaxed text-gray-600">{activity.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-lg shadow-lg hover:shadow-2xl transform hover:scale-105"
          >
            अधिक जानकारी के लिए संपर्क करें
          </a>
        </div>
      </div>
    </div>
  );
};

export default FederationActivity;
