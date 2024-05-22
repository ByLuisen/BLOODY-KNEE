import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartOpen = false; // Flag to control cart visibility
  products: Product[] = []; // Array to hold cart products
  cart!: any[]; // Array to hold cart items
  loading: boolean = false; // Flag to indicate loading state
  updated: boolean = false;

  constructor(
    private auth: AuthService, // Instance of AuthService
    private http: HttpService, // Instance of HttpService
    private cookie: CookieService, // Instance of CookieService
    private router: Router, // Instance of Router
    @Inject(DOCUMENT) public document: Document
  ) {}

  // Function to toggle cart visibility
  toggleCart() {
    // Check if user is authenticated
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // Perform actions if user is authenticated
        this.getProductsFromBBDD();
      } else {
        // Retrieve products from cookie if user is not authenticated
        this.getProductsFromACookie();
      }
    });
    // Toggle cart visibility
    this.cartOpen = !this.cartOpen;
  }

  // Function to retrieve products from a cookie
  getProductsFromACookie(): void {
    // Verify if the cart cookie exists
    if (this.cookie.check('cart')) {
      this.loading = true; // Set loading flag to true
      // Parse the cart cookie value
      this.cart = JSON.parse(this.cookie.get('cart'));
      // Obtener solo los IDs de los productos
      const ids = this.cart.map((product: any) => product.id);
      this.http
        .getProductsById(ids)
        .pipe(
          switchMap((products: Product[]) => {
            // Actualizar la cantidad de los productos y eliminar los que tienen stock 0 de la cookie
            const updatedProducts = products
              .map((product) => {
                const cartItem = this.cart.find(
                  (cart) => cart.id === product.id
                );
                if (cartItem) {
                  product.quantity = cartItem.quantity;
                  if (product.quantity > product.stock) {
                    cartItem.quantity = product.stock;
                    product.quantity = product.stock;
                    this.updated = true;
                    setTimeout(() => {
                      this.updated = false;
                    }, 10000);
                  }
                  product.added_date = cartItem.added_date;

                  // Eliminar el producto de la cookie si el stock es igual a cero
                  if (product.stock === 0) {
                    const cartIndex = this.cart.findIndex(
                      (p) => p.id === product.id
                    );
                    if (cartIndex !== -1) {
                      this.cart.splice(cartIndex, 1); // Eliminar el producto de la cookie
                    }
                    return null; // No incluir este producto en el array
                  }
                }
                return product;
              })
              .filter((product): product is Product => product !== null); // Filtrar los productos con stock 0

            // Ordenar los productos por fecha de forma descendente (más reciente primero)
            this.products = updatedProducts.sort((a, b) => {
              return (
                new Date(b.added_date).getTime() -
                new Date(a.added_date).getTime()
              );
            });

            // Si no hay productos, eliminar la cookie
            if (this.products.length === 0) {
              this.cookie.delete('cart', '/');
            } else {
              // Actualizar la cantidad en la cookie
              this.cookie.set('cart', JSON.stringify(this.cart), 365, '/');
            }

            return of(this.products);
          }),
          catchError((error) => {
            console.error('Error al obtener los productos:', error);
            return of([]); // Devolver un observable vacío o un valor por defecto
          }),
          finalize(() => {
            this.loading = false; // Set loading flag to false after completion
          })
        )
        .subscribe();
    }
  }

  getProductsFromBBDD(): void {
    this.loading = true;
    this.http
      .getCartFromDDBB()
      .pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          console.log('Productos obtenidos:', this.products);
          return of((this.loading = false));
        })
      )
      .subscribe();
  }

  /**
   * Function to delete a product from the cart
   * @param index
   */
  deleteProduct(productId: number): void {
    this.auth.isAuthenticated$.subscribe((logged) => {
      const productIndex = this.products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex !== -1) {
        if (logged) {
          this.http
            .deleteProductCart(this.products[productIndex].id)
            .subscribe();
        }

        // Eliminar el producto del array products
        this.products.splice(productIndex, 1);

        // Eliminar el producto del array cart
        const cartIndex = this.cart.findIndex(
          (cartItem) => cartItem.id === productId
        );

        if (cartIndex !== -1) {
          this.cart.splice(cartIndex, 1);
        }

        // Verificar si todavía hay productos en el carrito
        if (this.cart.length === 0) {
          // Si no hay productos en el carrito, eliminar la cookie
          this.cookie.delete('cart', '/');
        } else {
          // Si todavía hay productos en el carrito, actualizar la cookie
          this.cookie.set('cart', JSON.stringify(this.cart), 365, '/');
        }
      }
    });
  }
  /**
   * Function to calculate the total number of products in the cart
   * @returns
   */
  calculateTotalProducts(): number {
    let total: number = 0;
    this.auth.isAuthenticated$.subscribe((logged) => {
      if (logged) {
        // Usamos el método reduce para sumar todas las cantidades de los productos en el carrito
        total = this.products.reduce(
          (total, product) => total + product.quantity,
          0
        );
      } else {
        // Usamos el método reduce para sumar todas las cantidades de los productos en el carrito
        total = this.cart.reduce(
          (total, product) => total + product.quantity,
          0
        );
      }
    });
    return total;
  }

  /**
   * Function to calculate the total amount of the cart
   * @returns
   */
  calculateTotalAmount(): number {
    let total: number = 0;
    this.auth.isAuthenticated$.subscribe((logged) => {
      if (logged) {
        // Si el usuario está autenticado, calcular el precio total utilizando this.products
        total = this.products
          .map((product) => product.price * product.quantity)
          .reduce((total, current) => total + current, 0);
      } else {
        // Si el usuario no está autenticado, calcular el precio total utilizando this.cart
        total = this.products
          .map((product, index) => product.price * this.cart[index].quantity)
          .reduce((total, current) => total + current, 0);
      }
    });
    // Redondea el total a dos decimales
    return parseFloat(total.toFixed(2));
  }

  /**
   * Function to close the cart
   */
  closeCart() {
    this.cartOpen = false;
    this.updated = false;
  }

  /**
   * Function to view product details
   * @param productId
   */
  verDetallesProducto(productId: number) {
    // Navegar a la vista de detalles del producto con el ID del producto como parámetro
    window.location.href = window.location.origin + '/product/' + productId;
  }
  /**
   * Function to handle login or address form submission
   */
  loginOrAdressForm(): void {
    // Check if user is authenticated
    this.auth.isAuthenticated$
      .pipe(
        switchMap((logged) => {
          if (!logged) {
            return this.auth.loginWithPopup(); // Redirect to login if not authenticated
          }
          return of(null); // Emit null if already authenticated
        }),
        switchMap(() => {
          this.router.navigate(['/address-form']); // Navigate to address form
          return of(null); // Emit null
        })
      )
      .subscribe(
        () => {}, // Do nothing on success
        (error) => {
          console.error(error);
          // Handle error in your application
        }
      );
  }
}
