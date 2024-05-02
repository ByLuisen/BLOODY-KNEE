import { AfterViewInit, Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements AfterViewInit {
  productId!: number;
  product!: Product;
  mainImageUrl!: string;

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['productId'];
      this.getProducto();
    });
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

}
