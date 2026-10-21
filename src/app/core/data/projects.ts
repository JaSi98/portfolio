import { GITHUB_PROFILE_URL } from './social-links';

/** A project in the "My work" section with links to try it and to read its code. */
export interface Project {
  name: string;
  technologies: string[];
  description: string;
  image: string;
  imageAlt: string;
  liveUrl: string;
  githubUrl: string;
}

// The projects get their own subdomains when they are deployed; until then the links lead to
// the GitHub profile.
const LINK_PENDING = GITHUB_PROFILE_URL;
const IMAGE_FOLDER = 'assets/img/projects';

export const PROJECTS: Project[] = [
  {
    name: 'Join',
    technologies: ['Angular', 'TypeScript', 'Supabase', 'n8n', 'SCSS'],
    description: $localize`:@@projects.join.description:Kanban board for small teams, inspired by the Kanban system. Create and organise tasks with drag and drop, assign contacts and follow the progress live. Requests from stakeholders become tickets automatically.`,
    image: `${IMAGE_FOLDER}/join.webp`,
    imageAlt: $localize`:@@projects.join.alt:Request page of the Join kanban board`,
    liveUrl: LINK_PENDING,
    githubUrl: 'https://github.com/JaSi98/Join',
  },
  {
    name: 'El Pollo Loco',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    description: $localize`:@@projects.polloLoco.description:Jump, run and throw game based on an object-oriented approach. Help Pepe to find coins and salsa bottles to fight against the crazy hen.`,
    image: `${IMAGE_FOLDER}/el-pollo-loco.webp`,
    imageAlt: $localize`:@@projects.polloLoco.alt:Start screen of the game El Pollo Loco`,
    liveUrl: LINK_PENDING,
    githubUrl: LINK_PENDING,
  },
  {
    name: 'Code à Cuisine',
    technologies: ['Angular', 'TypeScript', 'n8n', 'Supabase'],
    description: $localize`:@@projects.cuisine.description:Recipe generator that turns the ingredients at home into three recipes with a step-by-step plan for every cook. All recipes are collected in a shared cookbook.`,
    image: `${IMAGE_FOLDER}/code-a-cuisine.webp`,
    imageAlt: $localize`:@@projects.cuisine.alt:Start page of the recipe generator Code à Cuisine`,
    liveUrl: LINK_PENDING,
    githubUrl: 'https://github.com/JaSi98/da_code-a-cuisine',
  },
  {
    name: 'Poll App',
    technologies: ['Angular', 'TypeScript', 'Supabase', 'SCSS'],
    description: $localize`:@@projects.poll.description:Create and share surveys in minutes, from team events to workplace culture. Collect opinions and see the results at a glance.`,
    image: `${IMAGE_FOLDER}/poll-app.webp`,
    imageAlt: $localize`:@@projects.poll.alt:Start page of the Poll App`,
    liveUrl: LINK_PENDING,
    githubUrl: 'https://github.com/JaSi98/da_poll_app',
  },
];
