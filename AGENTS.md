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
