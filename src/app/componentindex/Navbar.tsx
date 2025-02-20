import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Tentang", link: "#awal" },
    { name: "Pengelola", link: "#guru" },
    { name: "Fasilitas", link: "#tawaran" },
    { name: "Tutorial", link: "./tutorial" },
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
    <nav
      className={`bg-bgphotoblue fixed w-full max-w-full top-0 left-0 z-50 shadow-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <a href="/">
              <span className="text-2xl font-semibold text-bgplatinum hover:text-gray-800 transition-colors">
                SMANTEN
              </span>
            </a>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-bgplatinum hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.sman10bekasi.sch.id/"
              target="_blank"
              className="bg-bgplatinum text-black hover:bg-black hover:text-bgplatinum px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Tinjau Sekolah
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-bgplatinum hover:bg-bgphotodark focus:outline-none focus:ring-2 focus:ring-bgplatinum transition-colors duration-200"
              aria-expanded={isOpen}
            >
              <Menu
                className={`h-6 w-6 transform transition-transform duration-300 ${
                  isOpen ? "rotate-90" : "rotate-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-4 bg-bgphotodark shadow-inner">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={`block px-4 py-5 rounded-lg text-bgplatinum hover:bg-bgplatinum hover:text-black backdrop-blur-sm text-  xl font-medium transition-all duration-200 border-b border-bgplatinum ${
                index === navItems.length - 1 ? "border-b-0" : ""
              }`}
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
