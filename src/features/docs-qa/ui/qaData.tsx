/* features/docs-qa — the critique round: grilling questions and the official answers.
   Content mirrors README/roadmap claims 1:1 — one source of truth, no drift. */

import Link from 'next/link';

export type QAItem = {
  id: string;
  question: string;
  answer: string[];
  take?: string;
};

const GITHUB_ISSUES = 'https://github.com/Aramex86/fsaa/issues';

export const QA_ITEMS: QAItem[] = [
  {
    id: 'just-a-preset',
    question: '“Isn’t this just an opinionated FSD preset with a new name?”',
    answer: [
      'Yes to the assembly — and this is written in the README, not hidden. But a preset is something you install; a methodology is something that <strong>obligates</strong>. FSAA ships the three decision rules as mechanical artifacts: a lint config that rejects upward and cross-feature imports, a folder contract the generator follows, and a boundary test that settles review debates with one question.',
      'A blog post describes. A methodology obligates — after the post is forgotten, the lint rule still fails the build. That difference is the product.',
    ],
    take: 'The value is not the name; it is that the rules keep working after you stop remembering them.',
  },
  {
    id: 'one-maintainer',
    question: '“One maintainer, zero adoption — why bet a frontend on you?”',
    answer: [
      'Honest: the risk is real and the docs name it. Three mitigations: the code is <strong>MIT</strong> with no lock-in — if the project dies, everything stays yours; the rules compact into a ~20-minute read, so a team onboarded without me; and the artifacts (templates, lint config) are plain config files your senior engineers already understand.',
      'Adoption grows from working boundary cases, not promises — the placement-issue flow in CONTRIBUTING is the intended first contact.',
    ],
    take: 'You are not betting on a person — you are copying two files and three rules you can read over coffee.',
  },
  {
    id: 'nda-proof',
    question: '“Your production proof is behind NDA — what can actually be verified?”',
    answer: [
      'The internal tool (financial accounting, managers/director/accounting as daily users) validates the rules under real load — but the code cannot be shown. So the claim was made verifiable differently: <strong>this documentation site is itself built on FSAA</strong> — features/entities/shared, thin routes, boundary-tested imports. Open the repo and inspect a working Next.js App Router layout that follows every rule.',
      'Both starter templates ship the same structure with lint enforcement — the architecture is inspectable, forkable, and copyable into a project on Monday.',
    ],
    take: 'NDA hid the proof — so an inspectable one was built on top of the docs.',
  },
  {
    id: 'graduation-who',
    question: '“The graduation pattern: who decides, and what stops copy-paste drift?”',
    answer: [
      'Told as a story, because the mechanics are simple:',
      'Week 1 — <code>ProjectCard</code> lives inside <code>features/projects-overview/ui/</code>. Normal: every feature owns its UI.',
      'Week 3 — the orders feature needs a similar card. It <strong>cannot import</strong> it from projects (cross-feature imports are a lint error). So the developer copies the file into <code>features/orders-overview/ui/</code>. <strong>The copy is legal</strong> — one duplicate is allowed on purpose: a real second user just appeared, and that fact is now visible in the codebase.',
      'Week 4+ — the two cards keep evolving in parallel. If they end up the same anyway, that is proof the component is genuinely shared. Now <strong>one pull request</strong> graduates it: <code>ProjectCard</code> moves to <code>shared/ui/molecules/</code>, BOTH features import it from the shared public API (the folder’s <code>index.ts</code>), and the two feature-local copies are deleted inside that same PR. CI plus lint verify nothing still points at the deleted paths.',
      'Nobody “feels” anything: the trigger is the second feature (objective), the gate is the boundary test, the move is a single PR. Drift cannot hide — a third copy fails CI on arrival, because the only legal cross-feature sources are entities (data) and shared (UI).',
    ],
    take: 'Second feature = trigger. Boundary test = gate. One PR = the move, with the old copies deleted inside it.',
  },
  {
    id: 'nextjs-placement',
    question: '“Where do layouts, loading/error files, route groups and parallel slots go?”',
    answer: [
      'The App Router itself is the pages layer — no <code>_app</code>/<code>_pages</code> renames. Root <code>layout.tsx</code> is the FSAA app layer (providers, global config); section layouts and <code>loading.tsx</code>/<code>error.tsx</code> are page-composition wrappers; route groups are allowed while import directions stay intact; a parallel-route <code>@slot</code> references a feature and never implements one.',
      'The full mapping is codified on the architecture page — and enforced by the starter’s ESLint config.',
    ],
    take: 'Slots reference features — route files never grow business logic.',
  },
  {
    id: 'adoption-cost',
    question: '“What does adopting FSAA honestly cost an existing codebase?”',
    answer: [
      'The methodology is incremental by design: features keep their flat <code>ui/</code> folders from day one — no atomic reorganization inside features is required to start. The first real steps are (1) add the alias set, (2) turn on the boundary lint in warn mode for a sprint, then error mode, (3) run the boundary test on new components only.',
      'What is deliberately NOT promised: a no-pain rewrite of a legacy tree. Migration stories live in the adoption guide; a rewrite is the wrong lens — graduation applies to components, not to sprints.',
    ],
    take: 'Start with one sprint of warn-mode lint; graduation applies to components, not to big-bang rewrites.',
  },
];

export function STATUS_PILL() {
  return (
    <Link href="https://github.com/Aramex86/fsaa/issues" target="_blank" rel="noreferrer" className="pill live">
      bring the case to GitHub issues ↗
    </Link>
  );
}