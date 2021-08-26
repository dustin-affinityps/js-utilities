# JS-Utilities

Stay here for contribution-related information.

### Quickstart

* clone this repo locally
* run `npm install` & `npm run build`

### Brief Tour

Here's a brief look at each package in this repo:

Package | Description
--- | ---
[utility](packages/utility) | The main JS Utilities
[utility-dom](packages/utility-dom) | A JS Utilities DOM related

The compiled JS files (as a result of running `npm run [build/watch]`) to be included as a `<script>` tag for example are stored in each package's `packages/[package]/dist` directory.

Each package should at least have: a "cdn" build that is self-initializing and can be included using the `src` attribute in a `<script defer>` tag, and a `module.[esm/cjs].js` file that is used for importing as a JS module (cjs for node, esm for everything else).
