import { HttpError } from '@/errors/HttpError';

export async function httpClient<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data as T;
    }

    throw new HttpError(response.status, response.statusText || 'Unexpected error');
  } catch (error) {
    console.error('API fetch error:', error);

    throw error;
  }
}
