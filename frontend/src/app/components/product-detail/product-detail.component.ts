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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product!: Product;
  topProducts!: Product[];
  mainImageUrl!: string;
  brandName!: string;
  added: boolean = false;
  quantity!: number;
  loading: boolean = false;
  loadingProduct: boolean = false;
  openModal: boolean = false;
  shippingAddress!: FormGroup;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = +params['productId'];
      this.getProducto();
    });
    this.getRandomProducts();
    this.shippingAddress = new FormGroup({
      country: new FormControl('España', [Validators.required]),
      first_name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúñçÁÉÍÓÚÑÇ'\s]*$/),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúñçÁÉÍÓÚÑÇ'\s]*$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+)?[0-9]+$/),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9ñáéíóúÑÁÉÍÓÚªº'·\s\-\.\,]*$/),
      ]),
      province: new FormControl('', [
        Validators.pattern(/^[a-zA-ZáéíóúñçÁÉÍÓÚÑÇ'\s]*$/),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúñçÁÉÍÓÚÑÇ'\s]*$/),
      ]),
      zip: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{4,5}$/),
      ]),
    });
  }

  getProducto(): void {
    this.loadingProduct = true;
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
    this.http
      .getProducts()
      .pipe(
        switchMap((products) => {
          // Get 6 random products
          const randomProducts = this.getRandomItems(products, 6);
          console.log('Productos aleatorios:', randomProducts);

          this.topProducts = randomProducts.filter(product => product.id !== this.productId);

          return of(products);
        }),
        finalize(() => (this.loadingProduct = false)),
        catchError((error) => {
          console.error('Error al obtener productos:', error);
          return of([]);
        })
      )
      .subscribe();
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
    window.location.href = window.location.origin + '/product/' + productId;
  }

  add(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        const product = new Product();
        product.id = this.productId;
        product.quantity = this.getQuantity();
        this.http.addProductToCart(product).subscribe();
        this.added = true;
        setTimeout(() => {
          this.added = false;
        }, 7000);
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
        () => { },
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
      id: this.productId,
      quantity: this.getQuantity(), // Convertir a número si es necesario
      added_date: new Date().toISOString(),
    };

    // Verify if the cookie cart exist
    if (this.cookie.check('cart')) {
      // Get the cart cookie value parsing it
      const cart = JSON.parse(this.cookie.get('cart'));

      // Verificar si el producto ya está en el carrito
      const existingProductIndex = cart.findIndex(
        (p: any) => p.id === this.productId
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualizar su cantidad
        cart[existingProductIndex].quantity += productToAdd.quantity;
        cart[existingProductIndex].added_date = productToAdd.added_date;
      } else {
        // Si el producto no está en el carrito, agregarlo
        cart.push(productToAdd);
      }
      this.cookie.set('cart', JSON.stringify(cart), 365, '/');
    } else {
      this.cookie.set('cart', JSON.stringify([productToAdd]), 365, '/'); // Convert the array to JSON and save it in the cookie
    }
  }

  getQuantity(): number {
    // Get the quantity product selector
    const selectElement = document.getElementById(
      'quantity'
    ) as HTMLSelectElement;
    // Parse to integer the quantity
    return parseInt(selectElement.value);
  }

  hideNotification(): void {
    this.added = false;
  }

  sendShippingAddress(): void {
    if (this.shippingAddress.valid) {
      this.loading = true;
      // Obtener todos los datos del formulario
      const shippingData = Object.values(this.shippingAddress.value).map(
        (value: any) => value.trim()
      );
      const shippingAddress = new User();
      shippingAddress.country = shippingData[0];
      shippingAddress.fullName = shippingData[1] + ' ' + shippingData[2];
      shippingAddress.phone = shippingData[3];
      shippingAddress.address = shippingData[4];
      shippingAddress.province = shippingData[5] ?? '';
      shippingAddress.city = shippingData[6];
      shippingAddress.zip = shippingData[7];

      this.http.storeUserAddress(shippingAddress).subscribe();

      this.product.quantity = this.getQuantity();

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
          () => { },
          (error) => {
            console.error('Error al iniciar la sesión de pago:', error);
            // Manejar el error en tu aplicación
          }
        );
    } else {
      // Marcar todos los controles del formulario como tocados para mostrar los errores
      Object.values(this.shippingAddress.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}
