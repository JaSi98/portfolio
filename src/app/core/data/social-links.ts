/** A professional profile shown as icon link. */
export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export const GITHUB_PROFILE_URL = 'https://github.com/JaSi98';

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', url: GITHUB_PROFILE_URL, icon: 'assets/icons/github.svg' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jan-sippl-ba8486391/',
    icon: 'assets/icons/linkedin.svg',
  },
];

// The mail icon leads to the contact form, so no address is published on the page.
export const MAIL_ICON = 'assets/icons/mail.svg';
