import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { RevealOnScroll } from './reveal-on-scroll';

const BELOW_THE_FOLD = 5000;

@Component({
  imports: [RevealOnScroll],
  template: `<p appRevealOnScroll="left">Content</p>`,
})
class Host {}

describe('RevealOnScroll', () => {
  let observerCallback: IntersectionObserverCallback;

  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: IntersectionObserverCallback) {
          observerCallback = callback;
        }
        observe(): void {}
        disconnect(): void {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  function render(top: number, prefersReducedMotion = false): HTMLElement {
    vi.stubGlobal('matchMedia', () => ({ matches: prefersReducedMotion }));
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ top } as DOMRect);
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    TestBed.tick();
    return fixture.nativeElement.querySelector('p');
  }

  it('hides content below the fold and shows it once it scrolls into view', () => {
    const element = render(BELOW_THE_FOLD);
    expect(element.classList).toContain('reveal--from-left');
    expect(element.classList).not.toContain('reveal--visible');

    observerCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(element.classList).toContain('reveal--visible');
  });

  it('leaves content alone that is already on screen', () => {
    expect(render(0).classList).not.toContain('reveal');
  });

  it('leaves content alone when reduced motion is preferred', () => {
    expect(render(BELOW_THE_FOLD, true).classList).not.toContain('reveal');
  });
});
