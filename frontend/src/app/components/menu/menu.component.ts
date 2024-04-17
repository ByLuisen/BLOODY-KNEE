import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private http: HttpService) {

    this.http.getAccessToken().subscribe(
      (token) => {
        console.log('Respuesta:', token);
        // Aquí puedes manejar la respuesta como desees
      },
      (error) => {
        console.error('Error:', error);
        // Aquí puedes manejar el error si la solicitud falla
      }
    );
  }

}
