import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  role!: string;
  constructor(
    private http: HttpService,
    public auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isauth) => {
      if (isauth) {
        this.http.getRole().subscribe((role) => {
          console.log(role.data);
          this.role = role.data;
        });
      } else {
        this.role = 'Basic';
      }
    });
    this.http.getQuotes().subscribe((quotes: any[]) => {
      this.quotes = quotes;
      this.arrayAdvantages = this.quotes.map((quote) =>
        quote.advantages.split(';')
      );
    });

    // Obtén los parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      if (params['session_id'] && params['success']) {
        this.http.getLineItems(params['session_id']).subscribe((data) => {
          const subscriptionItem = data.data.line_items.data[0];
          this.http.updateRole(subscriptionItem.description).subscribe();
        });
      }
    });

    if (window.location.pathname == '/pricing') {
      document.getElementById('pricing_section')?.classList.add('fondo_bk');
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
        () => {},
        (error) => {
          console.error('Error al suscribirse a la cotización:', error);
          // Manejar el error en tu aplicación
        }
      );
  }

  getBasic(): void {
    this.http.updateRole('Basic').subscribe();
  }
}
