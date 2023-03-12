import { Failure } from '@/features/error/failure';

import BookEntity from '../entities/book_entity';
import BookRepository from '../respositories/book_repository';
import BookUsecase from './book_usecase';

export abstract class BookUsecaseImpl implements BookUsecase {
  repository: BookRepository;

  constructor(repository: BookRepository) {
    this.repository = repository;
  }

  async fetchAllBook(): Promise<{ failure?: Failure; data?: BookEntity[] }> {
    return await this.repository.fetchAllBook();
  }
}
