import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Civilite } from 'src/app/models/civilite';
import { environment } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class CiviliteService {

  // private endpoint: string = 'http://localhost:1234/civilite';

  private endpoint = (environment.production)
    ? 'https://ws.nestech.fr/civilite'
    : 'http://localhost:1234/civilite';

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
  getByDesignation(designation: String): Observable<Civilite> {
    let api = `${this.endpoint}/${designation}`
    return this.http.get<Civilite>(api)

  }

  //get all
  getAll(): Observable<Civilite[]> {
    let api = `${this.endpoint}/list`
    return this.http.get<Civilite[]>(api)
  }

}
