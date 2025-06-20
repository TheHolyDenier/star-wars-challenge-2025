import { useBaseService } from '@/services/base-service';
import { Person } from '@/features/Person';

export const usePeopleService = () => useBaseService<Person>('people', Person);
