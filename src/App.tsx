import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SiteHeader, SiteFooter } from './components/shared';
import { CollectionIndex } from './pages/CollectionIndex';
import { HotelProfile } from './pages/HotelProfile';
import { Home } from './pages/Home';
import { Methodology } from './pages/Methodology';
import { About } from './pages/About';
import { Insights } from './pages/Insights';
import { Login } from './pages/Login';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <SiteHeader />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/the-100" element={<Navigate to="/collections/the-global-100" replace />} />
              <Route path="/collections/:slug" element={<CollectionIndex />} />
              <Route path="/hotels/:slug" element={<HotelProfile />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<div>Strategic Feature</div>} />
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <SiteFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
