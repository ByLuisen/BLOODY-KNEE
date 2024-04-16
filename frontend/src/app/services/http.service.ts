import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote } from '../models/Quote';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private jwtHelper: JwtHelperService = new JwtHelperService(); // Servicio para manejar JWT
  url: string = 'http://localhost:8000/api'; // URL base para las solicitudes HTTP
  // url: string = 'http://49.13.160.230/api'; // URL del servidor
  private usuariSubject: BehaviorSubject<any>; // Subject para mantener el estado del usuario autenticado
  public usuario: Observable<any>; // Observable que emite el estado del usuario

  constructor(private _http: HttpClient) {
    this.usuariSubject = new BehaviorSubject<any>(
      localStorage.getItem('myToken')
    ); // Inicializar el subject con el token almacenado en el localStorage
    this.usuario = this.usuariSubject.asObservable(); // Observable que emite el estado del usuario
  }

  // Obtener el nombre del usuario desde el token JWT
  getUserName(): string | null {
    const token = localStorage.getItem('myToken');

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.name || null;
    }

    return null;
  }

  // Obtener el rol del usuario desde el token JWT
  getRole(): string | null {
    const token = localStorage.getItem('myToken');

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role || null;
    }

    return null;
  }

  // Obtener el estado actual del usuario
  public usuariData(): any {
    return this.usuariSubject.value;
  }

  // Obtener todos los usuarios
  getQuotes(): Observable<Quote[]> {
    return this._http
      .get<any>(`${this.url}/quotes`)
      .pipe(map((response) => response.data as Quote[]));
  }

}
