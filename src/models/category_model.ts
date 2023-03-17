import { object, string } from 'yup';

export default interface CategoryModel {
  id?: string;
  title: string;
  description?: string;
}

export function CategorySchema(isPtLanguage: boolean = true) {
  return object().shape({
    id: string(),
    title: string()
      .trim()
      .required(isPtLanguage ? 'Título obrigatório' : 'Title is a required field'),
    description: string().trim(),
    bookId: string()
  });
}
