import { Component } from '@angular/core';

@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrls: ['./liked-videos.component.css']
})
export class LikedVideosComponent {
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
      thumbnail: '../../../assets/img/conequipamiento.png'
    },
  ];
}
