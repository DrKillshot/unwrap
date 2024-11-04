---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Unwrap"
  text: "Expressive functional programming"
  tagline: A functional programming library for typescript developers
  image: /unwrap.png
  actions:
    - theme: brand
      text: Getting started
      link: /learn/getting-started
    - theme: alt
      text: API Examples
      link: /containers/maybe

features:
  - title: Safe values
    icon: ⚡
    details: Provides tools to control nullable values in TypeScript, ensuring functions handle null and undefined safely and reducing runtime errors by explicitly handling optional or missing values.
  - title: Better error handling
    icon: 🤝
    details: Utilities for managing functions that might throw errors, allowing you to handle errors in a structured way, rather than relying on traditional try-catch blocks.
  - title: Pattern matching
    icon: 🔥
    details: Simplifies working with complex union types by enabling concise pattern matching. Handle different shapes of data in a more readable way, similar to languages like Scala or Haskell.
---
