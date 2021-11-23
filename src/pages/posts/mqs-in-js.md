---
setup: |
  import Layout from '../../layouts/BlogPost.astro'
title: Synchronising CSS with JS
publishDate: 21st November 2021
name: Oliver Turner
description: How Astro and PostCSS can help you keep behaviour & styling aligned
---

##

One of the (many!) things I love about Astro is its embrace of Island
Architecture as a way to deliver apps with the lightest possible baseline and
progressively enhance them in accordance with our user's context.

"Context" here can mean the state of the page load, the user's progress through
the content, or their device's dimensions: Astro lets us [declaratively define
how a component should respond](https://docs.astro.build/core-concepts/component-hydration/#hydrate-interactive-components)
via directives.

Here's an example of how we can keep the mobile payload minimal by only
hydrating a component if the device has the real estate to display it:

```astro
// Hydrate `Sidebar` only if the device is a tablet or larger
<Sidebar client:media={'(min-width: 768px)'} />
```

`<Sidebar />` shipping as inert HTML and only loading its JS if our user-focused
criteria are met is great for performance: as the old adage has it, the fastest
code is the code you don't load!

### But wait...

Okay, so fast-by-default is very cool but...

🤔 if `matchMedia` is now a control mechanism for behaviour, then...\
😟 we need to keep our media queries aligned with our application code, so...\
😱 how do we keep CSS in sync with our JS?!

Manually keeping track of both across a large application under heavy development
sounds bound to be brittle and bug-prone, but here's how to create a maintainable
single source of truth in just three steps _and_ get friendlier CSS into the
bargain 😀

## Step 1: Define your breakpoints

```js
// src/theme.cjs
const breakpoints = {
  small: 640,
  medium: 768,
  large: 960,
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

The exported value now includes `customMedia`, a map of `mediaQueryString`s derived from the keys and values of `breakpoints`:

```js
{
  breakpoints: {...}, // as above
  customMedia: {
    '--mq-small': '(min-width: 640px)',
    '--mq-medium': '(min-width: 768px)',
    '--mq-large': '(min-width: 960px)'
  }
}
```

## Step 2: Getting JS to talk to CSS

So now we've defined some breakpoints in JS... but how to access to them in CSS?

This is where Astro's first class support for PostCSS shines: adding a
`postcss.config.cjs` file is the only set-up required:

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

With that, Astro now pipes all our style rules through our new PostCSS pipeline:
the keys from `customMedia` are available to our (S)CSS. Here's a trivial example
that changes an element's background colour based on the dimensions of the
viewport:

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
}
```

> [Custom Media Queries](https://drafts.csswg.org/mediaqueries-5/#at-ruledef-custom-media) are such natural-looking syntax that it can be easy to forget that they aren't yet native CSS, only a Stage 1 proposal. For now though, it's pretty cool that such a neat feature is so easily enabled.
>
> For more Future CSS inspo, check out the incredible [postcss-preset-env](https://preset-env.cssdb.org/features) project from Astro contributor [@jon_neal](https://twitter.com/jon_neal)

## Step 3: Bringing it all together

Now we can access the same `customMedia` object in both JS and CSS from a single
source of truth: here `--mq-medium` is used to define both the behaviour of
`<Sidebar />` and the layout of `.app` within the same Astro component

```astro
---
// src/pages/index.astro
import * as module from "module";
const moduleRequire = module.createRequire(import.meta.url);
const { customMedia } = moduleRequire('../theme.cjs');
---

<div class="app">
  <div class="app__content">...</div>
  <div class="app__sidebar">
    <Sidebar client:media={customMedia["--mq-medium"]} /> <!-- Reference 1 -->
  </div>
</div>

<style lang="scss">
.app {
  display: grid;

  @media (--mq-medium) {  // <-- Reference 2
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

> The somewhat convoluted import from `theme.cjs` is due to the incomplete transition from CommonJS to ESM currently rippling through the JS ecosystem. This is being worked on: watch this space!

## Wrapping up

Hopefully you'll find this is a useful technique and an illustrative example of
how Astro's architecture lends itself to delivering more user-centered
applications at the same time as providing an amazing developer experience.

For a worked-up example of this approach in action head over to Github and
[check out the source of this site](https://github.com/oliverturner/blog):
you'll see that I'm also using the `postcss-custom-properties` plugin to export
the same `breakpoints` to static CSS for to set values like the maximum width of
the content.

Feel free to reach out with any questions or suggestions on [Twitter](https://twitter.com/oliverturner)!
