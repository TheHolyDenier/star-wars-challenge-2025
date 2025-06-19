import { useBaseService } from '@/services/base-service.ts';
import { Planet } from '@/features/Planet';

export const usePlanetService = () => useBaseService<Planet>('planets', Planet);
