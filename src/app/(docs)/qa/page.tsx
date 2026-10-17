import { Callout, PageHeader, ProofBadge } from '@/shared/ui/molecules';
import { STATUS_PILL, QA_ITEMS } from '@/features/docs-qa';
import { DocsPager } from '@/features/docs-pager';
import { crumbFor } from '@/features/docs-registry';
import { docPageMetadata } from '@/shared/config/site';
import { SITE } from '@/shared/config/site';

export const metadata = docPageMetadata({
  title: 'FSAA Q&A: hard questions, straight answers',
  description:
    'The critique round: is FSAA just FSD+Atomic glued together, one maintainer risk, NDA-shrouded production proof, graduation mechanics, Next.js App Router placement, and what adoption honestly costs.',
  slug: '/qa',
});

export default function QAPage() {
  return (
    <>
      <PageHeader
        crumb={crumbFor('qa')}
        title="Q&A — hard questions, straight answers"
        lede="The questions this methodology must survive — collected in a review session that attacked FSAA the way a skeptical tech lead would. No dodging: each answer is the position the docs and the templates actually implement."
      />

      {QA_ITEMS.map((item) => (
        <div className="qa" key={item.id}>
          <h2 id={item.id} className="qa-q">
            <span className="qa-mark">Q</span>
            {item.question}
          </h2>
          <div className="qa-a">
            {item.answer.map((block, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: block }} />
            ))}
            {item.take && (
              <Callout tone="rule" label="Short answer">
                {item.take}
              </Callout>
            )}
          </div>
        </div>
      ))}

      <ProofBadge>
        {SITE.proof.replace(
          'internal financial accounting tool',
          'internal financial accounting tool (self-demonstrating: these docs are built on FSAA)',
        )}
      </ProofBadge>

      <div className="cta">
        <em>Disagree with an answer? That is a placement question worth having publicly —</em>{' '}
        <STATUS_PILL />
      </div>

      <DocsPager current="qa" />
    </>
  );
}