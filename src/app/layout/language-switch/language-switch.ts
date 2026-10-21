import { Component, LOCALE_ID, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { SITE_LOCALES, SiteLocale } from '../../core/i18n/locales';

/**
 * Switches between the German and the English page. Each language is a separate folder, so the
 * link leads to the same path in the other folder.
 */
@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.scss',
})
export class LanguageSwitch {
  private readonly router = inject(Router);

  protected readonly locales = SITE_LOCALES;
  protected readonly currentCode = inject(LOCALE_ID).slice(0, 2);
  protected readonly currentPath = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /** Relative link from the current language folder to the same page in another one. */
  protected hrefFor(locale: SiteLocale): string {
    const path = this.currentPath().replace(/^\//, '').split('#')[0];
    return `../${locale.code}/${path}`;
  }
}
