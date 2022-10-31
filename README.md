<div align="center">
  <a href="https://www.npmjs.com/package/schoolsoft">
    <img src="https://img.shields.io/npm/v/schoolsoft" />
  </a>
  <img src="https://img.shields.io/npm/l/schoolsoft" />
  <img src="https://img.shields.io/node/v/schoolsoft?color=orange" />
  <img src="https://img.shields.io/npm/dw/schoolsoft" />
  <img src="https://img.shields.io/npm/types/schoolsoft" />
  <img src="https://img.shields.io/github/commit-activity/m/CarelessInternet/node-schoolsoft?color=red" />
</div>

# node-schoolsoft

A SchoolSoft API wrapper for both the browser and Node.js!

## Features

* Zero dependencies!
* Built with TypeScript and comes with types!
* Utilises the native `fetch` API!
  * Works with the browser, Node.js v18+, and frameworks that implement the `fetch` API like Next.js!
* Uses ESM instead of CommonJS!

## Disclaimer

This library has not been tested with guardian nor staff accounts, so please be aware that it's highly unlikely they will work with this API wrapper.

## Installation

```bash
npm i schoolsoft
```

## Documentation

No documentation yet, but check out [`the source code`](src/index.ts) and [`the testing file`](__tests__/instance/SchoolSoft.Test.ts) for all methods available.

## Testing

Testing is implemented with `jest`. Here's how to run the test cases:

1. Create a `.env` file with the environment variables found in [`__tests__/environment.d.ts`](__tests__/environment.d.ts) in the root directory.

2. Run the test cases with `npm test`.

## Credits

Thank you to [this repository](https://github.com/Blatzar/schoolsoft-api-app) for giving me a head start.
