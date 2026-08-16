import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container, Badge, IconLabel, SectionHeader, Button } from '../components/shared';
import { PriceCurveChart } from '../components/hotel/PriceCurveChart';
import { Scorecard } from '../components/hotel/Scorecard';
import { BlackbookActions } from '../components/hotel/BlackbookActions';
import { SpecialPackages } from '../components/hotel/SpecialPackages';
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
