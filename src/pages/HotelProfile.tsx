import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHotelProfile } from '../data/api';
import { Container, Badge, IconLabel, SectionHeader, Button } from '../components/shared';
import { PriceCurveChart } from '../components/hotel/PriceCurveChart';
import { ArrowLeft, MapPin } from 'lucide-react';
import styles from './HotelProfile.module.css';

export const HotelProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const hotel = getHotelProfile(slug || '');

  if (!hotel) {
    return (
      <Container variant="standard" className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <h2>Profile in Preparation</h2>
          <p>The comprehensive DMW assessment for this property is currently being compiled.</p>
          <Link to="/the-100" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Index
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
          <Link to="/the-100" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Index
          </Link>
          
          <div className={styles.heroContent}>
            <div className={styles.heroMeta}>
              <Badge label={`Rank ${hotel.rank}`} type="edition" />
            </div>
            <h1 className={styles.title}>{hotel.name}</h1>
            <p className={styles.location}>
              <MapPin size={18} /> {hotel.location.displayLocation}
            </p>
          </div>
        </Container>
      </header>

      <Container variant="reading" className={styles.mainContent}>
        {/* Core Thesis / Overview */}
        <section className={styles.section}>
          <p className={styles.overviewText}>{hotel.dmwOverview}</p>
        </section>

        {/* Fact Grid */}
        <section className={styles.section}>
          <SectionHeader title="Property Intelligence" />
          <div className={styles.factGrid}>
            <IconLabel iconName="Building" label="Archetype" value={hotel.archetype} />
            <IconLabel iconName="Calendar" label="Opened" value={hotel.propertyFacts.openingYear?.toString()} />
            <IconLabel iconName="BedDouble" label="Rooms" value={hotel.propertyFacts.roomCount?.toString()} />
            <IconLabel iconName="Users" label="Operator" value={hotel.identity.brand || hotel.identity.operator} />
            <IconLabel iconName="Key" label="Ownership" value={hotel.identity.owner} />
            <IconLabel iconName="MapPin" label="Neighbourhood" value={hotel.location.neighbourhood} />
          </div>
        </section>

        {/* Editorial Sections */}
        {hotel.inclusionRationale && (
          <section className={styles.section}>
            <SectionHeader title="DMW Rationale" />
            <div className={styles.prose}>
              <p>{hotel.inclusionRationale}</p>
            </div>
          </section>
        )}

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
