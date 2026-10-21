import { DOCUMENT, Injectable, LOCALE_ID, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { SITE_LOCALES } from './locales';

export const SITE_ORIGIN = 'https://portfolio.webstudiojs.com';
const DEFAULT_LOCALE = 'en';

/**
 * Head tags for search engines: description, canonical URL and the links to the same page in
 * the other language. They are written during prerendering, so they are part of the static HTML.
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly localeCode = inject(LOCALE_ID).slice(0, 2);

  /** Sets description, canonical and language alternates for a path such as 'legal-notice'. */
  update(path: string): void {
    this.meta.updateTag({ name: 'description', content: this.description() });
    this.setLink('canonical', this.urlFor(this.localeCode, path));
    for (const locale of SITE_LOCALES) {
      this.setLink('alternate', this.urlFor(locale.code, path), locale.code);
    }
    this.setLink('alternate', this.urlFor(DEFAULT_LOCALE, path), 'x-default');
  }

  private description(): string {
    return $localize`:@@seo.description:Portfolio of Jan Sippl, frontend developer with Angular and TypeScript: projects, skills and contact.`;
  }

  private urlFor(localeCode: string, path: string): string {
    return `${SITE_ORIGIN}/${localeCode}/${path}`;
  }

  /** Adds or replaces a link tag; alternates are told apart by their hreflang. */
  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let link = this.document.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      if (hreflang) {
        link.hreflang = hreflang;
      }
      this.document.head.appendChild(link);
    }
    link.href = href;
  }
}
