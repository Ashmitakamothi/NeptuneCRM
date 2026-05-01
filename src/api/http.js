const DEFAULT_TIMEOUT_MS = 15000;

function joinUrl(base, path) {
  if (!base) return path;
  if (!path) return base;
  // If path is already absolute or starts with a proxy prefix, don't prepend base
  if (path.startsWith('http') || path.startsWith('/mt5-api')) {
    return path;
  }
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

export async function fetchJson(path, { baseUrl, token, signal, timeoutMs } = {}) {
  const url = joinUrl(baseUrl ?? import.meta.env.VITE_API_BASE_URL, path);
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs ?? DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(token || import.meta.env.VITE_API_TOKEN
          ? { Authorization: `Bearer ${token || import.meta.env.VITE_API_TOKEN}` }
          : {}),
      },
      signal: signal ?? controller.signal,
      credentials: 'include',
    });

    if (!res.ok) {
      console.error(`[fetchJson] Error ${res.status} for ${url}`);
      if (res.status === 401) {
        // Clear auth data and reload to force login redirect
        localStorage.removeItem('neptune_token');
        localStorage.removeItem('neptune_user_id');
        window.location.reload();
      }
      const text = await res.text().catch(() => '');
      const err = new Error(`HTTP ${res.status} for ${url}${text ? `: ${text}` : ''}`);
      err.status = res.status;
      throw err;
    }

    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

