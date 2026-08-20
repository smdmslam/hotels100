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
  insiderReport?: InsiderReport | null;
  inclusionRationale?: string | null;
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
    googleMapsUrl?: string | null;
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
