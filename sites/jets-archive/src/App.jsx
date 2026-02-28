import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { DisplayConfigProvider } from './components/DisplayConfigContext';
import { StyleProvider } from './components/StyleContext';
import JetCard from './components/JetCard';
import EditableText from './components/EditableText';
import EditableMedia from './components/EditableMedia';
import Header from './components/Header';
import Footer from './components/Footer';

const App = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Listen for updates from the Dock
    const handleUpdate = (event) => {
      if (event.data && event.data.type === 'athena_update') {
        setData(event.data.data);
      }
    };

    window.addEventListener('message', handleUpdate);
    return () => window.removeEventListener('message', handleUpdate);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest">Loading...</div>;

  const basis = data.basis?.[0] || {};
  const jets = data.jets || [];

  return (
    <StyleProvider data={data}>
      <DisplayConfigProvider data={data}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header siteSettings={data.site_settings} />
            
            <main>
              {/* Hero Section */}
              <section data-dock-section="basis" className="relative min-h-[60vh] flex items-center justify-center pt-20 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 z-0 opacity-40">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-900 to-slate-900"></div>
                </div>
                
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                  <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight">
                    <EditableText value={basis.hero_header || 'Vliegende Iconen'} cmsBind={{file: 'basis', index: 0, key: 'hero_header'}} />
                  </h1>
                  <p className="text-xl md:text-2xl text-sky-200 font-light max-w-2xl mx-auto mb-10">
                    <EditableText value={basis.hero_subtekst || 'Verken de evolutie van straaljagers door de decennia heen.'} cmsBind={{file: 'basis', index: 0, key: 'hero_subtekst'}} />
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button onClick={() => document.getElementById('collection')?.scrollIntoView({behavior: 'smooth'})} className="bg-sky-500 hover:bg-sky-400 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl">
                        Bekijk de vloot
                    </button>
                  </div>
                </div>
              </section>

              {/* Jets Collection */}
              <section id="collection" data-dock-section="jets" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center justify-between mb-12">
                      <h2 className="text-3xl font-black uppercase tracking-tighter">De Collectie</h2>
                      <div className="h-1 flex-grow mx-8 bg-slate-200 hidden md:block"></div>
                      <div className="text-slate-400 font-bold">{jets.length} Toestellen</div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {jets.map((jet, index) => (
                        <JetCard key={jet.id || index} jet={jet} index={index} />
                      ))}
                  </div>
                </div>
              </section>
            </main>

            <Footer data={data} />
          </div>
        </Router>
      </DisplayConfigProvider>
    </StyleProvider>
  );
};

export default App;

