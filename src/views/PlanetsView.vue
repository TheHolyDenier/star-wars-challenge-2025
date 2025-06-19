<script setup lang="ts">
import BaseTable from '@/components/base/BaseTable.vue';
import type { Column } from '@/interfaces/InputDefinition';
import PageLayout from '@/components/unique/PageLayout.vue';
import { useDate } from '@/shared/date';
import { usePlanetService } from '@/services/planet-service';
import { Planet } from '@/features/Planet';

const date = useDate();
const planetService = usePlanetService();

const columns: Column<Planet>[] = [
  { label: 'Name', name: 'name' },
  { label: 'Created at', name: 'created', valueTransform: (value) => date.format(value.created) },
  { label: 'Climate', name: 'climate' },
  { label: 'Terrain', name: 'terrain' },
];
</script>

<template>
  <PageLayout title="Planets">
    <BaseTable :columns="columns" :data-loader="planetService.findAll" />
  </PageLayout>
</template>
