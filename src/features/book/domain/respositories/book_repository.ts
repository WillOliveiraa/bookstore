import { Failure } from '@/features/error/failure';

import BookModel from '../../data/models/book_model';

export default interface BookRepository {
  fetchAllBook(): Promise<{ failure?: Failure; data?: BookModel[] }>;
}
