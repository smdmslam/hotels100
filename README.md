# DMW Hotels 100

Version 1 of DMW Finance Group's research-led global hotel index.

The permanent ranked hotel profile is the core product. Structured research is the normal route into the index; a personal stay is never required. When a firsthand DMW note exists, it is optional supplementary editorial material within the profile.

## Product hierarchy

1. Rank
2. Hotel
3. Concise DMW assessment
4. Defining characteristics and amenities
5. Indicative price and pricing behaviour
6. Hospitality and business logic
7. Strategic article, when published
8. Optional firsthand note, when available

## Local development

```bash
npm install
npm run dev
npm run build
```

The files `01-product-brief.md` through `06-ranking-methodology.md` are the governing specifications. `07-content/hotels.json` is the prototype index dataset.

---

## Vite notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
