import { Component } from '@angular/core';

@Component({
  selector: 'app-merchandising',
  templateUrl: './merchandising.component.html',
  styleUrls: ['./merchandising.component.css']
})
export class MerchandisingComponent {
  maxPrice: number = 100; // Puedes ajustar el valor máximo del precio según tu necesidad
  selectedPrice: number = 50; // Puedes establecer un valor inicial para el precio seleccionado

  // Método para formatear la etiqueta del slider
  formatLabel(value: number) {
    return '$' + value; // Aquí puedes personalizar el formato del valor del precio
  }

  // Método que se ejecuta cuando cambia el valor del slider
  onPriceChanged(event: any) {
    // Aquí puedes manejar el cambio en el valor del precio
    console.log('Price changed:', event);
  }
}
