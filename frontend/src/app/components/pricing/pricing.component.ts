import { Component } from '@angular/core';
import { map } from 'rxjs';
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
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http.getQuotes().subscribe((quotes: any[]) => {
      this.quotes = quotes;
      this.arrayAdvantages = this.quotes.map(quote => quote.advantages.split(';'));
      console.log(this.arrayAdvantages)
    });
  }
}
