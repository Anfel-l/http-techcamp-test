import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Definimos la URL de la API - Endpoint
  private baseUrl = '';

  // Inyectamos el servicio HttpClient
  constructor(private http: HttpClient) { }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {

    // Verificar si el error es un error de cliente o un error de servidor
    if (error.error instanceof ErrorEvent) {

      // Ocurrió un error en el lado del cliente o en la red
      console.error('An error occurred:', error.error.message);
    } else {

      // El backend devolvió un código de respuesta sin éxito
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }

    // Devuelve un observable con un mensaje de error orientado al usuario
    return throwError(() => new Error('Something went wrong; please try again later.') );
      
  }

  // Métodos CRUD

  // GET
  getDatos(): Observable<any[]> {

    // Devuelve un observable con un array de objetos
    return this.http.get<any[]>(`${this.baseUrl}.json`)

      // Manejo de errores
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET por ID
  getDatoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}.json`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // POST
  agregarDato(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}.json`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // PUT
  actualizarDato(key: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${key}.json`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  eliminarDato(key: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${key}.json`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
