"use client";
import React, { useState } from 'react';
import { Menu, X, Home, Info, Calendar, Heart, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

// ==================== NAVBAR COMPONENT ====================
const Navbar = ({ currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'about' | 'our-work' | null
  const router = useRouter();

  const navigationLinks = [
    { id: '', label: 'Home', icon: Home },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      dropdown: [
        { id: 'about-trust', label: 'About Trust' },
        { id: 'trust-members', label: 'Trust Members' },
      ]
    },
    {
      id: 'our-work',
      label: 'Our Work',
      icon: Heart,
      dropdown: [
        { id: 'our-work/religious', label: '🛕 Religious Activities' },
        { id: 'our-work/health', label: '🏥 Health & Medical' },
        { id: 'our-work/education', label: '📚 Education' },
        { id: 'our-work/social-welfare', label: '🤝 Social Welfare' },
        { id: 'our-work/environment', label: '🌱 Environment' },
      ]
    },
  ];

  const handleNavClick = (pageId) => {
    router.push(`/${pageId}`);
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setOpenDropdown(null);
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
                    onMouseEnter={() => setOpenDropdown(link.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="text-white hover:bg-orange-500/30 px-4 py-2 rounded-lg transition-all font-semibold flex items-center gap-1">
                      <link.icon className="w-4 h-4" />
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.id ? 'rotate-180' : ''}`} />
                    </button>

                    {openDropdown === link.id && (
                      <div className="absolute top-full left-0 bg-white rounded-lg shadow-xl py-2 min-w-52 border-t-4 border-orange-500 z-50">
                        {link.dropdown.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors text-sm ${currentPage === item.id
                              ? 'bg-orange-100 text-orange-700 font-semibold'
                              : 'text-gray-700'
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${currentPage === link.id
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

          {/* Mobile Menu Button (three-line) */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-white p-2 hover:bg-orange-500/30 hover:bg-opacity-20 rounded-lg transition-all"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay - starts below navbar */}
      <div
        className={`fixed top-20 left-0 right-0 bottom-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={closeSidebar}
      />

      {/* Mobile Sidebar Panel - starts below navbar, right side */}
      <div
        className={`fixed top-20 right-0 bottom-0 w-72 max-w-[85%] bg-orange-50 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-orange-200 px-4 py-4 bg-orange-100">
          <span className="font-bold text-orange-800">Menu</span>
          <button
            onClick={closeSidebar}
            className="text-orange-700 p-2 hover:bg-orange-200 rounded-lg transition-all"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-1 p-4 overflow-y-auto h-[calc(100%-4.5rem)]">
          {navigationLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.id}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.id ? null : link.id)}
                    className="w-full text-left text-orange-900 hover:bg-orange-100 px-4 py-3 rounded-lg transition-all font-semibold flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.id ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === link.id && (
                    <div className="ml-6 mt-1 space-y-1">
                      {link.dropdown.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${currentPage === item.id
                            ? 'bg-orange-200 text-orange-800 font-semibold'
                            : 'text-orange-800 hover:bg-orange-100'
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
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all font-semibold ${currentPage === link.id
                  ? 'bg-orange-200 text-orange-800'
                  : 'text-orange-900 hover:bg-orange-100'
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
    </nav>
  );
};

export default Navbar;