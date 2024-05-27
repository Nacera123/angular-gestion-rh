import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Pays } from 'src/app/models/pays';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  private endpoint: string = 'http://localhost:1234/pays';

  constructor(
    private readonly http: HttpClient
  ) { }

  // gestion des erreurs:
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Erreur côté client: ', error.error.message);
    } else {
      // Erreur côté serveur
      console.log('Erreur côté serveur : ', error.statusText);
      console.log('mon test : ', error);

      console.error(
        `Error Code: ${error.status}\n` +
        `Message: ${error.error}` +
        `MessageTest: ${error.error.message}`
      );
    }
    return throwError(error.error);
  }


  //get By designation
  getByDesignation(designation: String): Observable<Pays> {
    let api = `${this.endpoint}/list/${designation}`
    return this.http.get<Pays>(api)

  }

  //get all
  getAll(): Observable<Pays[]> {
    let api = `${this.endpoint}/list`
    return this.http.get<Pays[]>(api)
  }

}

