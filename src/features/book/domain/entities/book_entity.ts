import { AuthorEntity } from './author_entity';
import { CategoryEntity } from './category_entity';

export default class BookEntity {
  #title: string;
  #subTitle: string;
  #author: AuthorEntity;
  #price: number;
  #numPages: number;
  #categories: CategoryEntity;
  #publishDate: Date;
  #imageUrl: string;

  constructor(
    title: string,
    subTitle: string,
    author: AuthorEntity,
    price: number,
    numPages: number,
    categories: CategoryEntity,
    publishDate: Date,
    imageUrl: string
  ) {
    this.#title = title;
    this.#subTitle = subTitle;
    this.#author = author;
    this.#price = price;
    this.#numPages = numPages;
    this.#categories = categories;
    this.#publishDate = publishDate;
    this.#imageUrl = imageUrl;
  }
}
