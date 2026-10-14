'use client';

import { cn } from '@/shared/lib/cn';
import { CopyButton } from '@/shared/ui/atoms';
import { tokenize, tokenizeTree } from '../model/tokenize';
import type { CodeLang, Token } from '../model/tokenize';

/* Presentational code frame — takes already-tokenized lines, renders spans. */

type CodeFrameProps = {
  file: string;
  lang: CodeLang;
  lines: Token[][];
  className?: string;
};

export function CodeFrame({ file, lang, lines, className }: CodeFrameProps) {
  const raw = lines.map((line) => line.map((tk) => tk.t).join('')).join('\n');
  const isTree = lang === 'tree';

  return (
    <figure className={cn('code', className)}>
      <div className="code-head">
        <span className="code-file">{file}</span>
        <span className="code-lang">{lang}</span>
        <CopyButton text={raw} label="Copy" />
      </div>
      <pre className={isTree ? 'tree' : undefined}>
        <code>
          {lines.map((line, i) => (
            <span key={i}>
              {line.map((tk, j) =>
                tk.c ? (
                  <span key={j} className={tk.c}>
                    {tk.t}
                  </span>
                ) : (
                  <span key={j}>{tk.t}</span>
                ),
              )}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

/* Container — owns tokenization, delegates rendering to CodeFrame. */

type CodeViewerProps = {
  file: string;
  lang: CodeLang;
  code: string;
  className?: string;
};

export function CodeViewer({ file, lang, code, className }: CodeViewerProps) {
  const lines = lang === 'tree' ? tokenizeTree(code) : [tokenize(code)];
  return <CodeFrame file={file} lang={lang} lines={lines} className={className} />;
}