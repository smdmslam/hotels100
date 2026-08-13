# DMW Hotels 100 — Component Specification

## 1. Purpose

This document defines the reusable interface components required for Version 1.

Components must support:

* A typography-led luxury index
* Six to ten prototype hotel records
* Expansion to 100 hotels
* Permanent researched hotel profiles
* Optional DMW Field Reports
* Strategic articles
* Pricing intelligence
* Responsive desktop and mobile layouts

Components should remain visually restrained. Do not place every piece of content inside a generic card.

---

## 2. Component Principles

Every component should be:

* Reusable
* Data-driven
* Responsive
* Keyboard accessible
* Visually consistent
* Able to handle missing optional data
* Suitable for both light and dark sections where specified

Every content component must define:

* Required fields
* Optional fields
* Empty-state behaviour
* Mobile behaviour
* Interaction behaviour

---

# 3. Global Components

## 3.1 SiteHeader

### Purpose

Provides global identity and navigation.

### Content

* DMW Hotels 100 identity or wordmark
* Primary navigation
* Search control
* Mobile menu control

### Navigation items

* The 100
* Insights
* Methodology
* About DMW

### Variants

* `overlay`: transparent over hero
* `light`: paper or ivory background
* `dark`: ink background

### Behaviour

* Sticky after the initial hero area
* Overlay version transitions to a solid version on scroll
* Current route is visibly identified
* Mobile navigation opens as a full-height panel or controlled drawer
* Escape closes the menu
* Focus remains trapped inside the open mobile menu
* Body scrolling is disabled while the mobile menu is open

### Mobile

* Show compact identity
* Hide desktop links
* Show search and menu icons
* Avoid a crowded top bar

---

## 3.2 SiteFooter

### Purpose

Provides publication identity, navigation, legal links and credits.

### Content

* DMW Hotels 100
* DMW Finance Group
* Edition year
* Main navigation
* Contact link
* Privacy
* Terms
* Image credits
* Copyright

### Optional content

* Short publication statement
* External DMW website link
* Newsletter placeholder only if genuinely implemented

### Restrictions

* No sponsor wall in Version 1
* No fake newsletter form
* No oversized social-media section

---

## 3.3 Container

### Purpose

Provides consistent page width and responsive gutters.

### Variants

* `wide`: ranking index and image compositions
* `standard`: general page content
* `reading`: long-form article content
* `full`: edge-to-edge visual section

Suggested widths:

```text
wide: 1600px
standard: 1280px
reading: 720px
```

---

## 3.4 SectionHeader

### Purpose

Introduces a page section.

### Fields

* Eyebrow
* Title
* Description
* Optional action
* Optional section number

### Variants

* Left aligned
* Split title/action
* Centred masthead
* Dark background

---

## 3.5 Button

### Variants

* Primary
* Secondary
* Text
* Icon-only
* Dark-section primary
* Dark-section secondary

### Requirements

* Visible focus state
* Disabled state
* Loading state only where meaningful
* External links display an external-link icon
* Minimum practical touch target of 44px

---

## 3.6 Badge

### Types

* Preliminary score or ranking confidence
* DMW distinction
* Article category
* Edition
* Field Report

### Behaviour

* Displays text label
* May include one small icon
* Must never be icon-only
* Should wrap naturally on mobile

### Restrictions

* Maximum three badges in a single primary composition
* Do not assign arbitrary bright colours

---

## 3.7 IconLabel

### Purpose

Pairs a Lucide icon with a short information label.

### Examples

* Spa
* Pool
* Gym
* Business workspace
* Restaurant
* Wi-Fi

### Fields

* Icon
* Label
* Optional value
* Optional tooltip

### Accessibility

* Icons should be hidden from screen readers when the adjacent text provides the meaning
* Tooltips cannot contain essential information unavailable elsewhere

---

## 3.8 Breadcrumbs

### Purpose

Provides hierarchy on hotel and article pages.

### Example

```text
The 100 / London / St Martins Lane
```

### Mobile

* May truncate intermediate labels
* Must preserve the parent-page link

---

# 4. Homepage Components

## 4.1 HomeHero

### Purpose

Establishes the annual index and DMW proposition.

### Required fields

* Publisher
* Title
* Edition year
* Positioning statement
* Primary action
* Secondary action

### Optional fields

* Hero image
* Image credit
* Edition status
* Short ranking descriptor

### Visual requirements

* Oversized `100`
* Editorial serif display
* Clear DMW identity
* No generic text-over-image composition
* Must remain complete without an image

### Mobile

* Reduce decorative imagery before reducing text clarity
* Keep actions stacked or wrapped
* Ensure the numeral does not obstruct the title

---

## 4.2 RankingPreview

### Purpose

Displays selected entries from the ranking on the homepage.

### Fields

* Section title
* Hotel records
* View-all action

### Behaviour

* Uses `RankedHotelItem`
* May display rank 1 in an expanded variant
* Should show at least one no-image record during development

---

## 4.3 FeaturedHotelModule

### Purpose

Highlights one hotel with richer editorial context.

### Required fields

* Rank
* Hotel name
* Location
* DMW thesis
* Profile link

### Optional fields

* Image
* Defining characteristics
* Field Report link
* Strategic feature link
* Price insight
* Distinction

### Version 1 content

Use St Martins Lane.

---

## 4.4 PricingHighlight

### Purpose

Introduces pricing intelligence on the homepage.

### Required fields

* Hotel
* Headline observation
* Pricing dataset
* Currency
* Observation period
* Profile link

### Optional fields

* Lowest period
* Highest period
* Competitor series
* Event annotation

### Uses

* `PriceCurveChart`
* `DataSourceNote`

---

## 4.5 LatestInsightFeature

### Purpose

Features the latest strategic article.

### Fields

* Category
* Title
* Description
* Reading time
* Publication date
* Related hotel
* Link
* Optional image

---

## 4.6 FieldReportTeaser

### Purpose

Introduces a firsthand hotel assessment.

### Required fields

* Hotel
* Visit date or approximate visit date
* Short observation
* Link to hotel Field Report anchor

### Optional fields

* Rank
* Approximate paid rate
* Travel purpose
* Image

### Visual treatment

* Distinct from standard article cards
* Use the Field Report accent colour
* Do not resemble a public review card

---

## 4.7 MethodologyTeaser

### Purpose

Explains the index briefly and links to the methodology.

### Fields

* Short title
* Short description
* Three methodology principles
* Link

Suggested principles:

* Experience
* Business
* Asset

---

## 4.8 DMWContextModule

### Purpose

Connects the publication to DMW Finance Group.

### Fields

* Heading
* Concise description
* About link
* Contact link

### Restrictions

* Must not dominate the homepage
* Avoid sales language
* Avoid claims not supported by supplied content

---

# 5. Ranked Index Components

## 5.1 IndexMasthead

### Required fields

* Title
* Edition year
* Description
* Methodology link
* Total hotel count

### Optional fields

* Last updated
* Edition selector in future versions

---

## 5.2 SearchBar

### Purpose

Filters hotel and article content using free text.

### Requirements

* Visible label or accessible label
* Search icon
* Clear action
* Results update without page reload
* Search term preserved in the URL query string where practical
* No artificial delay

### Placeholder

```text
Search hotel, city, country or brand
```

---

## 5.3 FilterBar

### Purpose

Shows primary filters and opens full filter controls.

### Primary visible filters

* Region
* Archetype
* Price
* Amenities
* Business travel
* Preliminary score or ranking confidence
* Distinctions

### Behaviour

* Selected-filter count
* Clear-all action
* Filter state reflected in URL query parameters
* Horizontal scroll on small screens
* Opens `FilterPanel` for complete controls

---

## 5.4 FilterPanel

### Desktop

* Side panel or large anchored panel

### Mobile

* Full-screen overlay

### Requirements

* Grouped filter options
* Result count
* Apply button
* Clear-all control
* Close control
* Escape closes
* Focus trapping
* Background scroll locking
* Selected values persist until cleared

---

## 5.5 SortControl

### Options

* DMW rank
* Hotel name
* Destination
* Rate: low to high
* Rate: high to low

### Requirement

Official rank must remain visible under every sorting mode.

---

## 5.6 ResultSummary

### Displays

* Number of visible hotels
* Total number of hotels
* Active-filter summary
* Clear-all control when appropriate

Example:

```text
7 of 100 hotels
London · Urban Lifestyle Hotel
```

---

## 5.7 RankedHotelList

### Purpose

Renders the definitive list.

### Fields

* Hotel records
* Display variant
* Loading state
* Empty state

### Behaviour

* Uses `RankedHotelItem`
* Maintains stable ordering
* Supports progressive loading or grouped rank sections
* Does not animate items excessively when filtering

---

## 5.8 RankedHotelItem

### Purpose

Displays one ranked hotel.

### Required fields

* Rank
* Hotel name
* City
* Country
* Hotel archetype
* DMW short judgement
* Profile URL

### Optional fields

* Image
* Image alt
* Indicative rate
* Currency
* Price band
* Essential amenities
* Defining characteristics
* Distinctions
* Brand
* Operator
* Featured flag

### Desktop layout

Recommended structure:

* Rank column
* Identity and judgement column
* Facts and amenities column
* Image/action column

### Mobile layout

Recommended order:

1. Rank
2. Hotel name
3. Location and archetype
4. DMW judgement
5. Evidence and distinctions
6. Amenities
7. Price
8. Image
9. Profile action

### Variants

* `standard`
* `featured`
* `dark`
* `noImage`

### Behaviour

* Entire component may link to the hotel profile
* Nested interactive elements must not create invalid link structures
* Hover may reveal or slightly scale the image
* Keyboard focus must visibly identify the item

### Empty states

* Missing image: render typography-led variant
* Missing price: omit rate rather than display zero
* Missing amenities: omit icon row

---

## 5.9 RankGroupMarker

### Purpose

Separates ranking ranges.

Examples:

* Top 10
* 11–25
* 26–50
* 51–75
* 76–100

### Version 1

May remain hidden when only six to ten records are present.

---

## 5.10 IndexEditorialInterruption

### Purpose

Adds restrained insight without breaking ranking comprehension.

### Types

* Pricing observation
* Field Report
* Methodology note
* Editorial quotation

### Restrictions

* Never insert between every few hotels
* Must be visually distinguishable from a ranked hotel
* Must not carry a false rank

---

## 5.11 NoResults

### Content

* Clear message
* Active-filter summary
* Clear-all action

Suggested text:

```text
No hotels match the selected criteria.
Clear the filters to return to the complete ranking.
```

---

# 6. Hotel Profile Components

## 6.1 HotelHero

### Required fields

* Rank
* Hotel name
* City
* Country
* Hotel archetype
* Edition year
* DMW judgement
* Preliminary score or ranking confidence

### Optional fields

* Primary image
* Image credit
* Distinction
* Indicative rate
* Booking link
* Official website link

### Requirements

* Complete without photography
* Rank remains the signature element
* Booking action remains secondary to editorial content

---

## 6.2 HotelFactGrid

### Supported facts

* Address
* Opening year
* Renovation year
* Room count
* Suite count
* Brand
* Operator
* Ownership
* Typical rate
* Check-in
* Check-out

### Behaviour

* Only display fields with values
* `notPubliclyConfirmed` may be displayed when editorially useful
* Use structured term/value markup
* Collapse into two columns or one column on smaller screens

---

## 6.3 DMWOverview

### Required fields

* Overview heading
* Overview text

### Optional fields

* Pull quote
* Key tension
* Inclusion rationale

### Recommended length

150–300 words.

---

## 6.4 AmenityGrid

### Required fields

* Amenities array

### Amenity item fields

* Amenity type
* Label
* Availability
* Optional detail
* Optional venue name

### Behaviour

* Group by category where useful:

  * Food and drink
  * Wellness
  * Business
  * Transport
  * Family and accessibility
* Show concise icon grid initially
* Allow details to expand
* Do not display unavailable amenities unless absence is strategically important

---

## 6.5 EditorialAnalysisSection

### Purpose

Reusable analytical section for:

* Hospitality proposition
* Business-travel assessment
* Rooms and spatial logic
* F&B strategy
* Wellness and leisure
* Revenue strategy
* Competitive positioning

### Fields

* Eyebrow
* Heading
* Body
* Optional image
* Optional pull quote
* Optional fact list
* Optional action

### Variants

* Text only
* Text with left image
* Text with right image
* Dark analysis
* Narrow reading
* Full-width quote

---

## 6.6 BusinessTravelPanel

### Fields

* Overall assessment
* Location efficiency
* Workspace
* Connectivity
* Meetings
* Privacy
* Sleep
* Service speed
* Breakfast practicality
* Solo-traveller suitability

### Display

Use narrative first, then concise supporting factors.

### Restrictions

* Do not reduce the entire judgement to a simplistic score
* Do not show unsupported claims

---

## 6.7 VenueList

### Purpose

Displays restaurants, bars, cafés and social spaces.

### Venue fields

* Name
* Type
* Description
* Strategic role
* Meal periods
* External patronage
* Recognition
* Optional official link

### Behaviour

* Support one or many venues
* Use expandable entries when the list is long
* Do not display a generic card grid for every venue

---

## 6.8 PriceIntelligenceSection

### Required fields

* Pricing summary
* Pricing dataset
* Currency
* Room basis
* Observation period
* Data source note

### Optional fields

* Competitor datasets
* High period
* Low period
* Median rate
* Weekday/weekend observation
* Event markers
* Booking action

### Uses

* `PriceCurveChart`
* `PricingStat`
* `DataSourceNote`

### Missing state

Render `PricingPendingState`, not an empty chart.

---

## 6.9 PriceCurveChart

### Inputs

```text
primarySeries
competitorSeries[]
currency
dateRange
eventMarkers[]
highlights[]
```

### Requirements

* Responsive
* Accessible written summary
* Tooltip on interactive points
* Currency visible
* Low and high values identifiable
* No misleading zero baseline requirement for price line charts
* Avoid excessive smoothing
* Printable or export-friendly appearance

### Suggested library

Recharts.

If a lighter, equally accessible solution is preferred, document the change.

---

## 6.10 PricingStat

### Examples

* Median observed rate
* Lowest observed rate
* Highest observed rate
* Best-value month
* Peak month

### Display

Large value plus restrained label.

Avoid dashboard tiles with strong shadows.

---

## 6.11 CompetitorComparison

### Fields

* Competitor hotels
* Relative rate
* Location
* Amenities
* Positioning
* DMW interpretation

### Display options

* Restrained comparison table
* Dot plot
* Multi-series line chart
* Editorial comparison rows

### Requirement

Explain why each competitor belongs in the set.

---

## 6.12 FieldReportSection

### Required fields

* Hotel
* Visit date or approximate date
* Number of nights
* Approximate rate
* Travel purpose
* Summary
* Arrival
* Room
* Service
* Atmosphere
* Return intention

### Optional fields

* Room category
* Amenities used
* Strengths
* Weaknesses
* Thesis confirmation
* Field photography
* Pull quote

### Visual treatment

* Clearly marked as firsthand
* Distinct colour accent
* First-person editorial voice
* Not presented as a customer-rating widget

### Anchor

```text
#field-report
```

---

## 6.14 DMWConclusion

### Fields

* Inclusion rationale
* Primary strength
* Principal question
* Best suited for
* Investor or owner consideration

### Display

Strong editorial closing section.

---

## 6.15 RelatedInsightCard

### Fields

* Article title
* Description
* Category
* Reading time
* Publication date
* Link
* Optional image

---

## 6.16 PracticalActions

### Actions

* Official website
* Check availability
* View on map
* Read strategic feature
* Return to The 100

### Requirement

External and affiliate links must be distinguishable and disclosed where necessary.

---

## 6.17 SourceList

### Fields

* Source name
* Source URL
* Source type
* Accessed date
* Notes
* Pricing source flag
* Image source flag

### Display

May use an accordion, but source information must remain accessible and indexable.

---

## 6.18 DataSourceNote

### Fields

* Data provider or collection method
* Observation period
* Room basis
* Taxes inclusion
* Currency treatment
* Important limitations

---

## 6.19 PricingPendingState

### Copy

```text
Pricing analysis in preparation

A representative annual pricing series has not yet been completed
for this hotel.
```

### Restrictions

* No fake graph
* No randomly generated demonstration values on a production hotel page

---

# 7. Insights Components

## 7.1 InsightsMasthead

### Fields

* Title
* Editorial proposition
* Featured article

---

## 7.2 TopicFilter

### Topics

* Why This Hotel Works
* Hotel Strategy
* Pricing Power
* Business Travel
* Brand Positioning
* Operations
* Development
* Hotel M&A

### Behaviour

* Updates article list
* Preserves selection in URL query string
* Includes clear-all option

---

## 7.3 ArticleGrid

### Purpose

Displays strategic features.

### Behaviour

* Supports varied editorial card sizes
* Maintains a clear first-feature hierarchy
* Stacks cleanly on mobile

---

## 7.4 ArticleCard

### Required fields

* Category
* Title
* Description
* Reading time
* Publication date
* URL

### Optional fields

* Image
* Related hotel
* Tags
* Evidence basis
* Featured flag

### Variants

* Featured
* Horizontal
* Standard
* Text only

---

# 8. Article Components

## 8.1 ArticleHero

### Fields

* Category
* Title
* Standfirst
* Author
* Publication date
* Reading time
* Evidence basis
* Related hotel
* Optional hero image and credit

---

## 8.2 ArticleBody

### Requirements

Support:

* Paragraphs
* Headings
* Lists
* Pull quotes
* Images
* Captions
* Charts
* Comparison modules
* Hotel fact modules
* Footnotes or source links

### Reading width

Approximately 650–760px for standard body text.

---

## 8.3 PullQuote

### Fields

* Quote
* Optional attribution
* Optional context

### Restriction

Only use quotations actually authored or properly sourced.

---

## 8.4 InlineHotelSummary

### Fields

* Rank
* Hotel
* Location
* DMW judgement
* Profile link
* Optional image

---

## 8.5 ArticleEndMatter

### Contains

* Sources
* Disclosures
* Image credits
* Last updated
* Related hotel
* Related articles
* Next article

---

# 9. Methodology Components

## 9.1 MethodologyDimension

### Fields

* Dimension name
* Weight
* Description
* Evidence examples
* Scoring explanation

### Display

Editorial row or structured section.

Do not use colourful dashboard progress rings.

---

## 9.3 MethodologyFlow

### Purpose

Explains:

```text
Candidate universe
→ structured research
→ scoring
→ editorial review
→ annual ranking
→ ongoing profile updates
```

### Display

Use a simple ordered sequence. Avoid an elaborate diagram.

---

# 10. Utility Components

## 10.1 ImageWithCredit

### Fields

* Source
* Alt text
* Credit
* Caption
* Width and height
* Loading priority
* Focal point

### Requirements

* Prevent layout shift
* Lazy-load below-load below the fold
* Always support visible image credit where required
* Never render an unlicensed image merely because a URL exists

---

## 10.2 ExternalLink

### Behaviour

* Shows external-link icon
* Indicates new-tab behaviour where used
* Uses secure rel attributes
* Maintains visible focus

---

## 10.3 Disclosure

### Types

* Affiliate
* Sponsored
* Research basis
* Approximate date
* Unconfirmed public information

---

## 10.4 EmptyState

### Uses

* No search results
* Missing pricing analysis
* No Field Report
* No related articles
* No licensed image

### Requirement

Empty states should explain the condition without making the prototype feel broken.

---

## 10.5 LoadingState

### Requirements

* Use only while asynchronous data genuinely loads
* Avoid full-screen spinners
* Preserve layout dimensions
* Use restrained skeletons if needed
* Respect reduced-motion preferences

---

## 10.6 ErrorBoundary

### Purpose

Prevents one failed chart or image module from breaking the entire page.

### User-facing copy

Keep concise and specific.

Example:

```text
This pricing module could not be displayed.
The remaining hotel profile is still available.
```

---

# 11. Component Data Rules

* Components must receive structured data rather than contain hotel-specific facts.
* No component should hard-code St Martins Lane except inside development fixtures.
* Optional data must not create blank headings or empty containers.
* Unknown numeric values must not default to zero.
* Missing images must activate intentional no-image layouts.
* External URLs must be validated before rendering.
* Dates should use one consistent formatting utility.
* Currency should use `Intl.NumberFormat`.
* Ranking values must be integers from 1 to 100 in production.
* Ranking confidence, where shown, must use a controlled enum.
* Amenity and distinction values must use controlled vocabularies.

---

# 12. Component Test States

At minimum, test the following:

### RankedHotelItem

* Complete record with image
* Complete record without image
* Long hotel name
* Rank 1
* Rank 100
* Multiple distinctions
* No pricing data
* Mobile width

### HotelHero

* Visited hotel with image
* Researched hotel without image
* Long location name
* No ownership information
* Mobile width

### PriceCurveChart

* One hotel
* Hotel plus two competitors
* Sparse data
* Missing month
* High event spike
* Mobile width
* Reduced motion

### FieldReportSection

* Exact visit date
* Approximate visit month
* Unknown room category
* No personal photographs

### Filters

* No active filters
* Multiple active filters
* No matching results
* URL state restoration
* Keyboard-only operation

---

# 13. Governing Component Principle

Components should make structured information feel editorial.

If a component resembles a generic SaaS dashboard, simplify it.

If a component requires an image to feel complete, strengthen its typography and hierarchy.

The hierarchy remains:

> Rank first. Hotel second. DMW judgement third. Supporting information fourth.
