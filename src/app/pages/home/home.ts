import { Component } from '@angular/core';

import { Hero } from './sections/hero/hero';

/** One-page portfolio: hero, about, skills, projects, references and contact. */
@Component({
  selector: 'app-home',
  imports: [Hero],
  templateUrl: './home.html',
})
export class Home {}
