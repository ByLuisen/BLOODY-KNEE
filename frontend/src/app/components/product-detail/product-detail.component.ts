import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product!: Product;
  mainImageUrl!: string;
  added: boolean = false;
  quantity!: number;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private cookie: CookieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = +params['productId'];
      this.getProducto();
    });

    // Get the quantity product selector
    const selectElement = document.getElementById(
      'quantity'
    ) as HTMLSelectElement;
    // Parse to integer the quantity
    this.quantity = parseInt(selectElement.value);
  }

  getProducto(): void {
    this.http.getProductsById([this.productId]).subscribe(
      (product) => {
        console.log('Producto obtenido:', product);
        this.product = product[0];

        // Inicializar la imagen principal con la primera imagen del producto
        this.mainImageUrl = this.product ? this.product.url_img1 : '';
      },
      (error) => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }
  setMainImage(url: string): void {
    this.mainImageUrl = url;
  }

  add(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // Haz algo si el usuario está autenticado
      } else {
        this.saveProductInACookie();
      }
    });
  }

  saveProductInACookie(): void {
    this.added = true;
    setTimeout(() => {
      this.added = false;
    }, 7000);

    // Get the quantity product selector
    const selectElement = document.getElementById(
      'quantity'
    ) as HTMLSelectElement;
    // Parse to integer the quantity
    this.quantity = parseInt(selectElement.value);

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
    const selectElement = document.getElementById(
      'quantity'
    ) as HTMLSelectElement;
    const quantity = parseInt(selectElement.value);
    this.product.quantity = quantity;
    this.http.checkout([this.product]).subscribe(
      (response) => {
        // Redirigir al usuario a la URL de checkout
        window.location.href = response.data.checkout_url;
      },
      (error) => {
        console.error('Error al iniciar la sesión de pago:', error);
        // Manejar el error en tu aplicación
      }
    );
  }
}
