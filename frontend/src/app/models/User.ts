export class User {
  #id: number;
  #provinceId: number | null;
  #fullName: string | null;
  #picture: string;
  #nickname: string;
  #email: string;
  #connection: string;
  #postalCode: string | null;
  #address: string | null;
  #phone: string | null;
  #createdAt: Date;
  #updatedAt: Date;

  constructor(
    id: number = 0,
    provinceId: number | null = null,
    fullName: string | null = null,
    picture: string = '',
    nickname: string = '',
    email: string = '',
    connection: string = '',
    postalCode: string | null = null,
    address: string | null = null,
    phone: string | null = null,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.#id = id;
    this.#provinceId = provinceId;
    this.#fullName = fullName;
    this.#picture = picture;
    this.#nickname = nickname;
    this.#email = email;
    this.#connection = connection;
    this.#postalCode = postalCode;
    this.#address = address;
    this.#phone = phone;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  // Getters
  get id(): number {
    return this.#id;
  }
  get provinceId(): number | null {
    return this.#provinceId;
  }
  get fullName(): string | null {
    return this.#fullName;
  }
  get picture(): string {
    return this.#picture;
  }
  get nickname(): string {
    return this.#nickname;
  }
  get email(): string {
    return this.#email;
  }
  get connection(): string {
    return this.#connection;
  }
  get postalCode(): string | null {
    return this.#postalCode;
  }
  get address(): string | null {
    return this.#address;
  }
  get phone(): string | null {
    return this.#phone;
  }
  get createdAt(): Date {
    return this.#createdAt;
  }
  get updatedAt(): Date {
    return this.#updatedAt;
  }

  // Convertir objeto a JSON
  toJSON(): any {
    return {
      id: this.#id,
      provinceId: this.#provinceId,
      fullName: this.#fullName,
      picture: this.#picture,
      nickname: this.#nickname,
      email: this.#email,
      connection: this.#connection,
      postalCode: this.#postalCode,
      address: this.#address,
      phone: this.#phone,
      createdAt: this.#createdAt.toISOString(), // Convertir fecha a formato ISO
      updatedAt: this.#updatedAt.toISOString(), // Convertir fecha a formato ISO
    };
  }
}
