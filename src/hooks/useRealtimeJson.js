import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchJson } from '../api/http';

export function useRealtimeJson(
  path,
  {
    enabled = true,
    pollIntervalMs = Number(import.meta.env.VITE_POLL_INTERVAL_MS || 5000),
    baseUrl,
    token,
  } = {}
) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled && path));

  const key = useMemo(() => (path ? `${baseUrl || ''}::${path}` : null), [baseUrl, path]);
  const lastKeyRef = useRef(key);

  useEffect(() => {
    if (!enabled || !path) return;

    let alive = true;
    const ac = new AbortController();

    async function runOnce() {
      try {
        setLoading(true);
        setError(null);
        const json = await fetchJson(path, { baseUrl, token, signal: ac.signal });
        if (!alive) return;
        setData(json);
      } catch (e) {
        if (!alive) return;
        if (e?.name === 'AbortError') return;
        setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    }

    // reset when endpoint changes
    if (lastKeyRef.current !== key) {
      lastKeyRef.current = key;
      setData(null);
      setError(null);
    }

    runOnce();

    return () => {
      alive = false;
      ac.abort();
    };
  }, [enabled, path, baseUrl, token, key]);

  return { data, error, loading };
}

