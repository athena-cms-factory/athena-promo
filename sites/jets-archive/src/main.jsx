import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

async function init() {
  const data = {};
  try {
    const dataModules = import.meta.glob('./data/*.json', { eager: true });
    const getData = (name) => {
        const key = Object.keys(dataModules).find(k => k.toLowerCase().endsWith(`/${name.toLowerCase()}.json`));
        return key ? dataModules[key].default : null;
    };
    
    // Load common Athena data
    data['section_order'] = getData('section_order') || ['basis', 'jets'];
    data['site_settings'] = getData('site_settings') || {};
    data['display_config'] = getData('display_config') || { sections: {} };
    data['layout_settings'] = getData('layout_settings') || {};
    data['style_config'] = getData('style_config') || {};
    data['section_settings'] = getData('section_settings') || {};

    // Load tables defined in section_order
    for (const sectionName of data['section_order']) {
        const sectionData = getData(sectionName);
        if (sectionData) {
            data[sectionName] = Array.isArray(sectionData) ? sectionData : [sectionData];
        }
    }

    // Explicit fallback for Jets project
    ['basis', 'jets'].forEach(table => {
        if (!data[table]) {
            const tableData = getData(table);
            if (tableData) data[table] = Array.isArray(tableData) ? tableData : [tableData];
        }
    });

    if (window.athenaScan) {
        window.athenaScan(data);
    }
  } catch (e) {
    console.error("Data load error:", e);
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App data={data} />
    </React.StrictMode>
  );
}

init();
