<script setup lang="ts">
import { usePeopleService } from '@/services/people-service';
import BaseTable from '@/components/base/BaseTable.vue';
import { Person } from '@/features/Person';
import type { Column } from '@/interfaces/InputDefinition';
import PageLayout from '@/components/unique/PageLayout.vue';
import { useDate } from '@/shared/date';

const date = useDate();
const peopleService = usePeopleService();

const columns: Column<Person>[] = [
  { label: 'Name', name: 'name' },
  { label: 'Created at', name: 'created', valueTransform: (value) => date.format(value.created) },
  {
    label: 'Birth year',
    name: 'birthYear',
    valueTransform: (person) =>
      person.birthYear === 'unknown' ? undefined : `19${person.birthYear}`,
  },
  {
    label: 'Gender',
    name: 'gender',
    valueTransform: (person) => (person.gender === 'n/a' ? undefined : person.gender),
  },
];
</script>

<template>
  <PageLayout title="People">
    <BaseTable :columns="columns" :data-loader="peopleService.findAll" />
  </PageLayout>
</template>
