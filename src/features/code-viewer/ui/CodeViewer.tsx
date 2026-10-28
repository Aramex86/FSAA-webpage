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
  copyText?: string;
  className?: string;
};

export function CodeFrame({ file, lang, lines, className, copyText }: CodeFrameProps) {
  const raw = copyText ?? lines.map((line) => line.map((tk) => tk.t).join('')).join('\n');
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
  /** What the Copy button copies. Used to hand the user the RUNNABLE
   *  command for terminal-output blocks (instead of the whole log). */
  copyText?: string;
  className?: string;
};

export function CodeViewer({ file, lang, code, copyText, className }: CodeViewerProps) {
  const lines = lang === 'tree' ? tokenizeTree(code) : [tokenize(code)];
  return <CodeFrame file={file} lang={lang} lines={lines} copyText={copyText} className={className} />;
}