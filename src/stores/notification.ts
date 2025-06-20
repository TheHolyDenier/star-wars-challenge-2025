import { defineStore } from 'pinia';
import type { Notification } from '@/interfaces/Notification';
import type { NotificationType } from '@/types/NotificationType';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([]);

  const add = (message: string, type: NotificationType) => {
    const id = Date.now();
    notifications.value.push({
      id: id,
      message,
      type,
    });
    setTimeout(() => remove(id), 5000);
  };

  const remove = (id: number) => {
    notifications.value = notifications.value.filter((notification) => notification.id !== id);
  };

  return { add, notifications, remove };
});
