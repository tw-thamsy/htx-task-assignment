## NPM scripts

Run these commands from the `frontend` directory after installing dependencies with `npm ci`.

- `npm run dev` starts the Vite development server with hot reloading.
- `npm run build` runs the TypeScript project build (`tsc -b`) and creates the production bundle with Vite in `dist/`.
- `npm run preview` serves the production bundle from `dist/` locally. Run `npm run build` first.
- `npm run storybook` starts the Storybook development server at `http://localhost:6006`.
- `npm run build-storybook` builds the Storybook site into `storybook-static/`.
- `npm test` starts Vitest in its default interactive/watch mode for frontend tests.
- `npm run test:storybook` runs Vitest tests for the Storybook project.
