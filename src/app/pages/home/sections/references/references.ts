import { Component } from '@angular/core';

import { REFERENCES } from '../../../../core/data/references';

/** Blue band with quotes from team members. */
@Component({
  selector: 'app-references',
  templateUrl: './references.html',
  styleUrl: './references.scss',
})
export class References {
  protected readonly references = REFERENCES;
}
