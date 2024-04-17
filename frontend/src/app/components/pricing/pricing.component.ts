import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';
import { Quote } from 'src/app/models/Quote';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent {
  paymentLinks!: string[];
  loged!: boolean;
  quotes!: Quote[];
  arrayAdvantages!: any;
  constructor(private http: HttpService, public auth: AuthService) {}

  ngOnInit(): void {
    this.paymentLinks = [
      '#',
      'https://buy.stripe.com/test_4gw4gyd336hp3xC5kl',
      'https://buy.stripe.com/test_8wMaEW9QRgW3b046oq'
    ]
    if (localStorage.getItem('token')) {
      this.loged = true;
    } else {
      this.loged = false;
    }
    this.http.getQuotes().subscribe((quotes: any[]) => {
      this.quotes = quotes; 
      this.arrayAdvantages = this.quotes.map((quote) =>
        quote.advantages.split(';')
      );
    });
  }
}
