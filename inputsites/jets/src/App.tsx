import { useState, useMemo } from 'react';
import './App.css';
import { jets } from './data/jets';
import JetCard from './components/JetCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'All' | 'US' | 'Europe'>('All');

  const filteredJets = useMemo(() => {
    return jets.filter(jet => {
      const matchesSearch = jet.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           jet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'All' || jet.origin === filter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter]);

  return (
    <div className="app-container">
      <header>
        <h1>Chronology of Jets</h1>
        <p className="subtitle">
          Een exhaustief overzicht van {jets.length} iconische Amerikaanse en Europese gevechtsvliegtuigen.
        </p>

        <div className="controls">
          <input 
            type="text" 
            placeholder="Zoek een toestel (bijv. F-16)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="filter-buttons">
            <button 
              className={filter === 'All' ? 'active' : ''} 
              onClick={() => setFilter('All')}
            >
              Alle
            </button>
            <button 
              className={filter === 'US' ? 'active' : ''} 
              onClick={() => setFilter('US')}
            >
              🇺🇸 USA
            </button>
            <button 
              className={filter === 'Europe' ? 'active' : ''} 
              onClick={() => setFilter('Europe')}
            >
              🇪🇺 Europa
            </button>
          </div>
        </div>
      </header>

      <div className="stats-bar">
        <span>Totaal getoond: {filteredJets.length}</span>
      </div>

      <main className="timeline">
        {filteredJets.map((jet) => (
          <JetCard key={jet.id} jet={jet} />
        ))}
      </main>

      {filteredJets.length === 0 && (
        <div className="no-results">
          <p>Geen toestellen gevonden die voldoen aan je zoekopdracht.</p>
        </div>
      )}

      <footer>
        <p>© 2026 Fighter Jet Chronology Project — {jets.length} modellen gedocumenteerd</p>
      </footer>
    </div>
  );
}

export default App;
