<script setup lang="ts">
</script>

<template>
  <nav class="navigation" aria-label="Navigation options">
    <RouterLink :to="{ name: 'planets' }" aria-label="Go to planets">
      <div class="navigation__item navigation__item--planet"></div>
    </RouterLink>
    <RouterLink :to="{ name: 'people' }" aria-label="Go to people">
      <div class="navigation__item navigation__item--people"></div>
    </RouterLink>
  </nav>
</template>

<style scoped lang="scss">
@use '@styles/queries';
@use '@styles/colors';

.navigation {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  justify-content: center;
  align-items: center;

  @include queries.tablet {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }

  &__item {
    width: auto;
    height: 100%;
    aspect-ratio: 5/3;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    @include queries.tablet {
      aspect-ratio: 1;
      width: 100%;
      height: auto;
    }

    &:hover,
    &:focus-visible {
      transform: scale(1.05);
    }

    &--people {
      background-image: url('@assets/images/people.webp');
    }

    &--planet {
      background-image: url('@assets/images/planets.webp');
    }
  }
}
</style>
