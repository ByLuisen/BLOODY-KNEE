import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.css']
})
export class ProfileOrdersComponent {

  orders = [
    {
      "comprador": "Juan Pérez",
      "estado": "pendiente",
      "fecha_compra": "2024-04-12",
      "total": 85.50,
      "productos": [
        {
          nombre: "Guantes de boxeo",
          thumbnail: '../../../assets/img/pareja.png',
          precio: 12
        },
        {
          nombre: "Guantes de Mohai Tai",
          thumbnail: '../../../assets/img/pareja.png',
          precio: 12
        },
        {
          nombre: "Guantes de boxeo",
          thumbnail: '../../../assets/img/pareja.png',
          precio: 12
        },
      ],
    },
    {
      "comprador": "María López",
      "estado": "entregado",
      "fecha_compra": "2024-04-11",
      "total": 120.75,
      "productos": [
        {
          nombre: "Zapatillas deportivas",
          thumbnail: '../../../assets/img/zapatillas.png',
          precio: 85
        },
        {
          nombre: "Calcetines deportivos",
          thumbnail: '../../../assets/img/calcetines.png',
          precio: 12
        },
        {
          nombre: "Camiseta deportiva",
          thumbnail: '../../../assets/img/camiseta.png',
          precio: 23.75
        },
      ],
    },
    {
      "comprador": "Carlos Martínez",
      "estado": "en camino",
      "fecha_compra": "2024-04-10",
      "total": 180.30,
      "productos": [
        {
          nombre: "Raqueta de tenis",
          thumbnail: '../../../assets/img/raqueta.png',
          precio: 100
        },
        {
          nombre: "Pelotas de tenis",
          thumbnail: '../../../assets/img/pelotas.png',
          precio: 20.30
        },
        {
          nombre: "Gorra de béisbol",
          thumbnail: '../../../assets/img/gorra.png',
          precio: 60
        },
      ],
    }
  ]

}
