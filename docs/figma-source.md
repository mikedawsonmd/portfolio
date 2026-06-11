# Figma source mapping

The public case-study pages are now mapped to the three uploaded `.fig` files:

| Case study page | Uploaded file | Figma file name | Exported | Extracted embedded assets |
| --- | --- | --- | --- | --- |
| `/projects/employee-app/` | `EmployeeApp.fig` | `Super app mid-fi concept testing` | 10 June 2026 | 24 |
| `/projects/events/` | `Events.fig` | `Events` | 10 June 2026 | 136 |
| `/projects/workflows/` | `Workflows.fig` | `Workflows` | 10 June 2026 | 50 |

The live site uses optimised WebP images extracted from the Figma exports rather than shipping the original `.fig` source files publicly. This keeps the deployed site lightweight and avoids exposing editable/proprietary source material.

To add more specific case-study content later, update `src/data/projects.mjs` and add any approved screenshots to `assets/images/case-studies/`, then run:

```bash
npm run build
npm run check:links
npm run audit
```
