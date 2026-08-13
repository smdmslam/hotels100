# DMW Hotels 100 — Visual Direction

## 1. Visual Objective

DMW Hotels 100 should feel like a private intelligence publication about exceptional hotels—not a mass-market booking platform or conventional travel magazine.

The experience must combine:

* Mayfair sophistication
* Luxury-hospitality atmosphere
* Editorial authority
* Investment-grade clarity
* Restrained modern functionality

Version 1 has limited licensed photography. The design must therefore create luxury primarily through typography, proportion, composition, spacing, ranking numbers and concise language.

The ranked list is the principal visual product.

---

## 2. Visual Positioning

The desired visual territory sits between:

* A luxury hotel
* A private members’ club
* A carefully designed annual index
* An investment or auction catalogue
* An independent editorial journal

It should feel expensive without looking ornamental, theatrical or artificially exclusive.

The guiding visual statement is:

> Quiet luxury, editorial confidence and analytical precision.

---

## 3. Reference Roles

References must guide specific aspects of the product. They should not be copied directly.

### Curzon House

Reference:

https://www.thecurzonhouse.co.uk/

Borrow:

* Mayfair sophistication
* Dark luxury
* Privacy
* Restrained use of gold or warm metallic tones
* High-contrast typography
* Sense of membership and discretion
* DMW’s existing visual character

Do not borrow:

* Any feature that would make the hotel index feel like a club-marketing page
* Excessively dark sections that reduce readability
* Decorative styling without an editorial function

### Brach Paris

Reference:

https://www.evokcollection.com/brach-paris/

Borrow:

* Hospitality atmosphere
* Generous whitespace
* Large editorial compositions
* Image-and-text pacing
* Sensory transitions
* Warm, tactile materials and colours
* Confidence in allowing individual elements room to breathe

Do not borrow:

* Booking-led interface patterns
* Brach’s particular brand identity
* Decorative imagery unrelated to the index

### The World’s 50 Best Hotels

Borrow:

* Ranking as the principal content
* Large hotel names
* Definitive annual-edition framing
* Special distinctions
* Image-led moments within a list
* Authority of a published selection

Do not borrow:

* Event-awards visual language
* Sponsor-heavy presentation
* Generic three-column hotel grids as the primary experience
* Celebration without substantive analysis

### Michelin Guide

Borrow:

* Clear search and filtering
* Practical information architecture
* Separation of index, property profile and editorial features
* Legible metadata
* Content tags
* Destination and category navigation

Do not borrow:

* Mass-directory density
* Utility-first styling
* Review-platform conventions
* Excessive controls at the top of the page

---

## 4. Core Visual Principle

In Version 1, every major composition should be built from five elements:

1. Ranking number
2. Hotel name
3. DMW judgement
4. Structured information
5. Selective imagery

If an image is unavailable, the first four elements must still create a complete and attractive composition.

The interface should never appear dependent on photography for identity.

---

## 5. Colour System

The palette should derive loosely from Curzon House but be adjusted for long-form editorial use.

### Primary colours

#### Ink

```css
#121212
```

Use for:

* Primary text
* Dark backgrounds
* Header and footer
* Strong graphic sections

#### Ivory

```css
#F4F0E8
```

Use for:

* Main page background
* Large editorial fields
* Warmer alternative to pure white

#### Paper

```css
#FBFAF7
```

Use for:

* Hotel rows
* Article surfaces
* Cards
* Reading backgrounds

#### Antique Gold

```css
#B39A62
```

Use sparingly for:

* Ranking accents
* Rules
* Selected icons
* Active states
* Edition markers

Gold must never become yellow, glossy or ornamental.

### Supporting colours

#### Stone

```css
#A7A095
```

Use for:

* Secondary text
* Inactive controls
* Metadata

#### Charcoal

```css
#292826
```

Use for:

* Secondary dark sections
* Chart backgrounds
* Featured editorial modules

#### Sage Grey

```css
#777C70
```

Use selectively for:

* Data visualisation
* Research-status markers
* Secondary distinctions

#### Burgundy

```css
#6D292F
```

Use very sparingly for:

* Important editorial emphasis
* Field Report marker
* Selected chart series

### Colour restrictions

* Avoid bright primary colours.
* Avoid pure black and pure white dominating every section.
* Avoid gradients unless extremely subtle and atmosphere-driven.
* Avoid multiple gold shades.
* Never assign a different bright colour to every amenity or filter.
* Interactive states must remain accessible and clearly visible.

---

## 6. Typography

Typography is a core product feature.

Use a two-family system:

* Editorial serif
* Functional sans-serif

### Editorial serif

Use for:

* Ranking numbers
* Major headings
* Hotel names
* Article titles
* Pull quotes
* Edition titles

Preferred characteristics:

* High contrast
* Elegant but not excessively fashion-oriented
* Strong numerals
* Clear italics
* Suitable for large display sizes

Acceptable open-source directions:

* Cormorant Garamond
* Bodoni Moda
* DM Serif Display
* Instrument Serif
* Libre Caslon Display

Recommended starting choice:

**Instrument Serif**

If its numerals do not provide sufficient authority, test:

**Bodoni Moda**

### Functional sans-serif

Use for:

* Navigation
* Body copy
* Metadata
* Filters
* Buttons
* Facts
* Amenities
* Chart labels

Preferred characteristics:

* Neutral
* Highly legible
* Contemporary
* Not recognisably “tech startup”

Acceptable choices:

* Inter
* Manrope
* Geist
* Source Sans 3

Recommended starting choice:

**Inter**

### Type hierarchy

Suggested desktop scale:

```css
--type-display-xl: clamp(5rem, 11vw, 11rem);
--type-display-lg: clamp(3.5rem, 7vw, 7.5rem);
--type-h1: clamp(3rem, 5vw, 5.5rem);
--type-h2: clamp(2.25rem, 3.5vw, 4rem);
--type-h3: clamp(1.5rem, 2vw, 2.25rem);
--type-body-lg: 1.25rem;
--type-body: 1rem;
--type-small: 0.8125rem;
--type-label: 0.6875rem;
```

Suggested mobile scale:

```css
--type-display-xl: clamp(4rem, 25vw, 7rem);
--type-display-lg: clamp(3rem, 18vw, 5rem);
--type-h1: clamp(2.5rem, 12vw, 4rem);
--type-h2: clamp(2rem, 9vw, 3rem);
--type-h3: 1.5rem;
--type-body-lg: 1.125rem;
--type-body: 1rem;
--type-small: 0.8125rem;
--type-label: 0.6875rem;
```

### Typography rules

* Use uppercase sparingly.
* Small uppercase labels may use increased letter spacing.
* Avoid long paragraphs in serif.
* Use serif for judgement and identity; sans-serif for clarity and utility.
* Body text should have a comfortable line height of approximately 1.55–1.7.
* Long-form article width should generally remain between 650 and 760 pixels.
* Do not centre large amounts of body copy.

---

## 7. Ranking Numerals

The ranking numeral is the signature graphic element.

It must be:

* Immediately visible
* Elegant
* Consistent
* Useful for navigation and comprehension
* Strong enough to carry a card without photography

### Treatment options

Use one primary treatment consistently:

* Large serif numeral
* Fine gold or stone-coloured stroke/rule
* Leading zero for ranks 1–9 if visually stronger
* Subtle overlap with the hotel row, without obstructing text

Examples:

```text
01
07
24
100
```

### Restrictions

* Do not place every number inside a badge or circle.
* Do not use sports-scoreboard typography.
* Do not use gold foil effects.
* Do not rotate numbers decoratively.
* Do not allow the number to reduce readability of the hotel name.

---

## 8. Layout and Grid

### Desktop

Use a 12-column editorial grid.

Recommended maximum content width:

```css
max-width: 1600px;
```

Recommended page gutters:

```css
clamp(24px, 4vw, 72px);
```

Primary compositions may use:

* 3 columns for rank
* 5 columns for hotel identity and judgement
* 2 columns for metadata
* 2 columns for image or actions

The exact ratios may vary, but alignment must remain disciplined.

### Tablet

Use an 8-column grid.

Collapse metadata selectively while keeping rank and hotel name prominent.

### Mobile

Use a 4-column grid or simple single-column structure.

The rank may sit:

* Above the hotel name
* Beside the hotel name
* Partially behind the content at low contrast

Do not force desktop multi-column layouts into mobile.

### Spacing

Use generous vertical rhythm.

Suggested spacing scale:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--space-10: 144px;
```

Sections should generally use 96–144 pixels of desktop vertical spacing and 64–96 pixels on mobile where appropriate.

---

## 9. Homepage Visual Direction

### Hero

The hero should be typography-led.

Preferred composition:

* DMW Finance Group as restrained eyebrow text
* Oversized “100”
* Title broken across deliberate lines
* Edition year
* Short proposition
* Two actions
* One atmospheric hotel image or image fragment

The hero should not resemble:

* A property-booking homepage
* A luxury-resort advertisement
* A generic hero with centred white text over a dark image

### Ranked preview

The homepage ranking preview should use editorial rows rather than standard cards.

Rows should vary subtly in scale:

* Rank 1 may receive a larger treatment
* Other featured hotels should remain visually related
* Images may alternate between left and right
* At least one row should prove the design works without an image

### Pricing feature

Treat the chart as editorial content.

The chart should have:

* A large headline observation
* Restrained axes
* One primary series
* Minimal grid lines
* Clear low and high annotations
* Supporting contextual text

It must not resemble a stock-trading terminal or analytics dashboard.

---

## 10. Ranked Index Visual Direction

The index must feel like a published annual list.

### List row structure

Each row should contain:

* Large rank
* Hotel identity
* DMW judgement
* Selected facts
* Amenities
* Evidence status
* Optional image
* Directional action

Rows may alternate between:

* Paper background
* Ivory background
* Dark featured row

Variation must remain systematic rather than decorative.

### Image use

For list rows:

* Use a consistent aspect ratio.
* Prefer one image per hotel.
* Do not use carousels inside ranking rows.
* Do not enlarge low-resolution images.
* When no image exists, expand the typography composition.

### Hover behaviour

Desktop hover may include:

* Image reveal
* Slight image scale
* Rule movement
* Arrow movement
* Background-tone shift

Do not animate the entire row aggressively.

---

## 11. Hotel Profile Visual Direction

### Hero

The profile hero should combine:

* Oversized rank
* Hotel name
* Location
* DMW judgement
* Evidence status
* One primary image

The rank and name must remain strong even if the image is removed.

### Facts and amenities

Use:

* Fine rules
* Short labels
* Compact Lucide icons
* Clear grouping
* Generous spacing

Avoid:

* Dense boxed dashboards
* Coloured tiles
* Excessive pills
* Large icon illustrations

### Editorial sections

Alternate between:

* Full-width text
* Text plus image
* Text plus quote
* Dark analytical section
* Chart section
* Field Report inset

Do not place every section in an individual card.

### Field Report

The Field Report should feel like a distinct editorial insert.

Suggested treatment:

* Burgundy or charcoal accent
* “DMW FIELD REPORT” label
* Visit date and trip details
* First-person narrative
* Pull quote
* Clear separation from desk research

It must not look like a public customer review.

---

## 12. Article Visual Direction

The strategic feature should feel like a serious long-form journal.

Include:

* Strong headline
* Concise standfirst
* Evidence-basis label
* Author, date and reading time
* Restrained hero image
* Narrow reading column
* Occasional full-width analytical modules
* Pull quotes
* Pricing chart or comparison where relevant
* Related hotel profile link

Avoid:

* Floating social-share clutter
* Advertising interruptions
* Excessive inline cards
* Tiny body type
* Artificial “thought leadership” styling

---

## 13. Iconography

Use **Lucide Icons** for interface and amenity icons.

Suggested icons include:

* `Search`
* `Menu`
* `MapPin`
* `ArrowRight`
* `SlidersHorizontal`
* `X`
* `ChevronDown`
* `Calendar`
* `Clock`
* `ExternalLink`
* `Hotel`
* `BedDouble`
* `Utensils`
* `Wine`
* `Dumbbell`
* `Waves`
* `Sparkles`
* `BriefcaseBusiness`
* `Wifi`
* `Car`
* `Plane`
* `Dog`
* `Users`
* `Accessibility`
* `Laptop`
* `Coffee`
* `ConciergeBell`
* `BadgeCheck`

### Icon rules

* Use one consistent stroke width.
* Icons should generally be 16–20 pixels.
* Do not mix Lucide with filled icon sets.
* Pair icons with text when meaning may be ambiguous.
* Amenities should not rely on icons alone for accessibility.
* Do not use icons as decorative filler.

---

## 14. Badges and Labels

Use badges sparingly.

Approved badge types:

### Evidence status

* DMW Researched
* DMW Visited
* DMW Revisited

### Distinctions

* Best for Business Travel
* Pricing Power
* Hospitality Ecosystem
* Independent Excellence
* Urban Resort
* One to Watch

### Editorial labels

* Field Report
* Why This Hotel Works
* Pricing Intelligence
* 2026 Edition

Badges should be:

* Small
* Typographic
* Outlined or lightly filled
* Consistent in shape
* Secondary to hotel names and ranking

Avoid displaying more than three badges at once.

---

## 15. Data Visualisation

Charts are a major part of the product’s identity.

### Pricing chart

Preferred form:

* Line chart
* Monthly or weekly points
* Smoothed only if the smoothing does not misrepresent the data
* Median or representative room rate
* Optional competitor line
* Event markers where relevant

### Chart palette

* Primary hotel: Antique Gold
* Competitor: Sage Grey
* Secondary competitor: Stone
* Important event or anomaly: Burgundy
* Grid: Low-opacity Stone
* Background: Paper or Charcoal

### Chart rules

* Always display currency.
* Always identify the room basis and observation period.
* Never imply precision the data does not support.
* Avoid 3D charts.
* Avoid bright multicolour palettes.
* Avoid unnecessary legends.
* Provide a concise written interpretation.
* Ensure tooltips and labels are keyboard accessible where possible.

---

## 16. Photography

### Preferred sources

* Official hotel press libraries
* Hotel-provided media
* Properly licensed editorial photography
* Photographer-approved images
* Affiliate or booking feeds whose licences permit display
* Original DMW photography

### Requirements

Each image record should support:

* Image source
* Photographer
* Copyright holder
* Usage permission or licence
* Alt text
* Hotel
* Image category

### Image categories

* Exterior
* Arrival
* Lobby
* Room
* Suite
* Restaurant
* Bar
* Spa
* Gym
* Pool
* Landscape
* Architectural detail

### Restrictions

* Do not scrape and republish images from Tripadvisor, Google, Expedia or unrelated websites without explicit rights.
* Do not use watermarked images.
* Do not remove attribution.
* Do not use AI-generated imagery as factual representation of a real hotel.
* Do not use generic luxury-hotel stock photography in a hotel profile.

### No-image state

When a licensed image is unavailable:

* Use a typography-led hero.
* Use rank, location and DMW judgement.
* Add a restrained abstract colour field or line treatment if needed.
* Do not apologise visually for the absence of imagery.

---

## 17. Motion

Motion should be restrained and purposeful.

Approved motion:

* Header transition on scroll
* Soft image reveal
* Subtle text fade or rise
* Number reveal
* Filter-panel transition
* Chart drawing on first view
* Underline or arrow movement on hover

Recommended duration:

```css
150ms–250ms for controls
400ms–700ms for editorial reveals
```

Respect:

```css
prefers-reduced-motion
```

Avoid:

* Parallax on every image
* Smooth scrolling that overrides browser behaviour
* Long loading animations
* Cursor effects
* Constant floating elements
* Horizontal scroll hijacking
* Intro sequences users must wait through

---

## 18. Controls and Buttons

### Primary button

Use for:

* Explore The 100
* Read the Field Report
* Read the analysis

Treatment:

* Dark fill on light background
* Ivory text
* Minimal corner radius
* Clear hover state

### Secondary button

Use for:

* Methodology
* Official website
* Booking link
* View all insights

Treatment:

* Transparent or paper background
* Fine ink border
* Ink text

### Text links

Use for:

* Supporting navigation
* Sources
* Related hotels
* Footer items

Treatment:

* Underline on hover
* Arrow where direction is helpful

### Restrictions

* Avoid pill-shaped buttons throughout the site.
* Avoid oversized call-to-action buttons.
* Avoid gold-filled buttons.
* Do not use more than two competing actions in one module.

---

## 19. Borders, Corners and Shadows

### Borders

Use fine, low-contrast rules to organise information.

Recommended:

```css
1px solid rgba(18, 18, 18, 0.14);
```

### Corners

Use minimal rounding.

Recommended range:

```css
0px–6px
```

Hotel imagery may use square corners or very slight rounding.

### Shadows

Use rarely.

If required:

```css
0 12px 36px rgba(18, 18, 18, 0.08);
```

Avoid:

* Floating SaaS cards
* Heavy drop shadows
* Glassmorphism
* Neumorphism
* Excessive rounded rectangles

---

## 20. Accessibility

Luxury must not reduce usability.

Requirements:

* Minimum WCAG AA contrast for body text and controls
* Visible keyboard focus states
* Semantic heading hierarchy
* Descriptive alt text
* Labels for icon-only controls
* Minimum practical touch target of approximately 44px
* No information conveyed through colour alone
* Reduced-motion support
* Charts accompanied by written summaries
* Legible body size on mobile
* Avoid justified body copy
* Avoid text placed over busy images without sufficient contrast

---

## 21. Responsive Priorities

When space is limited, preserve this order:

1. Rank
2. Hotel name
3. Location
4. DMW judgement
5. Evidence status
6. Price
7. Essential amenities
8. Image
9. Secondary metadata

Photography and secondary information may reduce before the ranking identity does.

---

## 22. Prohibited Visual Patterns

Do not use:

* Generic luxury templates
* Full-screen stock-video heroes
* Gold gradients
* Marble textures
* Black backgrounds on every section
* Excessive logo repetition
* Large collections of pill controls
* Glassmorphism
* Bright dashboard charts
* Bento-grid layouts merely because they are fashionable
* Decorative serif text for body copy
* Generic testimonial carousels
* Public star ratings as a dominant element
* Fake review quotes
* Hotel images without recorded usage rights
* AI-generated images presented as real properties
* Overly rounded cards
* Animation that delays access to content

---

## 23. Version 1 Visual Test

The design passes if:

* A hotel row without an image still feels complete and luxurious.
* The ranking number is immediately recognisable as part of the brand.
* The index feels more authoritative than a standard hotel directory.
* The profile feels more analytical than a booking page.
* The Field Report feels more valuable than a customer review.
* The pricing chart feels editorial rather than dashboard-like.
* The site visually belongs in the same world as Curzon House.
* The hospitality atmosphere approaches Brach without imitating it.
* The site remains fast, legible and usable on mobile.

---

## 24. Governing Visual Principle

When choosing between decoration and clarity, choose clarity.

When choosing between more images and a stronger image, choose the stronger image.

When choosing between a standard card and an editorial composition, choose the editorial composition.

When choosing what should dominate, the order is:

> Rank first. Hotel second. DMW judgement third. Everything else supports them.
