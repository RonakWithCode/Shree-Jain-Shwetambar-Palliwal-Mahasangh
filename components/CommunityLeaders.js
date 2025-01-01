import Image from 'next/image';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

// Moved leaders data outside component to prevent re-creation on each render
const leaders = [
    {
        id: 1,
        name: 'श्री राजेन्द्र कुमार जैन',
        position: 'अध्यक्ष',
        location: 'सूर्यनगर',
        image: '/images/leaders/Rajendra-Kumar-Jain.jpeg'
    },
    {
        id: 2,
        name: 'श्री मनोज कुमार जैन',
        position: 'महामंत्री',
        location: 'बड़ौदाकान',
        image: '/images/leaders/Manoj-Kumar-Jain.jpeg'
    },
    {
        id: 3,
        name: 'श्री विपिन कुमार जैन',
        position: 'कोषाध्यक्ष',
        location: 'करौली',
        image: '/images/leaders/Vipin-Kumar-Jain.jpeg'
    },
];

// Extracted background pattern style to prevent re-computation
const backgroundPattern = {
    backgroundImage: `
        linear-gradient(30deg, transparent 49.5%, #DAA520 49.5%, #DAA520 50.5%, transparent 50.5%),
        linear-gradient(150deg, transparent 49.5%, #DAA520 49.5%, #DAA520 50.5%, transparent 50.5%)
    `,
    backgroundSize: '30px 30px'
};

// Extracted reusable components
const DecorativeLine = () => (
    <div className="w-12 sm:w-16 h-px bg-amber-600" />
);

const LeaderCard = ({ leader }) => (
    <div className="flex flex-col items-center group w-full max-w-sm">
        <div className="relative w-full max-w-[400px] aspect-square mb-4 sm:mb-6">
            {/* Decorative Frame */}
            <div className="absolute inset-0 bg-amber-100 rounded-lg transform rotate-3 transition-transform group-hover:rotate-6" />
            <div className="absolute inset-0 bg-amber-50 rounded-lg -rotate-3 transition-transform group-hover:-rotate-6" />

            {/* Main Image Container */}
            <div className="relative w-full h-full bg-white rounded-lg shadow-xl overflow-hidden">
                <Image
                    src={leader.image}
                    alt={leader.name}
                    width={400}
                    height={400}
                    className="object-contain object-center w-full h-full transform transition-all duration-300 group-hover:scale-110"
                    priority={leader.id <= 2} // Prioritize loading for first two images
                    loading={leader.id <= 2 ? "eager" : "lazy"} // Lazy load non-priority images
                    quality={85} // Slightly reduced quality for better performance
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Decorative Corners */}
            <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-amber-600" />
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-amber-600" />
            <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-amber-600" />
            <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-amber-600" />
        </div>

        {/* Text Content */}
        <div className="text-center">
            <h3 className="text-lg font-bold text-amber-800 mb-1">
                {leader.name}
            </h3>
            <p className="text-sm text-amber-700 font-medium">
                {leader.location}
            </p>
            <p className="text-sm bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shadow-sm mb-1">
                {leader.position}
            </p>
        </div>
    </div>
);

export default function CommunityLeaders() {
    return (
        <section id="CommunityLeaders">
            <div className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-amber-50">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={backgroundPattern} />
                </div>

                {/* Large Jain Symbol Background */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
                    <Image 
                        src="/images/jainlogo/Jainism.svg" 
                        alt="Jain Symbol" 
                        width={300} 
                        height={300}
                        aria-hidden="true"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    {/* Section Header */}
                    <div className="text-center mb-8 sm:mb-12 md:mb-16">
                        <div className="flex justify-center items-center mb-4">
                            <DecorativeLine />
                            <Image 
                                src="/images/jainlogo/Jainism.svg" 
                                alt="Jain Symbol" 
                                width={50} 
                                height={50}
                                className="mx-3 sm:mx-4"
                            />
                            <DecorativeLine />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-4">
                            वर्तमान कार्यकारिणी पदाधिकारी
                        </h2>
                        <div className="flex justify-center items-center gap-2">
                            <FaQuoteLeft className="text-amber-600 text-sm sm:text-base" />
                            <p className="text-base sm:text-lg text-gray-600">
                                श्वेताम्बर पल्लीवाल महासंघ
                            </p>
                            <FaQuoteRight className="text-amber-600 text-sm sm:text-base" />
                        </div>
                    </div>

                    {/* Leaders Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-items-center">
                        {leaders.map((leader) => (
                            <LeaderCard key={leader.id} leader={leader} />
                        ))}
                    </div>

                    {/* Decorative Bottom Element */}
                    <div className="flex justify-center items-center mt-8 sm:mt-12 md:mt-16">
                        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
                        <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-2" />
                        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}


