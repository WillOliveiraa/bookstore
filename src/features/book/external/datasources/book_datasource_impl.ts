import { AxiosError } from 'axios';

import { Failure } from '@/features/error/failure';
import { api } from '@/lib/axios';

import BookDatasource from '../../data/datasources/book_datasource';
import BookModel from '../../data/models/book_model';
import { BookError } from '../../error/book_error';

export default abstract class BookDatasourceImpl implements BookDatasource {
  // booksArray: BookModel[] = [
  //   new BookModel(
  //     'Biblia Sagrada',
  //     'O transformador de vidas',
  //     new AuthorModel('Profetas', 'Apostolos'),
  //     35.99,
  //     1600,
  //     new CategoryModel('Religiosos'),
  //     new Date(),
  //     'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
  //   ),
  //   new BookModel(
  //     'O Poder do Agora',
  //     'Guia Espiritual',
  //     new AuthorModel('Ekihard', 'Tolle'),
  //     22.99,
  //     300,
  //     new CategoryModel('Religiosos'),
  //     new Date(),
  //     'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
  //   )
  // ];

  async fetchAllBooks(): Promise<{ failure?: Failure; data?: BookModel[] }> {
    try {
      const response = await api.get<BookModel[]>('/book');

      return { data: response.data };
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        console.log(err.response.data.message);
        return { failure: new BookError(err.response.data.message) };
      }
      return { failure: new BookError('Error in fetch all books') };
    }
  }
}
