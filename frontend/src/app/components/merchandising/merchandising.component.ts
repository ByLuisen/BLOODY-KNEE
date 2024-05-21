import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from '@auth0/auth0-angular';
import { Brand } from 'src/app/models/Brand';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-merchandising',
  templateUrl: './merchandising.component.html',
  styleUrls: ['./merchandising.component.css'],
})
export class MerchandisingComponent implements OnInit {
  // Array para almacenar todos los productos
  productos: Product[] = [];
  // Boolean para controlar los filtros de stock
  mostrarEnStock: boolean = false;
  mostrarFueraDeStock: boolean = false;
  // Variable para almacenar el precio máximo seleccionado
  precioMaximo: number = 150;
  loading: boolean = false;
  // Variable para simular el role del usuario
  role!: string;
  // Modos para los admins
  editAdminMode: boolean = false;
  deleteAdminMode: boolean = false;
  // Modos para los modales
  editModal: boolean = false;
  deleteModal: boolean = false;
  createModal: boolean = true;
  // Variable para almacenar el producto que se está editando
  editedProduct: Product = new Product; // Asegúrate de inicializarlo con las propiedades correctas del tipo Product
  // Variable para almacenar el producto a añadir
  newProduct: Product = new Product;
  // Mensaje para informar al admin
  infoAdmin: string = "";
  // variable para almacenar la ID del producto seleccionado para eliminar
  selectedProduct: Product | null = null;
  // Almacena las marcas
  brands: Brand[] = [];
  // Almacena las categorias
  categories: Category[] = [];
  // Formulario de creación del producto
  creationForm!: FormGroup;

  constructor(private http: HttpService, private router: Router, private auth: AuthService) { }
  @ViewChild('priceRangeInput') priceRangeInput!: ElementRef;

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isauth) => {
      if (isauth) {
        this.http.getRole().subscribe((role) => {
          console.log(role.data);
          this.role = role.data;
        });
      } else {
        this.role = 'admin'; // TODO cambiar a "Basic"
      }
    });

    this.getProductos();
    this.getBrands();
    this.getCategories();
    console.log("Nuevo producto" + this.newProduct.toJSON);
    this.creationForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s]*$/)
      ]),
      brandId: new FormControl('', [
        Validators.required,
      ]),
      categoryId: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s]*$/)
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?:[5-9]|[1-9][0-9]|1[0-9]{2}|200)$/)
      ]),
      url1: new FormControl('', [
        Validators.required,
      ]),
      url2: new FormControl('', [
        Validators.required,
      ]),
      url3: new FormControl('', [
        Validators.required,
      ]),
      stock: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9\s]*$/)
      ])
    })
  }
  /**
   *
   */
  getBrands(): void {
    this.http.getBrands().subscribe(
      (brands) => {
        this.brands = brands;
        console.log(brands)
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    );
  }
  /**
   *
   */
  getCategories(): void {
    this.http.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        console.log(categories)
      },
      (error) => {
        console.error('Error al obtener las categorias:', error);
      }
    );
  }

  getProductos(): void {
    this.loading = true;
    this.http
      .getProducts()
      .pipe(
        switchMap((products) => {
          this.productos = products;
          // Calcular precio mínimo y máximo
          const precios = this.productos.map((producto) => producto.price);
          const precioMinimo = Math.min(...precios);
          const precioMaximo = Math.max(...precios);

          // Establecer los valores iniciales del rango de precios
          this.priceRangeInput.nativeElement.min = precioMinimo;
          this.priceRangeInput.nativeElement.max = precioMaximo;

          // Asignar el valor inicial del rango de precios
          this.precioMaximo = precioMaximo;
          return of(products);
        }),
        finalize(() => (this.loading = false)),
        catchError((error) => {
          console.error('Error al obtener los productos:', error);
          return of([]);
        })
      )
      .subscribe();
  }

  /**
   *
   */
  onPriceChange() {
    this.precioMaximo = parseInt(this.priceRangeInput.nativeElement.value);
  }

  // Metodos para filtrar los productos
  contarProductosEnStock(): number {
    return this.productos.filter((producto) => producto.stock > 0).length;
  }

  /**
   *
   * @returns
   */
  contarProductosFueraDeStock(): number {
    return this.productos.filter((producto) => producto.stock === 0).length;
  }

  /**
   *
   * @returns
   */
  productosFiltrados(): Product[] {
    let productosFiltrados: Product[] = [];

    // Si ninguna opción está seleccionada, mostrar todos los productos
    if (!this.mostrarEnStock && !this.mostrarFueraDeStock) {
      productosFiltrados = this.productos;
    } else {
      if (this.mostrarEnStock && this.mostrarFueraDeStock) {
        productosFiltrados = this.productos;
      } else if (this.mostrarEnStock) {
        productosFiltrados = this.productos.filter(
          (producto) => producto.stock > 0
        );
      } else if (this.mostrarFueraDeStock) {
        productosFiltrados = this.productos.filter(
          (producto) => producto.stock === 0
        );
      }
    }
    // Filtrar por rango de precio
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.price <= this.precioMaximo
    );

    return productosFiltrados;
  }
  /**
   *
   * @param product
   */
  verDetallesProducto(product: Product) {
    if (this.editAdminMode) {
      this.openEditModal(product.id);
    } else if (this.deleteAdminMode) {
      this.openDeleteModal(product);
    } else {
      this.router.navigate(['/product', product.id]);
    }
  }


  // Método para manejar el clic en el botón de editar producto
  editProduct(): void {
    if (!this.editAdminMode) {
      this.editAdminMode = true;
      this.infoAdmin = "SELECCIONA EL PRODUCTO A EDITAR";
    } else {
      this.editAdminMode = false;
      this.infoAdmin = "";
    }
    console.log("editAdminMode=" + this.editAdminMode);
  }

  // Método para manejar el clic en el botón de agregar producto
  addProduct(): void {
    if (!this.createModal) {
      this.createModal = true;
    } else {
      this.createModal = false;
    }
    console.log("createAdminMode=" + this.createModal);
  }

  // Método para manejar el clic en el botón de eliminar producto
  deleteProduct(): void {
    if (!this.deleteAdminMode) {
      this.deleteAdminMode = true;
      this.infoAdmin = "SELECCIONA EL PRODUCTO A ELIMINAR";
    } else {
      this.deleteAdminMode = false;
      this.infoAdmin = "";
    }
    console.log("deleteAdminMode=" + this.deleteAdminMode);
  }

  /**
   * Abre un formulario en modal para editar los datos del producto
   *
   * @param productId
   */
  openEditModal(productId: number) {
    const selectedProduct = this.productos.find(producto => producto.id === productId);
    if (selectedProduct) {
      this.editedProduct = { ...selectedProduct } as Product;
      this.getBrands();
      this.getCategories();
      this.editModal = true;
    }
  }
  // Método para obtener el nombre de la marca del producto
  getBrandNameById(brandId: number): string {
    const brand = this.brands.find(brand => brand.id === brandId);
    return brand ? brand.name : ''; // Devolver el nombre de la marca si se encuentra, de lo contrario, cadena vacía
  }

  /**
   * Cierra el modal con el formulario para editar producto
   *
   */
  closeEditModal() {
    // Limpia el producto editado y cierra el modal
    this.editedProduct = new Product();
    this.editModal = false;
  }

  // Método en el componente Angular para actualizar el producto
  submitEditProductForm() {
    this.http.updateProduct(this.editedProduct.id, this.editedProduct).subscribe(
      response => {
        // Manejo de la respuesta
        console.log('Producto actualizado correctamente', response);
        this.closeEditModal();
      },
      error => {
        // Manejo del error
        console.error('Error al actualizar el producto', error);
      }
    );
  }


  /**
   *
   */
  submitCreateProductForm() {
    if (this.creationForm.valid) {
      this.newProduct.name = this.creationForm.value.name;
      this.newProduct.brandId = this.creationForm.value.brandId;
      this.newProduct.description = this.creationForm.value.description;
      this.newProduct.price = this.creationForm.value.price;
      this.newProduct.url_img1 = this.creationForm.value.url1;
      this.newProduct.url_img2 = this.creationForm.value.url2;
      this.newProduct.url_img3 = this.creationForm.value.url3;
      this.newProduct.stock = this.creationForm.value.stock;
    }
    this.http.addProduct(this.newProduct).subscribe(() => {
      this.creationForm.reset();
      this.closeCreateModal();
      this.getProductos();
    });
  }


  /**
   * Busca el producto que se seleccione por ID para mostrar el modal
   *
   * @param productId
   */
  openDeleteModal(product: Product) {
    this.selectedProduct = product;
    this.deleteModal = true;
  }

  /**
   * Cancela
   */
  cancelDelete() {
    this.selectedProduct = null;
    this.deleteModal = false;
  }

  confirmDelete() {
    if (this.selectedProduct !== null) {
      this.http.deleteProduct(this.selectedProduct.id).subscribe(() => {
        this.productos = this.productos.filter(producto => producto.id !== this.selectedProduct!.id);
        this.selectedProduct = null;
        this.deleteModal = false;
      });
    }
  }

  // CREATE PRODUCT MODAL
  closeCreateModal() {
    this.createModal = false;
  }

}
