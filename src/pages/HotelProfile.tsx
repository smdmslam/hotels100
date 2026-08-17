import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BedDouble,
  Building2,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleMinus,
  Coffee,
  Dumbbell,
  FileText,
  KeyRound,
  MapPin,
  Sparkles,
  Target,
  Utensils,
  Wifi,
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
  | 'stay'
  | 'property'
  | 'scorecard'
  | 'pricing'
  | 'insider';

const SECTION_LABELS: Record<ProfileSection, string> = {
  assessment: 'Hotel Assessment',
  stay: 'Stay Essentials',
  property: 'Property & Ownership',
  scorecard: 'Scorecard',
  pricing: 'Pricing Intelligence',
  insider: 'Insider View',
};

const AMENITY_ICONS: Record<string, React.ElementType> = {
  gym: Dumbbell,
  parking: Car,
  restaurant: Utensils,
  wifi: Wifi,
  breakfast: Coffee,
  spa: Sparkles,
};

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
    'stay',
    'property',
    ...(hotel.scores ? (['scorecard'] as ProfileSection[]) : []),
    ...(hotel.pricingIntelligence ? (['pricing'] as ProfileSection[]) : []),
    ...(hotel.insiderReport ? (['insider'] as ProfileSection[]) : []),
  ];

  const officialWebsite = hotel.links?.officialWebsite;
  const indicativeRate = hotel.indicativeRate?.amount;

  const renderAssessment = () => (
    <div className={styles.panelContent}>
      <header className={styles.panelHeader}>
        <span className={styles.panelNumber}>01</span>
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

  const hotelAmenities = hotel.amenities || (hotel as unknown as { essentialAmenities?: any[] }).essentialAmenities || [];

  const renderStay = () => (
    <div className={styles.panelContent}>
      <header className={styles.panelHeader}>
        <span className={styles.panelNumber}>02</span>
        <div>
          <span className={styles.kicker}>For the stay</span>
          <h2>Stay Essentials</h2>
        </div>
      </header>

      <p className={styles.panelIntroduction}>
        The practical details that determine whether the hotel works for this trip.
      </p>

      <div className={styles.amenitiesGrid}>
        {hotelAmenities.length ? hotelAmenities.map((amenity) => {
          const AmenityIcon = AMENITY_ICONS[amenity.id] || (amenity.available ? Check : CircleMinus);
          return (
            <div
              key={amenity.id}
              className={`${styles.amenity} ${!amenity.available ? styles.amenityUnavailable : ''}`}
            >
              <AmenityIcon size={25} strokeWidth={1.35} />
              <div>
                <strong>{amenity.label}</strong>
                <span>{amenity.available ? 'Available' : 'Not available'}</span>
              </div>
            </div>
          );
        }) : (
          <p className={styles.dataPending}>Amenities are being verified.</p>
        )}
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
        <span className={styles.panelNumber}>03</span>
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
    stay: renderStay(),
    property: renderProperty(),
    scorecard: hotel.scores ? (
      <div className={styles.panelContent}>
        <header className={styles.panelHeader}>
          <span className={styles.panelNumber}>04</span>
          <div><span className={styles.kicker}>Technical assessment</span><h2>Scorecard</h2></div>
        </header>
        <div className={styles.embeddedComponent}><Scorecard scores={hotel.scores} /></div>
      </div>
    ) : null,
    pricing: hotel.pricingIntelligence ? (
      <div className={styles.panelContent}>
        <header className={styles.panelHeader}>
          <span className={styles.panelNumber}>05</span>
          <div><span className={styles.kicker}>Forward-rate observation</span><h2>Pricing Intelligence</h2></div>
        </header>
        <p className={styles.panelIntroduction}>Publicly available forward rates, observed to identify seasonality, pricing power and better booking windows.</p>
        <div className={styles.embeddedComponent}><PriceCurveChart pricing={hotel.pricingIntelligence} /></div>
      </div>
    ) : null,
    insider: hotel.insiderReport ? (
      <div className={styles.panelContent}>
        <header className={styles.panelHeader}>
          <span className={styles.panelNumber}>06</span>
          <div><span className={styles.kicker}>Practical intelligence</span><h2>Insider View</h2></div>
        </header>
        <div className={styles.embeddedComponent}><InsiderReport report={hotel.insiderReport} /></div>
      </div>
    ) : null,
  };

  const sectionIcons: Record<ProfileSection, React.ElementType> = {
    assessment: FileText,
    stay: BedDouble,
    property: Building2,
    scorecard: Target,
    pricing: BarChart3,
    insider: KeyRound,
  };

  return (
    <article className={styles.profile}>
      <header className={`${styles.hero} ${hotel.primaryImage?.url ? styles.heroWithImage : ''}`}>
        {hotel.primaryImage?.url && (
          <img className={styles.heroImage} src={hotel.primaryImage.url} alt={hotel.primaryImage.alt || hotel.name} />
        )}
        <div className={styles.heroShade} aria-hidden="true" />
        <Container variant="wide" className={styles.heroInner}>
          <div className={styles.heroNavigation}>
            <Link to={`/collections/${collectionSlug}`} className={styles.heroBack}>
              <ArrowLeft size={16} /> {collection?.title || 'The index'}
            </Link>
            <div>
              {previousHotel && <Link to={previousHotel.profileUrl} state={{ collectionSlug }} aria-label="Previous hotel"><ChevronLeft size={20} /></Link>}
              {nextHotel && <Link to={nextHotel.profileUrl} state={{ collectionSlug }} aria-label="Next hotel"><ChevronRight size={20} /></Link>}
            </div>
          </div>

          <div className={styles.heroContent}>
            <span className={styles.rank}>DMW 100 · No. {hotel.rank}</span>
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
            return (
              <button
                type="button"
                key={section}
                className={activeSection === section ? styles.navActive : ''}
                onClick={() => setActiveSection(section)}
              >
                <Icon size={17} strokeWidth={1.4} />
                <span>{SECTION_LABELS[section]}</span>
              </button>
            );
          })}
        </nav>

        <section className={styles.mainPanel} aria-live="polite">
          {sectionContent[activeSection]}
        </section>

        <aside className={styles.decisionPanel}>
          <span className={styles.kicker}>At a glance</span>
          {hotel.scores && (
            <div className={styles.decisionScore}>
              <span>DMW score</span>
              <div><strong>{hotel.scores.totalScore.toFixed(1)}</strong><small>/100</small></div>
            </div>
          )}
          <dl className={styles.decisionFacts}>
            {indicativeRate && <><dt>Indicative rate</dt><dd>~${indicativeRate} / night</dd></>}
            <dt>Strategic lens</dt><dd>{hotel.strategicLens}</dd>
            <dt>Property</dt><dd>{hotel.propertyFacts.roomCount ? `${hotel.propertyFacts.roomCount} rooms` : hotel.archetype}</dd>
          </dl>
          {officialWebsite && (
            <a className={styles.bookingAction} href={officialWebsite} target="_blank" rel="noopener noreferrer">
              Check rates &amp; availability <ArrowRight size={17} />
            </a>
          )}
          <p className={styles.bookingNote}>Rates and availability are provided by the hotel.</p>
        </aside>
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
