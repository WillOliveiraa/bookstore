import { Failure } from '@/features/error/failure';

import BookRepository from '../../domain/respositories/book_repository';
import BookDatasource from '../datasources/book_datasource';
import BookModel from '../models/book_model';

export abstract class BookRepositoryImpl implements BookRepository {
  datasource: BookDatasource;

  constructor(datasource: BookDatasource) {
    this.datasource = datasource;
  }

  async fetchAllBook(): Promise<{ failure?: Failure; data?: BookModel[] }> {
    return await this.datasource.fetchAllBooks();
  }
}
