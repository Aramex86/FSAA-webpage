import { Chip } from '@/shared/ui/atoms';
import { Callout, PageHeader } from '@/shared/ui/molecules';
import { DocsPager } from '@/features/docs-pager';
import { crumbFor } from '@/features/docs-registry';

export default function AdoptionPage() {
  return (
    <>
      <PageHeader
        crumb={crumbFor('adoption')}
        title="Adoption guide"
        lede="How to bring FSAA into an existing codebase without a big-bang rewrite."
      />

      <div className="chips">
        <Chip tone="on">scope: new and existing apps</Chip>
        <Chip>works with React, Next.js, Vite</Chip>
      </div>

      <div className="split">
        <div className="panel good">
          <h4>Use FSAA when</h4>
          <ul>
            <li>Several teams ship to one frontend codebase</li>
            <li>Page blocks outgrow folders and review fights start</li>
            <li>You want layering enforced by lint, not by memory</li>
          </ul>
        </div>
        <div className="panel bad">
          <h4>Don&apos;t use FSAA when</h4>
          <ul>
            <li>Single-page prototype with a short lifespan</li>
            <li>Team of one or two with a stable tiny structure</li>
            <li>Project is a library, not an app</li>
          </ul>
        </div>
      </div>

      <Callout tone="stop" label="Enforcement">
        Do not adopt FSAA without the ESLint boundary config. Rules that live only in a
        document decay within weeks; rules that fail CI survive refactors.
      </Callout>

      <h2 id="migration-notes">Migration notes</h2>
      <p>
        Order matters: boundaries first, moves second, promotions last.
      </p>
      <ol className="steps">
        <li>
          <b>Add the lint rules, change nothing else.</b> Start with zones for shared and entities;
          every existing violation becomes a visible diff, not a debate.
        </li>
        <li>
          <b>Name the layers.</b> Create empty <code>features/</code>, <code>entities/</code>,
          <code>shared/</code> top folders next to your routes.
        </li>
        <li>
          <b>Move design tokens and utils to shared.</b> Zero-risk moves; imports update
          mechanically.
        </li>
        <li>
          <b>Slice the biggest page blocks into features.</b> One block per PR, ui/model/api only
          when each part exists.
        </li>
        <li>
          <b>Extract entities with models.</b> Move types + data access that 2+ features need;
          keep public APIs via index.ts.
        </li>
        <li>
          <b>Graduate UI last.</b> Only after step 5 do you have consumers to justify shared/ui
          molecules — apply the graduation pattern retroactively.
        </li>
      </ol>

      <h2 id="review-checklist">Review checklist</h2>
      <ul className="verdicts">
        <li><span className="tick pass">✓</span> Imports point strictly downward — no layer skipping.</li>
        <li><span className="tick pass">✓</span> Feature-to-feature imports go through public APIs only.</li>
        <li><span className="tick pass">✓</span> shared/ui contains zero domain words (boundary test passed).</li>
        <li><span className="tick fail">✗</span> No atoms/molecules folders inside features — promote instead.</li>
        <li><span className="tick fail">✗</span> No new organisms tier, no widgets layer resurrection.</li>
        <li><span className="tick fail">✗</span> No pre-promoted “reusable” UI with a single consumer.</li>
      </ul>

      <Callout label="Tip">
        Run the checklist as part of the PR template for the first month — after that the lint
        config catches most of it automatically.
      </Callout>

      <DocsPager current="adoption" />
    </>
  );
}