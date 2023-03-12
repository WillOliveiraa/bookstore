export class CategoryEntity {
  #title: string;
  #description?: string;

  constructor(title: string, description?: string) {
    this.#title = title;
    this.#description = description;
  }

  get title() {
    return this.#title;
  }

  // set title(title: string) {
  //   this.#title = title;
  // }

  get description() {
    return this.#description;
  }

  // set description(description: string) {
  //   this.#description = description;
  // }
}
