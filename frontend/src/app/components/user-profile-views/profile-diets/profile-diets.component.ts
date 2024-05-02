import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-diets',
  templateUrl: './profile-diets.component.html',
  styleUrls: ['./profile-diets.component.css']
})
export class ProfileDietsComponent {
//  Dietas a mostrar
my_diets = [
  {
    nombre: 'Dieta para definir',
    descripcion: "Estás gordito"
  },
  {
    nombre: 'Dieta para perder peso',
    descripcion: "Necesitas bajar unos kilos"
  },
  {
    nombre: 'Dieta para ganar músculo',
    descripcion: "Quieres aumentar tu masa muscular"
  },
  {
    nombre: 'Dieta para mejorar la salud',
    descripcion: "Para una vida más saludable"
  }
];
}
