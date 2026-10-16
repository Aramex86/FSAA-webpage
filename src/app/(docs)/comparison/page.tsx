import { Callout, PageHeader } from '@/shared/ui/molecules';
import { ComparisonMatrix } from '@/features/comparison-matrix';
import { DocsPager } from '@/features/docs-pager';
import { SITE, docPageMetadata } from '@/shared/config/site';
import { crumbFor } from '@/features/docs-registry';

export const metadata = docPageMetadata({
  title: 'FSAA vs FSD vs Atomic Design vs Bulletproof React',
  description:
    'Side-by-side comparison: FSAA vs Feature-Sliced Design vs Atomic Design vs Bulletproof React. Where they agree, what FSAA removes (widgets, organisms), what it adds (decision rules).',
  slug: '/comparison',
});

export default function ComparisonPage() {
  return (
    <>
      <PageHeader
        crumb={crumbFor('comparison')}
        title="FSAA vs other approaches"
        lede="FSAA borrows deliberately: layers from FSD, vocabulary from Atomic Design, pragmatism from Bulletproof React."
      />

      <Callout tone="quote" label="The hybrid answer">{SITE.hybridAnswer}</Callout>

      <div className="split">
        <div className="panel good">
          <h4>Taken from FSD</h4>
          <ul>
            <li>✅ Sliced layers with strict downward imports</li>
            <li>✅ Entities hold models and data access</li>
            <li>✅ Public API via index.ts per slice</li>
          </ul>
        </div>
        <div className="panel good">
          <h4>Taken from Atomic Design</h4>
          <ul>
            <li>✅ atoms/molecules vocabulary inside shared/ui</li>
            <li>✅ Small, composable, generic UI building blocks</li>
            <li>✅ A shared language for primitives everyone knows</li>
          </ul>
        </div>
      </div>

      <h2 id="matrix">Side by side</h2>
      <ComparisonMatrix />

      <p>
        The FSAA column is highlighted. Rows where FSAA says “no” are the interesting ones:
        the widgets layer and organisms tier are removals, not omissions.
      </p>

      <DocsPager current="comparison" />
    </>
  );
}