import { AuthorEntity } from '../../domain/entities/author_entity';

export default class AuthorModel extends AuthorEntity {
  constructor(firstName?: string, lastName?: string) {
    super(firstName, lastName);
  }
}
