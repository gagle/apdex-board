# Apdex score board

## Quick build & run

Execute:

```bash
npm install
npm run build
```

Open 2 consoles. In one execute `npm run start:build`. In the other `npm run start:server`.
Open the browser and open url `http://localhost/3000`.

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
npm run build
```

The artifacts will be generated under `/dist` folder.

## 4. Run

- To open the webapp and host the generated files in a local web server for testing purposes, run: `npm run start:build`. Open the browser and go to `localhost:4000`.
- To serve the json data, run the command `npm run start:server`. This will start a Hapijs server. `GET /` will return the data.

## 4. Local development

Start listening on a file hosting server on `localhost:3000` by running:

```bash
npm start
```

## 5. Local Setup

- Nodejs 12.14.1.
- TypeScript is used for a better development experience. Development ES version is ES2020,  and compile target for browsers is ES5.
- SCSS is used for styles.
- Hot Module Replacement is available for both `.ts` and `.scss` files.
- Linting with `eslint` (new recommended way for linting TS files since Tslint will be deprecated in 2020) and `stylelint` with default linting rules. `js-beautify` is used to format javascript files.
- Git pre-commit hook with `husky` to check syntax validity. TypeScript files are compiled and linted with `lint-staged` before commiting. Styles are also linted.
- Only one development environment is created for Webpack, it is not prepared for production, so no optimizations are being applied and source maps are present in the build.

## 6. Architecture

### 6.1. Custom Elements and Shadow DOM

The way this web app is architectured is by using Custom Elements and Shadow DOM apis. This is the only true way to create native components by using vanilla JS/HTML/CSS. The app builds around component interactions and styles are encapsulated insiode each component, so there's no real need to use CSS-in-JS or create unique classnames with a css preprocessor.

Currently there are 2 major information sources about these apis:

[Custom Elements v1](https://developers.google.com/web/fundamentals/web-components/customelements)
[Shadow DOM v1](https://developers.google.com/web/fundamentals/web-components/shadowdom)

Each component can be styled using raw CSS with no hassle but in this case, SCSS has been configured. The integration with Webpack is not perfect but it works like a charm and all the features work as expected.

The issue originates at the time of applying global styles for the `html` or `body` tags. Custom Elements api basically allows the creation and register of user-defined tags but says nothing about modularizing the whole application and applying styles or attatching shadow DOMs to native tags, so developers still need to think about a proper architecture split into several tiny files.

Webpack's way to import file extensions different than javascript is by reading the files and transforming them into the desired output by using a pipeline of transformers. Also, Webpack currently does not allow to run multiple pipelines for the same file extension, but we need to do so! One pipeline will create a `styles.css` file that will be loaded in parallel when the document loads containing all global styles. The other pipeline will simply transform SCSS into CSS to be able to import and use SCSS styles in each custom element.

The way it has been solved this requirement is by configuring a pipeline in the Webpack configuration file that will create `styles.scss` file and by inlining Webpack Loaders into each `import`. Doing so will work in both cases but it has some drawbacks like not being able to easily set loader options like SCSS path aliasing.

### 6.2. Applying styles

To apply styles in a Custom element only a style tag has to be created and introduced inside the `innerHTML` element's property. The problem comes when the content of the element has to be recreated because attributes or properties has been updated and the component needs to reflect that. There is some boilerplate around this, so to easily define components, an abstract `ShadowDOMComponent` class and a `@Component` decorator have been created to hide non-trivial code.

### 6.3. Angular

The architecture has been heavily based on concepts taken from Angular. For instance, `*.module.ts`, `*.component.ts`, `*.component.scss` filenames and lifecycle method names.

### 6.4. TypeScript

Typing code is the future and so is TypeScript. It has been configured and linted as the new way starting from 2020, using `eslint` instead of `tslint`.

## 7. UI Responsive design

The UI implemented follows the dimensions of the given mockups (840px width, 375px card width and 30px padding). If the window is scaled down to 840px width, then 2 hosts fit in a single row.

## 8. Algorithm performance

```
x = total apps length (loop over all apps)
y = total hosts length (loop over all hosts)
z = apps per host (sort apps per host)
O(x + y*z)
```
