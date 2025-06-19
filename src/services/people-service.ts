import { useBaseService } from '@/services/base-service.ts';
import { Person } from '@/features/Person';

export const usePeopleService = () => useBaseService('people', Person);
