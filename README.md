# Apdex score board

## 1. Install dev dependencies

Only dev dependencies will be installed. No runtime dependencies have been used.

```bash
npm install
```

## 2. Test

```bash
npm test
```

## 3. Build

```bash
npm build
```

The artifacts will be generated under `/dist` folder. To open the webapp and host the generated files in a local web server for testing purposes, run: `npm run start:build`. Open the browser and go to `localhost:4000`.

## 4. Local development

Start listening on a dev server on `localhost:3000` by running:

```bash
npm start
```

## 5. Local Setup

- Nodejs 12.14.1.
- TypeScript is used for a better development experience. Development ES version is ES2020,  and compile target for browsers is ES5.
- SCSS is used for styles.
- Hot Module Replacement is available for both `.ts` and `.scss` files.
- Linting with `eslint` (new recommended way for linting TS files since Tslint will be deprecated in 2020) and `stylelint` with default linting rules. Prettier is also used.
- Git pre-commit hook with `husky` to check syntax validity. TypeScript files are compiled and linted before commiting with `lint-staged`. Styles are also linted. Auto-fixing when possible is enabled.
- Only one development environment is created for Webpack, it is not prepared for production, so no optimizations are being applied and source maps are present in the build.
