import React, { useState, useEffect } from 'react';
import { LineChart, Search, Tag, Calendar, Zap, AlertTriangle, ArrowUpRight, ArrowDownRight, Package, MapPin, Loader2, X } from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [drops, setDrops] = useState([]);
  const [deals, setDeals] = useState([]);
  const [flips, setFlips] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  const [loading, setLoading] = useState({ drops: true, deals: true, flips: true, search: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetch('/api/drops')
      .then(res => res.json())
      .then(data => { setDrops(Array.isArray(data) ? data : []); setLoading(l => ({ ...l, drops: false })); })
      .catch(err => { console.error(err); setLoading(l => ({ ...l, drops: false })); });

    fetch('/api/deals')
      .then(res => res.json())
      .then(data => { setDeals(Array.isArray(data) ? data : []); setLoading(l => ({ ...l, deals: false })); })
      .catch(err => { console.error(err); setLoading(l => ({ ...l, deals: false })); });

    fetch('/api/flips')
      .then(res => res.json())
      .then(data => { setFlips(Array.isArray(data) ? data : []); setLoading(l => ({ ...l, flips: false })); })
      .catch(err => { console.error(err); setLoading(l => ({ ...l, flips: false })); });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setActiveTab('search');
    setLoading(l => ({ ...l, search: true }));
    
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    } finally {
      setLoading(l => ({ ...l, search: false }));
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Zap className="logo-icon" size={28} />
          <span>ProfitFinder <span style={{color: 'var(--text-secondary)', fontSize: '1rem'}}>Live Data</span></span>
        </div>
        <nav className="nav-links">
          <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => {setActiveTab('dashboard'); setIsSearching(false);}}>
            Dashboard
          </button>
          <button className={`nav-link ${activeTab === 'deals' ? 'active' : ''}`} onClick={() => {setActiveTab('deals'); setIsSearching(false);}}>
            Local Deals
          </button>
          <button className={`nav-link ${activeTab === 'flips' ? 'active' : ''}`} onClick={() => {setActiveTab('flips'); setIsSearching(false);}}>
            Flipping Hub
          </button>
        </nav>
        <div className="user-actions" style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)'}}>
            <MapPin size={18} />
            <span style={{fontSize: '0.9rem', fontWeight: 500}}>Effingham, NH 03882</span>
          </div>
          <form onSubmit={handleSearch} style={{display: 'flex', alignItems: 'center', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.25rem 0.5rem'}}>
            <input 
              type="text" 
              placeholder="Search cards..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{background: 'transparent', border: 'none', color: 'white', padding: '0.5rem', outline: 'none'}}
            />
            <button type="submit" style={{color: 'var(--accent-color)', padding: '0.5rem'}}>
              <Search size={18} />
            </button>
          </form>
        </div>
      </header>

      <main className="main-content">
        <div className="animate-fade-in">
          <h1 className="page-title">
            {activeTab === 'dashboard' && 'Live Market Overview'}
            {activeTab === 'deals' && 'Real Local Deals'}
            {activeTab === 'flips' && 'Live TCG Flipping Opportunities'}
            {activeTab === 'search' && `Search Results: "${searchQuery}"`}
          </h1>
          <p className="page-subtitle">
            {activeTab === 'dashboard' && 'Real-time analysis of TCG flips and local Craigslist finds.'}
            {activeTab === 'deals' && 'Live feed of underpriced items near you.'}
            {activeTab === 'flips' && 'Live market vs low price comparison from Pokémon TCG API.'}
            {activeTab === 'search' && 'Live price data and flip margins for your searched cards.'}
          </p>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className="dashboard-grid animate-fade-in delay-100">
              <div className="glass-card">
                <div className="stat-label">Total Est. Profit Found</div>
                <div className="stat-value">{loading.flips ? <Loader2 className="animate-spin" /> : `$${flips.reduce((acc, flip) => acc + (parseFloat(flip.sellAvg.slice(1)) - parseFloat(flip.buyAvg.slice(1))), 0).toFixed(2)}`}</div>
                <div className="trend-up"><ArrowUpRight size={16} /> Live Data Active</div>
              </div>
              <div className="glass-card">
                <div className="stat-label">Active Local Deals</div>
                <div className="stat-value">{loading.deals ? <Loader2 className="animate-spin" /> : deals.length}</div>
                <div className="trend-up"><ArrowUpRight size={16} /> Craigslist Local</div>
              </div>
              <div className="glass-card">
                <div className="stat-label">Upcoming Drops</div>
                <div className="stat-value">{loading.drops ? <Loader2 className="animate-spin" /> : drops.length}</div>
                <div style={{color: 'var(--warning)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600}}>
                  <AlertTriangle size={16} /> Live Verified Schedule
                </div>
              </div>
            </div>

            <div className="dashboard-grid animate-fade-in delay-200">
              <div className="glass-card">
                <div className="section-header">
                  <h2 className="section-title"><Calendar className="logo-icon" size={24} /> Upcoming Drops</h2>
                  <button className="btn-secondary" onClick={() => setActiveTab('drops')}>View All</button>
                </div>
                <div className="items-list">
                  {loading.drops ? <Loader2 className="animate-spin" style={{margin: 'auto', display: 'block'}} /> : drops.slice(0, 3).map(drop => (
                    <div key={drop.id} className="item-card">
                      <div className="item-image" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b', border: '1px solid #334155'}}>
                        <Package size={32} color="#94a3b8" />
                      </div>
                      <div className="item-details">
                        <div className="item-name">{drop.name}</div>
                        <div className="item-meta">
                          <span>{drop.date}</span>
                          <span>•</span>
                          <span>{drop.platform}</span>
                        </div>
                      </div>
                      <div className="item-actions">
                        <span className={`badge ${drop.hype === 'Very High' ? 'badge-danger' : 'badge-warning'}`}>
                          {drop.hype} Hype
                        </span>
                        <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>{drop.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card">
                <div className="section-header">
                  <h2 className="section-title"><Tag className="logo-icon" size={24} /> Top Local Deals</h2>
                  <button className="btn-secondary" onClick={() => setActiveTab('deals')}>View All</button>
                </div>
                <div className="items-list">
                  {loading.deals ? <Loader2 className="animate-spin" style={{margin: 'auto', display: 'block'}} /> : deals.slice(0, 3).map(deal => (
                    <div key={deal.id} className="item-card">
                       <div className="item-image" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b', border: '1px solid #334155'}}>
                        <Package size={32} color="#94a3b8" />
                      </div>
                      <div className="item-details">
                        <div className="item-name" style={{maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{deal.name}</div>
                        <div className="item-meta">
                          <span>{deal.location}</span>
                          <span>•</span>
                          <span>{deal.condition}</span>
                        </div>
                      </div>
                      <div className="item-actions">
                        <div className="price-tag">{deal.price}</div>
                        <div style={{textDecoration: 'line-through', color: 'var(--text-secondary)', fontSize: '0.8rem'}}>{deal.retail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {(activeTab === 'flips' || activeTab === 'search') && (
          <div className="glass-card animate-fade-in delay-100">
             <div className="section-header">
                <h2 className="section-title"><LineChart className="logo-icon" size={24} /> {activeTab === 'search' ? 'Search Results' : 'Trending Pokémon 151 Flips'}</h2>
                {activeTab === 'search' && (
                  <button className="btn-secondary" onClick={() => {setActiveTab('dashboard'); setSearchQuery('');}}><X size={16}/> Clear Search</button>
                )}
             </div>
             <div className="table-container">
                {(activeTab === 'search' ? loading.search : loading.flips) ? <Loader2 className="animate-spin" style={{margin: '2rem auto', display: 'block'}} /> : (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Card Image</th>
                        <th>Card Name</th>
                        {activeTab === 'search' && <th>Set</th>}
                        <th>Lowest Listed</th>
                        <th>Market Value</th>
                        <th>Est. ROI</th>
                        <th>Trend</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(activeTab === 'search' ? searchResults : flips).map(item => (
                        <tr key={item.id}>
                          <td><img src={item.image} alt={item.name} style={{height: '60px', borderRadius: '4px'}} /></td>
                          <td style={{fontWeight: 600}}>{item.name}</td>
                          {activeTab === 'search' && <td>{item.set}</td>}
                          <td>{item.buyAvg}</td>
                          <td style={{color: 'var(--success)', fontWeight: 600}}>{item.sellAvg}</td>
                          <td>
                            <span className={item.trend === 'up' ? 'trend-up' : 'trend-down'}>
                              {item.roi}
                            </span>
                          </td>
                          <td>
                            {item.trend === 'up' ? <ArrowUpRight color="var(--success)" size={20} /> : <ArrowDownRight color="var(--danger)" size={20} />}
                          </td>
                          <td>
                            <button className="btn-secondary" style={{padding: '0.25rem 0.75rem', fontSize: '0.85rem'}}>Analyze</button>
                          </td>
                        </tr>
                      ))}
                      {(activeTab === 'search' && searchResults.length === 0) && (
                        <tr>
                          <td colSpan="8" style={{textAlign: 'center', padding: '2rem'}}>No cards found for this search query.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
             </div>
          </div>
        )}

        {activeTab === 'deals' && (
           <div className="glass-card animate-fade-in delay-100">
             <div className="section-header">
                <h2 className="section-title"><Tag className="logo-icon" size={24} /> Live Local Deals (Craigslist)</h2>
             </div>
             <div className="items-list">
                {loading.deals ? <Loader2 className="animate-spin" style={{margin: '2rem auto', display: 'block'}} /> : deals.map(deal => (
                  <div key={deal.id} className="item-card">
                     <div className="item-image" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b', border: '1px solid #334155'}}>
                      <Package size={32} color="#94a3b8" />
                    </div>
                    <div className="item-details">
                      <div className="item-name">{deal.name}</div>
                      <div className="item-meta">
                        <span>{deal.location}</span>
                        <span>•</span>
                        <span>{deal.condition}</span>
                      </div>
                    </div>
                    <div className="item-actions">
                      <div className="price-tag">{deal.price}</div>
                      <div style={{textDecoration: 'line-through', color: 'var(--text-secondary)', fontSize: '0.8rem'}}>{deal.retail}</div>
                      <a href={deal.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{padding: '0.25rem 0.75rem', fontSize: '0.8rem', marginTop: '0.5rem'}}>View Posting</a>
                    </div>
                  </div>
                ))}
                {deals.length === 0 && !loading.deals && (
                  <div style={{padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)'}}>
                    No active deals found within 25 miles of 03882 right now.
                  </div>
                )}
             </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
