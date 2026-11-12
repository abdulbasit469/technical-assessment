import { BrowseResult, HistoryItem, Person, SearchHit, Via } from './types';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    ...init,
    headers: init.body ? { 'Content-Type': 'application/json' } : undefined,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = Array.isArray(body?.message) ? body.message.join(', ') : body?.message;
    throw new Error(message ?? `Request failed (${response.status})`);
  }

  return response.status === 204 ? (undefined as T) : response.json();
}

const post = (body: unknown): RequestInit => ({ method: 'POST', body: JSON.stringify(body) });

export const api = {
  people: () => request<Person[]>('/people'),
  browse: (person: string, address: string, via: Via) =>
    request<BrowseResult>('/browse', post({ person, address, via })),
  visit: (person: string, address: string, via: Via) =>
    request<void>('/visits', post({ person, address, via })),
  history: (person: string) =>
    request<HistoryItem[]>(`/history?person=${encodeURIComponent(person)}`),
  search: (query: string) => request<SearchHit[]>(`/search?q=${encodeURIComponent(query)}`),
  publish: (input: { author: string; address: string; title: string; html: string }) =>
    request<{ address: string }>('/sites', post(input)),
};