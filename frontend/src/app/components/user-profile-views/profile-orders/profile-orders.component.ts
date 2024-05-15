import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.css'],
})
export class ProfileOrdersComponent implements OnInit {
  orders!: Order[];

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http.getOrders().subscribe((orders) => {
      this.orders = orders;
      console.log(orders);
    });
  }

  cancelOrder(): void {}
}
