import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Container } from '../components/shared';
import { RankedHotelItem } from '../components/index/RankedHotelItem';
import { getCollection } from '../data/api';
import styles from './CollectionIndex.module.css';

const PRICE_BANDS = [
  { label: 'All prices', min: 0, max: Infinity },
  { label: 'Under $500', min: 0, max: 500 },
  { label: 'Under $1,000', min: 0, max: 1000 },
  { label: 'Under $1,500', min: 0, max: 1500 },
  { label: '$1,500+', min: 1500, max: Infinity },
];

const AMENITIES = [
  { id: 'gym', label: 'Gym' },
  { id: 'parking', label: 'Parking' },
  { id: 'restaurant', label: 'Restaurant' },
];

export const CollectionIndex: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const collection = getCollection(slug);
  const allHotels = collection?.hotels ?? [];

  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('All regions');
  const [priceFilter, setPriceFilter] = useState('All prices');
  const [lensFilter, setLensFilter] = useState('All lenses');
  const [amenityFilters, setAmenityFilters] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [savedPresetActive, setSavedPresetActive] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dmw_saved_filters');
      const parsed = saved ? JSON.parse(saved) : null;

      if (parsed?.slug === slug) {
        setSearch(parsed.search || '');
        setRegionFilter(parsed.regionFilter || 'All regions');
        setPriceFilter(parsed.priceFilter || 'All prices');
        setLensFilter(parsed.lensFilter || 'All lenses');
        setAmenityFilters(parsed.amenityFilters || []);
        setSavedPresetActive(true);
        return;
      }
    } catch {
      // A malformed local preset should never block the collection.
    }

    setSearch('');
    setRegionFilter('All regions');
    setPriceFilter('All prices');
    setLensFilter('All lenses');
    setAmenityFilters([]);
    setSavedPresetActive(false);
    setFiltersOpen(false);
  }, [slug]);

  const regions = useMemo(
    () => ['All regions', ...Array.from(new Set(allHotels.map((hotel) => hotel.location.region).filter(Boolean)))],
    [allHotels],
  );

  const lenses = useMemo(
    () => ['All lenses', ...Array.from(new Set(allHotels.map((hotel) => hotel.strategicLens).filter(Boolean)))],
    [allHotels],
  );

  const filteredHotels = useMemo(() => {
    const query = search.trim().toLowerCase();
    const selectedBand = PRICE_BANDS.find((band) => band.label === priceFilter);

    return allHotels.filter((hotel) => {
      const matchesSearch =
        !query ||
        hotel.name.toLowerCase().includes(query) ||
        hotel.location.city.toLowerCase().includes(query) ||
        hotel.location.displayLocation.toLowerCase().includes(query);

      const matchesRegion =
        regionFilter === 'All regions' || hotel.location.region === regionFilter;

      const rate = hotel.indicativeRate?.amount;
      const matchesPrice =
        !selectedBand ||
        selectedBand.label === 'All prices' ||
        (typeof rate === 'number' && rate >= selectedBand.min && rate <= selectedBand.max);

      const matchesLens =
        lensFilter === 'All lenses' || hotel.strategicLens === lensFilter;

      const matchesAmenities = amenityFilters.every((amenityId) =>
        hotel.essentialAmenities?.some(
          (amenity) => amenity.id === amenityId && amenity.available === true,
        ),
      );

      return matchesSearch && matchesRegion && matchesPrice && matchesLens && matchesAmenities;
    });
  }, [allHotels, search, regionFilter, priceFilter, lensFilter, amenityFilters]);

  if (!collection) {
    return <Navigate to="/collections/the-global-100" replace />;
  }

  const activeFilterCount =
    Number(regionFilter !== 'All regions') +
    Number(priceFilter !== 'All prices') +
    Number(lensFilter !== 'All lenses') +
    amenityFilters.length;

  const toggleAmenity = (id: string) => {
    setAmenityFilters((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const clearFilters = () => {
    setSearch('');
    setRegionFilter('All regions');
    setPriceFilter('All prices');
    setLensFilter('All lenses');
    setAmenityFilters([]);
  };

  const savePreset = () => {
    localStorage.setItem(
      'dmw_saved_filters',
      JSON.stringify({ slug, search, regionFilter, priceFilter, lensFilter, amenityFilters }),
    );
    setSavedPresetActive(true);
  };

  const clearPreset = () => {
    localStorage.removeItem('dmw_saved_filters');
    clearFilters();
    setSavedPresetActive(false);
  };

  return (
    <main className={styles.page}>
      <header className={styles.masthead}>
        <Container variant="wide">
          <span className={styles.editionLabel}>DMW Hotels 100 · 2026 Edition</span>
          <div className={styles.mastheadGrid}>
            <h1 className={styles.title}>{collection.title}</h1>
            <div className={styles.mastheadAside}>
              <p className={styles.subtitle}>{collection.description}</p>
              <div className={styles.collectionMeta}>
                <span>{allHotels.length} hotels</span>
                <span>Independently assessed</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section className={styles.discovery} aria-label="Search and filter hotels">
        <Container variant="wide">
          <div className={styles.discoveryBar}>
            <label className={styles.searchField}>
              <span className="visually-hidden">Search hotels or cities</span>
              <span className={styles.searchMark} aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search hotels or cities"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <div className={styles.discoveryActions}>
              <button
                type="button"
                className={`${styles.filterToggle} ${filtersOpen ? styles.filterToggleActive : ''}`}
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
              >
                Filters {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
              </button>
              <button type="button" className={styles.askButton} disabled>
                <span>Ask DMW</span>
                <small>Coming soon</small>
              </button>
            </div>
          </div>

          {filtersOpen && (
            <div className={styles.filterPanel}>
              <label className={styles.selectField}>
                <span>Region</span>
                <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}>
                  {regions.map((region) => <option key={region} value={region}>{region}</option>)}
                </select>
              </label>

              <label className={styles.selectField}>
                <span>Price</span>
                <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
                  {PRICE_BANDS.map((band) => <option key={band.label} value={band.label}>{band.label}</option>)}
                </select>
              </label>

              <label className={styles.selectField}>
                <span>Strategic lens</span>
                <select value={lensFilter} onChange={(event) => setLensFilter(event.target.value)}>
                  {lenses.map((lens) => <option key={lens} value={lens}>{lens}</option>)}
                </select>
              </label>

              <fieldset className={styles.amenityField}>
                <legend>Amenities</legend>
                <div>
                  {AMENITIES.map((amenity) => (
                    <button
                      type="button"
                      key={amenity.id}
                      className={amenityFilters.includes(amenity.id) ? styles.amenityActive : ''}
                      onClick={() => toggleAmenity(amenity.id)}
                      aria-pressed={amenityFilters.includes(amenity.id)}
                    >
                      {amenity.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className={styles.filterUtilities}>
                <button type="button" onClick={clearFilters}>Reset filters</button>
                <button type="button" onClick={savedPresetActive ? clearPreset : savePreset}>
                  {savedPresetActive ? 'Clear saved view' : 'Save this view'}
                </button>
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className={styles.results}>
        <Container variant="wide">
          <div className={styles.resultsHeader}>
            <span>
              Showing <strong>{filteredHotels.length}</strong> of {allHotels.length} hotels
            </span>
            {activeFilterCount > 0 && (
              <button type="button" onClick={clearFilters}>Clear filters</button>
            )}
          </div>

          <div className={styles.list}>
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => <RankedHotelItem key={hotel.id} hotel={hotel} />)
            ) : (
              <div className={styles.empty}>
                <h2>No matching hotels</h2>
                <p>Try broadening the location, price or strategic lens.</p>
                <button type="button" onClick={clearFilters}>Reset all filters</button>
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
};
