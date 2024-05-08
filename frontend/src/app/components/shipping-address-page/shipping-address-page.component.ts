import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-address-page',
  templateUrl: './shipping-address-page.component.html',
  styleUrls: ['./shipping-address-page.component.css']
})
export class ShippingAddressPageComponent {

  constructor(private router: Router) {

  }
  goBack(): void {
    window.history.back(); // Navega hacia atrás en el historial
  }
}
