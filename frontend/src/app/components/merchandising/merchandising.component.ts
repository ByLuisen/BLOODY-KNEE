import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-merchandising',
  templateUrl: './merchandising.component.html',
  styleUrls: ['./merchandising.component.css']
})
export class MerchandisingComponent {
  @ViewChild('priceRangeInput') priceRangeInput!: ElementRef;

  onPriceChange() {
    const minValue = parseInt(this.priceRangeInput.nativeElement.value);
    const maxValue = 150 - minValue;
  }
}
