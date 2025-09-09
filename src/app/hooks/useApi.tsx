const API_BASE = "http://api.shsoftware.com.ar:4001";

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) throw await res.json();
  return res.json();
}
