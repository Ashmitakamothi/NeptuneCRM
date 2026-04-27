import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchJson } from '../api/http';
import { useAuth } from '../contexts/AuthContext';

export function useRealtimeJson(
  path,
  {
    enabled = true,
    pollIntervalMs = Number(import.meta.env.VITE_POLL_INTERVAL_MS || 5000),
    baseUrl,
    token: overrideToken,
  } = {}
) {
  const { token: authToken, userId } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled && path));

  // Dynamic path replacement for {userId}
  const dynamicPath = useMemo(() => {
    if (!path) return null;
    return path.replace(/{userId}/g, userId || '');
  }, [path, userId]);

  const effectiveToken = overrideToken || authToken;

  const key = useMemo(() => (dynamicPath ? `${baseUrl || ''}::${dynamicPath}::${effectiveToken}` : null), [baseUrl, dynamicPath, effectiveToken]);
  const lastKeyRef = useRef(key);

  useEffect(() => {
    if (!enabled || !dynamicPath) return;

    let alive = true;
    const ac = new AbortController();

    async function runOnce() {
      try {
        setLoading(true);
        setError(null);
        // Ensure we pass the token to fetchJson
        const json = await fetchJson(dynamicPath, { 
          baseUrl, 
          token: effectiveToken, 
          signal: ac.signal 
        });
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

    // reset when endpoint or token changes
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
  }, [enabled, dynamicPath, baseUrl, effectiveToken, key]);

  return { data, error, loading };
}

