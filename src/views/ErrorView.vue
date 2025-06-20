<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const status = route.params.status || 'Error';
const message = route.params.message || 'Something went wrong.';
</script>

<template>
  <main class="error">
    <h1 class="error__title">{{ status }}</h1>
    <p class="error__message">{{ message }}</p>
    <RouterLink :to="{ name: 'home' }">
      <button class="button--primary" aria-label="Go to homepage">Go to Home</button>
    </RouterLink>
  </main>
</template>

<style scoped lang="scss">
@use '@styles/colors';
@use 'sass:color';

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  gap: 1rem;

  &__title {
    font-size: 6rem;
    color: colors.$primary;
    font-family: 'Orbitron', sans-serif;
  }

  &__message {
    font-size: 1.5rem;
    max-width: 600px;
  }
}
</style>
