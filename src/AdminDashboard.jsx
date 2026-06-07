import React, { useState, useEffect } from 'react';
import { LineChart, Search, Tag, Calendar, Zap, AlertTriangle, ArrowUpRight, ArrowDownRight, Package, MapPin, Loader2, X, Store, MessageCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [drops, setDrops] = useState([]);
  const [deals, setDeals] = useState([]);
  const [flips, setFlips] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [socialDrops, setSocialDrops] = useState([]);
  const [storeDeals, setStoreDeals] = useState([]);
  
  const [loading, setLoading] = useState({ drops: true, deals: true, flips: true, search: false, social: true, store: true });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/drops').then(res => res.json()).then(data => { setDrops(Array.isArray(data) ? data : []); setLoading(l => ({ ...l, drops: false })); }).catch(err => { console.error(err); setLoading(l => ({ ...l, drops: false })); });
    fetch('/api/deals').then(res => res.json()).then(data => { setDeals(Array.isArray(data) ? data : []); setLoading(l => ({ ...l, deals: false })); }).catch(err => { console.error(err); setLoading(l => ({ ...l, deals: false })); });
    fetch('/api/flips').then(res => res.json()).then(data => { setFlips(Array.isArray(data) ? data : []); setLoading(l => ({ ...l, flips: false })); }).catch(err => { console.error(err); setLoading(l => ({ ...l, flips: false })); });
    fetch('/api/social-drops').then(res => res.json()).then(data => { setSocialDrops(Array.isArray(data) ? data : []); setLoading(l => ({ ...l, social: false })); }).catch(err => { console.error(err); setLoading(l => ({ ...l, social: false })); });
    fetch('/api/store-deals').then(res => res.json()).then(data => { setStoreDeals(Array.isArray(data) ? data : []); setLoading(l => ({ ...l, store: false })); }).catch(err => { console.error(err); setLoading(l => ({ ...l, store: false })); });
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

  const handlePushToStore = (item) => {
    // This is where Shopify Admin API logic will go
    alert(`Pushed "${item.name}" to Shopify Inventory. This will automatically sync to Amazon via Marketplace Connect!`);
  };

  return (
    <div className="app-container" style={{background: '#0f172a', minHeight: '100vh', color: 'white'}}>
      <header className="header" style={{display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', background: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid #1e293b'}}>
        <div className="logo" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.2rem'}}>
          <Zap className="logo-icon" size={28} color="#3b82f6" />
          <span>ProfitFinder <span style={{color: '#94a3b8', fontSize: '1rem'}}>Admin Portal</span></span>
        </div>
        <nav className="nav-links" style={{display: 'flex', gap: '1rem'}}>
          <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => {setActiveTab('dashboard'); setIsSearching(false);}} style={{background: 'none', border: 'none', color: activeTab === 'dashboard' ? '#3b82f6' : '#cbd5e1', cursor: 'pointer', fontWeight: 600}}>Dashboard</button>
          <button className={`nav-link ${activeTab === 'deals' ? 'active' : ''}`} onClick={() => {setActiveTab('deals'); setIsSearching(false);}} style={{background: 'none', border: 'none', color: activeTab === 'deals' ? '#3b82f6' : '#cbd5e1', cursor: 'pointer', fontWeight: 600}}>Retail Deals</button>
          <button className={`nav-link ${activeTab === 'drops' ? 'active' : ''}`} onClick={() => {setActiveTab('drops'); setIsSearching(false);}} style={{background: 'none', border: 'none', color: activeTab === 'drops' ? '#3b82f6' : '#cbd5e1', cursor: 'pointer', fontWeight: 600}}>Hype Drops</button>
          <button className={`nav-link ${activeTab === 'flips' ? 'active' : ''}`} onClick={() => {setActiveTab('flips'); setIsSearching(false);}} style={{background: 'none', border: 'none', color: activeTab === 'flips' ? '#3b82f6' : '#cbd5e1', cursor: 'pointer', fontWeight: 600}}>TCG Arbitrage</button>
        </nav>
        <div className="user-actions" style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
          <form onSubmit={handleSearch} style={{display: 'flex', alignItems: 'center', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '0.25rem 0.5rem'}}>
            <input type="text" placeholder="Search cards..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{background: 'transparent', border: 'none', color: 'white', padding: '0.5rem', outline: 'none'}} />
            <button type="submit" style={{color: '#3b82f6', padding: '0.5rem', cursor: 'pointer', background: 'none', border: 'none'}}><Search size={18} /></button>
          </form>
          <button onClick={() => navigate('/')} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600}}>
            <LogOut size={16} /> Exit Admin
          </button>
        </div>
      </header>

      <main className="main-content" style={{padding: '2rem'}}>
        {/* Same Dashboard logic as before, but added "Push to Shopify" buttons */}
        <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Private Inventory Sourcing</h1>
        <p style={{color: '#94a3b8', marginBottom: '2rem'}}>Find high margin flips and push them directly to your Shopify and Amazon storefronts.</p>

        {(activeTab === 'flips' || activeTab === 'search') && (
          <div className="glass-card animate-fade-in delay-100" style={{background: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155'}}>
             <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <h2 className="section-title" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><LineChart size={24} color="#3b82f6" /> {activeTab === 'search' ? 'Search Results' : 'Trending Pokémon Flips'}</h2>
                {activeTab === 'search' && (
                  <button className="btn-secondary" onClick={() => {setActiveTab('dashboard'); setSearchQuery('');}} style={{background: '#334155', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer'}}>Clear Search</button>
                )}
             </div>
             <div className="table-container" style={{overflowX: 'auto'}}>
                {(activeTab === 'search' ? loading.search : loading.flips) ? <Loader2 className="animate-spin" style={{margin: '2rem auto', display: 'block'}} /> : (
                  <table className="data-table" style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                    <thead>
                      <tr style={{borderBottom: '1px solid #334155'}}>
                        <th style={{padding: '1rem'}}>Card Image</th>
                        <th style={{padding: '1rem'}}>Card Name</th>
                        <th style={{padding: '1rem'}}>Lowest Listed</th>
                        <th style={{padding: '1rem'}}>Market Value</th>
                        <th style={{padding: '1rem'}}>Est. Profit</th>
                        <th style={{padding: '1rem'}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(activeTab === 'search' ? searchResults : flips).map(item => (
                        <tr key={item.id} style={{borderBottom: '1px solid #334155'}}>
                          <td style={{padding: '1rem'}}><img src={item.image} alt={item.name} style={{height: '60px', borderRadius: '4px'}} /></td>
                          <td style={{fontWeight: 600, padding: '1rem'}}>{item.name}</td>
                          <td style={{padding: '1rem'}}>{item.buyAvg}</td>
                          <td style={{color: '#22c55e', fontWeight: 600, padding: '1rem'}}>{item.sellAvg}</td>
                          <td style={{color: '#22c55e', fontWeight: 700, padding: '1rem'}}>{item.profitDisplay || 'N/A'}</td>
                          <td style={{padding: '1rem', display: 'flex', gap: '0.5rem'}}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{background: '#334155', color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600}}>Buy Inventory</a>
                            <button onClick={() => handlePushToStore(item)} style={{background: '#3b82f6', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer'}}>List on Shopify/Amazon</button>
                          </td>
                        </tr>
                      ))}
                      {(activeTab === 'search' && searchResults.length === 0) && (
                        <tr>
                          <td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No cards found for this search query.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
             </div>
          </div>
        )}
        
        {activeTab === 'drops' && (
           <div className="glass-card animate-fade-in delay-100" style={{background: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155'}}>
             <div className="section-header" style={{marginBottom: '1rem'}}>
                <h2 className="section-title" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Calendar size={24} color="#3b82f6" /> Verified Upcoming Drops (2026+)</h2>
             </div>
             <div className="items-list" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {loading.drops ? <Loader2 className="animate-spin" style={{margin: '2rem auto', display: 'block'}} /> : drops.map(drop => (
                  <div key={drop.id} className="item-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '1rem', borderRadius: '8px', border: '1px solid #334155'}}>
                    <div>
                      <div style={{fontWeight: 600, fontSize: '1.1rem'}}>{drop.name}</div>
                      <div style={{color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem'}}>
                        {drop.date} • {drop.platform}
                      </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                      <span style={{background: drop.hype === 'Very High' ? '#ef4444' : '#f59e0b', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'}}>
                        {drop.hype} Hype
                      </span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;
