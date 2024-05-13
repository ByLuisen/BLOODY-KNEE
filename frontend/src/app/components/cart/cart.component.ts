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
  cartOpen = false;
  products: Product[] = [];
  cart!: any[];
  loading: boolean = false;

  constructor(
    private auth: AuthService,
    private http: HttpService,
    private cookie: CookieService,
    private router: Router
  ) {}

  toggleCart() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.getProductsFromBBDD();
      } else {
        this.getProductsFromACookie();
      }
    });
    this.cartOpen = !this.cartOpen;
  }

  getProductsFromACookie(): void {
    // Verify if the cookie cart exist
    if (this.cookie.check('cart')) {
      this.loading = true;
      // Get the cart cookie value parsing it
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
            this.loading = false;
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

  deleteProduct(index: number): void {
    if (this.auth.isAuthenticated$) {
      this.http.deleteProductCart(this.products[index].id).subscribe();
      // Eliminar el producto del array products
      this.products.splice(index, 1);
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

  closeCart() {
    this.cartOpen = false;
  }

  verDetallesProducto(productId: number) {
    // Navegar a la vista de detalles del producto con el ID del producto como parámetro
    window.location.href = window.location.origin + '/product/' + productId;
  }

  loginOrAdressForm(): void {
    this.auth.isAuthenticated$
      .pipe(
        switchMap((logged) => {
          if (!logged) {
            return this.auth.loginWithPopup();
          }
          return of(null); // Emite un valor nulo si ya está autenticado
        }),
        switchMap(() => {
          this.router.navigate(['/address-form']);
          return of(null);
        })
      )
      .subscribe(
        () => {},
        (error) => {
          console.error(error);
          // Manejar el error en tu aplicación
        }
      );
  }
}
