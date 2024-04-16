import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  private apiUrl = 'http://localhost:8000/api/sendMessage';


  constructor(private http: HttpClient) { }

  sendMessage(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('An error occurred:', error.error.message);
    } else {
      // El backend retornó un código de respuesta de error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // Retorna un observable con un mensaje de error
    return throwError('Something bad happened; please try again later.');
  }
}
