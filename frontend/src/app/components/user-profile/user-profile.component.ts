import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { ProfileMenuService } from 'src/app/services/profile-menu-service.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  // Opción seleccionada del menú
  selectedOption: string = "";
  showUploadButton = false;
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


  // Ts from swipper
  swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: false,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });

  constructor(public auth: AuthService, private selectedMenuOption: ProfileMenuService) { }
  ngOnInit() {
    this.selectedMenuOption.selectedOptionService.subscribe(option => {
      this.selectedOption = option;
    });
    // // Suscribirse al observable auth.user$ para obtener el objeto user completo
    // this.auth.user$.subscribe(user => {
    //   console.log(user);
    // });

  }

}
