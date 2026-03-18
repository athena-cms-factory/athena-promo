import React from 'react';

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
              <span data-dock-type="text" data-dock-bind="footer.0.titel">{footerContent.titel || naam}</span>
            </h3>
            <p className="text-lg leading-relaxed font-light">
              <span data-dock-type="text" data-dock-bind="footer.0.beschrijving">{footerContent.beschrijving || siteSettings.tagline || ''}</span>
            </p>
          </div>

          {/* Contact Details (Klant-bewerkbaar) */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Contact</h4>
            <ul className="space-y-4">
              {email && (
                <li className="flex items-center gap-4">
                  <i className="fa-solid fa-envelope text-accent w-5"></i>
                  <span data-dock-type="text" data-dock-bind="contact.0.email">{email}</span>
                </li>
              )}
              {locatie && (
                <li className="flex items-center gap-4">
                  <i className="fa-solid fa-location-dot text-accent w-5"></i>
                  <span data-dock-type="text" data-dock-bind="contact.0.locatie">{locatie}</span>
                </li>
              )}
              {btw && (
                <li className="flex items-center gap-4 text-sm opacity-60">
                  <span className="font-bold text-accent">BTW:</span>
                  <span data-dock-type="text" data-dock-bind="contact.0.btw_nummer">{btw}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Socials & Copyright */}
          <div className="space-y-6">
             <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Volg Ons</h4>
             <div className="flex gap-4">
                {linkedin && (
                   <a href={"#"} data-dock-type="link" data-dock-bind="site_settings.0.titel">{}</a>
                )}
             </div>
             <p className="text-sm opacity-50 mt-10">
                <span data-dock-type="text" data-dock-bind="footer.0.copy_tekst">{footerContent.copy_tekst || `© ${new Date().getFullYear()}`}</span>
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
