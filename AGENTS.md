# Flevio Engineering Principles

- Always inspect and understand the codebase architecture before implementation.
- Respect existing folder structures, naming patterns, and project conventions.
- Create or modify files only in their appropriate architectural locations.
- Never unnecessarily reorganize unrelated code.
- Before removing any component, asset, style, utility, or dependency, check all direct and indirect references.
- Completely remove genuinely unused components, styles, assets, listeners, animation setup, and related code; do not leave commented-out legacy implementations.
- Preserve shared functionality and existing behavior unless a task explicitly changes them.
- Maintain performance, accessibility, responsiveness, and code quality.
- Follow the exact scope of every task and prevent scoped changes from leaking into other surfaces or breakpoints.
- Run verification appropriate to the change, including relevant linting, type checks, tests, production builds, responsive checks, and runtime inspection.
