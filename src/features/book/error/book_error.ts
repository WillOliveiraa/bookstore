import { Failure } from '@/features/error/failure';

export class BookError extends Failure {
  constructor(message?: string) {
    super(message);
  }
}
