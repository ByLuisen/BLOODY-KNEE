import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { ProfileMenuService } from 'src/app/services/profile-menu-service.service';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  // Opción seleccionada del menú
  selectedOption: string = "";
  showUploadButton = false;

  constructor(public auth: AuthService, private selectedMenuOption: ProfileMenuService) { }
  ngOnInit() {
    this.selectedMenuOption.selectedOptionService.subscribe(option => {
      this.selectedOption = option;
    });
    // Suscribirse al observable auth.user$ para obtener el objeto user completo
    this.auth.user$.subscribe(user => {
      console.log(user);
    });

    // Ts from swipper
    const swiper = new Swiper('.swiper-container', {
      // slidesPerView: '1',
      spaceBetween: 0,
      autoplay: false,
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
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

  }

}
