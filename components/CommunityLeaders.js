import Image from 'next/image';
import { FaOm, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const leaders = [
    {
        id: 1,
        name: 'श्री राजेन्द्र कुमार जैन',
        position: 'अध्यक्ष',
        image: '/images/leaders/narendra-godhi.jpg'
    },
    {
        id: 2,
        name: 'श्री मनोज कुमार जैन',
        position: 'महामंत्री',
        image: '/images/leaders/suresh-bachhawat.jpg'
    },
    {
        id: 3,
        name: 'श्री विपिन कुमार जैन',
        position: 'कोषाध्यक्ष',
        image: '/images/leaders/rajesh-bachhawat.jpg'
    },
];

export default function CommunityLeaders() {
    return (
        <div className="py-24 relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-amber-50">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(30deg, transparent 49.5%, #DAA520 49.5%, #DAA520 50.5%, transparent 50.5%),
                        linear-gradient(150deg, transparent 49.5%, #DAA520 49.5%, #DAA520 50.5%, transparent 50.5%)
                    `,
                    backgroundSize: '30px 30px'
                }} />
            </div>

            {/* Large Om Symbol Background */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
                <FaOm size={400} className="text-amber-800" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="flex justify-center items-center mb-4">
                        <div className="w-16 h-px bg-amber-600"></div>
                        <FaOm size={24} className="text-amber-600 mx-4" />
                        <div className="w-16 h-px bg-amber-600"></div>
                    </div>
                    <h2 className="text-4xl font-bold text-amber-800 mb-4">कार्यकारिणी समिति</h2>
                    <div className="flex justify-center items-center gap-2">
                        <FaQuoteLeft className="text-amber-600" />
                        <p className="text-lg text-gray-600">
                            श्वेताम्बर पल्लीवाल महासंघ जैन समाज सदस्य</p>
                        <FaQuoteRight className="text-amber-600" />
                    </div>
                </div>

                {/* Leaders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
                    {leaders.map((leader) => (
                        <div
                            key={leader.id}
                            className="flex flex-col items-center group"
                        >
                            {/* Image Container with enhanced decorative elements */}
                            <div className="relative w-64 h-64 mb-6">
                                {/* Decorative Frame */}
                                <div className="absolute inset-0 bg-amber-100 rounded-lg transform rotate-3 transition-transform group-hover:rotate-6"></div>
                                <div className="absolute inset-0 bg-amber-50 rounded-lg -rotate-3 transition-transform group-hover:-rotate-6"></div>

                                {/* Main Image Container */}
                                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                                    <Image
                                        src={leader.image}
                                        alt={leader.name}
                                        width={256}
                                        height={256}
                                        className="object-cover object-center transform transition-all duration-300 group-hover:scale-110"
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Decorative Corners */}
                                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-amber-600"></div>
                                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-amber-600"></div>
                                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-amber-600"></div>
                                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-amber-600"></div>
                            </div>

                            {/* Text Content with enhanced styling */}
                            <div className="text-center relative">
                                <h3 className="text-xl font-bold text-amber-800 mb-2 relative">
                                    {leader.name}
                                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </h3>
                                <div className="relative">
                                    <p className="text-sm bg-amber-50 px-6 py-2 rounded-full border border-amber-200 shadow-sm">
                                        {leader.position}
                                    </p>
                                    <div className="absolute -right-2 -top-2">
                                        <FaOm size={12} className="text-amber-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Decorative Bottom Element */}
                <div className="flex justify-center items-center mt-16">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-2"></div>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                </div>
            </div>
        </div>
    );
}
