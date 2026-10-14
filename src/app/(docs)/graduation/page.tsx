import { Callout, Card, PageHeader } from '@/shared/ui/molecules';
import { CodeViewer } from '@/features/code-viewer';
import { DocsPager } from '@/features/docs-pager';
import { SITE } from '@/shared/config/site';
import { crumbFor } from '@/features/docs-registry';

const STAGE_1 = `// Stage 1 — the component lives inside its feature. Fully owned.
features/accounting/ui/PeriodPicker.tsx
features/accounting/ui/PeriodPicker.css
// No other feature knows it exists. No props drilling, no over-config.`;

const STAGE_2 = `// Stage 2 — a 2nd feature needs it. Only now: graduate.
shared/ui/molecules/PeriodPicker/
  ├─ index.ts          // public API
  ├─ PeriodPicker.tsx  // implementation
  └─ PeriodPicker.css
// features import it via '@/shared/ui/molecules'. Stage 1 code is deleted.`;

export default function GraduationPage() {
  return (
    <>
      <PageHeader
        crumb={crumbFor('graduation')}
        title="The graduation pattern"
        lede="FSAA's answer to premature abstraction: UI earns its place in shared/ui, it is not born there."
      />

      <Callout tone="rule" label="Motto">{SITE.graduationMotto}</Callout>

      <h2 id="the-flow">The flow</h2>
      <div className="flow">
        <div className="flow-node">
          <h4>Stage 1 — <span>feature-owned</span></h4>
          Component lives in one feature. Used there, tuned there, free to change without
          negotiation across teams.
          <pre className="mini">
            <span className="f">features/accounting/ui</span>
            {'\n'}  └─ PeriodPicker.tsx   <span className="c">{"// single consumer"}</span>
            {'\n'}imports: <span className="a">entities, shared</span>
          </pre>
        </div>
        <div className="flow-arrow">
          <span className="ar">→</span>
          <span className="lbl">
            a 2nd feature needs it
            <br />→ <b>promote</b>
          </span>
        </div>
        <div className="flow-node">
          <h4>Stage 2 — <span>shared/ui</span></h4>
          Component graduates: moves to shared/ui/molecules, gets a public API via index.ts, its
          API is now a small contract.
          <pre className="mini">
            <span className="d">shared/ui/molecules</span>
            {'\n'}  ├─ index.ts
            {'\n'}  └─ PeriodPicker/    <span className="c">{"// graduated"}</span>
            {'\n'}boundary test: <span className="a">pass</span> <span className="c">{"// see below"}</span>
          </pre>
        </div>
      </div>
      <p className="rule-line">{SITE.graduationMotto}</p>

      <CodeViewer file="graduation before/after" lang="tree" code={STAGE_1 + '\n' + STAGE_2} />

      <h2 id="boundary-test">Boundary test for shared</h2>
      <div className="decision">
        <p className="decision-q">{SITE.boundaryTest}</p>
        <div className="decision-out">
          <div className="out yes">
            <b>Pass</b>
            <span>Generic props, no domain words: Table, Callout, CopyButton, PeriodPicker.</span>
          </div>
          <div className="out no">
            <b>Fail</b>
            <span>
              Any domain term in props or markup: <code>InvoiceRow</code>, <code>AccountStatus</code>.
            </span>
          </div>
        </div>
        <ul className="verdicts">
          <li>
            <span className="tick pass">✓ pass</span> Renaming the feature does not touch the component.
          </li>
          <li>
            <span className="tick fail">✗ fail</span> The component imports from entities or features below.
          </li>
        </ul>
      </div>

      <h2 id="applied-to-this-site">The pattern applied to this site</h2>
      <div className="cards">
        <Card num="01" title="Button stayed generic">
          Used by home, roadmap and repo-cta. Passes the boundary test — no docs vocabulary
          inside — so it lives in shared/ui/atoms.
        </Card>
        <Card num="02" title="ComparisonMatrix is a feature">
          It knows method-profile entity data. Feature-owned; promotion would only happen if a
          second page needed the same matrix.
        </Card>
        <Card num="03" title="LayerStackExplorer is a feature">
          Renders fsaa-layer entity knowledge. Not generic UI — its props vocabulary is the
          stack itself.
        </Card>
        <Card num="04" title="DataTable graduated early">
          Row/column generic, zero domain words. Used by two pages plus a feature — exactly the
          case the graduation pattern was designed for.
        </Card>
      </div>

      <h2 id="no-pre-promotion">No pre-promotion</h2>
      <div className="split">
        <div className="panel good">
          <h4>Do — wait for the second consumer</h4>
          <ul>
            <li>Keep Stage 1 as long as it is convenient.</li>
            <li>Change the API freely while owned by one feature.</li>
            <li>Promote with a rename-free move + index.ts barrel.</li>
          </ul>
        </div>
        <div className="panel bad">
          <h4>Don&apos;t — guess reusability</h4>
          <ul>
            <li>“We&apos;ll probably reuse it” is not a consumer.</li>
            <li>Don&apos;t parameterize a one-consumer component.</li>
            <li>Don&apos;t hoist a domain component into shared/ui.</li>
          </ul>
        </div>
      </div>

      <Callout tone="stop" label="Anti-pattern">
        Pre-promoted UI rots twice: feature teams wrap it in props soup, shared owners hesitate
        to change a “public” contract. Graduation keeps both costs zero while there is exactly
        one consumer.
      </Callout>

      <p>
        The pattern is deliberately asymmetric: entering shared/ui is cheap but gated, leaving it
        is rare and expensive. Promote on proof, not prediction.
      </p>

      <DocsPager current="graduation" />
    </>
  );
}