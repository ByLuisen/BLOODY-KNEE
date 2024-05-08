import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Product } from 'src/app/models/Product';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product!: Product;
  topProducts!: Product[]
  mainImageUrl!: string;
  brandName!: string;
  added: boolean = false;
  quantity!: number;
  loading: boolean = false;
  openModal: boolean = false;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = +params['productId'];
      this.getProducto();
    });
    this.getRandomProducts();
    this.getProductBrand()

    // Get the quantity product selector
    const selectElement = document.getElementById(
      'quantity'
    ) as HTMLSelectElement;
    // Parse to integer the quantity
    this.quantity = parseInt(selectElement.value);
  }

  getProducto(): void {
    this.http
      .getProductsById([this.productId])
      .pipe(
        switchMap((product) => {
          this.product = product[0];
          // Inicializar la imagen principal con la primera imagen del producto
          this.mainImageUrl = this.product ? this.product.url_img1 : '';
          return of(product);
        }),
        catchError((error) => {
          console.error('Error al obtener el producto:', error);
          return of([]);
        })
      )
      .subscribe();
  }

  setMainImage(url: string): void {
    this.mainImageUrl = url;
  }

  /**
   *
   */
  getRandomProducts(): void {
    this.http.getProducts().subscribe(
      (products) => {
        // Obtener 6 productos aleatorios
        const randomProducts = this.getRandomItems(products, 6);
        console.log("Productos aleatorios:", randomProducts);
        this.topProducts = randomProducts;
      },
      (error) => {
        console.error("Error al obtener productos:", error);
      }
    );
  }

  // Función para obtener elementos aleatorios de una matriz
  getRandomItems(array: any[], numItems: number): any[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
  }

  /**
   * Redirecciona a los detalles del producto recomendado que seleccione el usuario.
   * @param productId
   */
  verDetallesProducto(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  /**
   * Obtiene la marca a la que pertenece el producto
   */
  getProductBrand(): void {
    this.http.getProductBrand(this.productId)
      .subscribe(response => {
        this.brandName = response.brand.name;
        console.log('La marca del producto es:', this.brandName)
      }, error => {
        console.error('Error al obtener la marca del producto:', error);
      });
  add(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // Haz algo si el usuario está autenticado
      } else {
        this.saveProductInACookie();
      }
    });
  }

  loginOrModal(): void {
    this.auth.isAuthenticated$
      .pipe(
        switchMap((logged) => {
          if (!logged) {
            return this.auth.loginWithPopup();
          }
          return of(null); // Emite un valor nulo si ya está autenticado
        }),
        switchMap(() => {
          this.openModal = true;
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

  saveProductInACookie(): void {
    this.added = true;
    setTimeout(() => {
      this.added = false;
    }, 7000);

    // Create the product object to add
    const productToAdd = {
      productId: this.productId,
      quantity: this.quantity, // Convertir a número si es necesario
    };

    // Verify if the cookie cart exist
    if (this.cookie.check('cart')) {
      // Get the cart cookie value parsing it
      const cart = JSON.parse(this.cookie.get('cart'));
      console.log(cart);

      // Verificar si el producto ya está en el carrito
      const existingProductIndex = cart.findIndex(
        (p: any) => p.productId === this.productId
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualizar su cantidad
        cart[existingProductIndex].quantity += this.quantity;
      } else {
        // Si el producto no está en el carrito, agregarlo
        cart.push(productToAdd);
      }
      this.cookie.set('cart', JSON.stringify(cart), 365, '/');
    } else {
      this.cookie.set('cart', JSON.stringify([productToAdd]), 365, '/'); // Convert the array to JSON and save it in the cookie
    }
  }

  setQuantity(): void {
    // Get the quantity product selector
    const selectElement = document.getElementById(
      'quantity'
    ) as HTMLSelectElement;
    // Parse to integer the quantity
    this.quantity = parseInt(selectElement.value);
  }

  hideNotification(): void {
    this.added = false;
  }

  submit(): void {
    this.loading = true;
    this.product.quantity = this.quantity;
    this.http
      .checkout([this.product])
      .pipe(
        tap((response) => {
          if (response) {
            window.location.href = response.data.checkout_url;
          }
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        () => {},
        (error) => {
          console.error('Error al iniciar la sesión de pago:', error);
          // Manejar el error en tu aplicación
        }
      );
  }
}
