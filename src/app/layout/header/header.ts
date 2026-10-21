import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

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
