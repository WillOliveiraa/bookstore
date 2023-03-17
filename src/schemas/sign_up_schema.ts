import { object, ref, string } from 'yup';

export function SignUpSchema(isPtLanguage: boolean = true) {
  return object().shape({
    id: string(),
    name: string().required(isPtLanguage ? 'Nome é obrigatório' : 'Name is a required field'),
    email: string()
      .email(isPtLanguage ? 'E-mail inválido' : 'Email is invalid')
      .required(isPtLanguage ? 'E-mail obrigatório' : 'Email is a required field'),
    avatarUrl: string(),
    password: string()
      .min(
        4,
        isPtLanguage
          ? 'Senha deve conter no mínimo 4 caracteres e no máximo 30'
          : 'Password must contain 4 characters'
      )
      .max(30)
      .required(isPtLanguage ? 'Senha é obrigatória' : 'Password is a required field'),
    confirmPassword: string()
      .oneOf([ref('password')], isPtLanguage ? 'Senha não são iguais' : 'Passwords must match')
      .required(
        isPtLanguage ? 'Confirmação de senha é obrigatório' : 'Confirm password is a required field'
      )
  });
}
