# DMW Hotels 100 — Information Architecture

## 1. Purpose

This document defines the pages, navigation, content hierarchy and routes for Version 1 of DMW Hotels 100.

The website must combine:

* A luxury editorial homepage
* A ranked hotel index
* Permanent hotel reference profiles
* Optional firsthand notes within relevant hotel profiles
* Long-form strategic features
* A transparent ranking methodology

The structure must support 100 hotels without requiring a future redesign.

---

## 2. Primary Navigation

### Desktop navigation

The persistent header should contain:

* DMW Finance Group identity
* The 100
* Insights
* Methodology
* About DMW
* Search icon
* Menu icon if secondary items require it

### Mobile navigation

The mobile header should contain:

* Compact DMW identity
* Search icon
* Menu icon

The mobile menu should reveal:

* Home
* The 100
* Insights
* Methodology
* About DMW

### Navigation principles

* Keep the primary navigation restrained.
* “The 100” must be visually prominent.
* Do not include user accounts or saved lists in Version 1.
* The navigation must remain usable over light and dark sections.
* A booking button should not dominate global navigation.

---

## 3. Route Structure

Use the following route structure:

```text
/
 /the-100
 /hotels/:hotel-slug
 /insights
 /insights/:article-slug
 /methodology
 /about
```

Example routes:

```text
/the-100
/hotels/st-martins-lane-london
/insights/why-st-martins-lane-works
/methodology
```

### Future-ready routes

The architecture should allow, but not initially require:

```text
/destinations/:destination-slug
/field-reports/:report-slug
/editions/:year
```

Field Reports should initially appear inside the relevant hotel profile rather than requiring a separate route.

---

# 4. Homepage

## Route

```text
/
```

## Purpose

The homepage should establish authority, atmosphere and the central proposition before directing users into the ranked index.

It is a gateway, not a condensed version of every page.

## Section order

### 4.1 Global header

Contains the primary navigation.

The header may initially overlay the hero and transition to a solid background after scrolling.

### 4.2 Hero

The hero must establish:

* DMW Finance Group
* The World’s 100 Most Exceptional Hotels
* Edition year
* A short positioning statement
* Primary call to action: **Explore The 100**
* Secondary call to action: **How We Rank**

Suggested content hierarchy:

```text
DMW FINANCE GROUP

THE WORLD’S
100 MOST EXCEPTIONAL
HOTELS

2026 EDITION

A global index of the hotels that best combine
hospitality, brand, pricing power and enduring asset value.

[Explore The 100] [Our Methodology]
```

Visual treatment:

* Strong typography
* Large “100” or ranking-inspired graphic
* One restrained hero image or subtle hotel-image treatment
* No generic full-screen travel-video montage
* Luxury through composition rather than visual clutter

### 4.3 Index preview

Show approximately six ranked hotels.

The preview should make the list feel like the primary product.

Each preview item includes:

* Rank
* Hotel name
* City and country
* Hotel archetype
* One-line DMW judgement
* Indicative price band
* A small number of relevant amenity icons
* Preliminary score or ranking confidence
* Optional image

Include a clear link:

**View the complete ranking**

### 4.4 Featured hotel analysis

Highlight one strategically interesting hotel.

For Version 1:

**St Martins Lane, London**

Include:

* Hotel name
* Rank
* Brief DMW thesis
* Link to the hotel profile
* Link to the full strategic feature
* Field Report indicator
* One image, if available

### 4.5 Pricing intelligence

Introduce the annual pricing feature as a major point of differentiation.

Include:

* A sample annual rate graph
* Hotel name
* Lowest and highest pricing periods
* A short observation explaining what the curve reveals
* Link to the hotel profile

The graph should not be presented merely as a “find cheap dates” tool. It should communicate positioning and pricing power.

### 4.6 Latest insight

Feature the latest article from the weekly series.

Include:

* Category
* Article title
* Short description
* Reading time
* Related hotel
* Publication date
* Link to read

### 4.7 DMW Field Report

Explain that personally visited properties receive an additional firsthand assessment.

Include:

* Field Report label
* Hotel
* Visit month and year
* A short firsthand observation
* Link to the Field Report section inside the hotel profile

### 4.8 Methodology statement

Provide a short explanation of what differentiates the index.

Suggested themes:

* Hotels assessed as experiences, businesses and assets
* Research does not imply a personal visit
* Field Reports are clearly identified
* Rankings cannot be purchased

Link to the complete methodology.

### 4.9 DMW context and contact

A concise section connecting the index to DMW Finance Group.

Include:

* DMW’s hospitality, investment and M&A perspective
* A restrained contact invitation for owners, investors and operators
* Link to About DMW
* Optional external link to the primary DMW website

This must not overwhelm the editorial independence of the index.

### 4.10 Footer

Include:

* DMW Hotels 100 identity
* Navigation links
* Edition year
* DMW Finance Group link
* Contact
* Privacy
* Terms
* Image credits
* Copyright

Do not include sponsor logos in Version 1.

---

# 5. The 100 — Ranked Index

## Route

```text
/the-100
```

## Purpose

This is the functional and editorial centre of the website.

The ranking numbers, hotel names and concise DMW judgements must be the principal visual elements.

## Section order

### 5.1 Index masthead

Include:

* Page title: **The World’s 100 Most Exceptional Hotels**
* Edition year
* Short explanation
* Link to methodology

Do not repeat the entire homepage hero.

### 5.2 Search and controls

Include:

* Free-text search
* Filter button
* Result count
* Sort control
* Clear-all action

### 5.3 Version 1 filters

Support the following filters:

* Destination or region
* Hotel archetype
* Price band
* Amenities
* Business-travel suitability
* Evidence status
* DMW distinctions

Suggested hotel archetypes:

* Urban grand hotel
* Urban lifestyle hotel
* Resort
* Heritage hotel
* Boutique hotel
* Wellness retreat
* Wilderness lodge
* Private-island hotel
* Members-club hybrid
* Branded residence ecosystem

Suggested distinctions:

* Best for Business Travel
* Pricing Power
* Hospitality Ecosystem
* Independent Excellence
* Urban Resort
* Best Repositioning
* One to Watch

### 5.4 Sort options

Default:

* DMW rank

Additional options:

* Hotel name
* Destination
* Indicative rate: low to high
* Indicative rate: high to low

Do not allow filters or sorting to obscure the official ranking. When sorted differently, the official rank must remain visible.

### 5.5 Ranked list

Use one primary display mode in Version 1.

Recommended:

* Editorial list rows on desktop
* Stacked list cards on mobile

A dense image-grid should not be the default because Version 1 is typography-led.

Each ranked list item contains:

* Official rank
* Hotel name
* City and country
* Hotel archetype
* One- or two-sentence DMW judgement
* Indicative nightly rate or rate band
* Three to five essential amenity icons
* DMW distinction badges
* Evidence status
* Optional image
* Link to hotel profile

### 5.6 Optional featured interruptions

After selected ranking intervals, the list may include a restrained editorial interruption:

* Pricing insight
* Methodology note
* Featured Field Report
* Strategic quotation

These should not appear frequently enough to disrupt ranking comprehension.

### 5.7 Pagination or loading

For the final 100-property index:

* Prefer progressive loading or grouped rank sections.
* Avoid traditional pagination if it weakens the sense of one definitive list.
* Preserve direct linking and browser history.
* Ensure all hotel content remains accessible to search engines.

Suggested rank groups:

* 1–10
* 11–25
* 26–50
* 51–75
* 76–100

Version 1 may display six to ten records while preserving this architecture.

---

# 6. Individual Hotel Profile

## Route

```text
/hotels/:hotel-slug
```

## Purpose

The permanent hotel profile must be valuable regardless of whether DMW has personally visited the property.

It combines practical hotel reference information with DMW’s strategic assessment.

## Section order

### 6.1 Hotel hero

Include:

* Official rank
* Hotel name
* City and country
* Hotel archetype
* Edition year
* Evidence status
* Primary distinction
* One strong image where available
* Concise DMW judgement
* Booking or official website link

The ranking number should be a significant visual element.

### 6.2 Essential facts

Present a concise facts block:

* Address
* Opening year
* Most recent major renovation
* Number of rooms and suites
* Brand
* Operator
* Ownership, if publicly verified
* Typical nightly rate
* Check-in and check-out
* Official website
* Booking link

Unknown information should be omitted or labelled “Not publicly confirmed.” Never invent facts.

### 6.3 DMW overview

A concise editorial description explaining:

* What the hotel is
* What the guest is buying
* Who the hotel serves
* Why it deserves inclusion
* Its central strength or tension

Recommended length:

* 150–300 words

### 6.4 At a glance

Use icons and short labels for the principal amenities:

* Restaurants
* Bars
* Breakfast
* Room service
* Gym
* Spa
* Pool
* Meeting space
* Business facilities
* Valet or parking
* Airport transfer
* Pet policy
* Family suitability
* Accessible rooms
* Wi-Fi
* In-room workspace

The icons should provide rapid comprehension. Detailed conditions can appear below.

### 6.5 The hospitality proposition

Explain the hotel’s experiential strategy:

* Core promise
* Atmosphere
* Design concept
* Intended clientele
* Relationship between rooms and public spaces
* Role of location
* Primary competitive distinction

### 6.6 Business-travel assessment

Include:

* Location efficiency
* Arrival and departure convenience
* Room workspace
* Wi-Fi and practical functionality
* Meeting suitability
* Privacy
* Noise and sleep considerations
* Service speed
* Breakfast practicality
* Solo-traveller suitability

Use a short narrative assessment rather than only a numerical score.

### 6.7 Rooms and spatial logic

Include:

* Room-size range where available
* Room categories
* Workspace
* Storage
* Bathroom arrangement
* Lighting
* Technology
* View options
* Notable spatial strengths or compromises

### 6.8 Restaurants, bars and social spaces

For each relevant venue, include:

* Name
* Type
* Strategic role
* Whether it attracts non-resident guests
* Breakfast, lunch, dinner or late-night relevance
* Michelin or other recognised distinction where applicable

This section should analyse F&B as part of the hotel’s ecosystem, not simply list venues.

### 6.9 Wellness, leisure and additional amenities

Include:

* Spa
* Gym
* Pool
* Treatments
* Rooftop
* Gardens
* Beach access
* Club or membership elements
* Retail
* Residences
* Events
* Cultural programming

Only show relevant items.

### 6.10 Hospitality and revenue strategy

This is a defining DMW section.

Assess:

* How the hotel creates demand
* Sources of pricing power
* Room versus non-room revenue
* F&B contribution
* Wellness contribution
* Membership or residence components
* Brand leverage
* Distribution strategy where observable
* Scalability versus site-specific scarcity
* Strategic coherence

### 6.11 Pricing intelligence

Include:

* Annual price curve
* Currency
* Room basis used for comparison
* Observation period
* Lowest pricing periods
* Highest pricing periods
* Weekday versus weekend behaviour where available
* Major event-driven spikes
* Typical or median indicative rate
* Short DMW interpretation

A data-source and methodology note must accompany the chart.

### 6.12 Competitive positioning

Compare the hotel with a small, relevant competitive set.

Include:

* Selected competitors
* Relative price position
* Location differences
* Amenity differences
* Brand-positioning differences
* DMW interpretation

Do not compare hotels solely because they are in the same city.

### 6.13 DMW conclusion

Provide a concise conclusion covering:

* Why the hotel belongs in the index
* What it executes particularly well
* Its principal weakness or unresolved question
* Who should stay
* What an owner or investor should examine

### 6.14 DMW Field Report

Show this section only where firsthand visit content exists.

It should be visually distinct from researched profile content.

Include:

* Field Report label
* Visit date
* Number of nights
* Approximate paid rate
* Room category if known
* Travel purpose
* Arrival
* Room
* Service
* Atmosphere and clientele
* Amenities personally used
* What worked
* What disappointed
* Return intention
* Whether the visit confirmed or changed the DMW thesis

For Version 1, use:

**St Martins Lane — DMW Field Report, March 2026**

If the exact month is uncertain, label it approximately rather than falsely asserting precision.

### 6.15 Related strategic feature

Feature the relevant long-form article:

* Article title
* Description
* Reading time
* Publication date
* Link

### 6.16 Practical actions

Include restrained actions:

* Visit official website
* Check availability
* Read strategic feature
* View hotel on map
* Return to The 100

### 6.17 Sources and image credits

Include:

* Last updated date
* Core public information sources
* Price-data source and observation date
* Image credits
* Disclosure of affiliate links if applicable

---

# 7. Insights Index

## Route

```text
/insights
```

## Purpose

Insights houses DMW’s longer hospitality analysis.

It should resemble a high-quality editorial publication rather than a generic blog.

## Section order

### 7.1 Insights masthead

Include:

* Title
* Short editorial proposition
* Featured article

### 7.2 Topic filters

Version 1 topics:

* Why This Hotel Works
* Hotel Strategy
* Pricing Power
* Business Travel
* Brand Positioning
* Operations
* Development
* Hotel M&A

### 7.3 Article list

Each article card includes:

* Image where available
* Category
* Title
* Short description
* Reading time
* Publication date
* Related hotel
* Relevant tags

Use varied editorial card sizes, but maintain clear hierarchy.

---

# 8. Individual Strategic Feature

## Route

```text
/insights/:article-slug
```

## Purpose

The article page demonstrates DMW’s judgement in depth.

## Section order

### 8.1 Article hero

Include:

* Category
* Title
* Standfirst
* Related hotel
* Author
* Publication date
* Reading time
* Evidence basis:

  * Firsthand visit
  * Structured research
  * Firsthand visit plus research
* Hero image where available

### 8.2 Article body

The recommended structure for “Why This Hotel Works” is:

1. Opening judgement
2. The guest proposition
3. Arrival and experiential design
4. Rooms and functional execution
5. Amenities and revenue architecture
6. Brand and clientele
7. Pricing strategy
8. Location and asset logic
9. Strategic weakness or opportunity
10. Owner and investor implications
11. DMW conclusion

Not every article must use identical visible headings, but the analysis should address these subjects.

### 8.3 Article data modules

Articles may embed:

* Hotel fact block
* Pricing graph
* Competitive comparison
* Pull quote
* Amenity summary
* Field Report excerpt

### 8.4 Related content

Include:

* Link to hotel profile
* Related articles
* Return to Insights
* Next hotel analysis

### 8.5 Sources and disclosures

Include:

* Sources
* Image credits
* Firsthand-visit disclosure
* Affiliate disclosure if relevant
* Last updated date

---

# 9. Methodology Page

## Route

```text
/methodology
```

## Purpose

The methodology page builds confidence in the selection while preserving room for editorial judgement.

## Section order

### 9.1 Methodology introduction

Explain:

* What the index measures
* Why DMW created it
* Why hotels are assessed as experiences, businesses and assets

### 9.2 Selection universe

Explain:

* How candidate hotels enter consideration
* Geographic scope
* Hotel types eligible for inclusion
* How new openings are treated
* How temporary closures are treated

### 9.3 Ranking dimensions

Present the ranking dimensions and weights defined in the separate ranking-methodology document.

### 9.4 Research process

Explain:

* Official hotel research
* Publicly available asset and operator information
* Pricing observations
* Reputable editorial sources
* Guest-feedback pattern analysis
* Firsthand visits where available

### 9.5 Research basis

Explain that structured research is the standard basis of every entry and that occasional firsthand notes are supplementary. Do not create public hotel-status classes.

### 9.6 Editorial judgement

Explain:

* The calculation informs the ranking
* DMW retains documented editorial judgement
* Any override must be justified internally
* Rankings cannot be purchased

### 9.7 Updates and editions

Explain:

* Annual edition cycle
* Profile updates between editions
* Treatment of ranking changes
* Historical editions in future versions

### 9.8 Commercial independence

Disclose:

* Affiliate links
* Partnerships
* Sponsored content
* Separation from ranking decisions

---

# 10. About DMW

## Route

```text
/about
```

## Purpose

Connect the index to DMW Finance Group without turning the publication into a corporate brochure.

## Content

Include:

* Short DMW Finance Group introduction
* Hospitality-investment perspective
* Relevant M&A, investment and strategic orientation
* Relationship to international business travel
* Curzon House as evidence of applied hospitality thinking
* Contact invitation for:

  * Owners
  * Investors
  * Operators
  * Developers
  * Strategic partners

Keep detailed corporate information on DMW’s main website where appropriate.

---

# 11. Search Behaviour

Version 1 search should match:

* Hotel name
* City
* Country
* Region
* Brand
* Operator
* Archetype
* Amenity
* Distinction
* Article title
* Article topic

Search results should distinguish between:

* Hotels
* Articles

A lightweight client-side search is sufficient for the prototype.

---

# 12. Cross-Linking Rules

Every hotel profile should link to:

* The ranked index
* Its related Field Report, if available
* Its strategic feature, if available
* Relevant competitors
* Booking or official website
* Relevant methodology explanation

Every article should link to:

* Its related hotel profile
* Relevant pricing or ranking modules
* Related insights

The homepage should link to:

* The complete ranking
* Featured hotel
* Featured article
* Field Report
* Methodology
* About DMW

No major page should become a dead end.

---

# 13. Responsive Behaviour

## Desktop

* Use wide editorial compositions.
* Ranking numbers may occupy a dedicated column.
* Hotel rows may combine text, icons and one image.
* Filter controls may remain visible or open in a side panel.
* Profile sections may use asymmetric two-column layouts.

## Tablet

* Preserve ranking prominence.
* Reduce secondary metadata.
* Allow filter chips to scroll horizontally.
* Stack complex chart annotations where needed.

## Mobile

* Use a single-column flow.
* Keep the rank large but prevent it from overwhelming the hotel name.
* Collapse secondary hotel facts into expandable groups.
* Make amenity icons horizontally scrollable or use a compact grid.
* Open filters in a full-screen panel.
* Ensure charts remain readable through simplified labels or horizontal scrolling.
* Keep booking actions available without using an intrusive permanent banner.
* Avoid hover-dependent interactions.

---

# 14. Empty and Missing States

The interface must handle incomplete content elegantly.

Examples:

### No firsthand note

Display nothing. This is the normal state of a complete hotel profile, not missing content.

### No pricing data

Display:

**Pricing analysis in preparation**

Do not render an empty chart.

### Unknown ownership

Omit the field or display:

**Ownership not publicly confirmed**

### No image rights

Use a typography-led hotel hero with rank, hotel name and location.

Do not use generic stock hotel photography as a substitute.

---

# 15. Version 1 Page Inventory

Version 1 must deliver:

* 1 homepage
* 1 ranked-index page
* 6–10 sample hotel records
* 1 complete St Martins Lane profile
* 1 St Martins Lane Field Report embedded in the profile
* 1 complete strategic feature
* 1 Insights index
* 1 methodology page
* 1 About DMW page
* Legal and image-credit links in the footer

---

# 16. Architecture Principle

The information architecture must always preserve the distinction between:

* **Ranking:** where the hotel stands
* **Profile:** what the hotel is
* **Field Report:** what DMW personally experienced
* **Insight:** what the hotel teaches us strategically

These elements should reinforce one another without being collapsed into a single undifferentiated page.
