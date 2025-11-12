export const BASE_URL = 'https://6914e0003746c71fe049e949.mockapi.io';

function buildUrl(resource: string, params?: Record<string, string | number>): string {
  const cleanResource = resource.replace(/^\/+/, '');
  let url = `${BASE_URL}/${cleanResource}`;
  if (params && Object.keys(params).length) {
    const qs = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join('&');
    url += `?${qs}`;
  }
  return url;
}

export async function get<T>(resource: string, params?: Record<string, string | number>): Promise<T> {
  const url = buildUrl(resource, params);
  const res = await fetch(url, {
    // cache option is web-only; RN ignores it safely
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`GET ${url} falhou: ${res.status}`);
  return res.json();
}

export async function post<T>(resource: string, body: unknown): Promise<T> {
  const url = buildUrl(resource);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${url} falhou: ${res.status}`);
  return res.json();
}