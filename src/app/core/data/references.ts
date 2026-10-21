/** Feedback from a team member of a project. */
export interface Reference {
  name: string;
  project: string;
  quote: string;
}

// Filled with real quotes from team members; the section stays hidden while the list is empty.
export const REFERENCES: Reference[] = [];
