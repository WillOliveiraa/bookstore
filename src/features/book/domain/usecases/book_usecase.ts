import { Failure } from '@/features/error/failure';

import BookEntity from '../entities/book_entity';

export default interface BookUsecase {
  fetchAllBook(): Promise<{ failure?: Failure; data?: BookEntity[] }>;
}
