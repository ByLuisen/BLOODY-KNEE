import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { loadStripe } from '@stripe/stripe-js';
import { finalize, map, of, switchMap, tap } from 'rxjs';
import { Quote } from 'src/app/models/Quote';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent {
  quotes!: Quote[];
  arrayAdvantages!: any;
  loading: boolean = false;
  constructor(private http: HttpService, public auth: AuthService) { }

  ngOnInit(): void {
    this.http.getQuotes().subscribe((quotes: any[]) => {
      this.quotes = quotes;
      this.arrayAdvantages = this.quotes.map((quote) =>
        quote.advantages.split(';')
      );
    });

    if (window.location.pathname == "/pricing") {
      document.getElementById('pricing_section')?.classList.add('fondo_bk')
    }
  }

  subscribeToQuote(quotePriceId: string) {
    this.auth.isAuthenticated$
      .pipe(
        switchMap((logged) => {
          if (!logged) {
            return this.auth.loginWithPopup();
          }
          return of(null); // Emite un valor nulo si ya está autenticado
        }),
        switchMap(() => {
          this.loading = true; // Mostrar pantalla de carga
          return this.http.subscribeQuote(quotePriceId); // Devolver el observable
        }),
        tap((response) => {
          if (response) {
            window.location.href = response.data.checkout_url;
          }
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        () => { },
        (error) => {
          console.error('Error al suscribirse a la cotización:', error);
          // Manejar el error en tu aplicación
        }
      );
  }
}
