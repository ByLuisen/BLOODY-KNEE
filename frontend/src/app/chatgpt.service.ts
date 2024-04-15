import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private apiUrl = '/api/engines/davinci/completions';


  private apiKey = '';

  constructor(private http: HttpClient) { }

  sendMessage(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const data = {
      prompt: prompt,
      max_tokens: 150
    };

    console.log('Sending request to:', this.apiUrl);  // Para depuración, muestra la URL a la que se enviará la solicitud

    // Realiza la solicitud a la URL relativa
    return this.http.post(this.apiUrl, data, { headers: headers });
  }
}
