You are building Version 1 of the DMW Hotels 100 website.

Before writing code, read these files completely and treat them as the product specification:

* `01-product-brief.md`
* `02-information-architecture.md`
* `03-visual-direction.md`
* `04-component-spec.md`
* `05-hotel-schema.json`
* `06-ranking-methodology.md`
* `07-content/hotels.json`

## Objective

Build a polished, responsive prototype for:

**DMW Finance Group — The World’s 100 Most Exceptional Hotels**

This is a luxury editorial index and hospitality-intelligence publication.

It is not:

* A mass-market booking website
* A generic travel blog
* A review platform
* A SaaS dashboard
* A standard three-column hotel-card template

The intended synthesis is:

* The World’s 50 Best Hotels: ranking authority
* Michelin Guide: information architecture
* Brach Paris: hospitality atmosphere
* Curzon House: luxury level
* DMW Finance Group: strategic and investment intelligence

Reference websites:

* https://www.thecurzonhouse.co.uk/
* https://www.evokcollection.com/brach-paris/
* https://www.theworlds50best.com/hotels/best-in-the-world/
* https://guide.michelin.com/en/hotels-stays

Use these references for direction only. Do not copy their branding, layouts or assets.

## Technical foundation

Use:

* React
* Vite
* TypeScript
* React Router
* Plain CSS or CSS Modules
* Lucide React icons
* Recharts for pricing visualisation

Do not use:

* Tailwind
* A heavy UI component library
* Bootstrap
* Material UI
* Shadcn
* A database
* Authentication
* A CMS
* Server-side infrastructure

The prototype must build and deploy as a lightweight static website.

If the folder is empty apart from specification files, initialise the Vite project in the current directory without deleting or overwriting the specification documents.

## Required routes

Build:

```text
/
 /the-100
 /hotels/st-martins-lane-london
 /insights
 /insights/why-st-martins-lane-works
 /methodology
 /about
```

Unknown hotel slugs should display a controlled “profile in preparation” state or a proper not-found page.

## Data architecture

Treat `07-content/hotels.json` as the prototype’s canonical index dataset.

Treat `05-hotel-schema.json` as the intended full hotel-record structure.

Create typed data-access utilities and reusable TypeScript interfaces. Hotel-specific facts must remain in data files rather than being hard-coded inside components.

Important data rules:

* Do not invent missing hotel facts.
* Do not invent rankings.
* Do not invent prices.
* Do not invent amenities.
* Do not invent ownership or operator information.
* Do not invent quotes.
* Do not invent image credits or usage rights.
* Do not generate fake customer reviews.
* Do not use arbitrary internet images.
* Do not display an image unless its rights status permits publication.
* Do not treat `null` as zero.
* Do not display empty sections.

The ranks in `hotels.json` are illustrative. Display the supplied prototype notice clearly on the index and methodology pages.

Where `dmwJudgement` is `null`, display the supplied `assessmentPendingLabel`.

## Content treatment

St Martins Lane is the only developed hotel record.

Use the St Martins Lane example contained in `05-hotel-schema.json` to build its full profile and optional dated firsthand note. The note must not influence the ranking hierarchy or make other profiles appear incomplete.

Create separate content data files as necessary, but preserve the supplied wording and meaning.

For the initial article, create the page structure and use a clearly labelled editorial draft assembled only from the approved St Martins Lane observations in the schema.

The central thesis is:

> St Martins Lane compensates for limited room size by turning arrival, design and location into the luxury product. It sells theatricality and access rather than square metres.

Do not pad the article with invented corporate facts or unsupported claims.

## Required pages

### Homepage

Include:

* Restrained global header
* Typography-led hero
* Oversized `100`
* DMW Finance Group identity
* 2026 edition
* Product proposition
* Explore The 100 action
* Methodology action
* Ranked preview using the sample records
* Featured St Martins Lane analysis
* Pricing-intelligence preview
* Latest insight
* Pricing-intelligence or hotel-strategy teaser
* Methodology teaser
* Brief DMW context
* Footer

### The 100

Include:

* Index masthead
* Prototype-ranking notice
* Search
* Functional filters
* Sort control
* Result count
* Typography-led ranked list
* Responsive mobile presentation
* No-results state

Filters should work against the supplied data where values exist.

At minimum, support:

* Search by hotel or location
* Region
* Archetype
* Preliminary score or ranking confidence
* Business-travel suitability
* Distinction

Preserve the official illustrative rank even when the user selects another sorting mode.

Where practical, preserve search/filter state in URL query parameters.

### St Martins Lane profile

Include:

* Large illustrative rank
* Hotel name and location
* DMW judgement
* Defining characteristics
* DMW overview
* Essential facts where verified
* Amenities
* Hospitality proposition
* Business-travel assessment
* Rooms and spatial logic
* Restaurants, bar and café observations
* Hospitality and revenue strategy
* Pricing analysis state
* Competitive-positioning state
* DMW conclusion
* Optional firsthand note, visually subordinate to the permanent assessment
* Related strategic article
* Sources/disclosures section
* Practical actions

Because annual pricing data has not yet been collected, do not pretend the chart is factual.

For the profile itself, show the specified:

**Pricing analysis in preparation**

state.

### Homepage pricing demonstration

The homepage must demonstrate how pricing intelligence will look.

Create an explicitly labelled:

**Demonstration data**

chart using a small local sample dataset.

The label and accompanying note must make clear that the values are illustrative interface data and are not actual St Martins Lane rates.

The chart should prove the visual concept without implying factual research.

### Insights

Include:

* Editorial masthead
* Featured St Martins Lane article
* Topic filters
* Article card system
* Clear states for future content

Do not fill the page with invented articles. A small number of labelled editorial placeholders may be used only when necessary to demonstrate layout.

### Strategic article

Build:

`/insights/why-st-martins-lane-works`

Include:

* Article category
* Title
* Standfirst
* Evidence basis
* Author
* Date
* Reading time
* Article body
* Pull quote
* Inline hotel summary
* Link to hotel profile
* Sources and disclosure
* Related-content state

The page must feel like a luxury editorial journal, not a blog template.

### Methodology

Present:

* Purpose of the ranking
* Selection approach
* Ten ranking dimensions
* Weights
* Ranking confidence and research methodology
* Research process
* Editorial adjustment
* Annual review process
* Commercial independence
* Prototype-ranking warning

Use the supplied methodology. Do not simplify it into decorative scores or colourful dashboard graphics.

### About

Include:

* Concise DMW Finance Group introduction
* The index’s hospitality, investment and M&A perspective
* Business-traveller perspective
* A restrained reference to Curzon House as applied hospitality thinking
* Contact invitation

Do not invent DMW credentials, transaction history or numerical claims.

## Visual requirements

Follow `03-visual-direction.md` closely.

Primary hierarchy:

1. Rank
2. Hotel
3. DMW judgement
4. Supporting information

Use:

* An editorial serif for ranks, hotel names and major headings
* A contemporary sans-serif for body copy and controls
* Instrument Serif and Inter if practical
* Oversized elegant numerals
* Ink, ivory, paper and restrained antique-gold colours
* Fine rules
* Generous whitespace
* Lucide icons
* Square or minimally rounded corners
* Very restrained shadows
* Purposeful dark sections

Avoid:

* Generic luxury templates
* Excessive black-and-gold decoration
* Gold gradients
* Glassmorphism
* Bento-grid styling
* Large collections of pills
* SaaS cards
* Generic stock photography
* Full-screen stock video
* Excessive animations
* Oversized rounded buttons

At least one ranked hotel must be shown in a no-image treatment to prove the visual system works without photography.

## Image handling

Version 1 must work without hotel photography.

Create intentional no-image states based on:

* Rank
* Hotel name
* Location
* Typography
* Rules
* Restrained colour fields

If local images are later added, the architecture should support them through data records and an `ImageWithCredit` component.

Do not hotlink remote hotel images.

## Components

Implement the reusable components specified in `04-component-spec.md`, prioritising those required by the actual Version 1 pages.

At minimum, create:

* `SiteHeader`
* `SiteFooter`
* `Container`
* `SectionHeader`
* `Button`
* `Badge`
* `IconLabel`
* `HomeHero`
* `RankingPreview`
* `RankedHotelList`
* `RankedHotelItem`
* `SearchBar`
* `FilterBar`
* `FilterPanel`
* `SortControl`
* `ResultSummary`
* `HotelHero`
* `HotelFactGrid`
* `AmenityGrid`
* `EditorialAnalysisSection`
* `BusinessTravelPanel`
* `PriceCurveChart`
* `PricingPendingState`
* `FieldReportSection`
* `ArticleCard`
* `ArticleHero`
* `ArticleBody`
* `SourceList`
* `Disclosure`
* `EmptyState`
* `ErrorBoundary`

Do not create unused abstractions merely to satisfy the list. Components should exist where the interface uses them.

## Accessibility

Meet the accessibility requirements in the visual specification:

* Semantic HTML
* Logical heading hierarchy
* Keyboard-operable controls
* Visible focus states
* Proper labels
* Accessible mobile menu
* Accessible filter panel
* Minimum practical touch targets
* Sufficient colour contrast
* Reduced-motion support
* Written summary for charts
* No information conveyed by colour alone

## Responsive behaviour

Test:

* Wide desktop
* Standard laptop
* Tablet
* Mobile around 390px wide

Mobile must preserve:

1. Rank
2. Hotel name
3. Location
4. DMW judgement
5. Defining characteristics
6. Price
7. Essential amenities

Do not merely shrink the desktop interface.

## SEO and metadata

Add:

* Unique page titles
* Meta descriptions
* Canonical-ready route structure
* Open Graph-ready metadata structure
* Semantic article markup
* Hotel structured-data preparation where claims are verified
* `robots.txt`
* Basic sitemap generation or a static sitemap

Do not add fabricated schema values.

## Performance

* Lazy-load below-the-fold images
* Avoid large dependencies beyond those requested
* Prevent layout shift
* Keep animation restrained
* Ensure the site remains fast without imagery
* Avoid unnecessary network requests

## Work sequence

Follow this order:

1. Inspect the folder and specifications.
2. Produce a short implementation plan.
3. Initialise or adapt the Vite project.
4. Create the data layer and types.
5. Build the global design system.
6. Build shared navigation and layout.
7. Build The 100 index first.
8. Build the St Martins Lane profile.
9. Build the homepage.
10. Build Insights and the article.
11. Build Methodology and About.
12. Add responsive behaviour.
13. Add accessibility and metadata.
14. Run validation and fix failures.

Do not stop after scaffolding.

Continue until the complete Version 1 prototype works.

## Verification

Before declaring completion:

* Run the production build.
* Run TypeScript checking.
* Run linting.
* Check for browser-console errors.
* Check every required route.
* Test search, filters, sorting and clear-all.
* Test direct navigation to hotel and article URLs.
* Test mobile navigation.
* Test keyboard access.
* Test no-image states.
* Test missing-data states.
* Confirm the prototype-ranking notice is visible.
* Confirm demonstration pricing is explicitly labelled.
* Confirm no unlicensed remote images were introduced.
* Confirm no missing facts were invented.

If browser-preview capability is available, inspect the actual rendered pages at desktop and mobile sizes and correct visual defects before finishing.

## Definition of done

The project is complete when:

* All required routes render correctly.
* The list is visibly the protagonist.
* The design feels editorial and luxurious without relying on photography.
* St Martins Lane has a complete useful profile.
* Its optional firsthand note is clearly subordinate to the permanent hotel profile.
* The strategic article demonstrates DMW’s point of view.
* Search, filtering and sorting work.
* Missing content is handled intentionally.
* The prototype notice prevents illustrative rankings from appearing final.
* The build completes without errors.
* The site is responsive and accessible.
* Adding more hotel records will not require redesigning the architecture.

When finished, provide:

* A concise implementation summary
* The final file structure
* Commands to run locally
* Tests performed
* Any remaining content gaps that require DMW research rather than engineering
