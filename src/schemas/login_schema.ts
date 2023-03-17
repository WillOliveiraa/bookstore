import { object, string } from 'yup';

export function LoginSchema(isPtLanguage: boolean = true) {
  return object().shape({
    email: string()
      .email(isPtLanguage ? 'E-mail inválido' : 'Email is invalid')
      .required(isPtLanguage ? 'E-mail obrigatório' : 'Email is a required field'),
    password: string().required(
      isPtLanguage ? 'Senha é obrigatória' : 'Password is a required field'
    )
  });
}
