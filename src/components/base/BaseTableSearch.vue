<script setup lang="ts">
const model = defineModel({ type: String, required: false });
</script>

<template>
  <div class="search">
    <input v-model="model" class="search__input" type="text" placeholder="Search" />
  </div>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: row-reverse;
}
</style>
