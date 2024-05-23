import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { finalize, map, of, switchMap, tap, zip } from 'rxjs';
import { Quote } from 'src/app/models/Quote';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent implements OnInit {
  quotes!: Quote[];
  arrayAdvantages!: any;
  loading: boolean = false;
  sub_id!: string;
  role!: string;
  openModal: boolean = false;
  constructor(
    private http: HttpService,
    public auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.http.getQuotes().subscribe((quotes: any[]) => {
      this.quotes = quotes;
      this.arrayAdvantages = this.quotes.map((quote) =>
        quote.advantages.split(';')
      );
    });

    this.route.queryParams.subscribe((params) => {
      if (params['session_id'] && params['success']) {
        this.loading = true;
        zip(
          this.http.getCheckoutSession(params['session_id']),
          this.http.getLineItems(params['session_id'])
        )
          .pipe(
            switchMap(([checkoutSession, lineItems]) => {
              if (checkoutSession.data && lineItems.data) {
                this.loading = false
                // Procesamos los resultados de ambas llamadas
                this.role = lineItems.data.line_items.data[0].description;
                this.sub_id = checkoutSession.data.checkout_session.subscription;
                console.log(this.role, this.sub_id);
                this.openModal = true;
                // Llamamos a makeOrder con los resultados de las dos llamadas
                return this.http.updateRole(this.role, this.sub_id);
              } else {
                this.loading = false;
                this.http.getRole().subscribe((response) => {
                  this.role = response;
                });
                return of();
              }
            })
          )
          .subscribe();
      } else {
        this.http.getRole().subscribe((response) => {
          this.role = response;
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
