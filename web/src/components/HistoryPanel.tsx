'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { HistoryItem } from '@/lib/types';

interface Props {
  person: string;
  version: number;
  onJump: (address: string) => void;
  onClose: () => void;
}

export function HistoryPanel({ person, version, onJump, onClose }: Props) {
  const [items, setItems] = useState<HistoryItem[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const result = await api.history(person);
        if (!active) return;
        setItems(result);
        setFailed(false);
      } catch {
        if (active) setFailed(true);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [person, version]);

  return (
    <aside className="history">
      <div className="history-head">
        <h2>History</h2>
        <button onClick={onClose} aria-label="Close history">
          ×
        </button>
      </div>

      {failed && <p className="muted">Could not load history.</p>}
      {!failed && items === null && <p className="muted">Loading…</p>}
      {items?.length === 0 && <p className="muted">Nothing visited yet.</p>}

      <ul>
        {items?.map((item) => (
          <li key={item.id}>
            <button onClick={() => onJump(item.address)}>
              <span className="history-title">
                {item.status === 'found' ? item.title : 'Nowhere'}
              </span>
              <span className="history-address">{item.address}</span>
              <span className="history-meta">
                {new Date(item.at).toLocaleString()} · {item.via}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}