# Winnie’s Hair Braiding — Website Design Spec

**Date:** 2026-06-30  
**Project:** Winnie’s Hair Braiding landing page  
**Scope:** Single-page responsive website built with semantic HTML, modern CSS, and vanilla JavaScript.

---

## 1. Goal

Create a modern, responsive single-page website for Winnie’s Hair Braiding that showcases braiding styles, emphasizes 24/7 availability, and makes it easy for clients in New York, Minnesota, and internationally to book appointments.

---

## 2. Context

- The repository currently contains only static media assets (images, logos, video).
- No existing build system, framework, or source code.
- Business locations: Queens, NY and Champlin, MN.
- Brand identity is reflected in existing logo (coral/pink script) and award badge (black/gold).

---

## 3. Decisions Made During Brainstorming

| Topic | Decision |
|-------|----------|
| Site structure | Single-page scroll experience with sticky header |
| Gallery organization | Categorized by braiding style (Box Braids, Cornrows, Twists, Locs, Crochet/Weave, Updos) |
| Main CTA action | “Book Now” opens WhatsApp direct message using `wa.me` phone link |
| Video usage | Muted, looping hero background video |
| Color palette | Logo-based: coral/pink primary, black, white, gold accents |
| Image placement | Storefront photo in About section; award badge in About section; gallery images per mapped categories |

---

## 4. Visual Identity

### Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Primary | `#E85A6A` (coral/pink from logo) | CTAs, accents, hover states |
| Dark | `#1A1A1A` | Text, header, footer |
| White | `#FFFFFF` | Backgrounds, text on dark |
| Light Gray | `#F9F9F9` | Alternating section backgrounds |
| Gold | `#D4AF37` (from award badge) | Award highlight, subtle accents |

### Typography

- **Headings:** Poppins (bold weights), loaded from Google Fonts with system sans-serif fallback.
- **Body:** Inter, loaded from Google Fonts with system sans-serif fallback.
- Scale: responsive `clamp()` values for fluid sizing across breakpoints.

### Logo & Favicon

- **Header logo:** `logos/web_header_logo_600x200.png`
- **Footer logo:** `logos/web_footer_logo_450x150.png`
- **Favicon:** `logos/favicon_32x32.png` and `logos/favicon_16x16.png`

---

## 5. Layout & Sections

### 5.1 Sticky Header

- Fixed position on scroll.
- Left: header logo.
- Center/right: anchor nav links (Home, Gallery, About, Services, Contact).
- Right: “Book Now” button styled with primary color.
- Mobile: hamburger menu that slides down a full-width nav panel.

### 5.2 Hero

- Full viewport height (`min-height: 100vh`).
- Background: `images/newyork-video.mp4` muted, looped, autoplay, with object-fit cover and `playsinline` for mobile.
- Poster fallback: `images/winnies_home_page.jpeg`.
- Dark overlay (`rgba(0,0,0,0.5)`) to ensure text contrast.
- Content:
  - Headline: “Winnie’s Hair Braiding”
  - Tagline: “Premium Braiding Styles — Open 24/7”
  - Primary CTA: “Book on WhatsApp” → `https://wa.me/13478693789`
  - Secondary CTA: “View Styles” → smooth scroll to Gallery

### 5.3 Gallery

- Section title: “Our Styles”
- Filter tabs: All, Box Braids, Cornrows, Twists, Locs, Crochet/Weave, Updos
- Responsive grid:
  - Desktop: 4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- Each card:
  - Image with `object-fit: cover`
  - Style name overlay on hover
  - Subtle scale transform on hover
- Lazy loading via `loading="lazy"` on images.

### 5.4 About

- Two-column layout on desktop, stacked on mobile.
- Left: storefront photo (`images/winnies_home_page.jpeg`) and award badge (`images/award_image.png`).
- Right: short paragraph describing Winnie’s expertise, quality, and 24/7 availability.

### 5.5 Services

- Section title: “Services We Offer”
- Card grid (same responsive columns as gallery).
- Cards:
  - Box Braids
  - Knotless Braids
  - Cornrows
  - Twists
  - Locs
  - Crochet / Weave
  - Kids’ Braids
  - Braided Updos

### 5.6 Contact / Booking

- Section title: “Book Your Appointment”
- Contact cards:
  - Email: `Wmolokwu@gmail.com`
  - Phone: `347-869-3789`
  - WhatsApp Channel: [Join Channel](https://whatsapp.com/channel/0029VbBzTDT7j6gBKN9mT40o)
- Location cards:
  - New York: 180-23 Linden Blvd, Queens, Jamaica, NY 11434
  - Minnesota: 11652 Winnetka Avenue North, Champlin, MN 55316
- Primary CTA: “Book on WhatsApp”

### 5.7 Footer

- Footer logo left-aligned.
- Quick links to page sections.
- Contact details repeated concisely.
- Copyright line.

---

## 6. Interactions & Animations

- Smooth scrolling for anchor links.
- Header gains a subtle shadow when scrolled.
- Section content fades in as it enters the viewport (IntersectionObserver).
- Gallery cards: image scale `1.05` on hover with overlay slide-up.
- Buttons: background darken and `translateY(-2px)` on hover.
- Mobile menu toggle animation.

---

## 7. Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| < 640px | Single column, hamburger nav, full-width cards |
| 640px – 1023px | 2-column grid, simplified spacing |
| ≥ 1024px | 4-column grid, side-by-side About section |

---

## 8. File Structure

```
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   └── (existing assets)
└── logos/
    └── (existing assets)
```

---

## 9. Image-to-Style Mapping

### Box Braids
- `images/image-003.png` — long blonde box braids with curly ends
- `images/image-004.png` — black box braids with curly ends
- `images/image-005.png` — classic long black box braids
- `images/image-010.png` — black box braids with curly ends
- `images/image-011.png` — black box braids with curly ends
- `images/image-014.png` — brown box braids in a ponytail
- `images/image-02.png` — very long black box braids
- `images/image-03.png` — black box braids with curly ends

### Cornrows
- `images/image-007.png` — straight-back long cornrows
- `images/image-01.png` — long straight-back cornrows
- `images/image-04.png` — men’s cornrows
- `images/image-017.png` — kid’s cornrows styled up

### Twists
- `images/image-002.png` — short two-strand twists
- `images/image-006.png` — twists with blonde tips
- `images/image-013.png` — short twists
- `images/image-06.png` — medium twists

### Locs
- `images/image-008.png` — shoulder-length locs
- `images/image-012.png` — medium locs
- `images/image-016.png` — textured locs

### Crochet / Weave / Curly Styles
- `images/image-001.png` — long curly/wavy extensions
- `images/image-009.png` — curly/wavy install
- `images/image-05.png` — curly crochet/weave
- `images/image-07.png` — curly crochet/weave

### Updos / Specialty
- `images/image-015.png` — braided updo/crown

---

## 10. Technical Notes

- No build step; static files served directly.
- Use semantic HTML5 elements (`header`, `nav`, `main`, `section`, `footer`).
- CSS custom properties for colors, spacing, and typography.
- Vanilla JavaScript for menu toggle, filter tabs, scroll animations, and header shadow.
- Video background: include `playsinline`, `muted`, `loop`, `autoplay`; provide poster fallback.
- All images use `loading="lazy"` except the storefront and award images in the About section (above the fold on initial load).
- Form-free booking: CTAs use `tel:`, `mailto:`, and WhatsApp `wa.me` links.

---

## 11. Success Criteria

- Page is fully responsive across mobile, tablet, and desktop.
- Gallery displays all categorized images with hover effects.
- All contact details are clearly visible and clickable.
- “Book Now” opens WhatsApp direct chat.
- 24/7 messaging is prominent in hero.
- Page loads quickly with lazy-loaded images.
