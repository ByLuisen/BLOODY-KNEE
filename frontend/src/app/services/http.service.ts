import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Quote } from '../models/Quote';
import { Video } from '../models/Video';
import { Diet } from '../models/Diet';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '@auth0/auth0-angular';
import { Role } from '../models/Role';
import { ConditionalExpr } from '@angular/compiler';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/Product';
import { Comment } from '../models/Comment';


@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private jwtHelper: JwtHelperService = new JwtHelperService(); // Servicio para manejar JWT
  url: string = 'http://localhost:8000/api'; // URL base para las solicitudes HTTP
  // url: string = 'https://bloodyknee.es/api'; // URL del servidor

  constructor(private _http: HttpClient, private auth: AuthService) { }

  /**
   * Retrieves an access token for authorization.
   * @returns An observable that emits the access token after the request is completed.
   */
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

  /**
   * Retrieves the role of the authenticated user.
   * @returns An observable that emits the user's role after the request is completed.
   */
  getRole(): Observable<Role[]> {
    return new Observable<Role[]>((observer) => {
      this.auth.user$.subscribe((user) => {
        // Verifica si user?.sub tiene un valor antes de continuar
        if (user?.sub) {
          const url = `${environment.audience}users/${user?.sub}/roles`;
          const headers = new HttpHeaders({
            Accept: 'application/json',
            // Authorization: `Bearer ${environment.developmentAccessToken}`,
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

  /**
   * Retrieves all quotes.
   * @returns An observable that emits an array of quotes after the request is completed.
   */
  getQuotes(): Observable<Quote[]> {
    return this._http
      .get<any>(`${this.url}/quotes`)
      .pipe(map((response) => response.data as Quote[]));
  }

  /**
   * Retrieves videos based on modality and type.
   * @param modality_id The ID of the modality.
   * @param type_id The ID of the type.
   * @returns An observable that emits an array of videos after the request is completed.
   */
  getVideosModality(modality_id: number, type_id: number): Observable<Video[]> {
    return this._http
      .get<{ data: Video[] }>(
        `${this.url}/modalityvideo/${modality_id}/${type_id}`
      )
      .pipe(map((response) => response.data));
  }

  getVideoById(id: number): Observable<Video> {
    return new Observable<Video>((observer) => {
      this._http.get<{ data: Video }>(`${this.url}/getvideobyid/${id}`)
        .subscribe(
          (response) => {
            observer.next(response.data);
            observer.complete();
            // Actualizar las visitas del video
            this.updateVideoVisits(id).subscribe(
              () => {
                console.log('Visitas actualizadas');
              },
              (error) => {
                console.error('Error al actualizar las visitas', error);
              }
            );
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }

  /**
   * Retrieves videos based on modality and type.
   * @param modality_id The ID of the modality.
   * @param type_id The ID of the type.
   * @returns An observable that emits an array of videos after the request is completed.
   */
  getVideos(): Observable<Video[]> {
    return this._http
      .get<any>(`${this.url}/videos`)
      .pipe(map((response) => response.data as Video[]));
  }

  getCommentById(id: number): Observable<Comment[]> {
    return new Observable<Comment[]>((observer) => {
      this._http.get<{ data: Comment[] }>(`${this.url}/getcommentbyid/${id}`)
        .subscribe(
          (response) => {
            observer.next(response.data);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }

  

  countAndUpdateComments(videoId: number): Observable<any> {
    const url = `${this.url}/videos/${videoId}/update-comments`;
    return this._http.post(url, {}).pipe(
      catchError((error) => {
        console.error('Error al contar y actualizar comentarios:', error);
        return of(null);
      })
    );
  }

  /**
  * Updates the number of likes for a video.
  * @param videoId The ID of the video.
  * @returns An observable that emits the updated information after the request is completed.
  */
  updateLikes(videoId: number): Observable<any> {
    const url = `${this.url}/updateLikes/${videoId}`;
    return this.auth.idTokenClaims$.pipe(
      switchMap((user) => {
        console.log(user)
        // Construye el cuerpo de la solicitud con el correo electrónico y la conexión
        const body = {
          email: user ? user.email : '',  // Obtén el correo electrónico del usuario actual
          connection: user ? user['sub'].split('|')[0] : '' // Obtén la conexión del usuario actual
        };
        console.log(body);

        // Realiza la solicitud PUT al servidor con el cuerpo construido
        return this._http.put(url, body);
      })
    );
  }
  /**
   * Updates the number of dislikes for a video.
   * @param videoId The ID of the video.
   * @returns An observable that emits the updated information after the request is completed.
   */
  updateDislikes(videoId: number): Observable<any> {
    const url = `${this.url}/updateDislikes/${videoId}`;
    return this.auth.idTokenClaims$.pipe(
      switchMap((user) => {
        console.log(user)
        // Construye el cuerpo de la solicitud con el correo electrónico y la conexión
        const body = {
          email: user ? user.email : '',  // Obtén el correo electrónico del usuario actual
          connection: user ? user['sub'].split('|')[0] : '' // Obtén la conexión del usuario actual
        };
        console.log(body);

        // Realiza la solicitud PUT al servidor con el cuerpo construido
        return this._http.put(url, body);
      })
    );
  }

  /**
   * Updates the number of visits for a video.
   * @param videoId The ID of the video.
   * @returns An observable that emits the updated information after the request is completed.
   */
  updateVideoVisits(videoId: number): Observable<any> {
    const url = `${this.url}/videos/${videoId}/visit`;

    // Utiliza switchMap para combinar el resultado del observable user$ con la solicitud HTTP put
    return this.auth.user$.pipe(
      switchMap((user) => {
        const body = { email: user ? user.email : '' };
        console.log(body);
        // Realiza una solicitud PUT al servidor con el cuerpo que incluye el usuario
        return this._http.put(url, body);
      })
    );
  }

  /**
   * Retrieves all products.
   * @returns An observable that emits an array of products after the request is completed.
   */
  getProducts(): Observable<Product[]> {
    return this._http
      .get<any>(`${this.url}/products`)
      .pipe(map((response) => response.data as Product[]));
  }

  getProductsById(id: number[]): Observable<Product[]> {
    // Construye la URL con los IDs como parámetros de consulta
    const params = new HttpParams().set('id', id.join(',')); // Unir los IDs en una cadena separada por comas
    return this._http
      .get<{ data: Product[] }>(`${this.url}/getproductbyid/${id}`, { params })
      .pipe(map((response) => response.data));
  }


  // Obtener todos los videos
  getDiets(): Observable<Diet[]> {
    return this._http
      .get<any>(`${this.url}/diets`)
      .pipe(map((response) => response.data as Diet[]));
  }

  /**
   * Updates the information of a video on the server.
   * @param video The Video object containing the updated information of the video.
   * @returns An observable that emits the updated video after the request is completed.
   */
  editVideo(video: Video): Observable<Video> {
    const url = `${this.url}/videos/${video.id}`;
    return this._http.put<Video>(url, video);
  }

  /**
   * Deletes a video from the server.
   * @param videoId The ID of the video to be deleted.
   * @returns An observable that emits void after the deletion request is completed.
   */
  deleteVideo(videoId: number): Observable<void> {
    const url = `${this.url}/videos/${videoId}`;
    return this._http.delete<void>(url);
  }

  /**
   * Get the brand of a product by ID
   * @param productId the ID of the product
   * @returns An observable than emits
   */
  getProductBrand(productId: number): Observable<any> {
    return this._http.get<any>(`${this.url}/products/${productId}/brand`);
  }
  subscribeQuote(quotePriceId: string): Observable<any> {
    return this.auth.user$.pipe(
      switchMap((user) => {
        if (!user) {
          return of(null); // Emite un valor nulo si el usuario no está autenticado
        }

        const url = `${this.url}/subscription`;
        const body = {
          price_id: quotePriceId,
          user_email: user.email ?? '',
          href: window.location.href
        };
        return this._http.post(url, body).pipe(
          catchError((error) => {
            // Manejar errores aquí
            console.error('Error en la solicitud HTTP:', error);
            return of(null); // Emite un valor nulo si hay un error
          })
        );
      })
    );
  }

  checkout(products: Product[]): Observable<any> {
    return this.auth.user$.pipe(
      switchMap((user) => {
        if (!user) {
          return of(null); // Emite un valor nulo si el usuario no está autenticado
        }

        const url = `${this.url}/payment`;
        const body = {
          user_email: user.email ?? '',
          products: products,
          href: window.location.href,
          origin: window.location.origin,
        };
        return this._http.post(url, body).pipe(
          catchError((error) => {
            // Manejar errores aquí
            console.error('Error en la solicitud HTTP:', error);
            return of(null); // Emite un valor nulo si hay un error
          })
        );
      })
    );
  }


  addComment(videoId: number, comment: string): Observable<any> {
    return this.auth.user$.pipe(
      switchMap((user) => {
        if (!user) {
          return of(null); // Emite un valor nulo si el usuario no está autenticado
        }
        const url = `${this.url}/comments`;
        const body = {
          user_id: user.sub, // Obtén el ID del usuario autenticado
          video_id: videoId,
          comment: comment,
          date: new Date().toISOString() // Establece la fecha actual
        };
        return this._http.post(url, body).pipe(
          catchError((error) => {
            // Manejar errores aquí
            console.error('Error en la solicitud HTTP:', error);
            return of(null); // Emite un valor nulo si hay un error
          })
        );
      })
    );
  }
  
}
