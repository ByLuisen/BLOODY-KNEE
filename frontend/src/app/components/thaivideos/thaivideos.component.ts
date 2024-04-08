import { Component } from '@angular/core';


@Component({
  selector: 'app-thaivideos',
  templateUrl: './thaivideos.component.html',
  styleUrls: ['./thaivideos.component.css']
})
export class ThaivideosComponent {

  items = [
    { image: '../../../assets/img/saco.png', title: 'Entreno con saco #1.' },
    { image: '../../../assets/img/saco.png', title: 'Entreno con saco #2.' },
    { image: '../../../assets/img/saco.png', title: 'Entreno con saco #3.' },

  ];

  items2 = [
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #1.' },
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #2.' },
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #3.' },
  ];

  items3 = [
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #1.' },
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #2.' },
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #3.' },
  ];
  items4 = [
    { image: '../../../assets/img/sinequipamiento.png', title: 'Entreno sin equipamiento #1.' },
    { image: '../../../assets/img/sinequipamiento.png', title: 'Entreno sin equipamiento #2.' },
    { image: '../../../assets/img/sinequipamiento.png', title: 'Entreno sin equipamiento #3.' },
  ];

}



