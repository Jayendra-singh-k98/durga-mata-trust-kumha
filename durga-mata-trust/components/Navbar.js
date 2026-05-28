"use client";
import React, { useState } from 'react';
import { Menu, X, Home, Info, Clock, Calendar, Image, Heart, Phone, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

// ==================== NAVBAR COMPONENT ====================
const Navbar = ({ currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const router = useRouter();

  const navigationLinks = [
    { id: '', label: 'Home', icon: Home },
    { 
      id: 'about', 
      label: 'About', 
      icon: Info,
      dropdown: [
        { id: 'about-temple', label: 'About Temple' },
        { id: 'about-trust', label: 'About Trust' },
        { id: 'trust-members', label: 'Trust Members' }
      ]
    },
    { id: 'pooja-timings', label: 'Pooja Timings', icon: Clock },
    { id: 'events', label: 'Events & Festivals', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: Image },
  ];

  const handleNavClick = (pageId) => {
    router.push(`/${pageId}`);
    setIsOpen(false);
    setAboutDropdown(false);
  };

  const handleClickOutside = (e) => {
  if (!dropdownRef.current.contains(e.target)) {
    setAboutDropdown(false);
  }
};


  return (
    <nav className="bg-linear-to-r from-orange-600 via-red-600 to-orange-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo and Temple Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('/')}>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🕉️</span>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold leading-tight">Maa Durga Charitable Trust</h1>
              <p className="text-xs opacity-90">Kumha, Jaipur</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div 
                    key={link.id}
                    className="relative group"
                    onMouseEnter={() => setAboutDropdown(true)}
                    onMouseLeave={() => setAboutDropdown(false)}
                  >
                    <button
                      className="text-white hover:bg-orange-500/30 hover:bg-opacity-20 px-4 py-2 rounded-lg transition-all font-semibold flex items-center gap-1"
                    >
                      <Info className="w-4 h-4" />
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {aboutDropdown && (
                      <div className="absolute top-full left-0 bg-white rounded-lg shadow-xl py-2 min-w-48 border-t-4 border-orange-500">
                        {link.dropdown.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors ${
                              currentPage === item.id ? 'bg-orange-100 text-orange-700 font-semibold' : 'text-gray-700'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const IconComponent = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
                    currentPage === link.id
                      ? 'bg-white text-orange-600'
                      : 'text-white hover:bg-orange-500/30 hover:bg-opacity-20'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {link.label}
                </button>
              );
            })}
          {/* Donate Button (Desktop) */}
          <button 
            onClick={() => handleNavClick('donations')}
            className="hidden lg:block bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold px-6 py-2 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Donate Now
          </button>
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 hover:bg-orange-500/30 hover:bg-opacity-20 rounded-lg transition-all"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col gap-2">
              {navigationLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.id}>
                      <button
                        onClick={() => setAboutDropdown(!aboutDropdown)}
                        className="w-full text-left text-white hover:bg-orange-500/30 hover:bg-opacity-20 px-4 py-3 rounded-lg transition-all font-semibold flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          {link.label}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {aboutDropdown && (
                        <div className="ml-6 mt-2 space-y-2">
                          {link.dropdown.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleNavClick(item.id)}
                              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                                currentPage === item.id
                                  ? 'bg-white text-orange-600 font-semibold'
                                  : 'text-white hover:bg-orange-500/30 hover:bg-opacity-20'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const IconComponent = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all font-semibold ${
                      currentPage === link.id
                        ? 'bg-white text-orange-600'
                        : 'text-white hover:bg-orange-500/30 hover:bg-opacity-20'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {link.label}
                  </button>
                );
              })}
              
              <button 
                onClick={() => handleNavClick('donations')}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold px-4 py-3 rounded-lg transition-all mt-2"
              >
                Donate Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
