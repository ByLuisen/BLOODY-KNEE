import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-merchandising',
  templateUrl: './merchandising.component.html',
  styleUrls: ['./merchandising.component.css']
})
export class MerchandisingComponent {
  @ViewChild('priceRangeInput') priceRangeInput!: ElementRef;

  onPriceChange() {
    const minValue = parseInt(this.priceRangeInput.nativeElement.value);
    const maxValue = 150 - minValue;
  }
  productos = [
    { nombre: 'Guantes Buddha', imagen: '../../../assets/img/guantes.png', precio: 15.00 },
    { nombre: 'Comba', imagen: '../../../assets/img/comba.png', precio: 28.00 },
    { nombre: 'Mochila 2', imagen: '../../../assets/img/mochila2.png', precio: 12.00 },
    { nombre: 'Vendas', imagen: '../../../assets/img/vendas.png', precio: 18.00 },
    { nombre: 'Mochila', imagen: '../../../assets/img/mochila.png', precio: 34.00 },
    { nombre: 'Llavero', imagen: '../../../assets/img/llavero.png', precio: 30.00 }
  ];
}
