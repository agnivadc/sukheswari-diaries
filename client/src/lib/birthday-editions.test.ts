import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  archivedEditions,
  currentEdition,
  findBirthdayEdition,
  getArchiveSource,
  getEditionHref,
} from "./birthday-editions";

test("the homepage selects the current birthday, while an explicit year selects its edition", () => {
  assert.equal(findBirthdayEdition(null), currentEdition);
  assert.equal(findBirthdayEdition("2026"), currentEdition);
  assert.equal(findBirthdayEdition("2025"), archivedEditions[0]);
});

test("unknown or malformed years do not silently open the current birthday", () => {
  for (const year of ["", "1900", "2025/../../", "2025abc"]) {
    assert.equal(findBirthdayEdition(year), undefined);
  }
});

test("edition navigation works at the site root and under a GitHub Pages repository path", () => {
  for (const root of ["/", "/sukheswari-diaries/"]) {
    assert.equal(getEditionHref(currentEdition, root), root);
    assert.equal(getEditionHref(archivedEditions[0], root), `${root}?year=2025`);
    assert.equal(getArchiveSource(archivedEditions[0], root), `${root}2025/`);
  }
});

test("a future frozen copy links out to the shared site rather than nesting viewers", () => {
  for (const base of ["/2026", "/2026/", "/sukheswari-diaries/2026", "/sukheswari-diaries/2026/"]) {
    const root = base.includes("sukheswari-diaries") ? "/sukheswari-diaries/" : "/";
    assert.equal(getEditionHref(currentEdition, base), root);
    assert.equal(getEditionHref(archivedEditions[0], base), `${root}?year=2025`);
    assert.equal(getArchiveSource(archivedEditions[0], base), `${root}2025/`);
  }
});

test("each listed archive points to an existing frozen edition of the same year", () => {
  for (const edition of archivedEditions) {
    const manifest = JSON.parse(readFileSync(
      new URL(`../../public/${edition.year}/edition.json`, import.meta.url),
      "utf8",
    ));
    assert.equal(manifest.year, edition.year);
    assert.ok(manifest.files["index.html"]);
  }
});
