import { Component } from '@angular/core';

import { About } from './sections/about/about';
import { Hero } from './sections/hero/hero';
import { Skills } from './sections/skills/skills';

/** One-page portfolio: hero, about, skills, projects, references and contact. */
@Component({
  selector: 'app-home',
  imports: [Hero, About, Skills],
  templateUrl: './home.html',
})
export class Home {}
