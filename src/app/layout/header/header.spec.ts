import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Header } from './header';

describe('Header', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('opens and closes the mobile menu with the burger button', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const burger: HTMLButtonElement = fixture.nativeElement.querySelector('.header__burger');

    burger.click();
    fixture.detectChanges();
    expect(burger.getAttribute('aria-expanded')).toBe('true');

    burger.click();
    fixture.detectChanges();
    expect(burger.getAttribute('aria-expanded')).toBe('false');
  });
});
