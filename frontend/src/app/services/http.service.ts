import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote } from '../models/Quote';
import { Video } from '../models/Video';
import { environment } from 'src/environments/environment.development';

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

  getAccessToken(): Observable<any> {
    // Crear el encabezado
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this._http
      .post<any>(
        environment.ATEndpoint,
        {
          client_id: environment.MtMClientID,
          client_secret:
            environment.MtMClientSecret,
          audience: environment.audience,
          grant_type: 'client_credentials',
        },
        { headers: headers }
      )
      .pipe(map((response) => response));
  }

  // Obtener el estado actual del usuario
  public usuariData(): any {
    return this.usuariSubject.value;
  }

  // Obtener todas los cuotas
  getQuotes(): Observable<Quote[]> {
    return this._http
      .get<any>(`${this.url}/quotes`)
      .pipe(map((response) => response.data as Quote[]));
  }

  // Obtener todos los videos
  getVideos(): Observable<Video[]> {
    return this._http
      .get<any>(`${this.url}/quotes`)
      .pipe(map((response) => response.data as Video[]));
  }
}
