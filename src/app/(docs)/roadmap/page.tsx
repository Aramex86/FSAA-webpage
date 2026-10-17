import { Button, StatusBadge } from "@/shared/ui/atoms";
import { DataTable, PageHeader, ProofBadge } from "@/shared/ui/molecules";
import type { Column } from "@/shared/ui/molecules";
import { DocsPager } from "@/features/docs-pager";
import { RepoCta } from "@/features/repo-cta";
import { SITE } from "@/shared/config/site";
import { crumbFor } from "@/features/docs-registry";
import { docPageMetadata } from "@/shared/config/site";

type Phase = {
  id: string;
  label: string;
  title: string;
  detail: string;
  status: "In progress" | "Planned" | "Done";
};

const PHASES: Phase[] = [
  {
    id: "phase-0",
    label: "Phase 0",
    title: "Methodology + docs site",
    detail:
      "Layers frozen, graduation pattern written, this site shipped as the reference.",
    status: "Done",
  },
  {
    id: "phase-1",
    label: "Phase 1",
    title: "Reference repository + indexation",
    detail:
      "Public methodology repo (fsaa) with honest README + CONTRIBUTING; docs site indexed (robots, sitemap, GSC).",
    status: "Done",
  },
  {
    id: "phase-2",
    label: "Phase 2",
    title: "Boilerplate — Next.js + Vite templates",
    detail:
      "fsaa-react repo: Next.js 15 App Router template (main) + plain-React Vite template (template/vite branch). Same layers, same ESLint-enforced boundaries, Projects/Orders example inside both.",
    status: "Done",
  },
  {
    id: "phase-3",
    label: "Phase 3",
    title: "CLI — npx fsaa init",
    detail:
      "Scaffold (npx fsaa init), slice generator (fsaa g), standalone eslint-plugin-fsaa — plus an agent skill that teaches AI coding agents where UI goes, and fsaa audit for boundary drift in existing codebases.",
    status: "In progress",
  },
  {
    id: "phase-4",
    label: "Phase 4",
    title: "Community feedback loop",
    detail: "Case studies from adopters; rules only change with evidence.",
    status: "Planned",
  },
];

type GapRow = {
  id: string;
  gap: string;
  plan: string;
};

const GAP_ROWS: GapRow[] = [
  {
    id: "templates",
    gap: "Boilerplate ships as a Git template (clone-and-rename), not an npm CLI yet.",
    plan: "Phase 3: npx fsaa init (asks next/vite) + slice generator.",
  },
  {
    id: "ssr-recipes",
    gap: "Server-components recipes for pages/entities are thin.",
    plan: "Document RSC boundaries per layer on the architecture page.",
  },
  {
    id: "tooling",
    gap: "Slice scaffolding is manual; boundaries enforced by bundled ESLint config.",
    plan: "Phase 3: slice generator + standalone eslint-plugin-fsaa.",
  },
  {
    id: "cases",
    gap: "One production case study (internal tool); more needed.",
    plan: "Phase 4: adopter case studies on this site.",
  },
];

const statusToBadge = (status: Phase["status"]) =>
  status === "In progress" || status === "Done" ? "prog" : "plan";

const gapColumns: Column<GapRow>[] = [
  { header: "Known gap", render: (row) => row.gap },
  { header: "Plan", render: (row) => row.plan },
];

export const metadata = docPageMetadata({
  title: "FSAA roadmap: boilerplate, CLI, lint checker",
  description:
    "FSAA roadmap: what lands next — starter boilerplate, CLI scaffold, lint checker for layer boundaries, and the stable v0.1 spec of the methodology.",
  slug: "/roadmap",
});

export default function RoadmapPage() {
  return (
    <>
      <PageHeader
        crumb={crumbFor("roadmap")}
        title="Roadmap and status"
        lede="FSAA is young and the docs say so. Everything below is either shipped, or explicitly planned with a phase."
      />

      <h2 id="phases">Phases</h2>
      {PHASES.map((phase) => (
        <div className="phase" key={phase.id}>
          <span className="p">{phase.label}</span>
          <div className="t">
            <b>{phase.title}</b>
            <small>{phase.detail}</small>
          </div>
          <StatusBadge status={statusToBadge(phase.status)}>
            {phase.status}
          </StatusBadge>
        </div>
      ))}

      <ProofBadge>
        {SITE.proof.replace(
          "managers, director, accounting",
          "managers, director, accounting — and the structure survived two feature teams",
        )}
      </ProofBadge>

      <h2 id="known-gaps">Known gaps</h2>
      <DataTable
        columns={gapColumns}
        data={GAP_ROWS}
        rowKey={(row) => row.id}
        caption="Honest limitations and their plans"
      />

      <h2 id="contribute">Contribute</h2>
      <p>
        The methodology docs are versioned with the site. Disagree with a rule?
        Bring a case study — rules change with evidence, not opinions.
      </p>

      <div className="cta">
        <Button variant="ghost" href="/comparison">
          Read the comparison →
        </Button>
        <RepoCta />
      </div>

      <DocsPager current="roadmap" />
    </>
  );
}
