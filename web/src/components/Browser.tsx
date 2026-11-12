'use client';

import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { api } from '@/lib/api';
import { emptySession, newId, reducer } from '@/lib/session';
import { Entry, Person, Via } from '@/lib/types';
import { HistoryPanel } from './HistoryPanel';
import { PublishDialog } from './PublishDialog';
import { Toolbar } from './Toolbar';
import { Viewport } from './Viewport';

const STORAGE_KEY = 'small-web';

const describe = (error: unknown) =>
  error instanceof Error ? error.message : 'Something went wrong';

export default function Browser() {
  const [people, setPeople] = useState<Person[]>([]);
  const [personId, setPersonId] = useState<string | null>(null);
  const [sessions, dispatch] = useReducer(reducer, {});
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [version, setVersion] = useState(0);
  const sequence = useRef(0);
  const scroll = useRef(0);

  const session = (personId && sessions[personId]) || emptySession;
  const current: Entry | undefined = session.entries[session.index];
  const person = people.find((candidate) => candidate.id === personId);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'hydrate', sessions: parsed.sessions ?? {} });
        setPersonId(parsed.personId ?? null);
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ personId, sessions }));
    } catch {
      return;
    }
  }, [ready, personId, sessions]);

  useEffect(() => {
    api.people().then(setPeople).catch((error) => setNotice(describe(error)));
  }, []);

  const navigate = useCallback(
    async (address: string, via: Via) => {
      if (!personId || !address.trim()) return;

      const ticket = ++sequence.current;
      setLoading(address.trim());
      setNotice(null);

      try {
        const result = await api.browse(personId, address, via);
        if (ticket !== sequence.current) return;

        const entry: Entry =
          result.status === 'found'
            ? {
                id: newId(),
                kind: 'site',
                address: result.address,
                title: result.site.title,
                html: result.site.html,
                author: result.site.author.name,
                scroll: 0,
              }
            : { id: newId(), kind: 'nowhere', address: result.address, scroll: 0 };

        dispatch({ type: 'push', person: personId, entry, scroll: scroll.current });
        setVersion((value) => value + 1);
      } catch (error) {
        if (ticket === sequence.current) setNotice(describe(error));
      } finally {
        if (ticket === sequence.current) setLoading(null);
      }
    },
    [personId],
  );

  const search = useCallback(
    async (raw: string) => {
      const query = raw.trim();
      if (!personId || !query) return;

      const ticket = ++sequence.current;
      setLoading(`“${query}”`);
      setNotice(null);

      try {
        const hits = await api.search(query);
        if (ticket !== sequence.current) return;
        dispatch({
          type: 'push',
          person: personId,
          entry: { id: newId(), kind: 'search', query, hits, scroll: 0 },
          scroll: scroll.current,
        });
      } catch (error) {
        if (ticket === sequence.current) setNotice(describe(error));
      } finally {
        if (ticket === sequence.current) setLoading(null);
      }
    },
    [personId],
  );

  const move = (delta: -1 | 1) => {
    const target = session.entries[session.index + delta];
    if (!personId || !target) return;

    sequence.current++;
    setLoading(null);
    setNotice(null);
    dispatch({ type: 'move', person: personId, delta, scroll: scroll.current });

    if (target.kind !== 'search') {
      api
        .visit(personId, target.address, delta < 0 ? 'back' : 'forward')
        .then(() => setVersion((value) => value + 1))
        .catch(() => undefined);
    }
  };

  const choosePerson = (id: string) => {
    sequence.current++;
    scroll.current = 0;
    setLoading(null);
    setNotice(null);
    setPersonId(id);
  };

  const handleScroll = useCallback((y: number) => {
    scroll.current = y;
  }, []);

  return (
    <div className="app">
      <Toolbar
        people={people}
        personId={personId}
        address={current && current.kind !== 'search' ? current.address : ''}
        query={current?.kind === 'search' ? current.query : ''}
        syncKey={current?.id ?? ''}
        canBack={session.index > 0}
        canForward={session.index < session.entries.length - 1}
        historyOpen={historyOpen}
        onPerson={choosePerson}
        onBack={() => move(-1)}
        onForward={() => move(1)}
        onGo={(address) => navigate(address, 'typed')}
        onSearch={search}
        onToggleHistory={() => setHistoryOpen((open) => !open)}
        onPublish={() => setPublishing(true)}
      />

      {loading && (
        <div className="status" role="status">
          Loading {loading}…
        </div>
      )}
      {notice && (
        <div className="status error" role="alert">
          {notice}
        </div>
      )}

      <div className="body">
        <main className="viewport">
          <Viewport
            entry={current}
            hasPerson={Boolean(personId)}
            onLink={(address) => navigate(address, 'link')}
            onOpenHit={(address) => navigate(address, 'search')}
            onScroll={handleScroll}
          />
        </main>

        {historyOpen && personId && (
          <HistoryPanel
            person={personId}
            version={version}
            onJump={(address) => navigate(address, 'history')}
            onClose={() => setHistoryOpen(false)}
          />
        )}
      </div>

      {publishing && person && (
        <PublishDialog
          author={person}
          onClose={() => setPublishing(false)}
          onPublished={(address) => {
            setPublishing(false);
            navigate(address, 'publish');
          }}
        />
      )}
    </div>
  );
}