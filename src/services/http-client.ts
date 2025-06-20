import { HttpError } from '@/errors/HttpError';

export async function httpClient<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    console.log('API response:', response);

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText || 'Unexpected error');
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API fetch error:', error);

    throw error;
  }
}
