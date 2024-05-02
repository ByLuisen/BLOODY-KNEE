import { Component, Inject, OnInit } from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeEmbeddedCheckout,
  StripeEmbeddedCheckoutOptions,
} from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  stripePromise!: Promise<Stripe | null>;
  embeddedCheckout!: StripeEmbeddedCheckout | null;
  loading = true;

  constructor() {}

  ngOnInit(): void {
    this.stripePromise = loadStripe(
      'pk_live_51P4g7eByhCj4S0lhFQ4yQaj8IumOz3HcyQbwgUMfOPYZmeBa5K9ikX6UdsK9wrNIkT6VEVhVsgKLCF6EooNq8RSe00Ah32SUyV'
    );

    this.stripePromise
      .then((stripe) => {
        if (stripe) {
          // Ahora tenemos una instancia de Stripe disponible
          // Podemos utilizar las funciones definidas en la interfaz StripeEmbeddedCheckout

          // Por ejemplo, podemos inicializar un Embedded Checkout
          const options: StripeEmbeddedCheckoutOptions = {
            clientSecret: 'cs_live_a1Sq6lA2YpaOOga4uLEzpOmBYy0OD5xpX791G4L6czXswH05fgqoRoXQo6_secret_fidwbEhqYWAnPydgaGdgYWFgYScpJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ3dgYWx3YGZxSmtGamh1aWBxbGprJz8nZGlyZHx2JyknZ2RmbmJ3anBrYUZqaWp3Jz8nJmYzMDYwNid4JSUl',
          };
          stripe
            .initEmbeddedCheckout(options)
            .then((embeddedCheckout) => {
              if (embeddedCheckout) {
                // Una vez que la promesa se resuelve, asignamos el objeto embeddedCheckout a nuestra variable
                this.embeddedCheckout = embeddedCheckout;
                this.embeddedCheckout.mount('#checkout')
              } else {
                throw new Error('No se pudo inicializar el Embedded Checkout.');
              }
            })
            .catch((error) => {
              console.error(
                'Error al inicializar el Embedded Checkout:',
                error
              );
            });
        }
      })
      .catch((error) => {
        console.error('Error al cargar Stripe:', error);
      });
  }

  // Función para montar el Embedded Checkout en el DOM
  mountEmbeddedCheckout(location: string | HTMLElement): void {
    if (this.embeddedCheckout) {
      this.embeddedCheckout.mount(location);
    }
  }

  // Función para desmontar el Embedded Checkout del DOM
  unmountEmbeddedCheckout(): void {
    if (this.embeddedCheckout) {
      this.embeddedCheckout.unmount();
    }
  }

  // Función para destruir el Embedded Checkout
  destroyEmbeddedCheckout(): void {
    if (this.embeddedCheckout) {
      this.embeddedCheckout.destroy();
      this.embeddedCheckout = null; // También puedes limpiar la referencia al Embedded Checkout
    }
  }
}
