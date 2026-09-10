# Contributing

## Prerequisites

- Node 22+
- Expo SDK **57** docs: https://docs.expo.dev/versions/v57.0.0/

## Scripts

```bash
npm install
npm run web
npm run typecheck
npm run audit:pages
npm run smoke:template   # pack → create-expo-app → typecheck
npm run export:web
```

## Guidelines

- Keep the product brand **Verdant** in UI chrome (logo, auth, 404 footer)
- Credit TailAdmin / tweakcn only in README / NOTICE — not as the product name in the app
- Do **not** add TailAdmin Pro or Tamagui Bento / Takeout Pro assets
- Prefer `useTemplateConfig().brandColor` for accents
- Update `docs/components.md` when adding shared primitives
- Update `CHANGELOG.md` for user-facing changes

## Publishing

This repo is an **Expo template** distributed in two places:

| Registry | Package name |
|----------|----------------|
| [npmjs.org](https://www.npmjs.com/package/verdant-tamagui-admin-template) | `verdant-tamagui-admin-template` |
| [GitHub Packages](https://github.com/rahulsukla/verdant-tamagui-admin-template/pkgs/npm/verdant-tamagui-admin-template) | `@rahulsukla/verdant-tamagui-admin-template` |

```bash
npm run smoke:template
npm publish --access public                                          # npmjs
NODE_AUTH_TOKEN=$(gh auth token) npm run release:github-packages     # GitHub Packages
```

Prefer **npmjs** for `create-expo-app --template`. GitHub Packages is mainly so the repo Packages sidebar lists the package.

CI: `.github/workflows/publish-npm.yml` publishes both on release / manual dispatch (`NPM_TOKEN` for npmjs; `GITHUB_TOKEN` for GitHub Packages).

## Intentionally omitted heavy deps

- ApexCharts, FullCalendar, jsVectorMap
