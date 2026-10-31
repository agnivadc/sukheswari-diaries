# Agent instructions

Read [README.md](README.md) before planning or changing this project. It is the
current architecture, 2026 implementation handoff, and annual-update guide.
Read [DEPLOYMENT.md](DEPLOYMENT.md#L5-L46) for archive/deployment details.
The older `replit.md` and `design_guidelines.md` describe the 2025 design, not
the current chapter.

## Preserve the diary

- Treat every `client/public/<year>/` as an immutable standalone build. Never
  edit/rebuild a frozen edition or change its manifest to bypass verification.
- Before replacing a chapter, freeze its final committed source with the
  existing archive command. Do not archive uncommitted or next-year code.
- Use `client/src/lib/birthday-editions.ts` for edition metadata and URL helpers;
  list archives newest first. Shared navigation belongs outside the archived
  document. Retain embedded-header suppression in new current chapters.
  Cross-year links must target `_top`, not nest viewers.
- Preserve year-specific delivery invitations and their preview images.
  An already-sent 2026 invitation must continue opening 2026, not the newest year.
- Follow the [next-birthday playbook](README.md#next-birthday-playbook).
  Collect approved moments/photos, confirmed dates, letter notes, and design
  direction; do not invent personal details or automatically carry old content
  into a new year.
- Keep original photos local; publish only approved optimized,
  metadata-stripped assets with alt text. A root `2026/` folder is not the
  frozen `client/public/2026/` directory. Do not use blanket `git add .`.
- The existing client-side secret word is only a courtesy gate. The production
  site is static GitHub Pages; no backend/database is required.

## Verify and hand off

For application changes, run:

```bash
npm run check
npm test
npm run build:pages -- --base=/sukheswari-diaries/
```

Use the README's [browser checklist](README.md#browser-checklist), especially
old-year navigation, mobile layout, letter-first unlock, and archive fidelity.
There is no configured lint/formatter/browser-test command; do not claim those
checks ran. Documentation-only changes do not require rebuilding the site.

Keep changes scoped, preserve unrelated work/raw assets, and update the README
when the current year, architecture, commands, or next-year plan changes.
Do not commit, push, or deploy without the owner's approval: pushing `main`
triggers production deployment. Report remaining work and publishing status
explicitly.
