import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-merch',
  templateUrl: './detalle-merch.component.html',
  styleUrls: ['./detalle-merch.component.css']
})
export class DetalleMerchComponent {
  src!: "";

  constructor() {

  }
  changeImage(src: string): void {
    const mainImage: HTMLImageElement | null = document.getElementById('main-image') as HTMLImageElement;
    if (mainImage) {
      mainImage.src = src;
    } else {
      console.error('Main image not found');
    }
  }

}
