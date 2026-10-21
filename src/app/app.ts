import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { Seo } from './core/i18n/seo';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';

/** Root of the app: header, the page of the current route and footer. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly seo = inject(Seo);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.seo.update(event.urlAfterRedirects.replace(/^\/|#.*$/g, '')));
  }
}
