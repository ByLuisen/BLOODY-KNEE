export class Product {
  private _id: number;
  private _brandId: number;
  private _categoryId: number;
  private _name: string;
  private _description: string;
  private _price: number;
  private _stock: number;
  private _url_img1: string;
  private _url_img2: string;
  private _url_img3: string;
  private _quantity: number;

  constructor(
    id: number = 0,
    brandId: number = 0,
    categoryId: number = 0,
    name: string = '',
    description: string = '',
    price: number = 0,
    stock: number = 0,
    url_img1: string = '',
    url_img2: string = '',
    url_img3: string = '',
    quantity: number = 0

  ) {
    this._id = id;
    this._brandId = brandId;
    this._categoryId = categoryId;
    this._name = name;
    this._description = description;
    this._price = price;
    this._stock = stock;
    this._url_img1 = url_img1;
    this._url_img2 = url_img2;
    this._url_img3 = url_img3;
    this._quantity = quantity;
  }

  // Getters
  get id(): number {
    return this._id;
  }
  get brandId(): number {
    return this._brandId;
  }
  get categoryId(): number {
    return this._categoryId;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get price(): number {
    return this._price;
  }
  get stock(): number {
    return this._stock;
  }
  get url_img1(): string {
    return this._url_img1;
  }
  get url_img2(): string {
    return this._url_img2;
  }
  get url_img3(): string {
    return this._url_img3;
  }
  get quantity(): number {
    return this._quantity;
  }


  // Setters
  set id(id: number) {
    this._id = id;
  }
  set brandId(brandId: number) {
    this._brandId = brandId;
  }
  set categoryId(categoryId: number) {
    this._categoryId = categoryId;
  }
  set name(name: string) {
    this._name = name;
  }
  set description(description: string) {
    this._description = description;
  }
  set price(price: number) {
    this._price = price;
  }
  set stock(stock: number) {
    this._stock = stock;
  }
  set url_img1(url_img1: string) {
    this._url_img1 = url_img1;
  }
  set url_img2(url_img2: string) {
    this._url_img2 = url_img2;
  }
  set url_img3(url_img3: string) {
    this._url_img3 = url_img3;
  }
  set quantity(quantity: number) {
    this._quantity = quantity;
  }


  // Convertir objeto a JSON
  toJSON(): any {
    return {
      id: this._id,
      brandId: this._brandId,
      categoryId: this._categoryId,
      name: this._name,
      description: this._description,
      price: this._price,
      stock: this._stock,
      url_img1: this._url_img1,
      url_img2: this._url_img2,
      url_img3: this._url_img3,
    };
  }
}
