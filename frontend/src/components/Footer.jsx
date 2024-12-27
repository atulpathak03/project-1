import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { assets } from '../assets/assets_frontend/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <h1 className='font-extralight semi-bold text-2xl'>MediConnect</h1>
            <p className="mt-4 text-sm text-gray-400">
              Empowering innovation and sustainable solutions for a better future.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <a href="#" className="text-sm text-gray-400 hover:text-white">About Us</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white mt-2">Services</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white mt-2">Blog</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white mt-2">Contact</a>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-400">123 Innovation Drive</p>
            <p className="text-sm text-gray-400 mt-2">Greater Noida, UP 201310</p>
            <p className="text-sm text-gray-400 mt-2">info@example.com</p>
            <p className="text-sm text-gray-400 mt-2">+91 98765 43210</p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-12 border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">&copy; 2024 MediConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
