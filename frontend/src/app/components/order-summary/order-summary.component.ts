import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpService) {}

  ngOnInit(): void {
    // Obtén los parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      if (params['session_id'] && params['success']) {
        this.http.getCheckoutSession(params['session_id']).subscribe((data) => {
          const checkout_session = data.data.checkout_session
          console.log(checkout_session)
        });
        this.http.getLineItems(params['session_id']).subscribe((data) => {
          const line_items = data.data.line_items.data;
          console.log(line_items)
        });
      }
    });
  }
}
