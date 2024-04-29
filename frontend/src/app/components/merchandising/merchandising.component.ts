import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-merchandising',
  templateUrl: './merchandising.component.html',
  styleUrls: ['./merchandising.component.css']
})
export class MerchandisingComponent implements OnInit {

  // Array para almacenar todos los productos
  productos: Product[] = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getProductos();
    console.log(this.productos);
  }

  getProductos(): void {
    this.http.getProducts().subscribe(
      (products) => {
        console.log("Videos destacados obtenidos:", products);
        this.productos = products;
      },
      (error) => {
        console.error("Error al obtener los videos destacados:", error);
      }
    );
  }

  @ViewChild('priceRangeInput') priceRangeInput!: ElementRef;

  onPriceChange() {
    const minValue = parseInt(this.priceRangeInput.nativeElement.value);
    const maxValue = 150 - minValue;
  }
}
