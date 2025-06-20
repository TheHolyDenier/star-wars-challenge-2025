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
      class="pagination__button pagination__button--backwards button--primary"
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
      class="pagination__button pagination__button--forwards button--primary"
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

  &__label {
    font-family: 'Orbitron', sans-serif;
    color: colors.$primary;
    font-size: 1.08rem;
    font-weight: 500;
  }
}
</style>
