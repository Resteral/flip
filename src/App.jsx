import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Storefront from './Storefront';
import AdminDashboard from './AdminDashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public facing e-commerce storefront */}
        <Route path="/" element={<Storefront />} />
        
        {/* Private inventory sourcing software */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
