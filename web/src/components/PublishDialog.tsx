'use client';

import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';
import { Person } from '@/lib/types';

interface Props {
  author: Person;
  onPublished: (address: string) => void;
  onClose: () => void;
}

const SAMPLE = '<h1>My page</h1>\n<p>Write something here, and link to <a href="almanac.zz">another site</a>.</p>';

export function PublishDialog({ author, onPublished, onClose }: Props) {
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [html, setHtml] = useState(SAMPLE);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const result = await api.publish({ author: author.id, address, title, html });
      onPublished(result.address);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Could not publish');
      setBusy(false);
    }
  }

  return (
    <div className="backdrop" role="dialog" aria-modal="true" aria-label="Publish a site">
      <form className="dialog" onSubmit={submit}>
        <h2>Publish a site as {author.name}</h2>

        <label>
          Address
          <input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="my-site.zz"
            spellCheck={false}
            required
          />
        </label>

        <label>
          Title
          <input value={title} onChange={(event) => setTitle(event.target.value)} required />
        </label>

        <label>
          HTML
          <textarea
            value={html}
            onChange={(event) => setHtml(event.target.value)}
            rows={10}
            spellCheck={false}
            required
          />
        </label>

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primary" disabled={busy}>
            {busy ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
}