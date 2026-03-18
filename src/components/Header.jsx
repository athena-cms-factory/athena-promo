import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ siteSettings: settings, data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // v8.8 Modular Data Access
  const headerContent = data?.header?.[0] || data?._header?.[0] || {};
  const logoText = settings.site_name || "ATHENA";
  const logoChar = logoText.charAt(0).toUpperCase();
  const displayLogo = settings.site_logo_image || "athena-icon.svg";

  const handleScroll = (e) => {
    // 🔱 v8.1 Shift+Click Standard
    if (e.shiftKey) return;

    const url = headerContent.cta_url || settings.header_cta_url || "#contact";
    setIsMenuOpen(false);
    
    if (url.startsWith('#')) {
      const targetId = url.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] border-b border-white/10 px-6 transition-all duration-500 flex items-center"
      style={{
        display: settings.header_visible === false ? 'none' : 'flex',
        backgroundColor: 'var(--header-bg, var(--color-header-bg, rgba(255,255,255,0.9)))',
        backdropFilter: 'var(--header-blur, blur(16px))',
        height: 'var(--header-height, 80px)',
        borderBottom: 'var(--header-border, 1px solid rgba(255,255,255,0.1))'
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 group" onClick={() => setIsMenuOpen(false)}>
          {settings.header_show_logo !== false && (
            <div className="relative w-12 h-12 overflow-hidden transition-transform duration-500">
              <img
                src={displayLogo}
                className="w-full h-full object-contain"
                data-dock-type="media"
                data-dock-bind="_site_settings.0.site_logo_image"
              />
            </div>
          )}
          <span 
            className="text-2xl font-serif font-bold tracking-widest text-[var(--color-title)]"
            data-dock-type="text"
            data-dock-bind="_site_settings.0.site_name"
          >
            {logoText}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {settings.header_show_button !== false && (
            <button
              onClick={handleScroll}
              className="bg-[var(--color-button-bg)] text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-all"
              data-dock-type="link"
              data-dock-bind="header.0.cta_label"
            >
              {headerContent.cta_label || "Contact"}
            </button>
          )}
        </div>

        <button className="md:hidden text-2xl text-primary p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-x-0 top-[var(--header-height,80px)] bg-white border-b border-gray-100 shadow-xl md:hidden transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
        <div className="p-6 flex flex-col gap-4">
          <Link to="/" className="text-lg font-bold text-primary py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>Home</Link>
          {settings.header_show_button !== false && (
            <button
              onClick={handleScroll}
              className="w-full bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-accent transition-colors text-center mt-2"
              data-dock-type="link"
              data-dock-bind="header.0.cta_label"
            >
              {headerContent.cta_label || "Contact"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
