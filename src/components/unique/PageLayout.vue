<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="page">
    <h2 class="page__title">{{ title }}</h2>
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '@styles/queries';
@use '@styles/colors';

.page {
  padding: 1rem;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @include queries.tablet {
    padding: 2rem;
  }

  &__title {
    text-align: center;
    text-transform: uppercase;
    font-size: 1.7rem;
  }
}
</style>
