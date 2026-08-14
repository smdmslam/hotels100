import React, { useState, useMemo } from 'react';
import { Container } from '../components/shared';
import { RankedHotelItem } from '../components/index/RankedHotelItem';
import { getAllHotels, getIndexData } from '../data/api';
import styles from './The100.module.css';

export const The100: React.FC = () => {
  const allHotels = getAllHotels();
  const indexData = getIndexData();
  
  // Basic state for filtering/sorting
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  
  const regions = ['All', ...Array.from(new Set(allHotels.map(h => h.location.region)))];

  const filteredHotels = useMemo(() => {
    return allHotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(search.toLowerCase()) || 
                            hotel.location.city.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = regionFilter === 'All' || hotel.location.region === regionFilter;
      return matchesSearch && matchesRegion;
    });
  }, [allHotels, search, regionFilter]);

  return (
    <div className={styles.page}>
      <Container variant="standard">
        <div className={styles.masthead}>
          <h1 className={styles.title}>{indexData.title}</h1>
          <p className={styles.subtitle}>
            The provisional {indexData.edition} ranking, assessed through hospitality strategy,
            amenities, pricing power, brand position and enduring asset value.
          </p>
        </div>

        <div className={styles.controls}>
          <input 
            type="text" 
            placeholder="Search hotels or cities..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
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
        </div>

        <div className={styles.resultsCount}>
          Showing {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'}
          {regionFilter !== 'All' && ` in ${regionFilter}`}
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
