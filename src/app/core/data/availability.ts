/** A fact about where and how Jan can work, shown with an icon in the about section. */
export interface AvailabilityItem {
  label: string;
  icon: string;
}

export const AVAILABILITY_ITEMS: AvailabilityItem[] = [
  { label: $localize`:@@about.location:located in Freital`, icon: 'assets/icons/location.svg' },
  { label: $localize`:@@about.remote:open to work remote`, icon: 'assets/icons/remote.svg' },
  { label: $localize`:@@about.relocate:open to relocate`, icon: 'assets/icons/relocate.svg' },
];
