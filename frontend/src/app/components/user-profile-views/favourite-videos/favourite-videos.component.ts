import { Component } from '@angular/core';

@Component({
  selector: 'app-favourite-videos',
  templateUrl: './favourite-videos.component.html',
  styleUrls: ['./favourite-videos.component.css']
})
export class FavouriteVideosComponent {
 // Videos favoritos a mostrar
 my_videos = [
  {
    title: 'Entreno con pareja #1.',
    author: 'John Doe',
    views: Math.floor(Math.random() * 1000),
    description: 'Este video muestra una sesión de entrenamiento con un compañero.',
    category: 'Entrenamiento',
    thumbnail: '../../../assets/img/pareja.png'
  },
  {
    title: 'Entreno con pareja #1.',
    author: 'John Doe',
    views: Math.floor(Math.random() * 1000),
    description: 'Este video muestra una sesión de entrenamiento con un compañero.',
    category: 'Entrenamiento',
    thumbnail: '../../../assets/img/pareja.png'
  },
  {
    title: 'Entreno con pareja #1.',
    author: 'John Doe',
    views: Math.floor(Math.random() * 1000),
    description: 'Este video muestra una sesión de entrenamiento con un compañero.',
    category: 'Entrenamiento',
    thumbnail: '../../../assets/img/pareja.png'
  },
  {
    title: 'Entreno con pareja #1.',
    author: 'John Doe',
    views: Math.floor(Math.random() * 1000),
    description: 'Este video muestra una sesión de entrenamiento con un compañero.',
    category: 'Entrenamiento',
    thumbnail: '../../../assets/img/pareja.png'
  },
  {
    title: 'Entreno con pareja #1.',
    author: 'John Doe',
    views: Math.floor(Math.random() * 1000),
    description: 'Este video muestra una sesión de entrenamiento con un compañero.',
    category: 'Entrenamiento',
    thumbnail: '../../../assets/img/pareja.png'
  },
];
}
