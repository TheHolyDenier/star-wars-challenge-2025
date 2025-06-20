import { useRouter } from 'vue-router';

export async function httpClient<T>(url: string, options?: RequestInit): Promise<T> {
  const router = useRouter();

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data as T;
    }
    if (response.status >= 400 && response.status < 600) {
      return router.push({
        name: 'error',
        params: {
          status: response.status.toString(),
          message: response.statusText || 'Unexpected error',
        },
      });

      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('API fetch error:', error);

    throw error;
  }
}
