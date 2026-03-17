import React, { useState } from 'react';
import EditableText from './EditableText';
import EditableMedia from './EditableMedia';
import EditableLink from './EditableLink';
import { Link } from 'react-router-dom';

function Header({ siteSettings: initialSettings = {} }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // v8.8 Modular Data Logic
  const data = window.__ATHENA_DATA__ || {};
  const headerContent = data.header?.[0] || {};
  const settings = Array.isArray(initialSettings) ? (initialSettings[0] || {}) : (initialSettings || {});
  
  const siteName = headerContent.titel || settings.site_name || 'athena-promo';
  const slogan = headerContent.slogan || settings.tagline || '';
  const logoText = headerContent.logo_tekst || settings.logo_text || siteName;
  const logoChar = logoText.charAt(0).toUpperCase();

  const displayLogo = settings.site_logo_image || "athena-icon.svg";

  const handleScroll = (e) => {
    const url = headerContent.cta_url || settings.header_cta_url || "#contact";
    setIsMenuOpen(false);
    if (url.startsWith('#')) {
      e.preventDefault();
      const targetId = url.substring(1);
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
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
              <EditableMedia
                src={displayLogo}
                cmsBind={{ file: '_site_settings', index: 0, key: 'site_logo_image' }}
                className="w-full h-full object-contain"
                fallback={logoChar}
              />
            </div>
          )}

          <div className="flex flex-col">
            {settings.header_show_title !== false && (
              <span className="text-2xl font-serif font-black tracking-tight text-primary leading-none mb-1">
                <EditableText value={siteName} cmsBind={{ file: 'header', index: 0, key: 'titel' }} />
              </span>
            )}
            {settings.header_show_tagline !== false && slogan && (
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold opacity-80">
                <EditableText value={slogan} cmsBind={{ file: 'header', index: 0, key: 'slogan' }} />
              </span>
            )}
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {settings.header_show_button !== false && (
            <EditableLink
              as="button"
              label={headerContent.cta_label || settings.header_cta_label || "Contact"}
              url={headerContent.cta_url || settings.header_cta_url || "#contact"}
              table="header"
              field="cta"
              id={0}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-accent transition-colors"
              onClick={handleScroll}
            />
          )}
        </div>

        <button className="md:hidden text-2xl text-primary p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      <div className={`fixed inset-x-0 top-[var(--header-height,80px)] bg-white border-b border-gray-100 shadow-xl md:hidden transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
        <div className="p-6 flex flex-col gap-4">
          <Link to="/" className="text-lg font-bold text-primary py-2 border-b border-slate-50" onClick={() => setIsMenuOpen(false)}>Home</Link>
          {settings.header_show_button !== false && (
            <EditableLink
              as="button"
              label={headerContent.cta_label || "Contact"}
              url={headerContent.cta_url || "#contact"}
              table="header"
              field="cta"
              id={0}
              className="w-full bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-accent transition-colors text-center mt-2"
              onClick={handleScroll}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
