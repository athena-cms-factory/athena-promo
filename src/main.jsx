import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './css/modern-dark.css';
import './dock-connector.js';

async function init() {
  const data = {};
  
  try {
    // v8.8 Dynamic Data Loader (Modular Standard)
    // We laden alle JSON bestanden in src/data/ in
    const dataModules = import.meta.glob('./data/*.json', { eager: true });
    
    Object.keys(dataModules).forEach(path => {
      // Bestandsnaam extraheren (bijv. ./data/_site_settings.json -> _site_settings)
      const fileName = path.split('/').pop().replace('.json', '');
      data[fileName] = dataModules[path].default || dataModules[path];
    });

    // Alias mapping voor backwards compatibility (site_settings -> _site_settings)
    const aliases = ['site_settings', 'style_config', 'section_order', 'layout_settings', 'display_config', 'schema'];
    aliases.forEach(alias => {
      if (!data[alias] && data[`_${alias}`]) {
        data[alias] = data[`_${alias}`];
      }
    });

    // v32+ Global exposure for Dock & Components
    window.__ATHENA_DATA__ = data;
    if (window.athenaScan) window.athenaScan(data);
    
    console.log("🚀 Athena Data Loaded:", Object.keys(data));
  } catch (e) {
    console.error("❌ Data laad fout:", e);
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App data={data} />
    </React.StrictMode>
  );
}

init();
