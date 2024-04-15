import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-menu-movile',
  templateUrl: './menu-movile.component.html',
  styleUrls: ['./menu-movile.component.css']
})
export class MenuMovileComponent {
  expanded: boolean = false;
  
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  expandDiv() {
    const div = document.getElementById("expandibleDiv")!;
    const button = document.querySelector(".fixed-button") as HTMLElement;

    if (!this.expanded) {
      // Cambiar posición del botón al centro
      button.style.bottom = "50%";
      button.style.right = "50%";
      button.style.transform = "translate(50%, 50%)";

      // Expandir el div
      div.style.height = "340px"; // Cambia este valor al deseado
    } else {
      // Revertir los cambios en el botón y el div
      button.style.bottom = "40px";
      button.style.right = "40px";
      button.style.transform = "none";
      div.style.height = "0";
    }
    this.expanded = !this.expanded;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const div = document.getElementById("expandibleDiv")!;

    // Si se hace clic fuera del div expandible, revertir los cambios en el botón y el div
    if (div.contains(target) && this.expanded) {
      this.expandDiv();
    }
  }
}
