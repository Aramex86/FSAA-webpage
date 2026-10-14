'use client';

import { CodeViewer } from './CodeViewer';
import type { CodeLang } from '../model/tokenize';

export type Snippet = {
  file: string;
  lang: CodeLang;
  code: string;
};

/* Molecule-ish list — renders an intro line and a stack of CodeViewer frames. */

type SnippetListProps = {
  intro?: string;
  snippets: Snippet[];
};

export function SnippetList({ intro, snippets }: SnippetListProps) {
  return (
    <div>
      {intro ? <p>{intro}</p> : null}
      {snippets.map((s) => (
        <CodeViewer key={s.file} file={s.file} lang={s.lang} code={s.code} />
      ))}
    </div>
  );
}