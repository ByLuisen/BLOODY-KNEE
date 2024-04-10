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
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #3.', category: 'con-equipamiento' },
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #1.', category: 'pareja' },
    { image: '../../../assets/img/sombrathai.png', title: 'Entreno sin equipamiento #2.', category: 'sin-equipamiento' },
    { image: '../../../assets/img/saco.png', title: 'Entreno con saco #3.', category: 'saco' },
    { image: '../../../assets/img/boxeopareja.png', title: 'Entreno con pareja #1.', category: 'pareja' },
    { image: '../../../assets/img/boxeoequimapiento.png', title: 'Entreno con equipamiento #1.', category: 'con-equipamiento' },
    { image: '../../../assets/img/sinequipamiento.png', title: 'Entreno sin equipamiento #3.', category: 'sin-equipamiento' },
  ];
    comentarios = [
      {texto:'Ay amiga que guapo es el entrenador'},
      {texto:'Joel te odio mucho nunca te rindas'}, 
      {texto:'Ostia no he visto nada de nada ayuda'}, 
      {texto:'Me ha ayudado mucho a mejorar ahora nadie me para'}, 
      {texto:'El entrenador va un poco fumadete pero se le ve majo'}  
    ];
    
  

}
