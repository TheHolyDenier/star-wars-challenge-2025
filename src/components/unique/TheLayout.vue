<script setup lang="ts"></script>

<template>
  <div class="layout">
    <header class="layout__header">
      <RouterLink class="layout__link" :to="{ name: 'home' }">
        <h1 class="layout__title" aria-label="Go to main">Star wars coda</h1>
      </RouterLink>
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
  background-color: colors.$background;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;

  &__header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid colors.$primary;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    color: colors.$primary-text;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include queries.desktop {
      max-width: 80vw;
    }
  }
}
</style>
