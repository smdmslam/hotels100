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
  CircleHelp,
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
import { useAiDecision } from '../context/AiDecisionContext';
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

const FEATURED_FACILITY_IDS = [
  'wifi',
  'gym',
  'fitness',
  'pool',
  'spa',
  'parking',
  'restaurant',
  'breakfast',
  'room-service',
  'concierge',
];

const FACILITY_CATEGORY_ORDER = [
  'Connectivity & Work',
  'Wellness',
  'Food & Drink',
  'Rooms',
  'Access & Transport',
  'Service',
  'Accessibility',
  'Policies',
  'Other',
];

const normalizeFacilityCategory = (category?: string) => {
  const normalized = category?.toLowerCase() || '';
  if (normalized.includes('wellness') || normalized.includes('fitness')) return 'Wellness';
  if (normalized.includes('food') || normalized.includes('drink') || normalized.includes('dining')) return 'Food & Drink';
  if (normalized.includes('room')) return 'Rooms';
  if (normalized.includes('transport') || normalized.includes('parking')) return 'Access & Transport';
  if (normalized.includes('connect') || normalized.includes('business') || normalized.includes('work')) return 'Connectivity & Work';
  if (normalized.includes('accessib')) return 'Accessibility';
  if (normalized.includes('polic')) return 'Policies';
  if (normalized.includes('service')) return 'Service';
  return 'Other';
};

export const HotelProfile: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const location = useLocation();
  const collectionSlug = location.state?.collectionSlug || 'the-global-100';
  const hotel = getHotelProfile(slug);
  const collection = getCollection(collectionSlug);
  const [activeSection, setActiveSection] = useState<ProfileSection>('assessment');
  const { state: aiState, openDrawer } = useAiDecision();

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

  const assessmentScore = hotel.scores?.totalScore;

  const renderAssessment = () => (
    <div className={styles.panelContent}>
      <header className={styles.panelHeader}>
        <span className={styles.panelNumber}>{getSectionNum('assessment')}</span>
        <div>
          <span className={styles.kicker}>Independent hotel intelligence</span>
          <h2>Hotel Assessment</h2>
        </div>
      </header>

      {/* Substantive Executive Synthesis Paragraphs */}
      <div className={styles.assessmentBody} style={{ maxWidth: '840px', marginTop: 'var(--space-6)' }}>
        <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', lineHeight: 1.6, color: 'var(--color-ink)', marginBottom: 'var(--space-5)' }}>
          <p style={{ marginBottom: 'var(--space-5)' }}>
            {hotel.dmwOverview || hotel.analysis?.hospitalityProposition || hotel.inclusionRationale}
          </p>
          {hotel.analysis?.revenueStrategy && (
            <p style={{ marginBottom: 'var(--space-5)' }}>
              {hotel.analysis.revenueStrategy}
            </p>
          )}
        </div>

        {/* Discreet Closing Verdict Line & Supporting Metadata */}
        <div style={{ paddingTop: 'var(--space-5)', borderTop: '1px solid rgba(18, 18, 18, .18)', marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <span className={styles.kicker} style={{ display: 'block', marginBottom: '4px' }}>DMW Position</span>
            <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--color-ink)' }}>
              {hotel.dmwJudgement || (assessmentScore != null ? (assessmentScore >= 92 ? 'Strong recommendation, conditional on room category' : 'Qualified recommendation') : 'Strong recommendation')}
            </strong>
          </div>
          {assessmentScore != null && (
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--color-stone)' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-ink)', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginRight: '4px' }}>
                {assessmentScore.toFixed(1)}
              </span>
              / 100 supporting metadata
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const facilityList = hotel.amenities || (hotel as unknown as { essentialAmenities?: any[] }).essentialAmenities || [];
  const featuredFacilities = [...facilityList]
    .sort((a: any, b: any) => {
      const aIndex = FEATURED_FACILITY_IDS.indexOf(a.id);
      const bIndex = FEATURED_FACILITY_IDS.indexOf(b.id);
      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    })
    .slice(0, 8);

  const groupedFacilities = FACILITY_CATEGORY_ORDER.map((category) => ({
    category,
    items: facilityList.filter(
      (facility: any) => normalizeFacilityCategory(facility.category) === category,
    ),
  })).filter((group) => group.items.length > 0);

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
        <div className={styles.facilitiesHeadingRow}>
          <h3 className={styles.facilitiesSubheading}>Most requested facilities</h3>
          <span>Verified hotel information</span>
        </div>

        {featuredFacilities.length > 0 ? (
          <div className={styles.featuredFacilityGrid}>
            {featuredFacilities.map((amenity: any) => {
              const isAvailable = amenity.available === true;
              const isUnavailable = amenity.available === false;
              const IconComponent = AMENITY_ICONS[amenity.id] || (isAvailable ? CheckCircle2 : CircleHelp);
              return (
                <div
                  key={amenity.id}
                  className={`${styles.featuredFacility} ${isUnavailable ? styles.facilityUnavailable : ''} ${!isAvailable && !isUnavailable ? styles.facilityUnknown : ''}`}
                >
                  <IconComponent size={25} strokeWidth={1.35} className={styles.facilityIcon} />
                  <div>
                    <strong>{amenity.label}</strong>
                    <span>{isAvailable ? 'Available' : isUnavailable ? 'Not available' : 'Verification pending'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.facilityPending}>
            <CircleHelp size={25} strokeWidth={1.35} />
            <div>
              <strong>Facility verification in progress</strong>
              <p>Hotel amenities have not yet been added to this profile.</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.practicalDetails}>
        <div className={styles.practicalLabel}>Practical details</div>
        <div className={styles.practicalItem}>
          <span>Check-in</span>
          <strong>{hotel.propertyFacts.checkInTime || 'To be verified'}</strong>
        </div>
        <div className={styles.practicalItem}>
          <span>Check-out</span>
          <strong>{hotel.propertyFacts.checkOutTime || 'To be verified'}</strong>
        </div>
        <div className={styles.practicalItem}>
          <span>Neighbourhood</span>
          <strong>{hotel.location.neighbourhood || hotel.location.city}</strong>
        </div>
        <div className={styles.practicalItem}>
          <span>Indicative rate</span>
          <strong>{indicativeRate ? `~$${indicativeRate} / night` : 'Check current rates'}</strong>
        </div>
      </div>

      {groupedFacilities.length > 0 && (
        <section className={styles.allFacilitiesSection}>
          <h3 className={styles.facilitiesSubheading}>All facilities</h3>
          <div className={styles.facilityCategoryGrid}>
            {groupedFacilities.map((group) => (
              <div className={styles.facilityCategory} key={group.category}>
                <h4>{group.category}</h4>
                <ul>
                  {group.items.map((amenity: any) => {
                    const isAvailable = amenity.available === true;
                    const isUnavailable = amenity.available === false;
                    return (
                      <li key={amenity.id} className={isUnavailable ? styles.facilityUnavailable : ''}>
                        <span>{amenity.label}</span>
                        <small>{isAvailable ? 'Yes' : isUnavailable ? 'No' : 'Pending'}</small>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

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
          {aiState.hasActiveSearch && (
            <div className={styles.aiShortlistBanner}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={14} style={{ color: 'var(--color-antique-gold)' }} />
                <span>Active AI Shortlist: <strong style={{ color: 'var(--color-antique-gold)' }}>"{aiState.activeQuery}"</strong></span>
              </div>
              <button 
                type="button" 
                onClick={() => openDrawer()} 
                className={styles.aiShortlistReturnBtn}
              >
                Return to Shortlist →
              </button>
            </div>
          )}
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
