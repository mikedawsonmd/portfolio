# Project content intake guide

Use this guide when adding richer case-study evidence from Figma, Jira, Confluence or the old portfolio.

## Minimum content for each project

Add or confirm these fields in `src/data/projects.mjs`:

1. Project title and one-sentence positioning.
2. Role, timeline, product area and tools.
3. Problem statement from the user or business perspective.
4. Constraints, dependencies and product risks.
5. Design process: discovery, structure, prototype, validation and systemisation.
6. Key design decisions and the reason behind each decision.
7. Outcomes. Use metrics only when they are approved and attributable.
8. Images with descriptive alt text and correct width and height values.

## Figma material

For Figma URLs or `.fig` files, capture:

- Frame names and project area.
- Screens that show the before and after state.
- Components, variables and variants contributed back to the design system.
- Prototype flows that explain the main user journey.
- Redacted screenshots if there is confidential customer, employee or business data.

Place exported images in `assets/images/` and update the matching `thumbnail` object in `src/data/projects.mjs`.

## Jira and Confluence material

Use Jira and Confluence to strengthen the narrative, not to expose internal detail. Prefer public-safe summaries of:

- User problem and acceptance criteria.
- Product constraints and technical dependencies.
- Research notes and design review decisions.
- Shipped scope versus follow-up scope.
- Measurable outcomes, only where approved.

Avoid issue keys, names of internal stakeholders, customer names, unreleased roadmap detail, commercial numbers and sensitive implementation detail unless explicitly approved for public use.

## Image metadata

After adding an image, record dimensions in the project data. A common command is:

```bash
identify assets/images/example.webp
```

Then set:

```js
thumbnail: {
  small: 'assets/images/example-900.webp',
  large: 'assets/images/example-1600.webp',
  smallWidth: 900,
  largeWidth: 1600,
  width: 1600,
  height: 1000,
  alt: 'Clear description of the UI or artifact.'
}
```

## Quality checklist before publishing

Run:

```bash
npm run build
npm run check:links
npm run audit
```

Then manually review keyboard navigation, focus states, mobile navigation, dark mode persistence and the case-study page navigation.
