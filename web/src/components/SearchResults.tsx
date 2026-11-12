'use client';

import { useLayoutEffect, useRef } from 'react';
import { SearchEntry } from '@/lib/types';

interface Props {
  entry: SearchEntry;
  onOpen: (address: string) => void;
  onScroll: (y: number) => void;
}

export function SearchResults({ entry, onOpen, onScroll }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (container.current) container.current.scrollTop = entry.scroll;
    onScroll(entry.scroll);
  }, []);

  return (
    <div
      className="results"
      ref={container}
      onScroll={(event) => onScroll(event.currentTarget.scrollTop)}
    >
      <h1>Results for “{entry.query}”</h1>
      {entry.hits.length === 0 && (
        <p className="muted">Nothing on the small web mentions that.</p>
      )}
      <ol>
        {entry.hits.map((hit) => (
          <li key={hit.address}>
            <button className="hit" onClick={() => onOpen(hit.address)}>
              <span className="hit-title">{hit.title}</span>
              <span className="hit-address">
                {hit.address} · {hit.author}
              </span>
              <span className="hit-snippet">{hit.snippet}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}