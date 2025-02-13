import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const navItems = [
    { name: 'Home', link: '#utama' },
    { name: 'Tentang', link: '#awal' },
    { name: 'Pengelola', link: '#guru' },
    { name: 'Layanan', link: '#tawaran' },
    { name: 'Tutorial', link: './tutorial' },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`bg-bgnavbar fixed w-full max-w-full top-0 left-0 z-50 shadow-md transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-semibold text-black hover:text-gray-800 transition-colors">
              SMANTEN
            </span>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-black hover:text-yellow-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="https://www.sman10bekasi.sch.id/" 
              target="_blank"
              className="bg-bgbtn2 text-white hover:bg-bgbtn px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Tinjau Sekolah
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:bg-gray-200 transition-colors duration-200"
              aria-expanded={isOpen}
            >
              <Menu className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-bgnavbar border-t border-gray-200">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-bgnavbarhover hover:text-white transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
