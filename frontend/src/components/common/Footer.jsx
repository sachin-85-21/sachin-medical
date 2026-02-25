import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              🏥 Sachin Medical
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Your trusted online pharmacy for quality medicines and healthcare products.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaMapMarkerAlt className="text-primary-500" />
              <span>Serving nationwide with care</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all"></span>
                  Medicines
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all"></span>
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all"></span>
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
              Get In Touch
            </h4>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a
                href="mailto:sachinsahni702@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors group"
              >
                <FaEnvelope className="text-primary-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm">
                  sachinsahni702@gmail.com
                </span>
              </a>

              <a
                href="tel:+918521184035"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors group"
              >
                <FaPhone className="text-primary-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm">
                  +91 85211 84035
                </span>
              </a>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-500 mb-3">
                Follow Us
              </p>

              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=100041381182007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110 transform"
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </a>

                <a
                  href="https://www.linkedin.com/in/sachin-kumar-1220a6255/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-500 flex items-center justify-center transition-all hover:scale-110 transform"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>

                <a
                  href="https://www.instagram.com/sachin__8521/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-pink-600 flex items-center justify-center transition-all hover:scale-110 transform"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Sachin Medical. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/terms" className="hover:text-primary-400 transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="hover:text-primary-400 transition-colors">
                Privacy
              </Link>
              <Link to="/cookies" className="hover:text-primary-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
