'use client';

import { SyntheticEvent, useMemo, useRef } from 'react';
import { SiteEntry } from '@/lib/types';

const POLICY = "default-src 'none'; style-src 'unsafe-inline'";

const BASE_STYLE =
  'body{margin:0;padding:32px 28px 64px;max-width:44rem;font:17px/1.65 Georgia,serif;color:#1d2630;background:#fff}a{color:#1a5fb4}h1,h2,h3{line-height:1.2}';

const buildDocument = (html: string) =>
  `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${POLICY}"><style>${BASE_STYLE}</style></head><body>${html}</body></html>`;

interface Props {
  entry: SiteEntry;
  onLink: (address: string) => void;
  onScroll: (y: number) => void;
}

export function PageFrame({ entry, onLink, onScroll }: Props) {
  const document = useMemo(() => buildDocument(entry.html), [entry.html]);
  const linkRef = useRef(onLink);
  const scrollRef = useRef(onScroll);
  linkRef.current = onLink;
  scrollRef.current = onScroll;

  const attach = (event: SyntheticEvent<HTMLIFrameElement>) => {
    const frame = event.currentTarget;
    const doc = frame.contentDocument;
    const win = frame.contentWindow;
    if (!doc || !win) return;

    win.scrollTo(0, entry.scroll);
    scrollRef.current(entry.scroll);
    win.addEventListener('scroll', () => scrollRef.current(win.scrollY), { passive: true });

    doc.addEventListener('click', (click) => {
      const anchor = (click.target as Element).closest('a');
      if (!anchor) return;
      click.preventDefault();
      const href = anchor.getAttribute('href');
      if (href) linkRef.current(href);
    });
  };

  return (
    <iframe
      className="frame"
      title={entry.title}
      srcDoc={document}
      sandbox="allow-same-origin"
      onLoad={attach}
    />
  );
}