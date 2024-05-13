import { Component } from '@angular/core';
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

  constructor(
    private auth: AuthService, // Instance of AuthService
    private http: HttpService, // Instance of HttpService
    private cookie: CookieService, // Instance of CookieService
    private router: Router // Instance of Router
  ) { }

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
      this.loading = true;// Set loading flag to true
      // Parse the cart cookie value
      this.cart = JSON.parse(this.cookie.get('cart'));
      // Obtener solo los IDs de los productos
      const ids = this.cart.map((product: any) => product.id);
      this.http
        .getProductsById(ids)
        .pipe(
          switchMap((products: Product[]) => {
            this.products = products
              .map((product) => {
                const cartItem = this.cart.find(
                  (cart) => cart.id === product.id
                );
                if (cartItem) {
                  product.quantity = cartItem.quantity;
                  product.added_date = cartItem.added_date;
                }
                return product;
              })
              .sort((a, b) => {
                // Ordena por fecha de forma descendente (más reciente primero)
                return (
                  new Date(b.added_date).getTime() -
                  new Date(a.added_date).getTime()
                );
              });
            return of(products);
          }),
          catchError((error) => {
            console.error('Error al obtener los productos:', error);
            return of([]); // Devolver un observable vacío o un valor por defecto
          }),
          finalize(() => {
            this.loading = false;// Set loading flag to false after completion
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
  deleteProduct(index: number): void {
    // Remove the product from the products array
    this.products.splice(index, 1);

    // Remove the product from the cart array
    this.cart.splice(index, 1);

    // Verificar si todavía hay productos en el carrito
    if (this.cart.length === 0) {
      // Si no hay productos en el carrito, eliminar la cookie
      this.cookie.delete('cart');
    } else {
      // Eliminar el producto del array products
      this.products.splice(index, 1);

      // Eliminar el producto del array cart
      this.cart.splice(index, 1);

      // Verificar si todavía hay productos en el carrito
      if (this.cart.length === 0) {
        // Si no hay productos en el carrito, eliminar la cookie
        this.cookie.delete('cart', '/');
      } else {
        // Si todavía hay productos en el carrito, actualizar la cookie
        this.cookie.set('cart', JSON.stringify(this.cart), 365, '/');
      }
    }
  }
  /**
   * Function to calculate the total number of products in the cart
   * @returns
   */
  calculateTotalProducts(): number {
    if (this.auth.isAuthenticated$) {
      // Usamos el método reduce para sumar todas las cantidades de los productos en el carrito
      const totalProducts = this.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
      return totalProducts;
    } else {
      // Usamos el método reduce para sumar todas las cantidades de los productos en el carrito
      const totalProducts = this.cart.reduce(
        (total, product) => total + product.quantity,
        0
      );
      return totalProducts;
    }
  }

  /**
   * Function to calculate the total amount of the cart
   * @returns
   */
  calculateTotalAmount(): number {
    if (this.auth.isAuthenticated$) {
      // Si el usuario está autenticado, calcular el precio total utilizando this.products
      return this.products
        .map((product) => product.price * product.quantity)
        .reduce((total, current) => total + current, 0);
    } else {
      // Si el usuario no está autenticado, calcular el precio total utilizando this.cart
      return this.products
        .map((product, index) => product.price * this.cart[index].quantity)
        .reduce((total, current) => total + current, 0);
    }
  }

  /**
   * Function to close the cart
   */
  closeCart() {
    this.cartOpen = false;
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
            return this.auth.loginWithPopup();// Redirect to login if not authenticated
          }
          return of(null); // Emit null if already authenticated
        }),
        switchMap(() => {
          this.router.navigate(['/address-form']); // Navigate to address form
          return of(null); // Emit null
        })
      )
      .subscribe(
        () => { },// Do nothing on success
        (error) => {
          console.error(error);
          // Handle error in your application
        }
      );
  }
}
