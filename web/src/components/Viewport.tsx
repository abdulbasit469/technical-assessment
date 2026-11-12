'use client';

import { Entry } from '@/lib/types';
import { PageFrame } from './PageFrame';
import { SearchResults } from './SearchResults';

interface Props {
  entry: Entry | undefined;
  hasPerson: boolean;
  onLink: (address: string) => void;
  onOpenHit: (address: string) => void;
  onScroll: (y: number) => void;
}

function Message({ title, text }: { title: string; text: string }) {
  return (
    <div className="message">
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}

export function Viewport({ entry, hasPerson, onLink, onOpenHit, onScroll }: Props) {
  if (!hasPerson) {
    return <Message title="Who is browsing?" text="Pick a name from the list at the top right." />;
  }

  if (!entry) {
    return (
      <Message
        title="The Small Web"
        text="Type an address such as almanac.zz, or search for something."
      />
    );
  }

  switch (entry.kind) {
    case 'site':
      return <PageFrame key={entry.id} entry={entry} onLink={onLink} onScroll={onScroll} />;
    case 'search':
      return <SearchResults key={entry.id} entry={entry} onOpen={onOpenHit} onScroll={onScroll} />;
    case 'nowhere':
      return (
        <Message
          key={entry.id}
          title="Nowhere"
          text={`There is no site at “${entry.address}”. The address never existed, or the page is gone.`}
        />
      );
  }
}