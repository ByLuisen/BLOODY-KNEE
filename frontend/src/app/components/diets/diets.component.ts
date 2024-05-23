import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Diet } from 'src/app/models/Diet';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css'],
})
export class DietsComponent implements OnInit {
  height!: number;
  weight!: number;
  result: number | null = null;
  flashingIndex: number | null = null;
  showChatbot: boolean = false;
  diets: Diet[] = [];
  modalOpen: boolean = false;
  modalStates: { [key: string]: boolean } = {};
  errorMessage: string | null = null;
  role: string | null = null;
  // Mensaje para informar al admin
  infoAdmin: string = '';
  loading: boolean = false;

  constructor(private http: HttpService, private auth: AuthService) {}

  ngOnInit(): void {
    this.getDietData();
    this.auth.isAuthenticated$.subscribe((isauth) => {
      if (isauth) {
        this.http.getRole().subscribe((role) => {
          console.log(role.data);
          this.role = role.data;
        });
      } else {
        this.role = 'admin'; // TODO cambiar a "Basic"
      }
    });
  }

  openPopup() {
    const url =
      'https://mediafiles.botpress.cloud/3f57b270-55b9-4672-b183-05107ff22d9d/webchat/bot.html';
    let width = 400;
    let height = 700;
    let leftPosition = 1500;
    let topPosition = 150;

    // Verificar si es un dispositivo móvil
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // Ajustar dimensiones y posición para móviles
      width = window.innerWidth * 0.8; // 80% del ancho de la ventana
      height = window.innerHeight * 0.8; // 80% de la altura de la ventana
      leftPosition = (window.innerWidth - width) / 2; // Centrar horizontalmente
      topPosition = (window.innerHeight - height) / 2; // Centrar verticalmente
    }

    // Abrir el popup usando window.open
    window.open(
      url,
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=' +
        topPosition +
        ',left=' +
        leftPosition +
        ',width=' +
        width +
        ',height=' +
        height
    );
  }

  openModal(image: string) {
    this.modalStates[image] = true; // Abrir el modal correspondiente a la imagen
    this.modalOpen = true;
    document.body.classList.add('modal-open');
  }

  closeModal(image: string) {
    this.modalStates[image] = false; // Cerrar el modal correspondiente a la imagen
    this.modalOpen = false;
    document.body.classList.remove('modal-open');
  }

  getDietData(): void {
    this.loading = true;
    this.http.getDiets().subscribe((diets: Diet[]) => {
      this.diets = diets;
      this.loading = false
      console.log(this.diets);
    });
  }
  calculate() {
    const minHeight = 50; // Altura mínima en cm
    const maxHeight = 250; // Altura máxima en cm
    const minWeight = 3; // Peso mínimo en kg
    const maxWeight = 300; // Peso máximo en kg
  
    // Verifica si la entrada contiene caracteres especiales
    const specialCharPattern = /[^0-9.]/;
  
    if (this.height && this.weight) {
      // Asegurando que height y weight son tratados como cadenas
      const heightStr = this.height.toString();
      const weightStr = this.weight.toString();
  
      if (specialCharPattern.test(heightStr) || specialCharPattern.test(weightStr)) {
        this.errorMessage = 'Por favor, introduce números válidos para la altura y el peso.';
        return; // Sale de la función si hay un error
      }
  
      if (isNaN(Number(this.height)) || isNaN(Number(this.weight))) {
        this.errorMessage = 'Por favor, introduce números válidos para la altura y el peso.';
        return; // Sale de la función si hay un error
      }
  
      if (this.height < minHeight || this.height > maxHeight) {
        this.errorMessage = `La altura debe estar entre ${minHeight} cm y ${maxHeight} cm.`;
        return;
      }
  
      if (this.weight < minWeight || this.weight > maxWeight) {
        this.errorMessage = `El peso debe estar entre ${minWeight} kg y ${maxWeight} kg.`;
        return;
      }
  
      const heightInMeters = this.height / 100;
      this.result = this.weight / (heightInMeters * heightInMeters);
  
      // Determina el índice del div que debe parpadear según el resultado del IMC
      if (this.result < 18.5) {
        this.flashingIndex = 0;
      } else if (this.result >= 18.5 && this.result < 25) {
        this.flashingIndex = 1;
      } else if (this.result >= 25 && this.result < 30) {
        this.flashingIndex = 2;
      } else {
        this.flashingIndex = 3;
      }
      this.errorMessage = '';
      // Lógica para detener el parpadeo después de unos segundos
      setTimeout(() => {
        this.flashingIndex = null;
      }, 2500);
    } else {
      this.errorMessage = 'Por favor, introduce valores para la altura y el peso.';
    }
  }
  

  
}
