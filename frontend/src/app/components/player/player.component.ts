import { Component } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  constructor() { }
  items = [
    { image: '../../../assets/img/sacothai.png', title: 'Entreno con saco #1.', category: 'saco' },
    { image: '../../../assets/img/sacothai.png', title: 'Entreno con saco #2.', category: 'saco' },
    { image: '../../../assets/img/sacothai.png', title: 'Entreno con saco #3.', category: 'saco' }
  ];

  items2 = [
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #1.', category: 'pareja' },
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #2.', category: 'pareja' },
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #3.', category: 'pareja' },
  ];

  items3 = [
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #1.', category: 'con-equipamiento' },
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #2.', category: 'con-equipamiento' },
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #3.', category: 'con-equipamiento' },
  ];
  
  items4 = [
    { image: '../../../assets/img/sombrathai.png', title: 'Entreno sin equipamiento #1.', category: 'sin-equipamiento' },
    { image: '../../../assets/img/sombrathai.png', title: 'Entreno sin equipamiento #2.', category: 'sin-equipamiento' },
    { image: '../../../assets/img/sombrathai.png', title: 'Entreno sin equipamiento #3.', category: 'sin-equipamiento' },
  ];
  item5 = [
    { image: '../../../assets/img/saco.png', title: 'Entreno con saco #1.', category: 'saco' },
    { image: '../../../assets/img/saco.png', title: 'Entreno con saco #2.', category: 'saco' },
    { image: '../../../assets/img/saco.png', title: 'Entreno con saco #3.', category: 'saco' }
  ];

  items6 = [
    { image: '../../../assets/img/boxeopareja.png', title: 'Entreno con pareja #1.', category: 'pareja' },
    { image: '../../../assets/img/boxeopareja.png', title: 'Entreno con pareja #2.', category: 'pareja' },
    { image: '../../../assets/img/boxeopareja.png', title: 'Entreno con pareja #3.', category: 'pareja' },
  ];

  allItems = [...this.items, ...this.items2, ...this.items3,...this.items4,...this.item5,...this.items6];

}
