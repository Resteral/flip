import React, { useState } from 'react';
import { LineChart, Search, Tag, TrendingUp, Calendar, Zap, AlertTriangle, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';
import './index.css';

const mockDrops = [
  { id: 1, name: 'Pokemon 151 Ultra Premium Collection', date: 'Tomorrow, 10:00 AM', platform: 'Pokemon Center', hype: 'High', type: 'TCG' },
  { id: 2, name: 'Panini Prizm Basketball 2024 Hobby Box', date: 'Oct 24, 12:00 PM', platform: 'Panini America', hype: 'Very High', type: 'Sports Cards' },
  { id: 3, name: 'One Piece TCG: OP-06 Wings of the Captain', date: 'Oct 28, 9:00 AM', platform: 'Local Card Shops', hype: 'High', type: 'TCG' },
];

const mockDeals = [
  { id: 1, name: 'Charizard ex 199/165 (SAR)', location: 'Facebook Marketplace - 5 mi', price: '$85.00', retail: '$120.00', condition: 'NM' },
  { id: 2, name: 'Lorcana The First Chapter Booster Box', location: 'Local Comic Shop - 12 mi', price: '$130.00', retail: '$180.00', condition: 'Sealed' },
  { id: 3, name: 'Topps Chrome Baseball 2023 Blaster', location: 'Target Clearance - 2 mi', price: '$17.49', retail: '$34.99', condition: 'Sealed' },
];

const mockFlips = [
  { id: 1, name: 'Pokemon Evolving Skies Booster Box', buyAvg: '$390.00', sellAvg: '$450.00', roi: '15.3%', trend: 'up' },
  { id: 2, name: 'Optic Football 2022 Mega Box', buyAvg: '$85.00', sellAvg: '$115.00', roi: '35.2%', trend: 'up' },
  { id: 3, name: 'Yu-Gi-Oh! Rarity Collection', buyAvg: '$95.00', sellAvg: '$88.00', roi: '-7.3%', trend: 'down' },
  { id: 4, name: 'Upper Deck Series 1 Hockey 23-24', buyAvg: '$110.00', sellAvg: '$145.00', roi: '31.8%', trend: 'up' },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Zap className="logo-icon" size={28} />
          <span>FlipFinder <span style={{color: 'var(--text-secondary)', fontSize: '1rem'}}>TCG Edition</span></span>
        </div>
        <nav className="nav-links">
          <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </button>
          <button className={`nav-link ${activeTab === 'deals' ? 'active' : ''}`} onClick={() => setActiveTab('deals')}>
            Local Deals
          </button>
          <button className={`nav-link ${activeTab === 'flips' ? 'active' : ''}`} onClick={() => setActiveTab('flips')}>
            Flipping Hub
          </button>
        </nav>
        <div className="user-actions">
          <button className="btn-primary">
            <Search size={18} /> Search Cards
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="animate-fade-in">
          <h1 className="page-title">
            {activeTab === 'dashboard' && 'Market Overview'}
            {activeTab === 'deals' && 'Local Penny Deals'}
            {activeTab === 'flips' && 'Flipping Opportunities'}
          </h1>
          <p className="page-subtitle">
            {activeTab === 'dashboard' && 'Track the most profitable trading cards and upcoming sealed drops.'}
            {activeTab === 'deals' && 'Find undervalued cards and sealed product in your local area.'}
            {activeTab === 'flips' && 'Data-driven analysis of current market gaps.'}
          </p>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className="dashboard-grid animate-fade-in delay-100">
              <div className="glass-card">
                <div className="stat-label">Total Est. Profit Found</div>
                <div className="stat-value">$1,245.50</div>
                <div className="trend-up"><ArrowUpRight size={16} /> +12.5% this week</div>
              </div>
              <div className="glass-card">
                <div className="stat-label">Active Local Deals</div>
                <div className="stat-value">24</div>
                <div className="trend-up"><ArrowUpRight size={16} /> 5 new today</div>
              </div>
              <div className="glass-card">
                <div className="stat-label">Upcoming Drops</div>
                <div className="stat-value">3</div>
                <div style={{color: 'var(--warning)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600}}>
                  <AlertTriangle size={16} /> 1 High-Hype Drop
                </div>
              </div>
            </div>

            <div className="dashboard-grid animate-fade-in delay-200">
              <div className="glass-card">
                <div className="section-header">
                  <h2 className="section-title"><Calendar className="logo-icon" size={24} /> Upcoming Drops</h2>
                  <button className="btn-secondary" onClick={() => setActiveTab('deals')}>View All</button>
                </div>
                <div className="items-list">
                  {mockDrops.map(drop => (
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
                  {mockDeals.map(deal => (
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'flips' && (
          <div className="glass-card animate-fade-in delay-100">
             <div className="section-header">
                <h2 className="section-title"><LineChart className="logo-icon" size={24} /> Trending TCG Flips</h2>
             </div>
             <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Avg. Buy Price</th>
                      <th>Avg. Sell Price</th>
                      <th>Est. ROI</th>
                      <th>Trend</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFlips.map(flip => (
                      <tr key={flip.id}>
                        <td style={{fontWeight: 600}}>{flip.name}</td>
                        <td>{flip.buyAvg}</td>
                        <td style={{color: 'var(--success)', fontWeight: 600}}>{flip.sellAvg}</td>
                        <td>
                          <span className={flip.trend === 'up' ? 'trend-up' : 'trend-down'}>
                            {flip.roi}
                          </span>
                        </td>
                        <td>
                          {flip.trend === 'up' ? <ArrowUpRight color="var(--success)" size={20} /> : <ArrowDownRight color="var(--danger)" size={20} />}
                        </td>
                        <td>
                          <button className="btn-secondary" style={{padding: '0.25rem 0.75rem', fontSize: '0.85rem'}}>Analyze</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'deals' && (
           <div className="glass-card animate-fade-in delay-100">
             <div className="section-header">
                <h2 className="section-title"><Tag className="logo-icon" size={24} /> All Local Deals</h2>
             </div>
             <div className="items-list">
                {mockDeals.map(deal => (
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
                      <button className="btn-primary" style={{padding: '0.25rem 0.75rem', fontSize: '0.8rem', marginTop: '0.5rem'}}>Message Seller</button>
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

export default App;
