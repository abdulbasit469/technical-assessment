export type Via = 'typed' | 'link' | 'back' | 'forward' | 'history' | 'search' | 'publish';

export interface Person {
  id: string;
  name: string;
}

export interface SearchHit {
  address: string;
  title: string;
  author: string;
  snippet: string;
}

export interface HistoryItem {
  id: string;
  address: string;
  title: string | null;
  status: 'found' | 'nowhere';
  via: Via;
  at: string;
}

export type BrowseResult =
  | {
      status: 'found';
      address: string;
      site: { address: string; title: string; html: string; author: Person };
    }
  | { status: 'nowhere'; address: string };

export interface SiteEntry {
  id: string;
  kind: 'site';
  address: string;
  title: string;
  html: string;
  author: string;
  scroll: number;
}

export interface NowhereEntry {
  id: string;
  kind: 'nowhere';
  address: string;
  scroll: number;
}

export interface SearchEntry {
  id: string;
  kind: 'search';
  query: string;
  hits: SearchHit[];
  scroll: number;
}

export type Entry = SiteEntry | NowhereEntry | SearchEntry;

export interface Session {
  entries: Entry[];
  index: number;
}