# AGENTS.md

> Guide for AI coding agents working on this repository.

## Project Overview

This repository currently contains **only static media assets** for what appears to be a brand/business named "Winnies" (inferred from directory and file names such as `winnies_home_page.jpeg`, `web_header_logo_*`, and `mobile_app_icon_*`).

There is **no source code**, **no build configuration**, **no dependency manifest**, and **no test suite** present in the working directory. The repository appears to function as an asset store for images, logos, and video used by an external application or website.

## Directory Structure

```
.
├── images/
│   ├── award_image.png
│   ├── image-001.png … image-017.png
│   ├── image-01.png … image-07.png
│   ├── newyork-video.mp4
│   ├── winnies_home_page.jpeg
│   ├── gallery/
│   │   ├── box-braids/        (empty)
│   │   ├── cornrows/          (empty)
│   │   ├── ghana-weaving/     (empty)
│   │   ├── kids/              (empty)
│   │   ├── locs/              (empty)
│   │   └── twists/            (empty)
│   ├── hero/                  (empty)
│   └── services/              (empty)
└── logos/
    ├── android_chrome_192x192.png
    ├── android_chrome_512x512.png
    ├── apple_touch_icon_180x180.png
    ├── favicon_16x16.png
    ├── favicon_32x32.png
    ├── favicon_48x48.png
    ├── mobile_app_icon_1024x1024.png
    ├── mobile_banner_800x400.png
    ├── mobile_header_logo_400x133.png
    ├── web_footer_logo_450x150.png
    ├── web_header_logo_600x200.png
    └── web_sticky_header_300x100.png
```

## Technology Stack

- **None detected.**
- No `package.json`, `pyproject.toml`, `Cargo.toml`, `Gemfile`, `pom.xml`, `build.gradle`, `CMakeLists.txt`, `Makefile`, or similar configuration files were found.
- No HTML, CSS, JavaScript, Python, or other source-code files are present.

## Build and Test Commands

- **Not applicable.** There is no build system or test runner configured.
- If a build process is added in the future, update this section with the relevant commands (e.g., `npm install && npm run build`, `python -m pytest`, etc.).

## Code Style Guidelines

- **Not applicable** while the repository remains asset-only.
- When adding assets, prefer descriptive, lowercase, hyphen-separated filenames (already the convention in `images/` and `logos/`).
- Keep image formats consistent with existing usage:
  - Photos/illustrations: `.png` or `.jpeg`
  - Brand logos: `.png`
  - Video: `.mp4`

## Testing Instructions

- **None.** There is no code to test.

## Deployment Process

- **None detected.** These assets are likely consumed by a separate project or hosting platform.
- If deployment is added later, document the pipeline and any environment-specific asset paths here.

## Security Considerations

- All current files are binary media assets; no secrets, credentials, or environment variables are present.
- Do not add `.env` files, API keys, or credentials to this repository.
- If the repository later includes code that processes user uploads, implement input validation, file-type whitelisting, and size limits.

## Notes for Agents

- Do not assume a framework, language, or runtime. Base all future work on the actual files added to the repository.
- If a web or application project is initialized here, this `AGENTS.md` should be updated with the real architecture, build commands, and conventions.
