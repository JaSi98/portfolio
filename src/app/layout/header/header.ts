import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

import {
  CONTACT_NAVIGATION_ITEM,
  NAVIGATION_ITEMS,
  NavigationItem,
} from '../../core/data/navigation';
import { LanguageSwitch } from '../language-switch/language-switch';

/** Logo, links to the sections and language switch; a burger menu on phones. */
@Component({
  selector: 'app-header',
  imports: [RouterLink, LanguageSwitch],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: { '(document:keydown.escape)': 'closeMenu()' },
})
export class Header {
  private readonly router = inject(Router);
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** Only the home page has the blue circle behind the logo, which makes it white. */
  protected readonly isOnHero = computed(() => this.currentUrl().split('#')[0] === '/');
  protected readonly items = NAVIGATION_ITEMS;
  protected readonly menuItems: NavigationItem[] = [...NAVIGATION_ITEMS, CONTACT_NAVIGATION_ITEM];
  protected readonly isMenuOpen = signal<boolean>(false);

  /** Opens or closes the mobile menu. */
  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  /** Closes the mobile menu, e.g. after a link was chosen. */
  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
