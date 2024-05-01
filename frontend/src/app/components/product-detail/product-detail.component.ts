import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product!: Product; // Cambiado a una sola instancia de Product, no un array
  mainImageUrl!: string;

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Componente ProductDetail inicializado");
    this.route.paramMap.subscribe(params => {
      this.productId = +!params.get('id')
      this.getProducto();
    });

    // Inicializar la imagen principal con la primera imagen del producto
    this.mainImageUrl = this.product ? this.product.url_img1 : '';
  }
  
  setMainImage(url: string): void {
    this.mainImageUrl = url;
  }

  getProducto(): void {
    this.http.getProductById(this.productId).subscribe(
      (product) => {
        console.log("Producto obtenido:", product);
        this.product = product[0];
      },
      (error) => {
        console.error("Error al obtener el producto:", error);
      }
    );
  }
}
