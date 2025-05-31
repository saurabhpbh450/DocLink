// frontend\src\components\Footer.jsx
import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-[#121212] text-[#9E9E9E] py-8 px-4 md:px-8">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Brand & Social */}
      <div>
        <Link to="/" className="flex items-center mb-2">
          <img src={assets.logo} alt="DocLink Logo" className="h-8" />
          <span className="ml-2 text-xl font-bold text-[#D4AF37]">DocLink</span>
        </Link>
        <p className="text-sm leading-relaxed mb-4">
          Simplifying healthcare connections—book expert care with ease and confidence.
        </p>
        <div className="flex space-x-4 text-lg">
          <Link to="https://www.facebook.com/profile.php?id=100049159752579" aria-label="Facebook" className="hover:text-[#D4AF37]">🌐</Link>
          <Link to="https://www.instagram.com/saurabhmishra1077/" aria-label="Instagram" className="hover:text-[#D4AF37]">📷</Link>
        </div>
      </div>

      {/* Links & Contact */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-[#D4AF37]">Home</Link></li>
            <li><Link to="/doctors" className="hover:text-[#D4AF37]">Doctors</Link></li>
            <li><Link to="/about" className="hover:text-[#D4AF37]">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37]">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-2">Contact</h4>
          <ul className="space-y-1 text-sm">
            <li>📞 <Link to="tel:+12124567890" className="hover:text-[#D4AF37]">+91 9506033170</Link></li>
            <li>📧 <Link to="mailto:saurabh.mishrabtechcs21@smslucknow.ac.in" className="hover:text-[#D4AF37]">saurabh.mishrabtechcs21@smslucknow.ac.in</Link></li>
            <li>🏢 Department of Computer Science &amp; Engineering,
            School of Management Sciences, Lucknow, Uttar Pradesh, India UP-226501</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="max-w-6xl mx-auto mt-8 border-t border-[#2A2A2A] pt-4 text-center text-xs">
      <p>© 2025 DocLink. All rights reserved.</p>
      <p className="mt-1">Designed & Developed by <span className="text-[#D4AF37] font-semibold">Saurabh Mishra & Team</span></p>
    </div>
  </footer>
);

export default Footer;