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

  useEffect(() => {
    setSearch('');
    setRegionFilter('All');
    setPriceFilter('All Prices');
  }, [slug]);

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

      return matchesSearch && matchesRegion && matchesPrice;
    });
  }, [allHotels, search, regionFilter, priceFilter]);

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
                  onClick={() => setRegionFilter(region)}
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
                  onClick={() => setPriceFilter(band.label)}
                >
                  {band.label}
                </button>
              ))}
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
