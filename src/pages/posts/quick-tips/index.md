---
setup: |
  import {Code} from 'astro/components'
  import Layout from '$layouts/post.astro'
title: CSS quick tips
publishDate: 2021-11-30
description: My recommendations for keeping styles clear and readable
permalink: /posts/quick-tips
image:
  credit: Andrea Algeri
  link: https://www.behance.net/aalgeri1998dd5
  alt: Low poly islands floating in an empty blue space
---

```scss
.content {
  --padding: 1rem 2rem;

  max-width: var(--viewport-medium);
  padding: var(--padding);
  border-radius: var(--radius-conditional-3);
  background-color: var(--gray-1);
  color: #333;

  @media (--mq-medium) {
    --padding: 1rem 2rem;
  }
}
```
