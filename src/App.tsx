import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteHeader, SiteFooter } from './components/shared';
import { The100 } from './pages/The100';
import { HotelProfile } from './pages/HotelProfile';
import { Home } from './pages/Home';
import { Methodology } from './pages/Methodology';
import { About } from './pages/About';
import { Insights } from './pages/Insights';

function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SiteHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/the-100" element={<The100 />} />
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
  );
}

export default App;
