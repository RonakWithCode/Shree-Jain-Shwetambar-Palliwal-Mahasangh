import Link from 'next/link';

const footerLinks = [
  { href: '/about', label: 'हमारे बारे में', labelEn: 'About Us' },
  { href: '/contact', label: 'संपर्क करें', labelEn: 'Contact' },
  { href: '/privacy', label: 'गोपनीयता नीति', labelEn: 'Privacy Policy' },
  { href: '/terms', label: 'नियम और शर्तें', labelEn: 'Terms and Conditions' },
];

export default function Footer() {
  return (
    <footer className="bg-jain-black text-jain-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 font-hindi">जैन समुदाय</h3>
          <p className="font-hindi">हमारा समुदाय, हमारी विरासत</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 font-hindi">उपयोगी लिंक</h4>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-jain-yellow transition-colors">
                  <span className="font-hindi">{link.label}</span>
                  <span className="sr-only">({link.labelEn})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 font-hindi">संपर्क करें</h4>
          <address className="not-italic font-hindi">
            123 जैन मार्ग<br />
            नई दिल्ली, भारत 110001<br />
            फोन: +91 11 1234 5678<br />
            ईमेल: info@jainsamudaya.com
          </address>
        </div>
      </div>
      <div className="mt-8 text-center font-hindi">
        <p>&copy; {new Date().getFullYear()} जैन समुदाय। सर्वाधिकार सुरक्षित।</p>
      </div>
    </footer>
  );
}
