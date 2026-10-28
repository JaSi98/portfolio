import { afterNextRender, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';

export type RevealDirection = 'up' | 'left' | 'right';

const DEFAULT_DIRECTION: RevealDirection = 'up';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
// Share of the element that has to be on screen before it fades in.
const VISIBLE_SHARE = 0.15;
const HIDDEN_CLASS = 'reveal';
const VISIBLE_CLASS = 'reveal--visible';

/**
 * Fades an element in when it scrolls into view. Elements that are already on screen and visitors
 * who prefer reduced motion see the content at once; the element stays readable for screen readers.
 */
@Directive({ selector: '[appRevealOnScroll]' })
export class RevealOnScroll implements OnDestroy {
  /** Side the element moves in from; an empty attribute means from below. */
  readonly appRevealOnScroll = input<RevealDirection | ''>('');

  private readonly element: HTMLElement = inject(ElementRef).nativeElement;
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => this.hideUntilVisible());
  }

  /** Stops watching when the element leaves the page. */
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /** Hides the element and waits until it scrolls into view. */
  private hideUntilVisible(): void {
    if (matchMedia(REDUCED_MOTION_QUERY).matches || this.isOnScreen()) {
      return;
    }
    const direction = this.appRevealOnScroll() || DEFAULT_DIRECTION;
    this.element.classList.add(HIDDEN_CLASS, `${HIDDEN_CLASS}--from-${direction}`);
    this.observer = new IntersectionObserver((entries) => this.revealOnEntry(entries), {
      threshold: VISIBLE_SHARE,
    });
    this.observer.observe(this.element);
  }

  /** Tells whether the element starts above the bottom edge of the viewport. */
  private isOnScreen(): boolean {
    return this.element.getBoundingClientRect().top < window.innerHeight;
  }

  /** Shows the element once and stops watching it. */
  private revealOnEntry(entries: IntersectionObserverEntry[]): void {
    if (!entries.some((entry) => entry.isIntersecting)) {
      return;
    }
    this.element.classList.add(VISIBLE_CLASS);
    this.observer?.disconnect();
  }
}
