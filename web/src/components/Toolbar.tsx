'use client';

import { useEffect, useState } from 'react';
import { Person } from '@/lib/types';

interface Props {
  people: Person[];
  personId: string | null;
  address: string;
  query: string;
  syncKey: string;
  canBack: boolean;
  canForward: boolean;
  historyOpen: boolean;
  onPerson: (id: string) => void;
  onBack: () => void;
  onForward: () => void;
  onGo: (address: string) => void;
  onSearch: (query: string) => void;
  onToggleHistory: () => void;
  onPublish: () => void;
}

export function Toolbar(props: Props) {
  const [address, setAddress] = useState(props.address);
  const [query, setQuery] = useState(props.query);

  useEffect(() => setAddress(props.address), [props.address, props.syncKey]);
  useEffect(() => setQuery(props.query), [props.query, props.syncKey]);

  const disabled = !props.personId;

  return (
    <header className="toolbar">
      <div className="nav">
        <button onClick={props.onBack} disabled={!props.canBack} aria-label="Back">
          ←
        </button>
        <button onClick={props.onForward} disabled={!props.canForward} aria-label="Forward">
          →
        </button>
      </div>

      <form
        className="address"
        onSubmit={(event) => {
          event.preventDefault();
          props.onGo(address);
        }}
      >
        <input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Type an address, e.g. tidepool.zz"
          aria-label="Address"
          spellCheck={false}
          disabled={disabled}
        />
      </form>

      <form
        className="search"
        onSubmit={(event) => {
          event.preventDefault();
          props.onSearch(query);
        }}
      >
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the small web"
          aria-label="Search"
          disabled={disabled}
        />
      </form>

      <button onClick={props.onToggleHistory} aria-pressed={props.historyOpen} disabled={disabled}>
        History
      </button>
      <button onClick={props.onPublish} disabled={disabled}>
        Publish
      </button>

      <select
        value={props.personId ?? ''}
        onChange={(event) => props.onPerson(event.target.value)}
        aria-label="Browsing as"
      >
        <option value="" disabled>
          Choose a person
        </option>
        {props.people.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name}
          </option>
        ))}
      </select>
    </header>
  );
}