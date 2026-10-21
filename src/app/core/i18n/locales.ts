/** A language the page is published in; each has its own folder on the server. */
export interface SiteLocale {
  code: string;
  label: string;
  name: string;
}

export const SITE_LOCALES: SiteLocale[] = [
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'en', label: 'EN', name: 'English' },
];
