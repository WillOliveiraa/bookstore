import * as yup from 'yup';

export default interface CategoryModel {
  id?: string;
  title: string;
  description?: string;
}

export function CategorySchema(isPtLanguage: boolean = true) {
  return yup.object().shape({
    id: yup.string(),
    title: yup
      .string()
      .trim()
      .required(isPtLanguage ? 'Título obrigatório' : 'Title is a required field'),
    description: yup.string().trim(),
    bookId: yup.string()
  });
}
