<script setup lang="ts">
const bannerData = [
  { label: 'PLANETS', url: 'planets', image: 'planets' },
  { label: 'PEOPLE', url: 'people', image: 'people' },
]
</script>

<template>
  <nav class="navigation" aria-label="Navigation options">
    <RouterLink
      v-for="item of bannerData"
      :key="item.url"
      :to="{ name: item.url }"
      aria-label="Go to planets"
      class="navigation__link"
    >
      <div
        class="navigation__banner"
        :style="{ backgroundImage: `url(src/assets/images/${item.image}.webp)` }"
      >
        <div class="navigation__title">
          <h2>{{ item.label }}</h2>
        </div>
      </div>
    </RouterLink>
  </nav>
</template>

<style scoped lang="scss">
@use '@styles/queries';
@use '@styles/colors';

.navigation {
  width: 100vw;
  height: calc(100vh - 100px);
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @include queries.tablet {
    width: calc(100vw - 4rem);
    height: calc(100vh - 100px - 4rem);
  }

  @include queries.desktop {
    width: calc(80vw - 4rem);
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }

  &__link {
    width: 100%;
    height: 100%;

    &:nth-child(even) {
      .navigation__title {
        text-align: right;
      }
    }
  }

  &__banner {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    position: relative;

    &:hover,
    &:focus-visible {
      transform: scale(1.05);

      .navigation__title {
        display: block;
      }
    }
  }

  &__title {
    display: none;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 100%;
    transform: translateY(-50%);
    color: colors.$primary-text;
    font-size: 1.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    padding-inline: 2rem;
    border-radius: 0.5rem;
    text-transform: uppercase;
    white-space: nowrap;
    text-align: left;

    @include queries.desktop {
      font-size: 2rem;
    }
  }
}
</style>
