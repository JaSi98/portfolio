/** A technology or way of working shown in the skill set. */
export interface Skill {
  name: string;
  icon: string;
  /** Technologies shown in a speech bubble next to the skill. */
  learningTopics?: Skill[];
}

const ICON_FOLDER = 'assets/icons/skills';
const LEARNING_ICON_FOLDER = 'assets/icons/learning';

const LEARNING_TOPICS: Skill[] = [
  { name: 'Python', icon: `${LEARNING_ICON_FOLDER}/python.svg` },
  { name: 'Django', icon: `${LEARNING_ICON_FOLDER}/django.svg` },
];

export const SKILLS: Skill[] = [
  { name: 'Angular', icon: `${ICON_FOLDER}/angular.svg` },
  { name: 'TypeScript', icon: `${ICON_FOLDER}/typescript.svg` },
  { name: 'JavaScript', icon: `${ICON_FOLDER}/javascript.svg` },
  { name: 'HTML', icon: `${ICON_FOLDER}/html.svg` },
  { name: 'Scrum', icon: `${ICON_FOLDER}/scrum.svg` },
  { name: 'Supabase', icon: `${ICON_FOLDER}/supabase.svg` },
  { name: 'Git', icon: `${ICON_FOLDER}/git.svg` },
  { name: 'CSS', icon: `${ICON_FOLDER}/css.svg` },
  { name: 'REST-API', icon: `${ICON_FOLDER}/rest-api.svg` },
  { name: 'Material Design', icon: `${ICON_FOLDER}/material-design.svg` },
  {
    name: $localize`:@@skills.growthMindset:Growth mindset`,
    icon: `${ICON_FOLDER}/growth-mindset.svg`,
    learningTopics: LEARNING_TOPICS,
  },
];
