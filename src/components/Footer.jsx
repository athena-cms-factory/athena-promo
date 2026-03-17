import React from 'react';
import EditableText from './EditableText';
import EditableLink from './EditableLink';

export default function Footer({ data }) {
  // v8.8 Modular Data Logic
  const footerContent = data?.footer?.[0] || {};
  const contactInfo = data?.contact?.[0] || {};
  const siteSettings = data?._site_settings?.[0] || data?.site_settings?.[0] || {};
  
  const naam = siteSettings.site_name || 'athena-promo';
  const email = contactInfo.email || '';
  const locatie = contactInfo.locatie || '';
  const btw = contactInfo.btw_nummer || '';
  const linkedin = contactInfo.linkedin_url || '';

  return (
    <footer className="py-24 bg-slate-900 text-slate-400 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
          
          {/* Footer Titel & Beschrijving (Klant-bewerkbaar) */}
          <div className="space-y-6">
            <h3 className="text-3xl font-serif font-bold text-white">
              <EditableText value={footerContent.titel || naam} cmsBind={{file: 'footer', index: 0, key: 'titel'}} />
            </h3>
            <p className="text-lg leading-relaxed font-light">
              <EditableText value={footerContent.beschrijving || siteSettings.tagline || ''} cmsBind={{file: 'footer', index: 0, key: 'beschrijving'}} />
            </p>
          </div>

          {/* Contact Details (Klant-bewerkbaar) */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Contact</h4>
            <ul className="space-y-4">
              {email && (
                <li className="flex items-center gap-4">
                  <i className="fa-solid fa-envelope text-accent w-5"></i>
                  <EditableText value={email} cmsBind={{file: 'contact', index: 0, key: 'email'}} />
                </li>
              )}
              {locatie && (
                <li className="flex items-center gap-4">
                  <i className="fa-solid fa-location-dot text-accent w-5"></i>
                  <EditableText value={locatie} cmsBind={{file: 'contact', index: 0, key: 'locatie'}} />
                </li>
              )}
              {btw && (
                <li className="flex items-center gap-4 text-sm opacity-60">
                  <span className="font-bold text-accent">BTW:</span>
                  <EditableText value={btw} cmsBind={{file: 'contact', index: 0, key: 'btw_nummer'}} />
                </li>
              )}
            </ul>
          </div>

          {/* Socials & Copyright */}
          <div className="space-y-6">
             <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Volg Ons</h4>
             <div className="flex gap-4">
                {linkedin && (
                   <EditableLink 
                    label="LinkedIn" 
                    url={linkedin} 
                    table="contact" 
                    field="linkedin_url" 
                    id={0} 
                    className="hover:text-accent transition-colors"
                  />
                )}
             </div>
             <p className="text-sm opacity-50 mt-10">
                <EditableText value={footerContent.copy_tekst || `© ${new Date().getFullYear()} ${naam}`} cmsBind={{file: 'footer', index: 0, key: 'copy_tekst'}} />
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
