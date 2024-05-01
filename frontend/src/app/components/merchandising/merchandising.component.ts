import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  // Boolean para controlar los filtros de stock
  mostrarEnStock: boolean = false;
  mostrarFueraDeStock: boolean = false;

  // Variable para almacenar el precio máximo seleccionado
  precioMaximo: number = 150;

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {

    this.getProductos();
    console.log(this.productos);
  }

  getProductos(): void {
    this.http.getProducts().subscribe(
      (products) => {
        console.log("TODOS LOS PRODUCTOS OBTENIDOS:", products);
        this.productos = products;

        // Calcular precio mínimo y máximo
        const precios = this.productos.map(producto => producto.price);
        const precioMinimo = Math.min(...precios);
        const precioMaximo = Math.max(...precios);

        // Establecer los valores iniciales del rango de precios
        this.priceRangeInput.nativeElement.min = precioMinimo;
        this.priceRangeInput.nativeElement.max = precioMaximo;

        // Asignar el valor inicial del rango de precios
        this.precioMaximo = precioMaximo;
        console.log("Precio mínimo:", precioMinimo);
        console.log("Precio máximo:", precioMaximo);
      },
      (error) => {
        console.error("Error al obtener los productos:", error);
      }
    );
  }

  @ViewChild('priceRangeInput') priceRangeInput!: ElementRef;

  onPriceChange() {
    this.precioMaximo = parseInt(this.priceRangeInput.nativeElement.value);
  }

  // Metodos para filtrar los productos
  contarProductosEnStock(): number {
    return this.productos.filter(producto => producto.stock > 0).length;
  }

  contarProductosFueraDeStock(): number {
    return this.productos.filter(producto => producto.stock === 0).length;
  }

  productosFiltrados(): Product[] {
    let productosFiltrados: Product[] = [];

    // Si ninguna opción está seleccionada, mostrar todos los productos
    if (!this.mostrarEnStock && !this.mostrarFueraDeStock) {
      productosFiltrados = this.productos;
    } else {
      if (this.mostrarEnStock && this.mostrarFueraDeStock) {
        productosFiltrados = this.productos;
      } else if (this.mostrarEnStock) {
        productosFiltrados = this.productos.filter(producto => producto.stock > 0);
      } else if (this.mostrarFueraDeStock) {
        productosFiltrados = this.productos.filter(producto => producto.stock === 0);
      }
    }

    // Filtrar por rango de precio
    productosFiltrados = productosFiltrados.filter(producto => producto.price <= this.precioMaximo);

    return productosFiltrados;
  }

  verDetallesProducto(productId: number) {
    // Navegar a la vista de detalles del producto con el ID del producto como parámetro
    this.router.navigate(['/product', productId]);
  }
}
