import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Diet } from 'src/app/models/Diet';
@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css']
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

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getDietData();
  }

  openPopup() {
    const url = "https://mediafiles.botpress.cloud/3f57b270-55b9-4672-b183-05107ff22d9d/webchat/bot.html";
    const width = 400;
    const height = 700;
    const leftPosition = 1500;
    const topPosition = 150;
  

    // Abrir el popup usando window.open
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=" + topPosition + ",left=" + leftPosition + ",width=" + width + ",height=" + height);
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
    this.http.getDiets()
      .subscribe((diets: Diet[]) => {
        this.diets = diets;
        console.log(this.diets);
      });
  }

  calculate() {
    if (this.height && this.weight) {
      if (isNaN(this.height) || isNaN(this.weight)) { // Verifica si la entrada es un número
        this.errorMessage = "Por favor, introduce números válidos para la altura y el peso.";
        return; // Sale de la función si hay un error
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
      this.errorMessage = "";
      // Lógica para detener el parpadeo después de unos segundos
      setTimeout(() => {
        this.flashingIndex = null;
      }, 2500);
    }else {
      this.errorMessage = "Por favor, introduce valores para la altura y el peso.";
    }
  }
}
