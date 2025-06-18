<script setup lang="ts">
</script>

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
  width: 100vw;
  height: 100vh;
  background-color: colors.$background;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__link {
    display: block;
    text-decoration: none;
    color: colors.$title;
    font-size: 2rem;
    text-align: center;

    text-shadow:
      0 0 1px colors.$yellow,
      0 0 2px colors.$yellow,
      0 0 5px colors.$yellow;

    @include queries.tablet {
      font-size: 3.5rem;
      padding: 2rem 3rem;
    }

    @include queries.desktop {
      font-size: 4.5rem;
      padding: 3rem 4rem;
    }

    &:hover {
      color: color.scale(colors.$yellow, $lightness: -5%);
    }
  }

  &__header {
    padding: 1.5rem 2rem;
  }

  &__title {
    font-size: inherit;
  }

  &__content {
    flex-grow: 1;
    padding: 2rem;
    color: colors.$primary-text;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    overflow-y: auto;
    width: 100%;
    height:100%;

    @include queries.tablet {
      font-size: 1.125rem;
      padding: 3rem;
    }

    @include queries.desktop {
      font-size: 1.25rem;
      padding: 4rem 6rem;
      max-width: 80vw;
    }
  }
}
</style>
