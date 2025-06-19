<script setup lang="ts">
import { usePeopleService } from '@/services/people-service.ts';
import { ref } from 'vue';

const peopleService = usePeopleService();

const people = ref<People[]>();

const getPeople = async () => (people.value = await peopleService.findAll());

getPeople();
</script>

<template>
  <pre>{{ JSON.stringify(people, null, 2) }}</pre>
</template>

<style scoped lang="scss"></style>
