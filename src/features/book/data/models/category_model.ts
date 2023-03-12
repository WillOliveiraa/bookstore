import { CategoryEntity } from '../../domain/entities/category_entity';

export default class CategoryModel extends CategoryEntity {
  constructor(title: string, description?: string) {
    super(title, description);
  }
}
