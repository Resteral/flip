import React from 'react';
import { ShoppingCart, User, Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Storefront() {
  const navigate = useNavigate();

  return (
    <div className="storefront-container" style={{background: '#ffffff', minHeight: '100vh', color: '#111827', fontFamily: 'Inter, sans-serif'}}>
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 5%', borderBottom: '1px solid #e5e7eb'}}>
        <div style={{fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.05em'}}>ACME HYPE CO.</div>
        <nav style={{display: 'flex', gap: '2rem', fontWeight: 600, color: '#4b5563'}}>
          <a href="#" style={{textDecoration: 'none', color: 'inherit'}}>Shop All</a>
          <a href="#" style={{textDecoration: 'none', color: 'inherit'}}>Sneakers</a>
          <a href="#" style={{textDecoration: 'none', color: 'inherit'}}>Trading Cards</a>
        </nav>
        <div style={{display: 'flex', gap: '1.5rem', color: '#111827'}}>
          <Search size={24} style={{cursor: 'pointer'}} />
          <User size={24} style={{cursor: 'pointer'}} />
          <ShoppingCart size={24} style={{cursor: 'pointer'}} />
        </div>
      </header>

      <main>
        <section style={{background: '#f3f4f6', padding: '6rem 5%', textAlign: 'center'}}>
          <h1 style={{fontSize: '4rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.05em'}}>RARE FINDS. DAILY.</h1>
          <p style={{fontSize: '1.25rem', color: '#4b5563', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem'}}>
            We scour the globe to bring you the highest quality curated sneakers, streetwear, and TCG collections.
          </p>
          <button style={{background: '#111827', color: 'white', border: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '50px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
            Shop Latest Drops <ArrowRight size={20} />
          </button>
        </section>

        <section style={{padding: '5rem 5%'}}>
          <h2 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '2rem'}}>Trending Now</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem'}}>
            {/* Mock Products for Storefront UI */}
            {[1, 2, 3].map(i => (
              <div key={i} style={{background: '#f9fafb', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', transition: 'transform 0.2s', cursor: 'pointer'}} className="product-card">
                <div style={{height: '250px', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{color: '#9ca3af', fontWeight: 600}}>Product Image</span>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem'}}>Premium Sneaker Drop #{i}</h3>
                  <div style={{fontSize: '1.1rem', fontWeight: 600, color: '#374151'}}>$299.99</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{background: '#111827', color: 'white', padding: '3rem 5%', textAlign: 'center', marginTop: '4rem'}}>
        <p style={{color: '#9ca3af', marginBottom: '1rem'}}>© 2026 Acme Hype Co. All rights reserved.</p>
        <button onClick={() => navigate('/admin')} style={{background: 'none', border: '1px solid #374151', color: '#9ca3af', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem'}}>
          Admin Login
        </button>
      </footer>
    </div>
  );
}

export default Storefront;
