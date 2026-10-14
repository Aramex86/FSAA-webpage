/* Feature code-viewer — regex tokenizer for the docs' inline code samples.
   Pure function, no React. Languages: tsx, ts, json, tree, text. */

export type Token = {
  t: string;
  c?: string;
};

export type CodeLang = 'tsx' | 'ts' | 'json' | 'tree' | 'text';

const KEYWORDS =
  'import|export|from|const|let|var|function|return|type|interface|extends|implements|default|as|async|await|new|if|else|for|while|typeof|readonly';

const MASTER = new RegExp(
  [
    '(?<cmtlin>\\/\\/[^\\n]*)',
    '(?<cmtblk>\\/\\*[\\s\\S]*?\\*\\/)',
    '(?<str>"(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`)',
    `(?<kw>\\b(?:${KEYWORDS})\\b)`,
    '(?<lit>\\b(?:true|false|null|undefined)\\b)',
    '(?<tag></?[A-Z][A-Za-z0-9]*|/?>)',
    '(?<num>\\b\\d+(?:\\.\\d+)?\\b)',
    '(?<att>\\b[a-z][a-zA-Z0-9]*(?==))',
    '(?<fn>\\b[A-Za-z_$][\\w$]*(?=\\())',
  ].join('|'),
  'g',
);

const CLASSES: (string | undefined)[] = [
  'c-cmt', // group 1 — line comment
  'c-cmt', // group 2 — block comment
  'c-str', // group 3 — string
  'c-kw', // group 4 — keyword
  'c-lit', // group 5 — literal
  'c-tag', // group 6 — JSX tag
  'c-num', // group 7 — number
  'c-att', // group 8 — attribute name
  'c-fn', // group 9 — function call
];

export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  MASTER.lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = MASTER.exec(code)) !== null) {
    if (m.index > last) tokens.push({ t: code.slice(last, m.index) });
    const groups = m.groups ?? {};
    // Named groups keep CLASSES aligned by insertion order above.
    const names = ['cmtlin', 'cmtblk', 'str', 'kw', 'lit', 'tag', 'num', 'att', 'fn'];
    let matched = false;
    for (let i = 0; i < names.length; i += 1) {
      if (groups[names[i]] !== undefined) {
        tokens.push({ t: m[0], c: CLASSES[i] });
        matched = true;
        break;
      }
    }
    if (!matched) tokens.push({ t: m[0] });
    last = m.index + m[0].length;
    if (m[0].length === 0) MASTER.lastIndex += 1;
  }

  if (last < code.length) tokens.push({ t: code.slice(last) });
  return tokens;
}

const TREE_GUIDES = /^(\s*(?:\||\u251c|\u2500|\u2514|\u2502|\s)*)/;

export function tokenizeTree(code: string): Token[][] {
  return code.split('\n').map((line) => {
    const guide = TREE_GUIDES.exec(line);
    const guides = guide ? guide[1] : '';
    const rest = line.slice(guides.length);

    const tokens: Token[] = [];
    if (guides) tokens.push({ t: guides, c: 'tg' });

    if (rest.trimStart().startsWith('//')) {
      tokens.push({ t: rest, c: 'tc' });
      return tokens;
    }

    const nameEnd = rest.search(/[ \t]*(?:\/\/|$)/);
    const name = nameEnd === -1 ? rest : rest.slice(0, nameEnd);
    const tail = nameEnd === -1 ? '' : rest.slice(nameEnd);

    if (name.trimEnd().endsWith('/')) tokens.push({ t: name, c: 'td' });
    else if (name.trim() === 'index.ts') tokens.push({ t: name, c: 'tk' });
    else tokens.push({ t: name, c: 'tf' });

    if (tail && tail.trimStart().startsWith('//')) tokens.push({ t: tail, c: 'tc' });
    else if (tail) tokens.push({ t: tail });

    return tokens;
  });
}