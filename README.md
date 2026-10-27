# Portfolio – Jan Sippl

Personal portfolio of Jan Sippl, frontend developer. The one-page site introduces Jan, shows his skill set and projects and offers a contact form. Every page exists in German and English under its own URL, so search engines index both languages.

## Features

- **Hero** with greeting, job title, portrait, scroll hint and links to GitHub, the contact form and LinkedIn.
- **About me** with location, availability and a personal text.
- **Skill set** with the technologies and ways of working Jan uses.
- **My work**: Join, El Pollo Loco, Code à Cuisine and Poll App, each with preview, technologies, description, live link and GitHub link.
- **References** of team members; the section appears as soon as quotes are added.
- **Contact form** with validation when a field is left, reserved space for messages, a submit button that is only active for a valid form and feedback after sending.
- **Legal notice and privacy policy** in both languages, linked in the footer.
- **German and English**: switch in the header and in the mobile menu; `/` leads to the language of the browser.
- Responsive from 320 px to wide screens (content keeps the desktop width from 1440 px), burger menu up to tablet width, keyboard and screen reader friendly, reduced motion respected.

## Tech stack

| Part | Technology |
| --- | --- |
| Frontend | Angular 22 (standalone components, signals, zoneless, reactive forms), SCSS |
| Languages | `@angular/localize`, one prerendered build per language |
| Output | Static HTML (prerendering), no server code |
| Tests | Vitest via the Angular CLI |

## Getting started

Requirements: Node.js 22 or newer and npm.

```bash
npm install
npm start          # English development server on http://localhost:4300/en/
npm run start:de   # German development server on http://localhost:4301/de/
npm run build      # production build for both languages in dist/portfolio/browser
npm test           # unit tests
```

Each development server builds one language. Like on the live server, the pages lie under `/en/` and `/de/`, and each server forwards the other language to the other server (proxy files in `dev/`). With both servers running, the language switch works locally too.

### Texts and translations

English is the source language. Texts in templates carry an `i18n` id, texts in TypeScript use `$localize`.

1. Change or add the English text.
2. Run `npm run i18n`; it writes all texts to [`src/locale/messages.json`](src/locale/messages.json).
3. Add the German text with the same id to [`src/locale/messages.de.json`](src/locale/messages.de.json).

The build fails if a German translation is missing.

### Content

| File | Content |
| --- | --- |
| [`core/data/projects.ts`](src/app/core/data/projects.ts) | Projects with live and GitHub links |
| [`core/data/skills.ts`](src/app/core/data/skills.ts) | Skill set |
| [`core/data/availability.ts`](src/app/core/data/availability.ts) | Location and availability |
| [`core/data/references.ts`](src/app/core/data/references.ts) | Quotes of team members (empty list hides the section) |
| [`core/data/social-links.ts`](src/app/core/data/social-links.ts) | GitHub and LinkedIn |
| [`core/data/legal-info.ts`](src/app/core/data/legal-info.ts) | Address and email for legal notice and privacy policy |

The portrait is [`public/assets/img/jan-sippl-portrait.webp`](public/assets/img/jan-sippl-portrait.webp), a photo with transparent background; a new photo should also be a compressed WebP below 500 KB with the same file name, or the `src`, `width` and `height` in [`hero.html`](src/app/pages/home/sections/hero/hero.html) need an update.

### Contact form

The form posts `{ name, email, message }` as JSON to `CONTACT_ENDPOINT` in [`core/config/contact.ts`](src/app/core/config/contact.ts). While the constant is empty, the form shows that the message could not be sent.

## Deployment

`npm run build` creates `dist/portfolio/browser` with:

| Path | Content |
| --- | --- |
| `de/`, `en/` | Prerendered pages of each language (`index.html`, `legal-notice/`, `privacy-policy/`) |
| `.htaccess` | HTTPS, language redirect of `/`, fallback for unknown paths, caching and security headers |
| `index.html` | Language redirect of `/` and of unknown paths for servers without `.htaccess` (nginx) |
| `robots.txt`, `sitemap.xml` | Hints for search engines, including the language alternates |

Upload the content of `dist/portfolio/browser` including the hidden `.htaccess` to the root of `portfolio.webstudiojs.com`. The files in `deploy/` are copied into the build by `npm run build`. Each page sets its canonical URL and `hreflang` links to `https://portfolio.webstudiojs.com` (constant `SITE_ORIGIN` in [`core/i18n/seo.ts`](src/app/core/i18n/seo.ts)).

## Routes

| Path | Page |
| --- | --- |
| `/de/`, `/en/` | Home with the sections `#about`, `#skills`, `#projects`, `#contact` |
| `/de/legal-notice`, `/en/legal-notice` | Legal notice |
| `/de/privacy-policy`, `/en/privacy-policy` | Privacy policy |

## Project structure

```
src/app/
├── core/
│   ├── config/        endpoint of the contact form
│   ├── data/          content: projects, skills, links, legal information
│   ├── i18n/          languages and head tags for search engines
│   └── services/      delivery of the contact form
├── layout/            header with mobile menu, language switch, footer
├── pages/
│   ├── home/sections/ hero, about, skills, projects, references, contact
│   ├── legal-notice/
│   └── privacy-policy/
└── shared/
    ├── components/    text field, checkbox, social links
    └── forms/         base class of the custom form controls
src/locale/            texts of both languages
src/styles/            SCSS (abstracts, base, components, fonts, icons)
deploy/                .htaccess, robots.txt and sitemap.xml for the server root
```

## Credits

- Design: portfolio template "Version 2" of the Developer Akademie.
- Fonts: [Baloo 2](https://github.com/EkType/Baloo2), [Montserrat](https://github.com/JulietaUla/Montserrat) and [Poppins](https://github.com/itfoundry/Poppins) (SIL Open Font License), see `src/styles/fonts/`.
- Icons: skill, social and availability icons from the design; status icons from [Material Symbols](https://fonts.google.com/icons) (Apache License 2.0).
