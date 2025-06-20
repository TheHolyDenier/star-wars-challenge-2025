<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification';
import { storeToRefs } from 'pinia';

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);
</script>

<template>
  <div class="notifications">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="`notifications__item--${notification.type}`"
      class="notifications__item"
      role="alert"
    >
      {{ notification.message }}

      <button
        aria-label="Close notification"
        class="button--transparent"
        @click="notificationStore.remove(notification.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@styles/colors';

.notifications {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;

  &__item {
    display: flex;
    gap: 1rem;
    align-items: center;
    background: colors.$success;
    color: colors.$white;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;

    &--error {
      background: colors.$error;
    }
  }
}
</style>
