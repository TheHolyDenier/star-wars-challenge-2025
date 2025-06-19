<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const navigationItems = [
  { label: 'Planets', url: 'planets' },
  { label: 'People', url: 'people' },
];
</script>

<template>
  <div class="layout">
    <header class="layout__header">
      <RouterLink class="layout__link" :to="{ name: 'home' }">
        <h1 class="layout__title" aria-label="Go to main">Star wars coda</h1>
      </RouterLink>
      <div v-if="route.name !== 'home'" class="layout__nav">
        <RouterLink
          v-for="item of navigationItems"
          :key="item.url"
          class="layout__nav-link"
          :to="{ name: item.url }"
          active-class="layout__nav-link--active"
        >
          {{ item.url }}
        </RouterLink>
      </div>
    </header>
    <main class="layout__content">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
@use '@styles/colors';
@use '@styles/queries';
@use 'sass:color';

.layout {
  max-width: 100vw;
  min-height: 100vh;
  background-color: colors.$black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;

  &__header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid colors.$primary;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 1rem;
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
  }

  &__nav-link {
    text-decoration: none;
    color: colors.$white;
    font-family: 'Orbitron', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    transition:
      color 0.3s ease,
      background-color 0.3s ease;

    &:hover {
      background-color: color.scale(colors.$primary, $lightness: 90%);
      color: colors.$primary;
    }

    &--active {
      background-color: colors.$primary;
      color: colors.$white;
      font-weight: bold;
    }
  }

  &__link {
    display: block;
    text-decoration: none;
    color: colors.$primary;
    font-size: 2rem;
    text-align: center;
    width: auto;

    &:hover {
      color: color.scale(colors.$primary, $lightness: -5%);
    }
  }

  &__title {
    font-size: inherit;
  }

  &__content {
    flex-grow: 1;
    color: colors.$white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-block-end: 60px;

    @include queries.desktop {
      max-width: 80vw;
    }
  }
}
</style>
