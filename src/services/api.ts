export const BASE_URL = 'https://6914e0003746c71fe049e949.mockapi.io';

export async function get<T>(resource: string, params?: Record<string, string | number>): Promise<T> {
  const url = new URL(`${BASE_URL}/${resource}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error(`GET ${url} falhou: ${res.status}`);
  return res.json();
}

export async function post<T>(resource: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}/${resource}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${resource} falhou: ${res.status}`);
  return res.json();
}