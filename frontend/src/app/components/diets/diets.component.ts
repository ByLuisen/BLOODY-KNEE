import { Component } from '@angular/core';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css']
})
export class DietsComponent {
  height!: number;
  weight!: number;
  result: number | null = null;
  flashingIndex: number | null = null; // Variable para controlar el parpadeo

  showChatbot: boolean = false;

  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
  }

  calculate() {
    if (this.height && this.weight) {
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

      // Lógica para detener el parpadeo después de unos segundos
      setTimeout(() => {
        this.flashingIndex = null;
      }, 2500);
    }
}
}
