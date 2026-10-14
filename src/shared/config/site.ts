/* shared/config — global, business-free site configuration. */

export const SITE = {
  name: 'FSAA',
  fullName: 'Feature-Sliced Atomic Architecture',
  tagline: 'Feature-Sliced Atomic',
  version: 'v0.1 draft',
  phaseLabel: 'Phase 1 · docs live',
  repoUrl: 'https://github.com/Aramex86/fsaa', // methodology repo (MIT, public)
  webRepoUrl: 'https://github.com/Aramex86/FSAA-webpage', // docs-site source
  repoLabel: 'GitHub repository',
  repoTodoTitle: 'Placeholder — the real repository URL lands in Phase 0. Not a working link.',
  pitch:
    'FSAA is FSD + Atomic Design with an answer to the question both leave open: ' +
    'where does UI go?',
  positioning:
    'FSAA is not a new architecture theory. It is a practical, opinionated assembly of ' +
    'two proven methods — Feature-Sliced Design and Atomic Design — with the missing ' +
    'decision rules added. We do not claim a revolution.',
  proof:
    'Used in production on an internal financial accounting tool with real daily users ' +
    '(managers, director, accounting).',
  graduationMotto: 'Features own their UI until it earns sharing.',
  boundaryTest:
    'If I removed this component from the app entirely, could it still be described ' +
    'without mentioning users, orders, or projects?',
  keyExampleRule:
    'The table component stays generic; business-specific columns live in their ' +
    'features. If two entities need the same visual pattern, extract the pattern into ' +
    'shared, keep entity configuration in features.',
  hybridAnswer:
    '“Isn’t this just FSD + Atomic?” — Yes, deliberately. The value is not novelty, ' +
    'it is the missing decision rules: the graduation pattern, the boundary test for ' +
    'shared, and the removal of organisms. We do not claim a revolution.',
} as const;

export type SiteConfig = typeof SITE;