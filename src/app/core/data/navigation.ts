/** A link of the main navigation to a section of the home page. */
export interface NavigationItem {
  label: string;
  fragment: string;
}

export const SECTION_IDS = {
  about: 'about',
  skills: 'skills',
  projects: 'projects',
  contact: 'contact',
} as const;

/** Links of the header; the mobile menu adds the contact section. */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: $localize`:@@nav.about:About me`, fragment: SECTION_IDS.about },
  { label: $localize`:@@nav.skills:Skill set`, fragment: SECTION_IDS.skills },
  { label: $localize`:@@nav.projects:My work`, fragment: SECTION_IDS.projects },
];

export const CONTACT_NAVIGATION_ITEM: NavigationItem = {
  label: $localize`:@@nav.contact:Contact`,
  fragment: SECTION_IDS.contact,
};
