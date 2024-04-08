import { Component } from '@angular/core';

@Component({
  selector: 'app-boxingvideos',
  templateUrl: './boxingvideos.component.html',
  styleUrls: ['./boxingvideos.component.css']
})
export class BoxingvideosComponent {
  items = [
    { image: '../../../assets/img/saco.png', title: 'Entreno con saco #1.' },
    { image: '../../../assets/img/saco.png', title: 'Entreno con saco #2.' },
    { image: '../../../assets/img/saco.png', title: 'Entreno con saco #3.' },

  ];

  items2 = [
    { image: '../../../assets/img/boxeopareja.png', title: 'Entreno con pareja #1.' },
    { image: '../../../assets/img/boxeopareja.png', title: 'Entreno con pareja #2.' },
    { image: '../../../assets/img/boxeopareja.png', title: 'Entreno con pareja #3.' },
  ];

  items3 = [
    { image: '../../../assets/img/boxeoequimapiento.png', title: 'Entreno con equipamiento #1.' },
    { image: '../../../assets/img/boxeoequimapiento.png', title: 'Entreno con equipamiento #2.' },
    { image: '../../../assets/img/boxeoequimapiento.png', title: 'Entreno con equipamiento #3.' },
  ];
  items4 = [
    { image: '../../../assets/img/sinequipamiento.png', title: 'Entreno sin equipamiento #1.' },
    { image: '../../../assets/img/sinequipamiento.png', title: 'Entreno sin equipamiento #2.' },
    { image: '../../../assets/img/sinequipamiento.png', title: 'Entreno sin equipamiento #3.' },
  ];
}
