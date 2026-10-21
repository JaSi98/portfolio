import { Component } from '@angular/core';

import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { References } from './sections/references/references';
import { Skills } from './sections/skills/skills';

/** One-page portfolio: hero, about, skills, projects, references and contact. */
@Component({
  selector: 'app-home',
  imports: [Hero, About, Skills, Projects, References, Contact],
  templateUrl: './home.html',
})
export class Home {}
