import { AfterViewInit, Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements AfterViewInit {
  productId!: number;
  product!: Product;
  topProducts!: Product[]
  mainImageUrl!: string;
  // Brand names map
  brandNames: { [key: number]: string } = {
    1: 'Venum',
    2: 'Buddha',
    3: 'Rival',
    4: 'Nike'
  };

  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['productId'];
      this.getProducto();
    });
    this.getRandomProducts();
  }

  getProducto(): void {
    this.http.getProductById(this.productId).subscribe(
      (product) => {
        console.log("Producto obtenido:", product);
        this.product = product[0];

        // Inicializar la imagen principal con la primera imagen del producto
        this.mainImageUrl = this.product ? this.product.url_img1 : '';
      },
      (error) => {
        console.error("Error al obtener el producto:", error);
      }
    );
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

  verDetallesProducto(productId: number) {
    // Navegar a la vista de detalles del producto con el ID del producto como parámetro
    this.router.navigate(['/product', productId]);
  }

}
