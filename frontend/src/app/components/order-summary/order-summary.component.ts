import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { of, switchMap, tap } from 'rxjs';
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
        this.http
          .getCheckoutSession(params['session_id'])
          .pipe(
            switchMap((checkout_session) => {
              this.checkout_session = checkout_session.data.checkout_session;
              console.log(this.checkout_session);
              return of(checkout_session);
            }),
            switchMap(() => {
              return this.http.getLineItems(params['session_id']);
            }),
            tap((line_items) => {
              this.line_items = line_items.data.line_items.data;
              console.log(this.line_items)
              return of(line_items);
            }),
            switchMap(() => {
              return this.http.makeOrder(this.checkout_session, this.line_items);
            }),
            tap((response: Order) => {
              this.order = response;
              console.log(response)
            })
          )
          .subscribe();
      }
    });
  }
}
