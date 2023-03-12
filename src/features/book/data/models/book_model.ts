import BookEntity from '../../domain/entities/book_entity';
import AuthorModel from './author_model';
import CategoryModel from './category_model';

export default class BookModel extends BookEntity {
  constructor(
    title: string,
    subTitle: string,
    author: AuthorModel,
    price: number,
    numPages: number,
    categories: CategoryModel,
    publishDate: Date,
    imageUrl: string
  ) {
    super(title, subTitle, author, price, numPages, categories, publishDate, imageUrl);
  }
}
