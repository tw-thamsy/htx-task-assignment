## Shared code

The root `shared/` directory contains constants used by both applications.
Import them using the `#shared/*` alias:

```ts
import { Skills } from '#shared/skills.constants';
```

TypeScript resolves the alias in both applications, Vite bundles imported shared
code into the frontend, and the backend compiles shared code into `dist/shared/`.
Node resolves the backend alias through its package imports mapping.
