import { Failure } from '@/features/error/failure';

import BookModel from '../models/book_model';

export default interface BookDatasource {
  fetchAllBooks(): Promise<{ failure?: Failure; data?: BookModel[] }>;
}
