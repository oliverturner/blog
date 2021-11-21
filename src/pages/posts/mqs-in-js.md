---
setup: |
  import Layout from '../../layouts/BlogPost.astro'
  import Cool from '../../components/Author.astro'
title: Synchronising CSS with JS
publishDate: 21st November 2021
name: Oliver Turner
value: 128
description: Just a Hello World Post!
---


One of the many things I love about Astro is its embrace of Island Architecture as a way to progressively enhance components in accordance with the user's context.

"Context" here can mean the state of the page load, the user's progress through the content, or the device's dimensions: Astro lets us [declaratively define how a component should respond via directives](https://docs.astro.build/core-concepts/component-hydration/#hydrate-interactive-components).

If we want to enhance a component based on the availability of space – e.g. hydrating a sidebar component when the real estate exists to display it - the question arises of how to keep our CSS breakpoints in sync with our JS. Here's how I maintain a single source of truth for both and get a friendly set of media queries into the bargain.

## Step 1: Define the breakpoints
```js
// src/theme.cjs

const breakpoints = {
  small: 640,
  medium: 768,
  large: 960,
  xlarge: 1200,
};

function getCustomMedia(breakpoints) {
  const mqs = {};
  for (const [k, v] of Object.entries(breakpoints)) {
    mqs["--mq-" + k] = `(min-width: ${v}px)`;
  }

  return mqs;
}

module.exports = {
  breakpoints,
  customMedia: getCustomMedia(breakpoints),
};
```

The exported value includes the numeric breakpoints we can use with `matchMedia` in our JS, plus a map of named media queries that share the same keys (prefixed with `--mq-`) and values (specified as pixels).

```js
{
  breakpoints: {...}, // as above
  customMedia: {
    '--mq-small': '(min-width: 640px)',
    '--mq-medium': '(min-width: 768px)',
    '--mq-large': '(min-width: 960px)',
    '--mq-xlarge': '(min-width: 1200px)'
  }
}
```

## Step 2: PostCSS to the rescue

This is where the Astro's first class support for PostCSS shines: adding a `postcss.config.cjs` file is all the set-up required to give us access to the richness and power of its ecosystem:

```js
// postcss.config.js

const postcssCustomMedia = require("postcss-custom-media");
const { customMedia } = require("./src/theme.cjs");

module.exports = {
  plugins: [
    postcssCustomMedia({ importFrom: { customMedia } })
  ];
};
```

Now we can use the prefixed `breakpoints` in our CSS:

```scss
.my-component {
  --bg: blue;

  background-color: var(--bg);

  @media (--mq-medium) {
    --bg: green;
  }
  @media (--mq-large) {
    --bg: yellow;
  }
  @media (--mq-xlarge) {
    --bg: orange;
  }
}
```

Named media queries are a nice bonus: I find them easier to read, recall and understand than numeric values.

## Step 3: Bringing it all together
...and now we can use _named_ media queries in our components' style blocks

```astro
---
import { customMedia } from '../../theme.cjs'
---

<div class="app">
  <div class="app__content">...</div>
  <div class="app__sidebar">
    <Sidebar client:media={customMedia["--mq-medium"]} />
  </div>
</div>

<style lang="scss">
.app {
  display: grid;

  @media (--mq-medium) {
    grid-template-columns: 1fr 240px;
    grid-template-areas: "content sidebar";
  }
}

.app__content {
  grid-area: content;
}

.app__sidebar {
  grid-area: sidebar;
}
</style>
```

## Conclusion

I use this approach on every site I build, so if you want to take a look at a more comprehensive example head over to Github and [check out the source](https://github.com/oliverturner/blog)

Feel free to reach out with any questions or suggestions on [Twitter](https://twitter.com/oliverturner)!
