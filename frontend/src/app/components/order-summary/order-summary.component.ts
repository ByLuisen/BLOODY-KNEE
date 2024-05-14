import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { switchMap, tap, zip } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
  checkout_session: any;
  line_items: any;
  order!: Order;
  constructor(private route: ActivatedRoute, private http: HttpService) {}

  ngOnInit(): void {
    // Obtén los parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      if (params['session_id'] && params['success']) {
        zip(
          this.http.getCheckoutSession(params['session_id']),
          this.http.getLineItems(params['session_id'])
        ).pipe(
          switchMap(([checkoutSession, lineItems]) => {
            // Procesamos los resultados de ambas llamadas
            this.checkout_session = checkoutSession.data.checkout_session;
            this.line_items = lineItems.data.line_items.data;
            console.log(this.checkout_session);
            console.log(this.line_items);

            // Llamamos a makeOrder con los resultados de las dos llamadas
            return this.http.makeOrder(this.checkout_session, this.line_items);
          }),
          tap((response: Order) => {
            // Procesamos la respuesta de makeOrder
            this.order = response;
            console.log(response);
          })
        ).subscribe();
      }
    });
  }
}
