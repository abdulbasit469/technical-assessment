import { Entry, Session } from './types';

export type SessionMap = Record<string, Session>;

export type Action =
  | { type: 'hydrate'; sessions: SessionMap }
  | { type: 'push'; person: string; entry: Entry; scroll: number }
  | { type: 'move'; person: string; delta: -1 | 1; scroll: number };

export const emptySession: Session = { entries: [], index: -1 };

export const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const remember = (session: Session, scroll: number): Entry[] =>
  session.entries.map((entry, i) => (i === session.index ? { ...entry, scroll } : entry));

export function reducer(state: SessionMap, action: Action): SessionMap {
  switch (action.type) {
    case 'hydrate':
      return action.sessions;

    case 'push': {
      const session = state[action.person] ?? emptySession;
      const kept = remember(session, action.scroll).slice(0, session.index + 1);
      const entries = [...kept, action.entry];
      return { ...state, [action.person]: { entries, index: entries.length - 1 } };
    }

    case 'move': {
      const session = state[action.person] ?? emptySession;
      const target = session.index + action.delta;
      if (target < 0 || target >= session.entries.length) return state;
      return {
        ...state,
        [action.person]: { entries: remember(session, action.scroll), index: target },
      };
    }
  }
}