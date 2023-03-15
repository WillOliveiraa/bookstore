import AuthorModel from './author_model';
import CategoryModel from './category_model';

export default interface BookModel {
  title: string;
  subTitle: string;
  author: AuthorModel;
  price: number;
  numPages: number;
  categories: CategoryModel;
  publishDate: Date;
  imageUrl: string;
}
