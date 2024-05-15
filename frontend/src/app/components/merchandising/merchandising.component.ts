import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from '@auth0/auth0-angular';

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
  // createAdminMode: boolean = false;

  // Modos para los modales
  editModal: boolean = false;
  deleteModal: boolean = false;
  createModal: boolean = false;

  // Variable para almacenar el producto que se está editando
  editedProduct: Product = new Product; // Asegúrate de inicializarlo con las propiedades correctas del tipo Product

  // Mensaje para informar al admin
  infoAdmin: string = "";

  // variable para almacenar la ID del producto seleccionado para eliminar
  selectedProduct: Product | null = null;

  constructor(private http: HttpService, private router: Router, private auth: AuthService) { }
  @ViewChild('priceRangeInput') priceRangeInput!: ElementRef;

  ngOnInit(): void {
    this.getProductos();
    console.log(this.productos);
    this.auth.isAuthenticated$.subscribe((isauth) => {
      if (isauth) {
        this.http.getRole().subscribe((role) => {
          console.log(role.data);
          this.role = role.data;
        });
      } else {
        this.role = 'Basic'; // TODO cambiar a "Basic"
      }
    });
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
      this.editedProduct = { ...selectedProduct } as Product; // Clonar el producto seleccionado para evitar modificar el original directamente
      this.editModal = true;
    }
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

  /**
   *
   */
  submitEditProductForm() {
    this.http.updateProduct(this.editedProduct.id, this.editedProduct).subscribe(() => {
      this.closeEditModal();
      this.getProductos();
    });
  }

  /**
   *
   */
  submitCreateProductForm() {
    this.http.updateProduct(this.editedProduct.id, this.editedProduct).subscribe(() => {
      this.closeEditModal();
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
        // Eliminar el producto de la lista después de la eliminación exitosa
        this.productos = this.productos.filter(producto => producto.id !== this.selectedProduct!.id);
        // Restablecer la variable selectedProduct
        this.selectedProduct = null;
        // Cerrar el modal después de la eliminación
        this.deleteModal = false;
      });
    }
  }

  // CREATE PRODUCT MODAL
  closeCreateModal() {
    this.createModal = false;
  }

}
