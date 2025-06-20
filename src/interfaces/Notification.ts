import { NotificationType } from '@/types/NotificationType';

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}
