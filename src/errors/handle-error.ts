import { get } from 'lodash';
import { useNotificationStore } from '@/stores/notification';
import { useRouter } from 'vue-router';
import type { ComponentPublicInstance } from 'vue';
import { HttpError } from '@/errors/HttpError';

export const handleError = (
  error: unknown,
  instance: ComponentPublicInstance | null,
  info: string,
) => {
  const router = useRouter();
  const notificationStore = useNotificationStore();

  console.error(error, instance, info);

  if (error instanceof HttpError) {
    if (error.status >= 400 && error.status < 600) {
      router.push({
        name: 'error',
        params: {
          status: error.status.toString(),
          message: error.message || 'Unexpected error',
        },
      });
      return;
    }
  }

  notificationStore.add(
    `An error occurred: ${get(error, 'message')}. Please try again later.`,
    'error',
  );
};
