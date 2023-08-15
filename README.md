[![Latest released version](https://img.shields.io/npm/v/simply-result)](https://www.npmjs.com/package/simply-result)
[![Minified and gzipped bundle size](https://img.shields.io/bundlephobia/minzip/simply-result)](https://bundlephobia.com/package/simply-result)
![Type support](https://img.shields.io/npm/types/simply-result)
[![Downloads from NPM](https://img.shields.io/npm/dm/simply-result?label=downloads%20npm)](https://www.npmjs.com/package/simply-result)
[![Downloads from JSDeliver](https://img.shields.io/jsdelivr/npm/hm/simply-result?label=downloads%20jsDelivr)](https://www.jsdelivr.com/package/npm/simply-result)
[![MIT licensed](https://img.shields.io/npm/l/simply-result)](./LICENSE)

# simply-result

Simply typesafe Result and Option monads in typescript and javascript. Less than 1kb minified and gzipped. Branchless implementation that waists no processing cycles on unnecessary operations.

## Installation

### NPM

[`npm i simply-result`](https://www.npmjs.com/package/simply-result)

```ts
import {
    Result, Ok, Err,
    Option, Some, None,
} from 'simply-result';
```

## Demo

[See `./demo`](./demo/)