---
setup: |
  import Layout from '../../layouts/BlogPost.astro'
title: Synchronising CSS with JS
publishDate: 21st November 2021
name: Oliver Turner
value: 128
description: Just a Hello World Post!
---

One of the (many!) things I love about Astro is its embrace of Island
Architecture as a way to deliver apps with the lightest possible baseline and
progressively enhance them in accordance with our user's context.

"Context" here can mean the state of the page load, the user's progress through
the content, or their device's dimensions: Astro lets us [declaratively define
how a component should respond](https://docs.astro.build/core-concepts/component-hydration/#hydrate-interactive-components)
via directives.

Here's an example of how we can keep the payload to mobile users minimal by
avoiding loading the code and data for a component that their device doesn't
have the real estate to display:

```astro
// Hydrate `Sidebar` only if the device is a tablet or larger
<Sidebar client:media={'(min-width: 768px)'} />
```

### An issue arises...
This is very cool but... if `matchMedia` is now a control mechanism for
behaviour, then we'll want to keep our media queries aligned with our application
code... so how do we keep CSS in sync with our JS? Manually keeping track of
both across a large application under heavy development would be brittle and
bug-prone, no?

Here's how you can maintain a single source of truth and get friendlier CSS into
the bargain 😀

## Step 1: Define your breakpoints
```js
// src/theme.cjs

const breakpoints = {
  small: 640,
  medium: 768,
  large: 960,
  xlarge: 1200,
};

function getCustomMedia(breakpoints, mqs = {}) {
  for (const [key, val] of Object.entries(breakpoints)) {
    mqs["--mq-" + key] = `(min-width: ${val}px)`;
  }

  return mqs;
}

module.exports = {
  breakpoints,
  customMedia: getCustomMedia(breakpoints),
};
```

The exported value includes the purely numeric `breakpoints` plus `customMedia`,
a map of named media queries that share the same keys and values:

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

## Step 2: Getting JS to talk to CSS

So now we've defined some breakpoints in JS... but how to get access to them in
CSS?

This is where Astro's first class support for PostCSS shines: adding a
`postcss.config.cjs` file is the only set-up required to give us access to the
richness and power of its ecosystem:

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

Astro now pipes all our style rules through PostCSS, so now we can use the
prefixed `breakpoints` in our (S)CSS:

```scss
// src/styles/styles.scss

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

Custom Media Queries are a nice bonus only made possible by PostCSS (they're
currently a Stage 1 proposal): I find them easier to read, recall and keep
consistent than numeric values.

## Step 3: Bringing it all together

Because PostCSS also exposes the style object to JS, we can also use the same
key references throughout our components: here `--mq-medium` is used to defined
both the behaviour of `<Sidebar />` and the layout of `.app`

```astro
---
// src/pages/index.astro

import { customMedia } from '../../theme.cjs'
---

<div class="app">
  <div class="app__content">...</div>
  <div class="app__sidebar">
    <!-- Reference 1 -->
    <Sidebar client:media={customMedia["--mq-medium"]} />
  </div>
</div>

<style lang="scss">
.app {
  display: grid;

  // Reference 2
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
Hopefully this is a useful technique and a good example of how Astro's
architecture lends itself to delivering more user-centered applications at the
same time as providing an amazing developer experience.

If you want to take a look at a more comprehensive example of this approach in
action head over to Github and [check out the source of this site](https://github.com/oliverturner/blog).

Feel free to reach out with any questions or suggestions on [Twitter](https://twitter.com/oliverturner)!
