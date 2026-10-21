import { TestBed } from '@angular/core/testing';

import { REFERENCES } from '../../../../core/data/references';
import { References } from './references';

describe('References', () => {
  afterEach(() => REFERENCES.splice(0));

  it('stays hidden while there are no quotes', () => {
    const fixture = TestBed.createComponent(References);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section')).toBeNull();
  });

  it('shows one card per quote', () => {
    REFERENCES.push({ name: 'Team member', project: 'Join', quote: 'Reliable and friendly.' });
    const fixture = TestBed.createComponent(References);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.reference').length).toBe(1);
  });
});
