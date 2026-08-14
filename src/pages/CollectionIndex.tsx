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
