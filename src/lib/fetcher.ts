import { API_URL } from '@/config/app';

export const fetcher = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) => {
  const controller = new AbortController();
  try {
    const res = await fetch(`${API_URL}${input}`, {
      headers: {
        'Content-type': 'application/json',
        ...init?.headers,
      },
      ...init,
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.code };
    }
    return await res.json();
  } catch (error) {
    return { error };
  } finally {
    controller.abort();
  }
};
