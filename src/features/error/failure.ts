export abstract class Failure {
  message?: string;

  constructor(message?: string) {
    this.message = message;
  }
}
