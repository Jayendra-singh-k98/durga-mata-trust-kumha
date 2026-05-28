"use client";
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube} from 'lucide-react';
import { useRouter } from 'next/navigation';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  return (
    <footer id="footer-map" className="bg-linear-to-b from-gray-800 to-gray-900 text-white">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xl">🕉️</span>
              </div>
              <h3 className="text-lg font-bold">Maa Durga Charitable Trust</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Maa Durga Charitable Trust is a registered religious and social organization
              dedicated to spiritual upliftment, social service, and public welfare.
              The trust works under the guidance and blessings of Maa Durga for the
              benefit of society.
            </p>
            <p className="text-orange-400 text-sm italic">
              "सेवा परमो धर्मः"<br />
              Service is the highest dharma
            </p>
          </div>

          {/* Temple Timings & Social */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">Temple Timings</h3>
            <div className="space-y-2 text-sm text-gray-300 mb-6">
              <div className="flex justify-between">
                <span>Morning Aarti : </span>
                <span className="font-semibold">4:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Evening Aarti:</span>
                <span className="font-semibold">6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Temple Open:</span>
                <span className="font-semibold">3:45 AM - 8:00 PM</span>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-3 text-orange-400">Follow Us</h3>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/durgamatatample#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                <Facebook  className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/durgamatatample?igsh=MWJkMXRoY2UxMjNiNw==" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@durgamatamandirkumha?si=9CKZHyk4-SYuwvBI" className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>


          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div className="text-gray-300">
                  <p>Maa Durga Charitable Trust</p>
                  <p>Kumha, Jaipur – 321303</p>
                  <p>Rajasthan, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-400 shrink-0" />
                <div className="text-gray-300">
                  <p>+91 9413330548</p>
                  <p className="text-xs text-gray-400">Mon-Fri: 10 AM - 5 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-400 shrink-0" />
                <div className="text-gray-300">
                  <p>maadurgatrustkumha@gmail.com</p>
                </div>
              </div>
            </div>
          </div>


          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">
              Our Location
            </h3>

            <div className="w-full h-56 rounded-lg overflow-hidden border border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1304.4145093512118!2d77.46179263560633!3d27.154138813610714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973bb766d1272b9%3A0xa0e9e3d0ef996f6d!2sDurga%20Mata%20Mandir!5e0!3m2!1sen!2sin!4v1769359609162!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>


        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 py-6 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} Maa Durga Charitable Trust. All Rights Reserved.</p>
            <p className="text-xs mt-1">Registered under Rajasthan Public Trusts Act, 1959 (Act No. 42 of 1959) | Reg. No: 310 Jaipur 2025</p>
          </div>

          {/* Tax Exemption Info */}
          <div className="mt-4 pt-4 border-t border-gray-700 text-center">
            <p className="text-xs text-gray-500">
              Donations made to the trust may be eligible for tax exemption under applicable provisions of the Income Tax Act, subject to approval.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;