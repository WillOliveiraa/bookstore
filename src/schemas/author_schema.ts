import { object, string } from 'yup';

export function AuthorSchema(isPtLanguage: boolean = true) {
  return object().shape({
    id: string(),
    firstName: string()
      .trim()
      .required(isPtLanguage ? 'Primeiro nome é obrigatório' : 'First name is a required field'),
    lastName: string()
      .trim()
      .required(isPtLanguage ? 'Sobrenome é obrigatório' : 'Last name is a required field'),
    bookId: string()
  });
}
