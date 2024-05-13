import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, of, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-shipping-address-page',
  templateUrl: './shipping-address-page.component.html',
  styleUrls: ['./shipping-address-page.component.css'],
})
export class ShippingAddressPageComponent implements OnInit {
  shippingAddress!: FormGroup;
  loading: boolean = false;
  constructor(private router: Router, private http: HttpService) {}

  ngOnInit(): void {
    this.shippingAddress = new FormGroup({
      country: new FormControl('España', [Validators.required]),
      first_name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúñçÁÉÍÓÚÑÇ'\s]*$/),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúñçÁÉÍÓÚÑÇ'\s]*$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+)?[0-9]+$/),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9ñáéíóúÑÁÉÍÓÚªº'·\s\-\.\,]*$/),
      ]),
      province: new FormControl('', [
        Validators.pattern(/^[a-zA-ZáéíóúñçÁÉÍÓÚÑÇ'\s]*$/),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúñçÁÉÍÓÚÑÇ'\s]*$/),
      ]),
      zip: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{4,5}$/),
      ]),
    });
  }

  sendShippingAdsress(): void {
    if (this.shippingAddress.valid) {
      this.loading = true;
      // Obtener todos los datos del formulario
      const shippingData = Object.values(this.shippingAddress.value).map((value:any) => value.trim());
      const shippingAddress = new User;
      shippingAddress.country = shippingData[0];
      shippingAddress.fullName = shippingData[1] + ' ' + shippingData[2];
      shippingAddress.phone = shippingData[3];
      shippingAddress.address = shippingData[4];
      shippingAddress.province = shippingData[5] ?? '';
      shippingAddress.city = shippingData[6];
      shippingAddress.zip = shippingData[7];

      this.http.storeUserAddress(shippingAddress).subscribe();
      this.http
        .getCartFromDDBB()
        .pipe(
          switchMap((products: Product[]) => {
            return this.http.checkout(products).pipe(
              tap((response) => {
                if (response) {
                  window.location.href = response.data.checkout_url;
                }
              }),
              finalize(() => (this.loading = false))
            );
          })
        )
        .subscribe();
    } else {
      // Marcar todos los controles del formulario como tocados para mostrar los errores
      Object.values(this.shippingAddress.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  goBack(): void {
    window.history.back(); // Navega hacia atrás en el historial
  }
}
