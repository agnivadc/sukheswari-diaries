export const currentEdition = {
  year: 2026,
  title: "The year we got closer",
  kind: "current",
} as const;

export const archivedEditions = [
  { year: 2025, title: "From Bumble to Forever", kind: "archive" },
] as const;

export const birthdayEditions = [currentEdition, ...archivedEditions] as const;
export type BirthdayEdition = (typeof birthdayEditions)[number];
export type ArchivedEdition = (typeof archivedEditions)[number];

export function findBirthdayEdition(year: string | null) {
  return year === null
    ? currentEdition
    : birthdayEditions.find((edition) => String(edition.year) === year);
}

function siteBase(base: string) {
  return `${base.replace(/\/$/, "")}/`.replace(/\/\d{4}\/$/, "/");
}

export function getEditionHref(edition: BirthdayEdition, base: string) {
  const root = siteBase(base);
  return edition.kind === "current" ? root : `${root}?year=${edition.year}`;
}

export function getArchiveSource(edition: ArchivedEdition, base: string) {
  return `${siteBase(base)}${edition.year}/`;
}
