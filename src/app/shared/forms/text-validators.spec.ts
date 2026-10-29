import { FormControl } from '@angular/forms';

import { minTrimmedLength, personName } from './text-validators';

describe('text validators', () => {
  describe('minTrimmedLength', () => {
    const validator = minTrimmedLength(10);

    it('rejects text that only reaches the length with spaces', () => {
      expect(validator(new FormControl('          '))).not.toBeNull();
      expect(validator(new FormControl('   hello   '))).not.toBeNull();
    });

    it('accepts text that is long enough without the spaces around it', () => {
      expect(validator(new FormControl('  Hello, Jan!  '))).toBeNull();
    });
  });

  describe('personName', () => {
    const validator = personName(2);

    it.each(['  ', ' a ', '123', 'Jan 2', '@@', '-Jan'])('rejects "%s"', (value) => {
      expect(validator(new FormControl(value))).not.toBeNull();
    });

    it.each(['Jan', ' Jan Sippl ', 'Jean-Luc', "O'Neil", 'Zoë Ångström', 'J. Sippl'])(
      'accepts "%s"',
      (value) => {
        expect(validator(new FormControl(value))).toBeNull();
      },
    );
  });
});
