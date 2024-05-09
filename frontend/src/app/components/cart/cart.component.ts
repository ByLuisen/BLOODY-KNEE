import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular'; // Import AuthService from Auth0 Angular SDK
import { CookieService } from 'ngx-cookie-service'; // Import CookieService from ngx-cookie-service
import { catchError, finalize, of, switchMap } from 'rxjs'; // Import necessary operators from RxJS
import { Product } from 'src/app/models/Product'; // Import Product model
import { HttpService } from 'src/app/services/http.service'; // Import HttpService

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
      // Extract only the IDs of the products
      const ids = this.cart.map((product: any) => product.productId);
      // Retrieve products by their IDs
      this.http
        .getProductsById(ids)
        .pipe(
          switchMap((products: Product[]) => {
            // Map retrieved products to include quantity information from the cart
            this.products = products.map((product) => {
              const cartItem = this.cart.find(
                (cart) => cart.productId === product.id
              );
              if (cartItem) {
                product.quantity = cartItem.quantity;
              }
              return product;
            });
            return of(products);
          }),
          catchError((error) => {
            console.error('Error al obtener el producto:', error);
            return of([]); // Return an empty observable or a default value
          }),
          finalize(() => {
            this.loading = false;// Set loading flag to false after completion
          })
        )
        .subscribe();
    }
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
      // Si todavía hay productos en el carrito, actualizar la cookie
      this.cookie.set('cart', JSON.stringify(this.cart), 365, '/');
    }
  }
  /**
   * Function to calculate the total number of products in the cart
   * @returns
   */
  calculateTotalProducts(): number {
    // Use the reduce method to sum all the quantities of products in the cart
    const totalProducts = this.cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    return totalProducts;
  }

  /**
   * Function to calculate the total amount of the cart
   * @returns
   */
  calculateTotalAmount(): number {
    // Use the map function to calculate the total price
    const totalAmount = this.products
      .map((product, index) => product.price * this.cart[index].quantity)
      .reduce((total, current) => total + current, 0);

    return totalAmount;
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
    // Navigate to the product details view with the product ID as a parameter
    this.router.navigate(['/product', productId]).then(() => {
      this.closeCart();
    });
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
