<script setup lang="ts">
const props = defineProps<{
  totalPages: number;
}>();

const page = defineModel({ type: Number, required: true });

const goForward = () => {
  if (page.value < props.totalPages) {
    page.value = Number(page.value) + 1;
  }
};

const goBackwards = () => {
  if (page.value > 1) {
    page.value = Number(page.value) - 1;
  }
};
</script>

<template>
  <nav class="pagination">
    <button
      :disabled="page == 1"
      aria-label="Go backwards"
      class="pagination__button"
      @click="goBackwards"
    >
      ◀
    </button>
    <span class="pagination__label" :aria-label="`Page ${page} of ${totalPages}`">
      <span>
        {{ page }}
      </span>
      /
      <span>
        {{ totalPages }}
      </span>
    </span>
    <button
      aria-label="Go forward"
      class="pagination__button"
      :disabled="page >= totalPages"
      @click="goForward"
    >
      ▶
    </button>
  </nav>
</template>

<style scoped lang="scss">
@use '@styles/queries';
@use '@styles/colors';
@use 'sass:color';

.pagination {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 0 0;

  &__button {
    background: colors.$primary;
    color: colors.$white;
    border: none;
    border-radius: 0.4rem;
    font-size: 1.3rem;
    padding: 0.23rem 0.95rem;
    cursor: pointer;
    transition: background 0.15s;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: color.scale(colors.$primary, $lightness: -10%);
    }
  }

  &__label {
    font-family: 'Orbitron', sans-serif;
    color: colors.$primary;
    font-size: 1.08rem;
    font-weight: 500;
  }
}
</style>
