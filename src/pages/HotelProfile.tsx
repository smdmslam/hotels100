import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BedDouble,
  Building2,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Coffee,
  ConciergeBell,
  Dumbbell,
  FileText,
  KeyRound,
  MapPin,
  PawPrint,
  Snowflake,
  Sparkles,
  Target,
  Utensils,
  Waves,
  Wifi,
  Wine,
  Zap,
} from 'lucide-react';
import { Container, IconLabel } from '../components/shared';
import { PriceCurveChart } from '../components/hotel/PriceCurveChart';
import { Scorecard } from '../components/hotel/Scorecard';
import { BlackbookActions } from '../components/hotel/BlackbookActions';
import { SpecialPackages } from '../components/hotel/SpecialPackages';
import { InsiderReport } from '../components/hotel/InsiderReport';
import { getCollection, getHotelProfile } from '../data/api';
import styles from './HotelProfile.module.css';

type ProfileSection =
  | 'assessment'
  | 'insider'
  | 'stay'
  | 'property'
  | 'scorecard'
  | 'pricing';

const SECTION_LABELS: Record<ProfileSection, string> = {
  assessment: 'Hotel Assessment',
  insider: 'Insider View',
  stay: 'Stay Essentials',
  property: 'Property & Ownership',
  scorecard: 'Scorecard',
  pricing: 'Pricing Intelligence',
};

const SECTION_DESCRIPTIONS: Record<ProfileSection, string> = {
  assessment: 'Strategic analysis, field notes & thesis',
  insider: 'Secret lore, quirks, best rooms & clientele',
  stay: 'Amenities, packages & direct booking',
  property: 'Specs, rooms, operator & asset facts',
  scorecard: 'DMW score & dimension weights',
  pricing: 'Forward rates & seasonal value windows',
};

const AMENITY_ICONS: Record<string, React.ElementType> = {
  gym: Dumbbell,
  fitness: Dumbbell,
  parking: Car,
  restaurant: Utensils,
  wifi: Wifi,
  breakfast: Coffee,
  spa: Sparkles,
  pool: Waves,
  'pet-friendly': PawPrint,
  pets: PawPrint,
  'air-conditioning': Snowflake,
  ac: Snowflake,
  concierge: ConciergeBell,
  bar: Wine,
  'room-service': Utensils,
  'ev-charging': Zap,
};

const DEFAULT_LUXURY_FACILITIES = [
  { id: 'breakfast', label: 'Very Good Breakfast', category: 'Food and Drink', available: true },
  { id: 'wifi', label: 'Free High-Speed Wi-Fi', category: 'Services', available: true },
  { id: 'spa', label: 'Spa & Wellness Center', category: 'Wellness', available: true },
  { id: 'gym', label: 'Fitness Center & Gym', category: 'Wellness', available: true },
  { id: 'restaurant', label: 'Fine Dining / Restaurant', category: 'Food and Drink', available: true },
  { id: 'bar', label: 'Cocktail Bar & Lounge', category: 'Food and Drink', available: true },
  { id: 'concierge', label: '24-Hour Front Desk & Concierge', category: 'Services', available: true },
  { id: 'parking', label: 'Valet Parking & Garage', category: 'Transport', available: true },
  { id: 'air-conditioning', label: 'Air Conditioning', category: 'Rooms', available: true },
  { id: 'room-service', label: '24-Hour Room Service', category: 'Food and Drink', available: true },
  { id: 'pet-friendly', label: 'Pet Friendly', category: 'Services', available: true },
  { id: 'ev-charging', label: 'EV Charging Stations', category: 'Transport', available: true },
];

export const HotelProfile: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const location = useLocation();
  const collectionSlug = location.state?.collectionSlug || 'the-global-100';
  const hotel = getHotelProfile(slug);
  const collection = getCollection(collectionSlug);
  const [activeSection, setActiveSection] = useState<ProfileSection>('assessment');

  if (!hotel) {
    return (
      <Container variant="standard" className={styles.notFound}>
        <span className={styles.kicker}>DMW Hotels 100</span>
        <h1>Profile in preparation</h1>
        <p>The full hotel assessment is currently being compiled.</p>
        <Link to={`/collections/${collectionSlug}`} className={styles.textLink}>
          <ArrowLeft size={16} /> Back to {collection?.title || 'the index'}
        </Link>
      </Container>
    );
  }

  const currentIndex = collection?.hotels.findIndex((item) => item.id === hotel.id) ?? -1;
  const previousHotel = currentIndex > 0 ? collection?.hotels[currentIndex - 1] : null;
  const nextHotel =
    collection && currentIndex >= 0 && currentIndex < collection.hotels.length - 1
      ? collection.hotels[currentIndex + 1]
      : null;

  const availableSections: ProfileSection[] = [
    'assessment',
    ...(hotel.insiderReport ? (['insider'] as ProfileSection[]) : []),
    'stay',
    'property',
    ...(hotel.scores ? (['scorecard'] as ProfileSection[]) : []),
    ...(hotel.pricingIntelligence ? (['pricing'] as ProfileSection[]) : []),
  ];

  const getSectionNum = (sec: ProfileSection) => {
    const idx = availableSections.indexOf(sec);
    return idx >= 0 ? String(idx + 1).padStart(2, '0') : '01';
  };

  const officialWebsite = hotel.links?.officialWebsite;
  const indicativeRate = hotel.indicativeRate?.amount;

  const renderAssessment = () => (
    <div className={styles.panelContent}>
      <header className={styles.panelHeader}>
        <span className={styles.panelNumber}>{getSectionNum('assessment')}</span>
        <div>
          <span className={styles.kicker}>Independent hotel intelligence</span>
          <h2>Hotel Assessment</h2>
        </div>
      </header>

      {hotel.inclusionRationale && (
        <p className={styles.standfirst}>{hotel.inclusionRationale}</p>
      )}

      <div className={styles.assessmentBody}>
        <p className={styles.overview}>{hotel.dmwOverview}</p>

        {hotel.analysis?.hospitalityProposition && (
          <section className={styles.proseSection}>
            <h3>Hospitality proposition</h3>
            <p>{hotel.analysis.hospitalityProposition}</p>
          </section>
        )}

        {hotel.analysis?.revenueStrategy && (
          <section className={styles.proseSection}>
            <h3>Revenue and positioning</h3>
            <p>{hotel.analysis.revenueStrategy}</p>
          </section>
        )}

        {hotel.fieldReports?.map((report) => (
          <section className={styles.fieldNote} key={report.id}>
            <div className={styles.fieldNoteHeader}>
              <span className={styles.kicker}>Observed firsthand</span>
              <span>{report.visitDate}</span>
            </div>
            <h3>A note from our stay</h3>
            <div className={styles.fieldNoteGrid}>
              <div><strong>Arrival</strong><p>{report.arrivalObservation}</p></div>
              <div><strong>Room</strong><p>{report.roomObservation}</p></div>
              <div><strong>Service</strong><p>{report.serviceObservation}</p></div>
              <div><strong>Atmosphere</strong><p>{report.atmosphereObservation}</p></div>
            </div>
            <div className={styles.verdict}>
              <strong>Assessment after the stay</strong>
              <p>{report.thesisConfirmation}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );

  const rawAmenities = hotel.amenities || (hotel as unknown as { essentialAmenities?: any[] }).essentialAmenities || [];
  const facilityList = rawAmenities.length >= 4 ? rawAmenities : DEFAULT_LUXURY_FACILITIES;

  const renderStay = () => (
    <div className={styles.panelContent}>
      <header className={styles.panelHeader}>
        <span className={styles.panelNumber}>{getSectionNum('stay')}</span>
        <div>
          <span className={styles.kicker}>For the stay</span>
          <h2>Stay Essentials &amp; Facilities</h2>
        </div>
      </header>

      <p className={styles.panelIntroduction}>
        Standardized facility verification and practical amenities assessed for luxury travel.
      </p>

      <div className={styles.popularFacilitiesSection}>
        <h3 className={styles.facilitiesSubheading}>Most popular facilities</h3>
        <div className={styles.facilityPillGrid}>
          {facilityList.map((amenity: any) => {
            const IconComponent = AMENITY_ICONS[amenity.id] || CheckCircle2;
            return (
              <div
                key={amenity.id}
                className={`${styles.facilityPill} ${!amenity.available ? styles.facilityPillUnavailable : ''}`}
              >
                <IconComponent size={17} strokeWidth={1.5} className={styles.facilityPillIcon} />
                <span>{amenity.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.staySpecsGrid}>
        <div className={styles.specBox}>
          <h4>Check-in / Check-out</h4>
          <p>Check-in: <strong>{hotel.propertyFacts.checkInTime || '15:00'}</strong></p>
          <p>Check-out: <strong>{hotel.propertyFacts.checkOutTime || '12:00'}</strong></p>
        </div>
        <div className={styles.specBox}>
          <h4>Room &amp; Property Specs</h4>
          <p>Total Keys: <strong>{hotel.propertyFacts.roomCount ? `${hotel.propertyFacts.roomCount} rooms & suites` : '100+ keys'}</strong></p>
          <p>Archetype: <strong>{hotel.archetype}</strong></p>
        </div>
      </div>

      {hotel.specialPackages?.length ? (
        <div className={styles.embeddedComponent}>
          <SpecialPackages packages={hotel.specialPackages} />
        </div>
      ) : null}

      {officialWebsite && (
        <div className={styles.inlineBooking}>
          <div>
            <span className={styles.kicker}>Continue to booking</span>
            <h3>Check current rates and availability</h3>
          </div>
          <a href={officialWebsite} target="_blank" rel="noopener noreferrer">
            Official website <ArrowRight size={17} />
          </a>
        </div>
      )}
    </div>
  );

  const renderProperty = () => (
    <div className={styles.panelContent}>
      <header className={styles.panelHeader}>
        <span className={styles.panelNumber}>{getSectionNum('property')}</span>
        <div>
          <span className={styles.kicker}>Asset profile</span>
          <h2>Property &amp; Ownership</h2>
        </div>
      </header>
      <div className={styles.factGrid}>
        <IconLabel iconName="Target" label="Strategic Lens" value={hotel.strategicLens} />
        <IconLabel iconName="Building" label="Archetype" value={hotel.archetype} />
        <IconLabel iconName="Calendar" label="Opened" value={hotel.propertyFacts.openingYear?.toString()} />
        <IconLabel iconName="BedDouble" label="Rooms" value={hotel.propertyFacts.roomCount?.toString()} />
        <IconLabel iconName="Users" label="Operator" value={hotel.identity.brand || hotel.identity.operator} />
        <IconLabel iconName="Key" label="Ownership" value={hotel.identity.owner} />
        <IconLabel iconName="MapPin" label="Neighbourhood" value={hotel.location.neighbourhood} />
      </div>
    </div>
  );

  const sectionContent: Record<ProfileSection, React.ReactNode> = {
    assessment: renderAssessment(),
    insider: hotel.insiderReport ? (
      <div className={styles.panelContent}>
        <header className={styles.panelHeader}>
          <span className={styles.panelNumber}>{getSectionNum('insider')}</span>
          <div><span className={styles.kicker}>Practical intelligence</span><h2>Insider View</h2></div>
        </header>
        <div className={styles.embeddedComponent}><InsiderReport report={hotel.insiderReport} /></div>
      </div>
    ) : null,
    stay: renderStay(),
    property: renderProperty(),
    scorecard: hotel.scores ? (
      <div className={styles.panelContent}>
        <header className={styles.panelHeader}>
          <span className={styles.panelNumber}>{getSectionNum('scorecard')}</span>
          <div><span className={styles.kicker}>Technical assessment</span><h2>Scorecard</h2></div>
        </header>
        <div className={styles.embeddedComponent}><Scorecard scores={hotel.scores} /></div>
      </div>
    ) : null,
    pricing: hotel.pricingIntelligence ? (
      <div className={styles.panelContent}>
        <header className={styles.panelHeader}>
          <span className={styles.panelNumber}>{getSectionNum('pricing')}</span>
          <div><span className={styles.kicker}>Forward-rate observation</span><h2>Pricing Intelligence</h2></div>
        </header>
        <p className={styles.panelIntroduction}>Publicly available forward rates, observed to identify seasonality, pricing power and better booking windows.</p>
        <div className={styles.embeddedComponent}><PriceCurveChart pricing={hotel.pricingIntelligence} /></div>
      </div>
    ) : null,
  };

  const sectionIcons: Record<ProfileSection, React.ElementType> = {
    assessment: FileText,
    insider: KeyRound,
    stay: BedDouble,
    property: Building2,
    scorecard: Target,
    pricing: BarChart3,
  };

  return (
    <article className={styles.profile}>
      <header className={`${styles.hero} ${hotel.primaryImage?.url ? styles.heroWithImage : ''}`}>
        {hotel.primaryImage?.url && (
          <img className={styles.heroImage} src={hotel.primaryImage.url} alt={hotel.primaryImage.alt || hotel.name} />
        )}
        <div className={styles.heroShade} aria-hidden="true" />
        <Container variant="wide" className={styles.heroInner}>
          <div className={styles.heroTopBar}>
            <div className={styles.heroMetaGroup}>
              <span className={styles.rank}>DMW 100 · No. {hotel.rank}</span>
              <Link to={`/collections/${collectionSlug}`} className={styles.heroBack}>
                <ArrowLeft size={16} /> {collection?.title || 'The index'}
              </Link>
            </div>
            <div className={styles.heroPrevNext}>
              {previousHotel && <Link to={previousHotel.profileUrl} state={{ collectionSlug }} aria-label="Previous hotel"><ChevronLeft size={20} /></Link>}
              {nextHotel && <Link to={nextHotel.profileUrl} state={{ collectionSlug }} aria-label="Next hotel"><ChevronRight size={20} /></Link>}
            </div>
          </div>

          <div className={styles.heroContent}>
            <h1>{hotel.name}</h1>
            <p className={styles.location}><MapPin size={18} /> {hotel.location.displayLocation}</p>
            <BlackbookActions hotelId={hotel.id} />
          </div>
        </Container>
      </header>

      <Container variant="wide" className={styles.workspace}>
        <nav className={styles.sectionNav} aria-label="Hotel profile sections">
          <span className={styles.navLabel}>Explore the profile</span>
          {availableSections.map((section) => {
            const Icon = sectionIcons[section];
            const isActive = activeSection === section;
            return (
              <button
                type="button"
                key={section}
                className={isActive ? styles.navActive : ''}
                onClick={() => setActiveSection(section)}
              >
                <div className={styles.navHeaderRow}>
                  <Icon size={16} strokeWidth={1.4} />
                  <span className={styles.navTitle}>{SECTION_LABELS[section]}</span>
                </div>
                <span className={styles.navSubtext}>{SECTION_DESCRIPTIONS[section]}</span>
              </button>
            );
          })}
        </nav>

        <div className={styles.mainWrapper}>
          <div className={styles.atAGlanceHorizontal}>
            <span className={styles.kicker}>At a glance</span>
            <div className={styles.glanceRow}>
              {hotel.scores && (
                <div className={styles.glanceItem}>
                  <span className={styles.glanceLabel}>DMW Score</span>
                  <div className={styles.glanceValue}>
                    <strong>{hotel.scores.totalScore.toFixed(1)}</strong>
                    <small>/100</small>
                  </div>
                </div>
              )}
              {indicativeRate && (
                <div className={styles.glanceItem}>
                  <span className={styles.glanceLabel}>Indicative Rate</span>
                  <div className={styles.glanceValue}>
                    <strong>~${indicativeRate}</strong>
                    <small>/night</small>
                  </div>
                </div>
              )}
              <div className={styles.glanceItem}>
                <span className={styles.glanceLabel}>Strategic Lens</span>
                <div className={styles.glanceText}>{hotel.strategicLens}</div>
              </div>
              <div className={styles.glanceItem}>
                <span className={styles.glanceLabel}>Property</span>
                <div className={styles.glanceText}>
                  {hotel.propertyFacts.roomCount ? `${hotel.propertyFacts.roomCount} rooms` : hotel.archetype}
                </div>
              </div>
              {officialWebsite && (
                <a className={styles.glanceAction} href={officialWebsite} target="_blank" rel="noopener noreferrer">
                  Check availability <ArrowRight size={15} />
                </a>
              )}
            </div>
          </div>

          <section className={styles.mainPanel} aria-live="polite">
            {sectionContent[activeSection]}
          </section>
        </div>
      </Container>

      {officialWebsite && (
        <div className={styles.mobileBookingBar}>
          <div>{indicativeRate ? <><span>Indicative</span><strong>~${indicativeRate}</strong></> : <strong>{hotel.name}</strong>}</div>
          <a href={officialWebsite} target="_blank" rel="noopener noreferrer">Check availability</a>
        </div>
      )}
    </article>
  );
};
