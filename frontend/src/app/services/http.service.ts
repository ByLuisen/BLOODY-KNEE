import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote } from '../models/Quote';
import { Video } from '../models/Video';

import { environment } from 'src/environments/environment.development';
import { AuthService } from '@auth0/auth0-angular';
import { Role } from '../models/Role';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private jwtHelper: JwtHelperService = new JwtHelperService(); // Servicio para manejar JWT
  url: string = 'http://localhost:8000/api'; // URL base para las solicitudes HTTP
  // url: string = 'http://49.13.160.230/api'; // URL del servidor

  constructor(private _http: HttpClient, private auth: AuthService) { }

  getAccessToken(): Observable<any> {
    const url = 'https://dev-yyzuj3kafug18e38.eu.auth0.com/oauth/token';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      client_id: 'CpniTzVOuifOIXQwMfoZ5MpN86tSUEv7',
      client_secret:
        '8xk0AOKxyaRP2vf9WSy36VYJRYq2Xg-MkJZUF2xPVNsNm1UIDK85W258VmHYbVP-',
      audience: 'https://dev-yyzuj3kafug18e38.eu.auth0.com/api/v2/',
      grant_type: 'client_credentials',
    };

    return this._http.post<any>(url, body, { headers: headers });
  }

  getRole(): Observable<Role[]> {
    return new Observable<Role[]>((observer) => {
      this.auth.user$.subscribe((user) => {
        // Verifica si user?.sub tiene un valor antes de continuar
        if (user?.sub) {
            const url = `${environment.audience}users/${user?.sub}/roles`;
            const headers = new HttpHeaders({
              Accept: 'application/json',
              Authorization: `Bearer ${environment.develpmentAccessToken}`,
            });

            this._http.get<any>(url, { headers: headers }).subscribe(
              (response) => {
                observer.next(response);
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
        } else {
          observer.error(
            'No se pudo obtener el rol: el usuario no está autenticado'
          );
        }
      });
    });
  }

  // Obtener todas los cuotas
  getQuotes(): Observable<Quote[]> {
    return this._http
      .get<any>(`${this.url}/quotes`)
      .pipe(map((response) => response.data as Quote[]));
  }

  getVideosModality(modality_id: number, type_id: number): Observable<Video[]> {
    return this._http
      .get<{ data: Video[] }>(
        `${this.url}/modalityvideo/${modality_id}/${type_id}`
      )
      .pipe(map((response) => response.data));
  }

  getVideoById(id: number): Observable<Video[]> {
    return this._http
      .get<{ data: Video[] }>(`${this.url}/getvideobyid/${id}`)
      .pipe(map((response) => response.data));
  }
  // Obtener todos los videos
  getVideos(): Observable<Video[]> {
    return this._http
      .get<any>(`${this.url}/videos`)
      .pipe(map((response) => response.data as Video[]));
  }

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this._http
      .get<any>(`${this.url}/products`)
      .pipe(map((response) => response.data as Product[]));
  }

  getProductById(id: number): Observable<Product[]> {
    return this._http
      .get<{ data: Product[] }>(`${this.url}/getproductbyid/${id}`)
      .pipe(map((response) => response.data));
  }

}
