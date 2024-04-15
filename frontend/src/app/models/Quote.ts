export class Quote {
  #id: number;
  #price: number;
  #description: string;
  #advantages: string;
  #type: string;
  constructor(
    id: number = 0,
    price: number = 0,
    description: string = '',
    advantages: string = '',
    type: string = '',
  ) {
    this.#id = id;
    this.#price = price;
    this.#description = description;
    this.#advantages = advantages;
    this.#type = type;
  }

  //Getters--------------------------
  get id(): number {
    return this.#id;
  }
  get price(): number {
    return this.#price;
  }
  get description(): string {
    return this.#description;
  }
  get advantages(): string {
    return this.#advantages;
  }
  get type(): string {
    return this.#type;
  }
  //-----------------------------------

  //Setters----------------------------
  set id(id: number) {
    this.#id = id;
  }

  set price(price: number) {
    this.#price = price;
  }
  set description(description: string) {
    this.#description = description;
  }
  set advantages(advantages: string) {
    this.#advantages = advantages;
  }
  set type(type: string) {
    this.#type = type;
  }
  //-----------------------------------

  toJSON(): any {
    return {
      id: this.#id,
      price: this.#price,
      description: this.#description,
      advantages: this.#advantages,
      type: this.#type,
    };
  }
}
