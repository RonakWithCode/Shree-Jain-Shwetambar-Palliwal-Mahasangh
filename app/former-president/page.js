"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const leadershipData = [
    {
        id: "01",
        period: "16 मई 1993 से 10 जून 1995",
        president: {
            name: "बाबू लाल जैन",
            location: "दिवर्या, हिण्डौन"
        },
        secretary: {
            name: "महेन्द्र कुमार जैन",
            location: "(भायलापुरा) हिण्डौन"
        },
        treasurer: {
            name: "पदम चंद जैन",
            location: "(सेहरा-सुनारी) हिण्डौन"
        },
        // note: "तदर्थ समिति"
    },
    {
        id: "02",
        period: "11 जून 1995 से 13 दिसम्बर 1997",
        president: {
            name: "मनोहर लाल जैन",
            location: "(अलीपुर) अलवर"
        },
        secretary: {
            name: "मगन लाल जैन",
            location: "दिवर्या, हिण्डौन"
        },
        treasurer: {
            name: "प्रदीप कुमार जैन",
            location: "दिवर्या, हिण्डौन"
        }
    },
    {
        id: "03",
        period: "14 दिसम्बर 1997 से 25 दिसम्बर 1999",
        president: {
            name: "मनोहर लाल जैन",
            location: "(अलीपुर) अलवर"
        },
        secretary: {
            name: "गोपाल लाल जैन",
            location: "(क्यारदा) नई मंड़ी, हिण्डौन"
        },
        treasurer: {
            name: "प्रदीप कुमार जैन",
            location: "दिवर्या, हिण्डौन"
        }
    },
    {
        id: "04",
        period: "26 दिसम्बर 1999 से 06 जुलाई 2002",
        president: {
            name: "प्रेमचंद जैन",
            location: "(परबेणी) अलवर"
        },
        secretary: {
            name: "महेन्द्र कुमार जैन",
            location: "(भावलापुरा) हिण्डौन"
        },
        treasurer: {
            name: "प्रदीप कुमार जैन",
            location: "दिवरला, हिण्डौन"
        }
    },
    {
        id: "05",
        period: "07 जुलाई 2002 से 4 जून 2005",
        president: {
            name: "सुमेरचंद जैन ",
            location: "भरतपुर"
        },
        secretary: {
            name: "महेन्द्र कुमार जैन",
            location: "(भायलापुरा) हिण्डौन"
        },
        treasurer: {
            name: "पदम चंद जैन",
            location: "(संहरा-सुनारी) हिण्डोन"
        }
    },
    {
        id: "06",
        period: "5 जून 2005 से 7 मार्च 2009",
        president: {
            name: "महावीर प्रसाद जैन",
            location: "(लेखाधिकारी) हिण्डौन"
        },
        secretary: {
            name: "डॉ. विमल चंद जैन",
            location: "(क्यारदा) हिण्डौन"
        },
        treasurer: {
            name: "रोशन लाल जैन",
            location: "खेरली"
        }
    },
    {
        id: "07",
        period: "8 मार्च 2009 से 23 मई 2009",
        president: {
            name: "तारा चंद जैन",
            location: "बयाना (कार्यवाहक)"
        },
        secretary: {
            name: "नरेश कुमार जैन",
            location: "(इन्द्रेनी) मंडावर (कार्यवाहक)"
        },
        treasurer: {
            name: "रोशन लाल जैन",
            location: "खेरली"
        }
    },
    {
        id: "08",
        period: "24 मई 2009 से 29 सितम्बर 2012",
        president: {
            name: "तारा चंद जैन",
            location: "बयाना"
        },
        secretary: {
            name: "विरेन्द्र कुमार जैन",
            location: "कर्मयोगी, बरगमां"
        },
        treasurer: {
            name: "रोशन लाल जैन",
            location: "खेरली"
        }
    },
    {
        id: "09",
        period: "30 सितम्बर 2012 से 8 नवम्बर 2014",
        president: {
            name: "गुलाब चंद जैन",
            location: "(ढहरा) भरतपुर"
        },
        secretary: {
            name: "मोहन लाल जैन",
            location: "खेरली"
        },
        treasurer: {
            name: "अशोक कुमार जैन",
            location: "(घाट) हिण्डौन"
        }
    },
    {
        id: "10",
        period: "9 नवम्बर 2014 से 24 जून 2017",
        president: {
            name: "पदम चंद जैन",
            location: "(घाट) हिण्डौन"
        },
        secretary: [
            {
                name: "1. डॉ. मनोज जैन",
                location: "(तालविडी) हिण्डौन",
                duration: "16 जनवरी 2016 तक"
            },
            {
                name: "अशोक कुमार जैन",
                location: "(रसीदपुर) महवा",
                duration: "(17 जनवरी 2016 से)"
            }
        ],
        treasurer: {
            name: "अशोक कुमार जैन",
            location: "(घाट) हिण्डौन"
        }
    },
    {
        id: "11",
        period: "25 जून 2017 से 22 फरवरी 2020",
        president: {
            name: "पदम चंद जैन",
            location: "(घाट) हिण्डौन"
        },
        secretary: {
            name: "अशोक कुमार जैन",
            location: "(रसीदपुर) महवा"
        },
        treasurer: {
            name: "पार्श्वमल जैन",
            location: "(शेरपुर) हिण्डौन"
        }
    },
    {
        id: "12",
        period: "23 फरवरी 2020 से 25 फरवरी 2023",
        president: {
            name: "राजेन्द्र कुमार जैन",
            location: "(नंगलामई) अलवर"
        },
        secretary: {
            name: "मनोज कुमार जैन",
            location: "(बड़ौदाकान) अलवर"
        },
        treasurer: {
            name: "विपिन जैन",
            location: "(करौली) हिण्डौन"
        }
    },
    {
        id: "13",
        period: "26 फरवरी 2023 से लगातार",
        president: {
            name: "राजेन्द्र कुमार जैन",
            location: "(नंगलामई) अलवर"
        },
        secretary: {
            name: "मनोज कुमार जैन",
            location: "(बड़ौदाकान) अलवर"
        },
        treasurer: {
            name: "विपिन जैन",
            location: "(करौली) हिण्डौन"
        }
    }
];

const PresidentCard = ({ data, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl 
            transition-all duration-300 border border-orange-100
            transform hover:-translate-y-1 relative
            overflow-hidden"
    >
        {/* Badge */}
        <div className="absolute top-4 right-4 z-10 bg-orange-500/90 text-white 
            rounded-full px-3 py-1 text-sm backdrop-blur-sm">
            {data.id}
        </div>

        {/* Time Period Display (Replacing Image) */}
        <div className="relative bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 
            p-6 text-center border-b border-orange-200">
            <div className="space-y-3">
                <h4 className="text-lg font-semibold text-orange-800 font-hindi">
                    कार्यकाल
                </h4>
                <div className="flex items-center justify-center space-x-2">
                    <div className="h-px w-12 bg-orange-300"></div>
                    <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                    <div className="h-px w-12 bg-orange-300"></div>
                </div>
                <p className="text-xl font-bold text-gray-800 font-hindi">
                    {data.period}
                </p>
                {data.note && (
                    <span className="inline-block mt-2 px-3 py-1 bg-orange-100 
                        text-orange-700 rounded-full text-sm font-hindi">
                        {data.note}
                    </span>
                )}
            </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
            <div>
                <h3 className="text-xl font-bold text-gray-800 leading-normal
                    font-hindi tracking-wide">
                    {data.president.name}
                </h3>
                <p className="text-orange-600 font-hindi leading-relaxed tracking-wide">
                    {data.president.location}
                </p>
            </div>

            <div className="space-y-3">
                <div className="space-y-2">
                    <span className="font-semibold font-hindi tracking-wide block">महामंत्री:</span>
                    {Array.isArray(data.secretary) ? (
                        <ul className="space-y-1 pl-4">
                            {data.secretary.map((sec, idx) => (
                                <li key={idx} className="font-hindi text-gray-600 leading-relaxed tracking-wide">
                                    {sec.name} {sec.location}
                                    {sec.duration && (
                                        <span className="text-orange-500 ml-1">
                                            {sec.duration}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className="font-hindi text-gray-600 ml-2">
                            {data.secretary.name} {data.secretary.location}
                        </span>
                    )}
                </div>

                <div className="text-sm">
                    <span className="font-semibold font-hindi">कोषाध्यक्ष:</span>
                    <span className="font-hindi text-gray-600 ml-2">
                        {data.treasurer.name} {data.treasurer.location}
                    </span>
                </div>
            </div>
        </div>
    </motion.div>
);

const NoResults = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="col-span-full text-center py-12"
    >
        <p className="text-gray-500 font-hindi text-lg">
            कोई परिणाम नहीं मिला
        </p>
    </motion.div>
);

export default function FormerPresidents() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = leadershipData.filter(data => 
        data.president.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.president.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/50 to-white py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <motion.div 
                    className="text-center mb-12 space-y-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="pt-10 text-4xl sm:text-5xl font-bold font-hindi
                        bg-gradient-to-r from-orange-600 to-red-600 
                        bg-clip-text text-transparent leading-relaxed
                        px-4 sm:px-0">
                        पूर्व अध्यक्ष गण
                    </h1>
                    
                    {/* Search */}
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="खोजें..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-3 px-12 rounded-full border border-orange-200 
                                focus:ring-2 focus:ring-orange-500 focus:border-transparent
                                outline-none font-hindi shadow-sm"
                        />
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 
                            text-orange-400" />
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                    gap-6 lg:gap-8">
                    {filteredData.length > 0 ? (
                        filteredData.map((data, index) => (
                            <PresidentCard 
                                key={data.id} 
                                data={data} 
                                index={index}
                            />
                        ))
                    ) : (
                        <NoResults />
                    )}
                </div>
            </div>
        </div>
    );
}
