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

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Componente ProductDetail inicializado");
    this.route.paramMap.subscribe(params => {
      this.productId = +!params.get('id')
      this.getProducto();
    });
  }


  getProducto(): void {
    this.http.getProductById(this.productId).subscribe(
      (product) => {
        console.log("Producto obtenido:", product);
        this.product = product[0]; // Cambiado a product[0] para asignar solo un producto
      },
      (error) => {
        console.error("Error al obtener el producto:", error);
      }
    );
  }
}
