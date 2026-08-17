# DMW Hotels 100 - Frontend Design Info Pack

This document contains the core React components, CSS modules, and TypeScript interfaces that dictate the layout and styling of the application. It is intended for 3rd party review to propose a revamp of the landing page and core user flows.

## File: src/pages/Home.tsx

```tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, SectionHeader } from '../components/shared';
import { getIndexData } from '../data/api';
import { ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const [viewMode, setViewMode] = useState<'published' | 'internal'>('published');
  const indexData = getIndexData();

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Container variant="wide">
          <div className={styles.heroContent}>
            <span className={styles.editionMeta}>{indexData.edition} Edition</span>
            <h1 className={styles.heroTitle}>{indexData.title}</h1>
            <p className={styles.heroSubtitle}>
              A global index of the hotels that best combine hospitality, brand, pricing power and enduring asset value.
            </p>
          </div>
        </Container>
      </section>

      {/* Collections Section */}
      <section className={styles.section} style={{ paddingTop: '2rem' }}>
        <Container variant="wide">
          <div className={styles.tabToggle} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
            <button 
              onClick={() => setViewMode('published')} 
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: '0.5rem 1rem', 
                cursor: 'pointer',
                borderBottom: viewMode === 'published' ? '2px solid var(--accent)' : '2px solid transparent',
                color: viewMode === 'published' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontFamily: 'Inter',
                fontSize: '0.875rem'
              }}
            >
              Published Editions
            </button>
            <button 
              onClick={() => setViewMode('internal')} 
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: '0.5rem 1rem', 
                cursor: 'pointer',
                borderBottom: viewMode === 'internal' ? '2px solid var(--accent)' : '2px solid transparent',
                color: viewMode === 'internal' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontFamily: 'Inter',
                fontSize: '0.875rem'
              }}
            >
              Internal Research
            </button>
          </div>

          <div className={styles.heroActions}>
            {viewMode === 'published' ? (
              <>
                <Link to="/collections/the-global-100" className={styles.buttonLink}>
                  <Button variant="dark-primary">The Global 100</Button>
                </Link>
                <Link to="/collections/the-london-50" className={styles.buttonLink}>
                  <Button variant="dark-secondary">The London 50</Button>
                </Link>
                <Link to="/collections/the-new-york-50" className={styles.buttonLink}>
                  <Button variant="dark-secondary">The New York 50</Button>
                </Link>
                <Link to="/collections/the-zurich-25" className={styles.buttonLink}>
                  <Button variant="dark-secondary">The Zurich 25</Button>
                </Link>
                <Link to="/collections/the-accessible-50" className={styles.buttonLink}>
                  <Button variant="dark-secondary">The Accessible 50</Button>
                </Link>
                <Link to="/collections/the-london-accessible" className={styles.buttonLink}>
                  <Button variant="dark-secondary">The London Accessible (Under $500)</Button>
                </Link>
                <Link to="/collections/the-paris-25" className={styles.buttonLink}>
                  <Button variant="dark-secondary">The Paris 25</Button>
                </Link>
                <Link to="/collections/the-italian-and-swiss-lakes-35" className={styles.buttonLink}>
                  <Button variant="dark-secondary">The Italian & Swiss Lakes 35</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/collections/the-monaco-and-eastern-riviera-30" className={styles.buttonLink}>
                  <Button variant="dark-primary">Monaco & Eastern Riviera 30</Button>
                </Link>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* Featured Insight Section */}
      <section className={styles.section}>
        <Container variant="standard">
          <SectionHeader 
            title="Strategic Insights" 
            action={
              <Link to="/insights" className={styles.viewAll}>
                View all insights <ArrowRight size={16} />
              </Link>
            } 
          />
          
          <div className={styles.featuredInsight}>
            <div className={styles.insightContent}>
              <span className={styles.insightCategory}>Hotel Strategy</span>
              <h3 className={styles.insightTitle}>Why St Martins Lane Works</h3>
              <p className={styles.insightExcerpt}>
                A masterclass in extracting maximum rate from a highly constrained building through sheer force of design and atmosphere. How a 1999 concept remains a template for modern lifestyle hospitality.
              </p>
              <Link to="/hotels/st-martins-lane-london">
                <Button variant="primary">Read the Analysis</Button>
              </Link>
            </div>
            <div className={styles.insightImagePlaceholder}>
              {/* Image placeholder to emulate visual spec */}
              <span>Visual Demo Placeholder</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

```

## File: src/pages/Home.module.css

```css
.home {
  display: flex;
  flex-direction: column;
}

.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(18, 18, 18, 1)), url('/hero-bg.png');
  background-size: cover;
  background-position: center;
  text-align: center;
  padding: 4rem 0;
  margin-top: -64px; /* Pull up under header */
  padding-top: 64px;
}

.heroContent {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.editionMeta {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #FFFFFF;
  margin-bottom: 1.5rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.heroTitle {
  font-family: 'Times New Roman', serif;
  font-size: 4.5rem;
  font-weight: 400;
  line-height: 1.1;
  color: #FFFFFF;
  margin: 0 0 1.5rem 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.heroSubtitle {
  max-width: 700px;
  line-height: 1.4;
  margin-bottom: var(--space-7);
  color: #FFFFFF;
  text-shadow: 0 1px 5px rgba(0,0,0,0.5);
}

.heroActions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-7);
}

.buttonLink {
  text-decoration: none;
}

.prototypeNotice {
  border: 1px solid rgba(244, 240, 232, 0.2);
  padding: var(--space-4);
  max-width: 600px;
}

.prototypeNotice p {
  font-family: var(--font-sans);
  font-size: var(--type-small);
  color: var(--color-stone);
  margin: 0;
}

.section {
  padding: var(--space-9) 0;
}

.viewAll {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-sans);
  font-size: var(--type-small);
  color: var(--color-ink);
  text-decoration: none;
  font-weight: 500;
}

.viewAll:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.featuredInsight {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-7);
  background-color: var(--color-paper);
}

.insightContent {
  padding: var(--space-7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.insightCategory {
  font-family: var(--font-sans);
  font-size: var(--type-label);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-stone);
  margin-bottom: var(--space-3);
}

.insightTitle {
  font-family: var(--font-serif);
  font-size: var(--type-h2);
  line-height: 1.1;
  margin-bottom: var(--space-4);
}

.insightExcerpt {
  font-family: var(--font-sans);
  font-size: var(--type-body);
  color: var(--color-charcoal);
  margin-bottom: var(--space-5);
  line-height: 1.6;
}

.insightImagePlaceholder {
  background-color: var(--color-stone);
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-ivory);
  font-family: var(--font-sans);
  font-size: var(--type-small);
}

@media (max-width: 768px) {
  .hero {
    padding: var(--space-7) 0 var(--space-8);
  }
  
  .featuredInsight {
    grid-template-columns: 1fr;
  }
  
  .insightContent {
    padding: var(--space-5);
  }
}

```

## File: src/pages/CollectionIndex.tsx

```tsx
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Container } from '../components/shared';
import { RankedHotelItem } from '../components/index/RankedHotelItem';
import { getCollection } from '../data/api';
import styles from './CollectionIndex.module.css';

export const CollectionIndex: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = getCollection(slug || '');
  
  // Reset filters when changing collections
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [lensFilter, setLensFilter] = useState('All Lenses');
  const [amenityFilters, setAmenityFilters] = useState<string[]>([]);
  const [savedPresetActive, setSavedPresetActive] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dmw_saved_filters');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.slug === slug) {
          setSearch(parsed.search || '');
          setRegionFilter(parsed.regionFilter || 'All');
          setPriceFilter(parsed.priceFilter || 'All Prices');
          setLensFilter(parsed.lensFilter || 'All Lenses');
          setAmenityFilters(parsed.amenityFilters || []);
          setSavedPresetActive(true);
          return;
        }
      }
    } catch {
    }
    
    // Reset if no preset
    setSearch('');
    setRegionFilter('All');
    setPriceFilter('All Prices');
    setLensFilter('All Lenses');
    setAmenityFilters([]);
    setSavedPresetActive(false);
  }, [slug]);

  const savePreset = () => {
    localStorage.setItem('dmw_saved_filters', JSON.stringify({
      slug, search, regionFilter, priceFilter, lensFilter, amenityFilters
    }));
    setSavedPresetActive(true);
  };

  const clearPreset = () => {
    localStorage.removeItem('dmw_saved_filters');
    setSearch('');
    setRegionFilter('All');
    setPriceFilter('All Prices');
    setLensFilter('All Lenses');
    setAmenityFilters([]);
    setSavedPresetActive(false);
  };

  if (!collection) {
    return <Navigate to="/collections/the-global-100" replace />;
  }

  const allHotels = collection.hotels;
  
  const regions = ['All', ...Array.from(new Set(allHotels.map(h => h.location.region)))];
  
  const priceBands = [
    { label: 'All Prices', max: Infinity },
    { label: 'Under $500', max: 500 },
    { label: 'Under $1,000', max: 1000 },
    { label: 'Under $1,500', max: 1500 },
    { label: '$1,500+', min: 1500, max: Infinity }
  ];

  const strategicLenses = ['All Lenses', ...Array.from(new Set(allHotels.map(h => h.strategicLens).filter(Boolean)))];
  
  const amenityOptions = [
    { id: 'gym', label: 'Gym' },
    { id: 'parking', label: 'Parking' },
    { id: 'restaurant', label: 'Restaurant' }
  ];

  const toggleAmenity = (id: string) => {
    setAmenityFilters(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const filteredHotels = useMemo(() => {
    return allHotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(search.toLowerCase()) || 
                            hotel.location.city.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = regionFilter === 'All' || hotel.location.region === regionFilter;
      
      let matchesPrice = true;
      if (priceFilter !== 'All Prices') {
        const rate = hotel.indicativeRate?.amount || 0;
        const band = priceBands.find(b => b.label === priceFilter);
        if (band) {
          matchesPrice = rate > 0 && rate <= band.max && (band.min ? rate >= band.min : true);
        }
      }

      const matchesLens = lensFilter === 'All Lenses' || hotel.strategicLens === lensFilter;
      
      const matchesAmenities = amenityFilters.every(amenityId => {
        const amenity = hotel.essentialAmenities?.find(a => a.id === amenityId);
        return amenity && amenity.available === true;
      });

      return matchesSearch && matchesRegion && matchesPrice && matchesLens && matchesAmenities;
    });
  }, [allHotels, search, regionFilter, priceFilter, lensFilter, amenityFilters]);

  return (
    <div className={styles.page}>
      <Container variant="standard">
        <div className={styles.masthead}>
          <h1 className={styles.title}>{collection.title}</h1>
          <p className={styles.subtitle}>{collection.description}</p>
        </div>

        <div className={styles.controls}>
          <input 
            type="text" 
            placeholder="Search hotels or cities..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          
          <div className={styles.filtersContainer}>
            <div className={styles.filters}>
              {regions.map(region => (
                <button 
                  key={region}
                  className={`${styles.filterBtn} ${regionFilter === region ? styles.active : ''}`}
                  onClick={() => setRegionFilter(regionFilter === region && region !== 'All' ? 'All' : region)}
                >
                  {region}
                </button>
              ))}
            </div>
            
            <div className={styles.filters}>
              {priceBands.map(band => (
                <button 
                  key={band.label}
                  className={`${styles.filterBtn} ${priceFilter === band.label ? styles.active : ''}`}
                  onClick={() => setPriceFilter(priceFilter === band.label && band.label !== 'All Prices' ? 'All Prices' : band.label)}
                >
                  {band.label}
                </button>
              ))}
            </div>
            
            <div className={styles.filters}>
              {strategicLenses.map(lens => (
                <button 
                  key={lens as string}
                  className={`${styles.filterBtn} ${lensFilter === lens ? styles.active : ''}`}
                  onClick={() => setLensFilter(lensFilter === lens && lens !== 'All Lenses' ? 'All Lenses' : lens as string)}
                >
                  {lens}
                </button>
              ))}
            </div>

            <div className={styles.filters}>
              <span className={styles.filterLabel} style={{marginRight: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)'}}>Amenities:</span>
              {amenityOptions.map(opt => (
                <button 
                  key={opt.id}
                  className={`${styles.filterBtn} ${amenityFilters.includes(opt.id) ? styles.active : ''}`}
                  onClick={() => toggleAmenity(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            
            <div className={styles.filters} style={{ marginLeft: 'auto' }}>
              {!savedPresetActive ? (
                <button onClick={savePreset} style={{ fontSize: '0.875rem', textDecoration: 'underline', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Save Preset
                </button>
              ) : (
                <button onClick={clearPreset} style={{ fontSize: '0.875rem', textDecoration: 'underline', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Clear Preset
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.resultsCount}>
          Showing {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'}
          {regionFilter !== 'All' && ` in ${regionFilter}`}
          {priceFilter !== 'All Prices' && ` (${priceFilter.toLowerCase()})`}
          {search && ` matching "${search}"`}
        </div>

        <div className={styles.list}>
          {filteredHotels.length > 0 ? (
            filteredHotels.map(hotel => (
              <RankedHotelItem key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <div className={styles.empty}>
              <p>No hotels match your filters.</p>
              <button onClick={() => {setSearch(''); setRegionFilter('All');}} className={styles.resetBtn}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

```

## File: src/pages/CollectionIndex.module.css

```css
.page {
  padding: var(--space-7) 0 var(--space-9);
}

.masthead {
  margin-bottom: var(--space-7);
  max-width: 800px;
}

.title {
  font-family: var(--font-serif);
  font-size: var(--type-h1);
  margin-bottom: var(--space-4);
  line-height: 1;
}

.subtitle {
  font-family: var(--font-sans);
  font-size: var(--type-body-lg);
  color: var(--color-stone);
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-ink);
  gap: var(--space-5);
  flex-wrap: wrap;
}

.searchInput {
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--type-body);
  border: 1px solid rgba(18, 18, 18, 0.2);
  border-radius: 2px;
  width: 100%;
  max-width: 300px;
  background-color: transparent;
}

.searchInput:focus {
  outline: none;
  border-color: var(--color-ink);
}

.filtersContainer {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: flex-end;
}

.filters {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  justify-content: flex-end;
}

.filterBtn {
  font-family: var(--font-sans);
  font-size: var(--type-small);
  padding: var(--space-1) var(--space-3);
  border: 1px solid rgba(18, 18, 18, 0.2);
  border-radius: 2px;
  background: transparent;
  color: var(--color-ink);
  transition: all 0.2s ease;
}

.filterBtn:hover {
  border-color: var(--color-ink);
}

.filterBtn.active {
  background: var(--color-ink);
  color: var(--color-ivory);
  border-color: var(--color-ink);
}

.list {
  display: flex;
  flex-direction: column;
}

.resultsCount {
  font-family: var(--font-sans);
  font-size: var(--type-small);
  color: var(--color-stone);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid rgba(18, 18, 18, 0.05);
}

.empty {
  padding: var(--space-8) 0;
  text-align: center;
  color: var(--color-stone);
}

.resetBtn {
  margin-top: var(--space-3);
  color: var(--color-ink);
  text-decoration: underline;
  text-underline-offset: 4px;
}

```

## File: src/pages/HotelProfile.tsx

```tsx
import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container, Badge, IconLabel, SectionHeader, Button } from '../components/shared';
import { PriceCurveChart } from '../components/hotel/PriceCurveChart';
import { Scorecard } from '../components/hotel/Scorecard';
import { BlackbookActions } from '../components/hotel/BlackbookActions';
import { SpecialPackages } from '../components/hotel/SpecialPackages';
import { InsiderReport } from '../components/hotel/InsiderReport';
import { getHotelProfile, getCollection } from '../data/api';
import styles from './HotelProfile.module.css';

export const HotelProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const collectionSlug = location.state?.collectionSlug || 'the-global-100';
  
  const hotel = getHotelProfile(slug || '');
  const collection = getCollection(collectionSlug);

  let prevHotel = null;
  let nextHotel = null;
  if (collection && hotel) {
    const currentIndex = collection.hotels.findIndex(h => h.id === hotel.id);
    if (currentIndex > 0) prevHotel = collection.hotels[currentIndex - 1];
    if (currentIndex < collection.hotels.length - 1) nextHotel = collection.hotels[currentIndex + 1];
  }

  if (!hotel) {
    return (
      <Container variant="standard" className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <h2>Profile in Preparation</h2>
          <p>The comprehensive DMW assessment for this property is currently being compiled.</p>
          <Link to={`/collections/${collectionSlug}`} className={styles.backLink}>
            <ArrowLeft size={16} /> Back to {collection ? collection.title : 'Index'}
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <article className={styles.profile}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <Container variant="standard">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <Link to={`/collections/${collectionSlug}`} className={styles.backLink} style={{ margin: 0 }}>
              <ArrowLeft size={16} /> Back to {collection ? collection.title : 'Index'}
            </Link>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              {prevHotel && (
                <Link 
                  to={prevHotel.profileUrl} 
                  state={{ collectionSlug }} 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                >
                  <ChevronLeft size={16} /> Previous
                </Link>
              )}
              {nextHotel && (
                <Link 
                  to={nextHotel.profileUrl} 
                  state={{ collectionSlug }} 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                >
                  Next <ChevronRight size={16} />
                </Link>
              )}
            </div>
          </div>
          
          <div className={styles.heroContent}>
            <span className={styles.rankBadge}>DMW 100 • No. {hotel.rank}</span>
            <h1 className={styles.title}>{hotel.name}</h1>
            
            <BlackbookActions hotelId={hotel.id} />
            
            <p className={styles.location}>
              <MapPin size={18} /> {hotel.location.displayLocation}
            </p>
            {hotel.inclusionRationale && (
              <div className={styles.heroRationale}>
                <Quote size={20} className={styles.rationaleIcon} strokeWidth={1.5} />
                <p>{hotel.inclusionRationale}</p>
              </div>
            )}
          </div>
        </Container>
      </header>

      <Container variant="reading" className={styles.mainContent}>
        {/* Fact Grid (Property Intelligence) moved before overview */}
        <section className={styles.section}>
          <SectionHeader title="Property Intelligence" />
          <div className={styles.factGrid}>
            <IconLabel iconName="Target" label="Strategic Lens" value={hotel.strategicLens} />
            <IconLabel iconName="Building" label="Archetype" value={hotel.archetype} />
            <IconLabel iconName="Calendar" label="Opened" value={hotel.propertyFacts.openingYear?.toString()} />
            <IconLabel iconName="BedDouble" label="Rooms" value={hotel.propertyFacts.roomCount?.toString()} />
            <IconLabel iconName="Users" label="Operator" value={hotel.identity.brand || hotel.identity.operator} />
            <IconLabel iconName="Key" label="Ownership" value={hotel.identity.owner} />
            <IconLabel iconName="MapPin" label="Neighbourhood" value={hotel.location.neighbourhood} />
          </div>
        </section>

        {/* Core Thesis / Overview moved after Property Intelligence */}
        <section className={styles.section}>
          <p className={styles.overviewText}>{hotel.dmwOverview}</p>
        </section>

        {/* Editorial Sections */}

        {hotel.analysis && (
          <section className={styles.section}>
            <SectionHeader title="Strategic Analysis" />
            <div className={styles.prose}>
              {hotel.analysis.hospitalityProposition && (
                <>
                  <h3>Hospitality Proposition</h3>
                  <p>{hotel.analysis.hospitalityProposition}</p>
                </>
              )}
              {hotel.analysis.revenueStrategy && (
                <>
                  <h3>Revenue Strategy</h3>
                  <p>{hotel.analysis.revenueStrategy}</p>
                </>
              )}
            </div>
          </section>
        )}

        {/* Scorecard */}
        {hotel.scores && (
          <section className={styles.section}>
            <Scorecard scores={hotel.scores} />
          </section>
        )}

        {/* Pricing Intelligence */}
        {hotel.pricingIntelligence && (
          <section className={styles.section}>
            <SectionHeader 
              title="Pricing Intelligence" 
              subtitle="Observation of publicly available forward rates to identify pricing power and revenue strategy."
            />
            <PriceCurveChart pricing={hotel.pricingIntelligence} />
          </section>
        )}

        {/* Optional firsthand note; never part of ranking or profile completeness. */}
        {hotel.fieldReports && hotel.fieldReports.length > 0 && (
          <section className={styles.section}>
            <SectionHeader title="A Note From Our Stay" />
            {hotel.fieldReports.map(report => (
              <div key={report.id} className={styles.fieldReport}>
                <div className={styles.reportHeader}>
                  <Badge label="Field Report" type="field-report" />
                  <span className={styles.reportDate}>{report.visitDate}</span>
                </div>
                <div className={styles.reportGrid}>
                  <div>
                    <span className={styles.reportLabel}>Arrival</span>
                    <p className={styles.reportText}>{report.arrivalObservation}</p>
                  </div>
                  <div>
                    <span className={styles.reportLabel}>Room</span>
                    <p className={styles.reportText}>{report.roomObservation}</p>
                  </div>
                  <div>
                    <span className={styles.reportLabel}>Service</span>
                    <p className={styles.reportText}>{report.serviceObservation}</p>
                  </div>
                  <div>
                    <span className={styles.reportLabel}>Atmosphere</span>
                    <p className={styles.reportText}>{report.atmosphereObservation}</p>
                  </div>
                </div>
                
                <div className={styles.reportVerdict}>
                  <div>
                    <span className={styles.reportLabel}>What Worked</span>
                    <p className={styles.reportText}>{report.whatWorked}</p>
                  </div>
                  <div>
                    <span className={styles.reportLabel}>What Disappointed</span>
                    <p className={styles.reportText}>{report.whatDisappointed}</p>
                  </div>
                </div>

                <div className={styles.thesisSection}>
                  <span className={styles.reportLabel}>Thesis Confirmation</span>
                  <p className={styles.thesisText}>{report.thesisConfirmation}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {hotel.specialPackages && hotel.specialPackages.length > 0 && (
          <SpecialPackages packages={hotel.specialPackages} />
        )}

        {hotel.insiderReport && (
          <InsiderReport report={hotel.insiderReport} />
        )}

        {/* Action */}
        {hotel.links?.officialWebsite && (
          <section className={styles.section}>
            <a 
              href={hotel.links.officialWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.buttonLink}
            >
              <Button external>
                Visit Official Website
              </Button>
            </a>
          </section>
        )}
      </Container>
    </article>
  );
};

```

## File: src/pages/HotelProfile.module.css

```css
.profile {
  padding-bottom: var(--space-9);
}

.notFound {
  padding: var(--space-9) 0;
}

.notFoundContent {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.notFoundContent h2 {
  margin-bottom: var(--space-4);
}

.notFoundContent p {
  color: var(--color-stone);
  margin-bottom: var(--space-6);
}

.heroRationale {
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  border-top: 1px solid rgba(255, 255, 250, 0.15);
}

.rationaleIcon {
  color: var(--color-antique-gold);
  flex-shrink: 0;
  margin-top: 2px;
}

.heroRationale p {
  font-family: var(--font-sans);
  font-size: var(--type-body-lg);
  color: rgba(255, 255, 250, 0.85); /* Ivory with slight opacity */
  margin: 0;
  max-width: 650px;
  line-height: 1.5;
}

.hero {
  background-color: var(--color-ink);
  color: var(--color-ivory);
  padding: var(--space-6) 0 var(--space-8);
  margin-bottom: var(--space-8);
}

.backLink {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: inherit;
  text-decoration: none;
  font-family: var(--font-sans);
  font-size: var(--type-small);
  opacity: 0.8;
  margin-bottom: var(--space-6);
  transition: opacity 0.2s ease;
}

.backLink:hover {
  opacity: 1;
}

.heroContent {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.heroMeta {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

/* Ensure badges in dark hero are readable */
.heroMeta span {
  border-color: rgba(244, 240, 232, 0.4);
  color: var(--color-ivory);
}

.heroMeta span:first-child {
  background-color: var(--color-ivory);
  color: var(--color-ink);
  border-color: transparent;
}

.title {
  font-family: var(--font-serif);
  font-size: var(--type-display-lg);
  line-height: 1;
  margin: 0;
}

.location {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--type-body-lg);
  opacity: 0.9;
}

.mainContent {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.overviewText {
  font-family: var(--font-serif);
  font-size: var(--type-h3);
  line-height: 1.4;
  color: var(--color-ink);
}

.factGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
}

.prose {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.prose h3 {
  font-family: var(--font-sans);
  font-size: var(--type-body);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-ink);
}

.prose p {
  font-family: var(--font-sans);
  font-size: var(--type-body);
  color: var(--color-charcoal);
  line-height: 1.6;
}

/* Field Report */
.fieldReport {
  background-color: var(--color-paper);
  border: 1px solid rgba(18, 18, 18, 0.1);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.reportHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--space-4);
  border-bottom: 1px solid rgba(18, 18, 18, 0.1);
}

.reportDate {
  font-family: var(--font-sans);
  font-size: var(--type-small);
  color: var(--color-stone);
}

.reportGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
}

.reportVerdict {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
  padding-top: var(--space-5);
  border-top: 1px dashed rgba(18, 18, 18, 0.2);
}

.reportLabel {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--type-label);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-stone);
  margin-bottom: var(--space-2);
}

.reportText {
  font-family: var(--font-sans);
  font-size: var(--type-small);
  line-height: 1.5;
  color: var(--color-ink);
}

.thesisSection {
  background-color: var(--color-ivory);
  padding: var(--space-4);
  border-left: 2px solid var(--color-antique-gold);
}

.thesisText {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  line-height: 1.4;
  color: var(--color-ink);
}

@media (max-width: 768px) {
  .factGrid {
    grid-template-columns: 1fr;
  }
  
  .reportGrid, .reportVerdict {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
}

```

## File: src/data/types.ts

```tsx
export type Archetype = 
  | 'Urban Grand Hotel'
  | 'Urban Lifestyle Hotel'
  | 'Urban Resort'
  | 'Resort'
  | 'Heritage Hotel'
  | 'Boutique Hotel'
  | 'Wellness Retreat'
  | 'Wilderness Lodge'
  | 'Private-Island Hotel'
  | 'Members-Club Hybrid'
  | 'Branded Residence Ecosystem';

export type Distinction = 
  | 'Best for Business Travel'
  | 'Pricing Power'
  | 'Hospitality Ecosystem'
  | 'Independent Excellence'
  | 'Urban Resort'
  | 'Best Repositioning'
  | 'Best New Hotel'
  | 'Best Hotel Restaurant'
  | 'Most Investable Hospitality Concept'
  | 'DMW One to Watch';

export interface Location {
  city: string;
  country: string;
  countryCode?: string | null;
  region: 'Europe' | 'North America' | 'Latin America and Caribbean' | 'Middle East' | 'Africa' | 'Asia' | 'Oceania';
  neighbourhood?: string | null;
  displayLocation: string;
  addressLine1?: string | null;
  addressLine2?: string | null;
  stateOrProvince?: string | null;
  postalCode?: string | null;
}

export interface Amenity {
  id: string;
  label: string;
  icon?: string | null; // Lucide icon name
  category?: 'Food and Drink' | 'Wellness' | 'Business' | 'Transport' | 'Rooms' | 'Family' | 'Accessibility' | 'Leisure' | 'Other';
  available?: boolean;
  detail?: string | null;
  venueName?: string | null;
}

export interface Image {
  id: string;
  url: string;
  alt: string;
  caption?: string | null;
  credit?: string | null;
  isHero?: boolean;
}

export interface DimensionScore {
  label: string;
  score: number;
  maxScore: number;
  weight: number; // percentage (e.g., 15)
}

export interface Scorecard {
  totalScore: number;
  dimensions: DimensionScore[];
  confidence: 'DMW Researched' | 'DMW Visited' | 'DMW Revisited';
}

export interface HotelSummary {
  id: string;
  slug: string;
  edition: number;
  rank: number;
  rankStatus?: 'illustrative' | 'final';
  name: string;
  location: Location;
  archetype: Archetype;
  publicationStatus: 'draft' | 'review' | 'published' | 'archived' | 'prototype-ready' | 'research-draft';
  featured: boolean;
  strategicLens?: string;
  dmwJudgement?: string | null;
  assessmentPendingLabel?: string | null;
  indicativeRate?: {
    currency: string;
    amount: number;
    label: string;
    basis: string;
  } | null;
  businessTravelSuitability?: string;
  scores?: Scorecard | null;
  essentialAmenities: Amenity[];
  distinctions: Distinction[];
  hasFieldReport?: boolean;
  hasStrategicFeature: boolean;
  hasPricingAnalysis: boolean;
  primaryImage?: Image | null;
  profileUrl: string;
  articleUrl?: string | null;
}

export interface FieldReport {
  id: string;
  visitDate: string; // YYYY-MM
  nights: number;
  approximateRatePaid?: number | null;
  currency?: string | null;
  roomCategory?: string | null;
  travelPurpose?: string | null;
  arrivalObservation: string;
  roomObservation: string;
  serviceObservation: string;
  atmosphereObservation: string;
  amenitiesUsed: string[];
  whatWorked: string;
  whatDisappointed: string;
  returnIntention: string;
  thesisConfirmation: string;
}

export interface PricePoint {
  date: string; // YYYY-MM-DD
  rate: number;
  available?: boolean | null;
  roomCategory?: string | null;
  rateType?: string | null;
  notes?: string | null;
  tenor?: string | null;
}

export interface EventMarker {
  date: string;
  label: string;
  eventType?: string | null;
}

export interface PricingIntelligence {
  status: 'not-started' | 'collecting' | 'complete';
  currency?: string | null;
  roomBasis?: string | null;
  occupancyBasis?: string | null;
  taxesIncluded?: boolean | null;
  observationStart?: string | null;
  observationEnd?: string | null;
  collectionDate?: string | null;
  sourceMethod?: string | null;
  medianObservedRate?: number | null;
  lowestObservedRate?: number | null;
  highestObservedRate?: number | null;
  bestValuePeriod?: string | null;
  peakPeriod?: string | null;
  weekdayWeekendObservation?: string | null;
  dmwInterpretation?: string | null;
  dataPoints: PricePoint[];
  eventMarkers: EventMarker[];
  limitations?: string | null;
}

export interface SpecialPackage {
  id: string;
  title: string;
  description: string;
  price?: number | null;
  currency?: string | null;
  validity?: string | null;
  imageUrl?: string | null;
  linkUrl?: string | null;
}

export interface InsiderReport {
  unGoogleableHistory?: string | null;
  operationalQuirks?: string | null;
  famousGuests?: string | null;
  theTrueBestRoom?: string | null;
  powerDynamics?: string | null;
}

// Full profile, combining summary fields + schema requirements for the profile page
export interface HotelProfile extends Omit<HotelSummary, 'essentialAmenities'> {
  dmwOverview?: string | null;
  inclusionRationale?: string | null;
  centralStrength?: string | null;
  centralQuestion?: string | null;
  bestSuitedFor: string[];
  
  identity: {
    brand?: string | null;
    collection?: string | null;
    operator?: string | null;
    owner?: string | null;
    ownershipPubliclyConfirmed: boolean;
    designer?: string | null;
    architect?: string | null;
  };
  
  propertyFacts: {
    openingYear?: number | null;
    lastMajorRenovationYear?: number | null;
    roomCount?: number | null;
    suiteCount?: number | null;
    checkInTime?: string | null;
    checkOutTime?: string | null;
    propertyType?: string | null;
    seasonality?: string | null;
  };
  
  rates: {
    currency?: string | null;
    indicativeFrom?: number | null;
    indicativeTo?: number | null;
    typicalRate?: number | null;
    rateLabel?: string | null;
    taxesIncluded?: boolean | null;
    rateBasis?: string | null;
    rateObservedAt?: string | null;
  };

  amenities: Amenity[];
  
  venues: Array<{
    name: string;
    type: string;
    description?: string | null;
    strategicRole?: string | null;
    mealPeriods: string[];
    attractsNonResidents?: boolean | null;
    recognition?: string | null;
    officialUrl?: string | null;
  }>;
  
  analysis: {
    hospitalityProposition?: string | null;
    atmosphere?: string | null;
    intendedClientele?: string | null;
    designLogic?: string | null;
    locationLogic?: string | null;
    hospitalityStrategy?: string | null;
    revenueStrategy?: string | null;
    pricingPowerThesis?: string | null;
    assetLogic?: string | null;
    competitiveMoat?: string | null;
    strategicOpportunity?: string | null;
    investorQuestion?: string | null;
  };
  
  businessTravel: {
    summary?: string | null;
    suitability?: 'Exceptional' | 'Strong' | 'Good' | 'Limited' | 'Not Assessed' | null;
    locationEfficiency?: string | null;
    workspace?: string | null;
    connectivity?: string | null;
    meetingSuitability?: string | null;
    privacy?: string | null;
    sleepAndNoise?: string | null;
    serviceSpeed?: string | null;
    breakfastPracticality?: string | null;
    soloTravellerSuitability?: string | null;
  };
  
  rooms: {
    summary?: string | null;
    minimumSizeSqm?: number | null;
    maximumStandardRoomSizeSqm?: number | null;
    categories: string[];
    workspace?: string | null;
    storage?: string | null;
    bathroom?: string | null;
    lighting?: string | null;
    technology?: string | null;
    views?: string | null;
    spatialStrength?: string | null;
    spatialCompromise?: string | null;
  };

  pricingIntelligence?: PricingIntelligence | null;
  insiderReport?: InsiderReport | null;
  
  competitiveSet: Array<{
    hotelId?: string | null;
    name: string;
    location?: string | null;
    relativePricePosition?: string | null;
    locationDifference?: string | null;
    amenityDifference?: string | null;
    brandDifference?: string | null;
    dmwInterpretation?: string | null;
  }>;

  fieldReports: FieldReport[];
  images: Image[];
  specialPackages?: SpecialPackage[] | null;
  
  links: {
    officialWebsite?: string | null;
    bookingUrl?: string | null;
    pressPage?: string | null;
  };
  
  sources: Array<{
    type: 'official' | 'third-party' | 'financial' | 'pricing' | 'other';
    name: string;
    url?: string | null;
    dateAccessed?: string | null;
    notes?: string | null;
  }>;
}

export interface IndexData {
  edition: number;
  editionStatus: string;
  title: string;
  publisher: string;
  prototypeNotice: string;
  hotels: HotelSummary[];
}

export interface Collection {
  slug: string;
  title: string;
  edition: string;
  description: string;
  hotels: HotelSummary[];
}

```

