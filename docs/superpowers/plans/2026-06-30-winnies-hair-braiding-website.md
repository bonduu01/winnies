 # Winnie’s Hair Braiding Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, responsive single-page website for Winnie’s Hair Braiding using semantic HTML, modern CSS, and vanilla JavaScript.

**Architecture:** Single-page scroll layout with sticky header, categorized filterable gallery, hero video background, and form-free booking via WhatsApp/tel/mailto links. No build step; static files served directly.

**Tech Stack:** HTML5, CSS3 (Flexbox/Grid, custom properties), vanilla ES6 JavaScript, Google Fonts (Poppins, Inter).

## Global Constraints

- No build step or framework; static files only.
- Use semantic HTML5 elements (`header`, `nav`, `main`, `section`, `footer`).
- CSS custom properties for colors, spacing, and typography.
- Vanilla JavaScript for menu toggle, filter tabs, scroll animations, and header shadow.
- All images use `loading="lazy"` except storefront and award images in About section.
- Form-free booking: CTAs use `tel:`, `mailto:`, and WhatsApp `wa.me` links.
- Primary CTA opens WhatsApp direct message via `https://wa.me/13478693789`.
- Gallery images mapped per `docs/superpowers/specs/2026-06-30-winnies-hair-braiding-design.md`.
- Header logo: `logos/web_header_logo_600x200.png`.
- Footer logo: `logos/web_footer_logo_450x150.png`.
- Favicon: `logos/favicon_32x32.png` and `logos/favicon_16x16.png`.

---

## File Structure

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

### Task 1: Scaffold HTML Skeleton

**Files:**
- Create: `index.html`

**Interfaces:**
- Produces: Semantic HTML document linking `css/styles.css`, `js/main.js`, Google Fonts, and favicons.

- [ ] **Step 1: Create `index.html` with the full skeleton**

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Winnie's Hair Braiding — Premium braiding styles in New York and Minnesota. Open 24/7.">
  <title>Winnie's Hair Braiding | Open 24/7</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" sizes="32x32" href="logos/favicon_32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="logos/favicon_16x16.png">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header" id="home">
    <!-- Task 3 -->
  </header>

  <main>
    <section class="hero" id="hero">
      <!-- Task 4 -->
    </section>

    <section class="gallery" id="gallery">
      <!-- Task 5 -->
    </section>

    <section class="about" id="about">
      <!-- Task 6 -->
    </section>

    <section class="services" id="services">
      <!-- Task 7 -->
    </section>

    <section class="contact" id="contact">
      <!-- Task 8 -->
    </section>
  </main>

  <footer class="site-footer">
    <!-- Task 9 -->
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify the skeleton contains all required sections**

Run:
```bash
grep -E '<section.*id="(hero|gallery|about|services|contact)"' index.html
```

Expected output: five matching lines, one for each section id.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "chore: scaffold index.html with semantic sections"
```

---

### Task 2: CSS Reset, Variables, and Typography

**Files:**
- Create: `css/styles.css`

**Interfaces:**
- Produces: CSS custom properties and base styles used by all later tasks.

- [ ] **Step 1: Create `css/styles.css` with reset, variables, and typography**

Create `css/styles.css`:

```css
/* === CSS Variables === */
:root {
  --color-primary: #E85A6A;
  --color-primary-dark: #d14555;
  --color-dark: #1A1A1A;
  --color-white: #FFFFFF;
  --color-light-gray: #F9F9F9;
  --color-gold: #D4AF37;
  --color-text: #333333;
  --color-text-light: #666666;

  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;

  --radius: 8px;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.12);
  --transition: all 0.3s ease;

  --container-max: 1200px;
  --section-padding: 5rem 1.5rem;
}

/* === Reset === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  line-height: 1.6;
  background-color: var(--color-white);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

/* === Typography === */
h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-dark);
}

h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
}

h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
}

h3 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  margin-bottom: 0.75rem;
}

p {
  margin-bottom: 1rem;
  color: var(--color-text-light);
}

/* === Utilities === */
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header p {
  max-width: 600px;
  margin: 0 auto;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.75rem;
  border-radius: 50px;
  font-family: var(--font-heading);
  font-weight: 600;
  transition: var(--transition);
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-white);
  border: 2px solid var(--color-white);
}

.btn-secondary:hover {
  background-color: var(--color-white);
  color: var(--color-dark);
}
```

- [ ] **Step 2: Verify CSS file is linked and contains custom properties**

Run:
```bash
grep -E -- '--color-primary|--font-heading|scroll-behavior: smooth' css/styles.css
```

Expected output: three matching lines.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: add css reset, variables, and typography"
```

---

### Task 3: Header and Navigation

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `.btn`, `.container`, CSS custom properties.
- Produces: `.site-header`, `.nav-links`, `.menu-toggle`, `.mobile-nav` elements.

- [ ] **Step 1: Add header markup to `index.html`**

Replace the empty `<header class="site-header" id="home">` block with:

```html
<header class="site-header" id="home">
  <div class="container header-inner">
    <a href="#home" class="logo">
      <img src="logos/web_header_logo_600x200.png" alt="Winnie's Hair Braiding logo" width="180" height="60">
    </a>

    <nav class="main-nav" aria-label="Main navigation">
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>

    <a href="https://wa.me/13478693789" class="btn btn-primary header-cta" target="_blank" rel="noopener noreferrer">Book Now</a>

    <button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
      <span class="hamburger"></span>
    </button>
  </div>

  <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#gallery">Gallery</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="https://wa.me/13478693789" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Book Now</a></li>
    </ul>
  </nav>
</header>
```

- [ ] **Step 2: Add header styles to `css/styles.css`**

Append to `css/styles.css`:

```css
/* === Header === */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-white);
  z-index: 1000;
  transition: var(--transition);
}

.site-header.scrolled {
  box-shadow: var(--shadow);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.logo img {
  width: 160px;
  height: auto;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  font-weight: 500;
  color: var(--color-dark);
  transition: var(--transition);
  position: relative;
}

.nav-links a:hover,
.nav-links a:focus {
  color: var(--color-primary);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: var(--transition);
}

.nav-links a:hover::after,
.nav-links a:focus::after {
  width: 100%;
}

.header-cta {
  padding: 0.625rem 1.25rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger,
.hamburger::before,
.hamburger::after {
  display: block;
  width: 24px;
  height: 3px;
  background-color: var(--color-dark);
  border-radius: 2px;
  transition: var(--transition);
}

.hamburger {
  position: relative;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  left: 0;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  top: 8px;
}

.mobile-nav {
  display: none;
  background-color: var(--color-white);
  border-top: 1px solid #eee;
  padding: 1.5rem;
}

.mobile-nav.open {
  display: block;
}

.mobile-nav ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-nav a {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-dark);
}

@media (max-width: 768px) {
  .main-nav,
  .header-cta {
    display: none;
  }

  .menu-toggle {
    display: block;
  }
}
```

- [ ] **Step 3: Verify header markup and styles**

Run:
```bash
grep -E 'site-header|nav-links|menu-toggle' index.html css/styles.css
```

Expected output: multiple matching lines from both files.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add sticky header with desktop and mobile navigation"
```

---

### Task 4: Hero Section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `.btn`, `.btn-primary`, `.btn-secondary`, typography utilities.
- Produces: `.hero`, `.hero-video`, `.hero-content` elements.

- [ ] **Step 1: Add hero markup to `index.html`**

Replace the empty `<section class="hero" id="hero">` block with:

```html
<section class="hero" id="hero">
  <video class="hero-video" autoplay muted loop playsinline poster="images/winnies_home_page.jpeg">
    <source src="images/newyork-video.mp4" type="video/mp4">
  </video>
  <div class="hero-overlay"></div>

  <div class="container hero-content">
    <p class="hero-badge">✨ Open 24/7</p>
    <h1>Winnie's Hair Braiding</h1>
    <p class="hero-tagline">Premium braiding styles in New York & Minnesota</p>
    <div class="hero-actions">
      <a href="https://wa.me/13478693789" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Book Now</a>
      <a href="#gallery" class="btn btn-secondary">View Styles</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add hero styles to `css/styles.css`**

Append to `css/styles.css`:

```css
/* === Hero === */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  padding-top: 80px;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.hero-content {
  position: relative;
  z-index: 1;
  color: var(--color-white);
  max-width: 800px;
}

.hero-content h1 {
  color: var(--color-white);
  margin-bottom: 1rem;
}

.hero-badge {
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-tagline {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .hero-actions .btn {
    width: 100%;
  }
}
```

- [ ] **Step 3: Verify hero includes video and CTAs**

Run:
```bash
grep -E 'newyork-video.mp4|wa.me/13478693789|View Styles' index.html
```

Expected output: three matching lines.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add hero section with video background and CTAs"
```

---

### Task 5: Gallery Section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `.section-header`, `.container`, CSS grid utilities.
- Produces: `.gallery`, `.gallery-filters`, `.gallery-grid`, `.gallery-card` elements with `data-category` attributes for filtering.

- [ ] **Step 1: Add gallery markup to `index.html`**

Replace the empty `<section class="gallery" id="gallery">` block with:

```html
<section class="gallery" id="gallery">
  <div class="container">
    <div class="section-header">
      <h2>Our Styles</h2>
      <p>Browse our gallery of professional braiding styles. Filter by category to find your next look.</p>
    </div>

    <div class="gallery-filters" role="group" aria-label="Filter gallery by style">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="box-braids">Box Braids</button>
      <button class="filter-btn" data-filter="cornrows">Cornrows</button>
      <button class="filter-btn" data-filter="twists">Twists</button>
      <button class="filter-btn" data-filter="locs">Locs</button>
      <button class="filter-btn" data-filter="crochet-weave">Crochet / Weave</button>
      <button class="filter-btn" data-filter="updos">Updos</button>
    </div>

    <div class="gallery-grid">
      <!-- Box Braids -->
      <figure class="gallery-card" data-category="box-braids">
        <img src="images/image-003.png" alt="Long blonde box braids with curly ends" loading="lazy">
        <figcaption>Box Braids</figcaption>
      </figure>
      <figure class="gallery-card" data-category="box-braids">
        <img src="images/image-004.png" alt="Black box braids with curly ends" loading="lazy">
        <figcaption>Box Braids</figcaption>
      </figure>
      <figure class="gallery-card" data-category="box-braids">
        <img src="images/image-005.png" alt="Classic long black box braids" loading="lazy">
        <figcaption>Box Braids</figcaption>
      </figure>
      <figure class="gallery-card" data-category="box-braids">
        <img src="images/image-010.png" alt="Black box braids with curly ends" loading="lazy">
        <figcaption>Box Braids</figcaption>
      </figure>
      <figure class="gallery-card" data-category="box-braids">
        <img src="images/image-011.png" alt="Black box braids with curly ends" loading="lazy">
        <figcaption>Box Braids</figcaption>
      </figure>
      <figure class="gallery-card" data-category="box-braids">
        <img src="images/image-014.png" alt="Brown box braids in a ponytail" loading="lazy">
        <figcaption>Box Braids</figcaption>
      </figure>
      <figure class="gallery-card" data-category="box-braids">
        <img src="images/image-02.png" alt="Very long black box braids" loading="lazy">
        <figcaption>Box Braids</figcaption>
      </figure>
      <figure class="gallery-card" data-category="box-braids">
        <img src="images/image-03.png" alt="Black box braids with curly ends" loading="lazy">
        <figcaption>Box Braids</figcaption>
      </figure>

      <!-- Cornrows -->
      <figure class="gallery-card" data-category="cornrows">
        <img src="images/image-007.png" alt="Straight-back long cornrows" loading="lazy">
        <figcaption>Cornrows</figcaption>
      </figure>
      <figure class="gallery-card" data-category="cornrows">
        <img src="images/image-01.png" alt="Long straight-back cornrows" loading="lazy">
        <figcaption>Cornrows</figcaption>
      </figure>
      <figure class="gallery-card" data-category="cornrows">
        <img src="images/image-04.png" alt="Men's cornrows" loading="lazy">
        <figcaption>Cornrows</figcaption>
      </figure>
      <figure class="gallery-card" data-category="cornrows">
        <img src="images/image-017.png" alt="Kid's cornrows styled up" loading="lazy">
        <figcaption>Cornrows</figcaption>
      </figure>

      <!-- Twists -->
      <figure class="gallery-card" data-category="twists">
        <img src="images/image-002.png" alt="Short two-strand twists" loading="lazy">
        <figcaption>Twists</figcaption>
      </figure>
      <figure class="gallery-card" data-category="twists">
        <img src="images/image-006.png" alt="Twists with blonde tips" loading="lazy">
        <figcaption>Twists</figcaption>
      </figure>
      <figure class="gallery-card" data-category="twists">
        <img src="images/image-013.png" alt="Short twists" loading="lazy">
        <figcaption>Twists</figcaption>
      </figure>
      <figure class="gallery-card" data-category="twists">
        <img src="images/image-06.png" alt="Medium twists" loading="lazy">
        <figcaption>Twists</figcaption>
      </figure>

      <!-- Locs -->
      <figure class="gallery-card" data-category="locs">
        <img src="images/image-008.png" alt="Shoulder-length locs" loading="lazy">
        <figcaption>Locs</figcaption>
      </figure>
      <figure class="gallery-card" data-category="locs">
        <img src="images/image-012.png" alt="Medium locs" loading="lazy">
        <figcaption>Locs</figcaption>
      </figure>
      <figure class="gallery-card" data-category="locs">
        <img src="images/image-016.png" alt="Textured locs" loading="lazy">
        <figcaption>Locs</figcaption>
      </figure>

      <!-- Crochet / Weave -->
      <figure class="gallery-card" data-category="crochet-weave">
        <img src="images/image-001.png" alt="Long curly wavy extensions" loading="lazy">
        <figcaption>Crochet / Weave</figcaption>
      </figure>
      <figure class="gallery-card" data-category="crochet-weave">
        <img src="images/image-009.png" alt="Curly wavy install" loading="lazy">
        <figcaption>Crochet / Weave</figcaption>
      </figure>
      <figure class="gallery-card" data-category="crochet-weave">
        <img src="images/image-05.png" alt="Curly crochet weave" loading="lazy">
        <figcaption>Crochet / Weave</figcaption>
      </figure>
      <figure class="gallery-card" data-category="crochet-weave">
        <img src="images/image-07.png" alt="Curly crochet weave" loading="lazy">
        <figcaption>Crochet / Weave</figcaption>
      </figure>

      <!-- Updos -->
      <figure class="gallery-card" data-category="updos">
        <img src="images/image-015.png" alt="Braided updo crown" loading="lazy">
        <figcaption>Updos</figcaption>
      </figure>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add gallery styles to `css/styles.css`**

Append to `css/styles.css`:

```css
/* === Gallery === */
.gallery {
  padding: var(--section-padding);
  background-color: var(--color-light-gray);
}

.gallery-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--color-dark);
  border-radius: 50px;
  background-color: transparent;
  color: var(--color-dark);
  font-family: var(--font-body);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover,
.filter-btn.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.gallery-card {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  cursor: pointer;
  aspect-ratio: 3 / 4;
}

.gallery-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-card:hover img {
  transform: scale(1.08);
}

.gallery-card figcaption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: var(--color-white);
  font-family: var(--font-heading);
  font-weight: 600;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-card:hover figcaption {
  transform: translateY(0);
}

.gallery-card.hidden {
  display: none;
}

@media (max-width: 1023px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .gallery-filters {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.375rem 0.875rem;
    font-size: 0.875rem;
  }
}
```

- [ ] **Step 3: Verify gallery contains all 24 style images**

Run:
```bash
grep -c 'class="gallery-card"' index.html
```

Expected output: `24`.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add categorized filterable gallery section"
```

---

### Task 6: About Section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `.container`, `.section-header`, typography.
- Produces: `.about`, `.about-grid`, `.about-images`, `.about-text` elements.

- [ ] **Step 1: Add about markup to `index.html`**

Replace the empty `<section class="about" id="about">` block with:

```html
<section class="about" id="about">
  <div class="container">
    <div class="section-header">
      <h2>About Winnie's</h2>
      <p>Expert braiding with a commitment to quality, comfort, and style.</p>
    </div>

    <div class="about-grid">
      <div class="about-images">
        <img src="images/winnies_home_page.jpeg" alt="Winnie's Hair Braiding storefront in Minnesota" width="400" height="500">
        <img src="images/award_image.png" alt="Winnie's African Hair Braiding BusinessRate Top 3 Hair Salon award 2025" width="300" height="300">
      </div>
      <div class="about-text">
        <h3>Craftsmanship You Can Trust</h3>
        <p>At Winnie's Hair Braiding, we specialize in protective styles that look stunning and feel comfortable. With years of experience and locations in both New York and Minnesota, our team serves local clients and welcomes international visitors looking for premium braiding services.</p>
        <p>We use quality hair extensions, keep a clean and relaxing salon environment, and work around your schedule — because beauty shouldn't wait.</p>

        <h3>Open 24/7</h3>
        <p>Life doesn't follow business hours, and neither do we. Whether you need an early-morning appointment before work or a late-night style session, Winnie's is here for you.</p>

        <a href="#contact" class="btn btn-primary">Get in Touch</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add about styles to `css/styles.css`**

Append to `css/styles.css`:

```css
/* === About === */
.about {
  padding: var(--section-padding);
  background-color: var(--color-white);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-images {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  align-items: end;
}

.about-images img {
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.about-images img:first-child {
  grid-row: span 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-images img:last-child {
  width: 100%;
  object-fit: contain;
}

.about-text h3 {
  margin-top: 1.5rem;
}

.about-text h3:first-of-type {
  margin-top: 0;
}

@media (max-width: 1023px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .about-images {
    max-width: 600px;
    margin: 0 auto;
  }
}

@media (max-width: 640px) {
  .about-images {
    grid-template-columns: 1fr;
  }

  .about-images img:first-child {
    grid-row: auto;
  }
}
```

- [ ] **Step 3: Verify about section markup**

Run:
```bash
grep -E 'about|winnies_home_page|award_image' index.html
```

Expected output: matching lines for section id, storefront image, and award image.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add about section with storefront and award"
```

---

### Task 7: Services Section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `.container`, `.section-header`, CSS grid utilities.
- Produces: `.services`, `.services-grid`, `.service-card` elements.

- [ ] **Step 1: Add services markup to `index.html`**

Replace the empty `<section class="services" id="services">` block with:

```html
<section class="services" id="services">
  <div class="container">
    <div class="section-header">
      <h2>Services We Offer</h2>
      <p>From classic protective styles to trendy braided looks, we do it all.</p>
    </div>

    <div class="services-grid">
      <article class="service-card">
        <h3>Box Braids</h3>
        <p>Long-lasting, versatile braids in any length or color.</p>
      </article>
      <article class="service-card">
        <h3>Knotless Braids</h3>
        <p>Lightweight, tension-free braids for a natural, comfortable finish.</p>
      </article>
      <article class="service-card">
        <h3>Cornrows</h3>
        <p>Clean, precise rows from simple straight-backs to intricate patterns.</p>
      </article>
      <article class="service-card">
        <h3>Twists</h3>
        <p>Two-strand and passion twists with a soft, defined look.</p>
      </article>
      <article class="service-card">
        <h3>Locs</h3>
        <p>Loc styling, retwists, and maintenance for healthy, neat locs.</p>
      </article>
      <article class="service-card">
        <h3>Crochet / Weave</h3>
        <p>Quick, full styles with curly or wavy extensions.</p>
      </article>
      <article class="service-card">
        <h3>Kids' Braids</h3>
        <p>Gentle, age-appropriate styles for children of all ages.</p>
      </article>
      <article class="service-card">
        <h3>Braided Updos</h3>
        <p>Elegant updo styles for special occasions and everyday sophistication.</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add services styles to `css/styles.css`**

Append to `css/styles.css`:

```css
/* === Services === */
.services {
  padding: var(--section-padding);
  background-color: var(--color-light-gray);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.service-card {
  background-color: var(--color-white);
  padding: 2rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: var(--transition);
  border-top: 4px solid var(--color-primary);
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}

.service-card h3 {
  color: var(--color-dark);
  margin-bottom: 0.75rem;
}

.service-card p {
  margin-bottom: 0;
  font-size: 0.95rem;
}

@media (max-width: 1023px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify services section contains 8 cards**

Run:
```bash
grep -c 'class="service-card"' index.html
```

Expected output: `8`.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add services section with 8 service cards"
```

---

### Task 8: Contact / Booking Section

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `.btn`, `.btn-primary`, `.container`, `.section-header`.
- Produces: `.contact`, `.contact-grid`, `.contact-card`, `.location-card` elements.

- [ ] **Step 1: Add contact markup to `index.html`**

Replace the empty `<section class="contact" id="contact">` block with:

```html
<section class="contact" id="contact">
  <div class="container">
    <div class="section-header">
      <h2>Book Your Appointment</h2>
      <p>Reach out anytime. We're open 24/7 to take your call or message.</p>
    </div>

    <div class="contact-grid">
      <div class="contact-card">
        <h3>Email</h3>
        <p><a href="mailto:Wmolokwu@gmail.com">Wmolokwu@gmail.com</a></p>
      </div>
      <div class="contact-card">
        <h3>Phone</h3>
        <p><a href="tel:+13478693789">347-869-3789</a></p>
      </div>
      <div class="contact-card">
        <h3>WhatsApp Channel</h3>
        <p><a href="https://whatsapp.com/channel/0029VbBzTDT7j6gBKN9mT40o" target="_blank" rel="noopener noreferrer">Join Channel</a></p>
      </div>
    </div>

    <div class="locations">
      <div class="location-card">
        <h3>New York</h3>
        <address>
          180-23 Linden Blvd<br>
          Queens, Jamaica, NY 11434
        </address>
        <a href="https://maps.google.com/?q=180-23+Linden+Blvd,+Queens,+Jamaica,+NY+11434" target="_blank" rel="noopener noreferrer" class="map-link">View on Map</a>
      </div>
      <div class="location-card">
        <h3>Minnesota</h3>
        <address>
          11652 Winnetka Avenue North<br>
          Champlin, MN 55316
        </address>
        <a href="https://maps.google.com/?q=11652+Winnetka+Avenue+North,+Champlin,+MN+55316" target="_blank" rel="noopener noreferrer" class="map-link">View on Map</a>
      </div>
    </div>

    <div class="contact-cta">
      <a href="https://wa.me/13478693789" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add contact styles to `css/styles.css`**

Append to `css/styles.css`:

```css
/* === Contact === */
.contact {
  padding: var(--section-padding);
  background-color: var(--color-dark);
  color: var(--color-white);
}

.contact .section-header h2,
.contact .section-header p {
  color: var(--color-white);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.contact-card {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: var(--radius);
  text-align: center;
  transition: var(--transition);
}

.contact-card:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.contact-card h3 {
  color: var(--color-white);
  margin-bottom: 0.75rem;
}

.contact-card a {
  color: var(--color-primary);
  font-weight: 500;
}

.contact-card a:hover {
  text-decoration: underline;
}

.locations {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.location-card {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: var(--radius);
}

.location-card h3 {
  color: var(--color-white);
  margin-bottom: 0.75rem;
}

.location-card address {
  font-style: normal;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.map-link {
  color: var(--color-gold);
  font-weight: 500;
}

.map-link:hover {
  text-decoration: underline;
}

.contact-cta {
  text-align: center;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .locations {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify contact details are present and clickable**

Run:
```bash
grep -E 'Wmolokwu@gmail.com|347-869-3789|wa.me/13478693789|whatsapp.com/channel' index.html
```

Expected output: four matching lines.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add contact and booking section with both locations"
```

---

### Task 9: Footer

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `.container`, footer logo asset.
- Produces: `.site-footer` element.

- [ ] **Step 1: Add footer markup to `index.html`**

Replace the empty `<footer class="site-footer">` block with:

```html
<footer class="site-footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <img src="logos/web_footer_logo_450x150.png" alt="Winnie's Hair Braiding" width="180" height="60">
      <p>Premium braiding styles in New York & Minnesota. Open 24/7.</p>
    </div>
    <div class="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
    <div class="footer-contact">
      <h4>Contact</h4>
      <p><a href="mailto:Wmolokwu@gmail.com">Wmolokwu@gmail.com</a></p>
      <p><a href="tel:+13478693789">347-869-3789</a></p>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 Winnie's Hair Braiding. All rights reserved.</p>
  </div>
</footer>
```

- [ ] **Step 2: Add footer styles to `css/styles.css`**

Append to `css/styles.css`:

```css
/* === Footer === */
.site-footer {
  background-color: #111111;
  color: var(--color-white);
  padding: 4rem 1.5rem 1.5rem;
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-brand img {
  width: 160px;
  height: auto;
  margin-bottom: 1rem;
}

.footer-brand p {
  color: rgba(255, 255, 255, 0.7);
}

.footer-links h4,
.footer-contact h4 {
  color: var(--color-white);
  font-family: var(--font-heading);
  margin-bottom: 1rem;
}

.footer-links li,
.footer-contact p {
  margin-bottom: 0.5rem;
}

.footer-links a,
.footer-contact a {
  color: rgba(255, 255, 255, 0.7);
  transition: var(--transition);
}

.footer-links a:hover,
.footer-contact a:hover {
  color: var(--color-primary);
}

.footer-bottom {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

- [ ] **Step 3: Verify footer markup**

Run:
```bash
grep -E 'site-footer|web_footer_logo|footer-bottom' index.html
```

Expected output: matching lines for footer class, logo, and bottom bar.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add site footer with links and contact info"
```

---

### Task 10: JavaScript Interactions

**Files:**
- Create: `js/main.js`

**Interfaces:**
- Consumes: `.menu-toggle`, `.mobile-nav`, `.site-header`, `.filter-btn`, `.gallery-card`, `.hero-content`, `.section-header`, `.service-card`, `.contact-card`, `.location-card`.
- Produces: Event listeners and CSS classes for interactivity.

- [ ] **Step 1: Create `js/main.js` with all interactions**

Create `js/main.js`:

```javascript
/**
 * Winnie's Hair Braiding — Main JavaScript
 * Handles mobile menu, gallery filtering, header shadow, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // === Mobile Menu Toggle ===
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close mobile menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // === Header Shadow on Scroll ===
  const header = document.querySelector('.site-header');

  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // === Gallery Filtering ===
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter cards
      galleryCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // === Scroll Animations (Fade In) ===
  const animatedElements = document.querySelectorAll(
    '.section-header, .gallery-card, .service-card, .about-text, .about-images, .contact-card, .location-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    animatedElements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    animatedElements.forEach(el => el.classList.add('fade-in-visible'));
  }
});
```

- [ ] **Step 2: Add fade-in animation CSS to `css/styles.css`**

Append to `css/styles.css`:

```css
/* === Animations === */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 3: Verify JS file is linked and contains key functions**

Run:
```bash
grep -E 'DOMContentLoaded|galleryCards|IntersectionObserver' js/main.js
```

Expected output: three matching lines.

- [ ] **Step 4: Commit**

```bash
git add js/main.js css/styles.css
git commit -m "feat: add javascript for menu, filtering, and scroll animations"
```

---

### Task 11: Responsive Polish and Accessibility

**Files:**
- Modify: `css/styles.css`
- Modify: `index.html` (if needed)

**Interfaces:**
- Consumes: All existing styles and markup.
- Produces: Final responsive and accessible page.

- [ ] **Step 1: Add skip-to-content link for accessibility**

Insert immediately after `<body>` in `index.html`:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

Add `id="main-content"` to the `<main>` element:

```html
<main id="main-content">
```

- [ ] **Step 2: Add skip-link styles to `css/styles.css`**

Append to `css/styles.css`:

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0.5rem 1rem;
  z-index: 1001;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}
```

- [ ] **Step 3: Add focus-visible styles for keyboard navigation**

Append to `css/styles.css`:

```css
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

- [ ] **Step 4: Verify accessibility improvements**

Run:
```bash
grep -E 'skip-link|main-content|focus-visible' index.html css/styles.css
```

Expected output: matching lines in both files.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add accessibility and responsive polish"
```

---

### Task 12: Browser Verification

**Files:**
- Read: `index.html`, `css/styles.css`, `js/main.js`

**Interfaces:**
- Consumes: All completed files.
- Produces: Verified working website.

- [ ] **Step 1: Start a local HTTP server**

Run:
```bash
python -m http.server 8000
```

Expected output: `Serving HTTP on :: port 8000`.

- [ ] **Step 2: Verify page loads and returns 200**

In a new terminal, run:
```bash
curl -I http://localhost:8000/index.html
```

Expected output: `HTTP/1.0 200 OK`.

- [ ] **Step 3: Verify required sections exist in served HTML**

Run:
```bash
curl -s http://localhost:8000/index.html | grep -E 'id="(hero|gallery|about|services|contact)"'
```

Expected output: five matching lines.

- [ ] **Step 4: Verify all linked images exist on disk**

Run:
```bash
python - <<'PY'
from pathlib import Path
import re
html = Path('index.html').read_text()
paths = re.findall(r'src="([^"]+)"', html)
missing = [p for p in paths if not Path(p).exists()]
print('Missing assets:', missing if missing else 'None')
PY
```

Expected output: `Missing assets: None`.

- [ ] **Step 5: Manual browser checks**

Open `http://localhost:8000` in a browser and verify:
- Header is sticky and gains shadow on scroll.
- Hero video plays (or poster image displays as fallback).
- Gallery filter buttons show/hide correct images.
- Mobile menu toggles at narrow widths.
- All CTAs link to WhatsApp, phone, or email correctly.
- Contact section displays both NY and MN addresses.
- Page looks correct at 320px, 768px, and 1440px viewport widths.

- [ ] **Step 6: Stop the local server**

Press `Ctrl+C` in the server terminal.

- [ ] **Step 7: Commit final verification notes**

```bash
git add .
git commit -m "chore: verify website loads and all assets resolve"
```

---

### Task 13: Update Project Documentation

**Files:**
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: Final file structure and tech stack.
- Produces: Updated `AGENTS.md` reflecting the new website project.

- [ ] **Step 1: Update `AGENTS.md` with project details**

Replace the asset-only project overview in `AGENTS.md` with:

```markdown
# AGENTS.md

> Guide for AI coding agents working on this repository.

## Project Overview

This repository contains the static website for **Winnie's Hair Braiding**, a professional hair braiding salon with locations in New York and Minnesota. The site is a single-page responsive landing page showcasing braiding styles, services, and contact information, with emphasis on 24/7 availability.

## Directory Structure

```
.
├── index.html          # Main landing page
├── css/
│   └── styles.css      # All styles, custom properties, responsive queries
├── js/
│   └── main.js         # Menu toggle, gallery filtering, scroll animations
├── images/             # Braiding style photos, storefront, award, video
├── logos/              # Brand logos and favicons
└── docs/               # Design specs and implementation plans
```

## Technology Stack

- HTML5 (semantic markup)
- CSS3 (Flexbox, Grid, custom properties, animations)
- Vanilla ES6 JavaScript
- Google Fonts (Poppins, Inter)
- No build step or framework

## Build and Test Commands

- Preview locally: `python -m http.server 8000`
- Open in browser: `http://localhost:8000`
- No test runner; verify manually in browser and with `curl` for asset resolution.

## Code Style Guidelines

- Use semantic HTML5 elements.
- Prefer CSS custom properties for colors and spacing.
- Keep JavaScript vanilla and event-driven.
- Lazy load gallery images with `loading="lazy"`.
- Maintain accessible focus states and ARIA labels.

## Deployment Process

- Deploy `index.html`, `css/`, `js/`, `images/`, and `logos/` to any static host.
- No build step required.

## Security Considerations

- No user input forms or backend processing.
- All external links use `rel="noopener noreferrer"`.
- No secrets or credentials stored in the repository.
```

- [ ] **Step 2: Verify AGENTS.md references the correct files**

Run:
```bash
grep -E 'index.html|styles.css|main.js' AGENTS.md
```

Expected output: matching lines referencing all three core files.

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs: update AGENTS.md with website project details"
```

---

## Self-Review

### Spec Coverage

| Spec Requirement | Task |
|------------------|------|
| Single-page scroll layout | Task 1 |
| Sticky header | Task 3 |
| Hero video background | Task 4 |
| Categorized filterable gallery | Task 5 |
| About section with storefront + award | Task 6 |
| Services section | Task 7 |
| Contact/booking with NY + MN | Task 8 |
| Footer | Task 9 |
| JavaScript interactions | Task 10 |
| Responsive design | Tasks 3–11 |
| Accessibility | Task 11 |
| Favicon | Task 1 |
| Lazy loading | Task 5 |
| 24/7 messaging | Task 4 |

### Placeholder Scan

- No TBD, TODO, or "implement later" notes remain.
- Every task includes exact file paths.
- Every code step includes concrete code snippets.
- Verification commands include expected outputs.

### Type Consistency

- CSS class names are consistent across HTML and CSS.
- JavaScript selectors match the class names defined in HTML.
- `data-category` values match `data-filter` values (with `all` as the universal filter).

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-30-winnies-hair-braiding-website.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach would you like?
