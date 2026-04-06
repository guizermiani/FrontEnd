---
name: "FrontEnd Project Conventions"
description: "Conventions and patterns for the FrontEnd workspace containing multiple Angular, React, and vanilla JS projects"
applyTo: ["**/*.ts", "**/*.js", "**/*.jsx", "**/*.tsx", "**/*.html", "**/*.css"]
---

# FrontEnd Workspace Conventions

## Project Structure

This workspace contains multiple independent projects:

- **Angular Projects**: `Angular/`, `Angular Mini Netflix/`, `MiniNetflixAngular/`, `trabalhoAngular/`
  - Use Angular CLI conventions (components, services, modules)
  - Configuration in `angular.json`, `tsconfig.json`
  - Dependencies in `package.json`
  - Source code in `src/app/`

- **React Project**: `ReactJS/meu-projeto-react/`
  - Built with Vite
  - Source code in `src/`
  - Components typically in `src/components/` (check existing structure)
  - Uses ES modules

- **Vanilla JavaScript Projects**: `CEP por API/`, `JSON/`, `JQuery/`, `Interagindo com APIs/`, various test directories
  - Typically HTML + JS + CSS
  - May use jQuery or vanilla JS

## Before Making Changes

1. **Identify the project**: Determine which project folder the file belongs to
2. **Read package.json**: Check dependencies, scripts, and version info
3. **Check existing patterns**: Look at similar files to understand conventions
4. **Respect tsconfig/jsconfig**: Follow TypeScript or JavaScript config settings
5. **Preserve structure**: Don't reorganize folders unless requested

## Common Build/Test Commands

```bash
# Angular projects
cd Angular/meu-prmeiro-projeto  # or other Angular project
npm run build
npm run serve
npm test

# React project
cd ReactJS/meu-projeto-react
npm run build
npm run dev
npm run lint

# Vanilla JS projects
# Typically no build process, but check for local scripts
```

## Code Style Preferences

- **TypeScript**: Follow Angular project conventions (strict mode, decorators, dependency injection)
- **React**: Use modern patterns (hooks, functional components)
- **JavaScript**: Be consistent with existing style in the file
- **CSS**: Check if using CSS modules, preprocessors, or vanilla CSS

## When Adding Dependencies

1. Check if already installed in that project's `package.json`
2. Use appropriate package manager (npm for all here)
3. Update imports accordingly
4. Run `npm run build` to verify (if applicable)

## Common Issues to Avoid

- Don't mix Angular and React code patterns
- Don't assume TypeScript for vanilla JS projects
- Don't break existing module imports by reorganizing
- Always validate that changes work with the project's build system

## File Naming

- Angular: Descriptive names with `.component.ts`, `.service.ts`, `.module.ts` suffixes
- React: Component names in PascalCase, file matches component name
- Vanilla JS: Descriptive names, typically `.js` or `.html`
