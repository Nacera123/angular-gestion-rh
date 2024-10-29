import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { EtatCandidature } from 'src/app/models/candidature/etatCandidature';
import { environment } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class EtatCandidatureService {

  // private endpoint: string = 'http://localhost:1234/etat-candidature';

  private endpoint = (environment.production)
    ? 'https://ws.nestech.fr/etat-candidature'
    : 'http://localhost:1234/etat-candidature';

  constructor(
    private readonly http: HttpClient,
    private router: Router
  ) { }

  ///gestion des erreur
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error(' Erreur côté client: ', error.error.message);
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


  getAll(): Observable<EtatCandidature[]> {
    let api = `${this.endpoint}/list`;

    return this.http.get<EtatCandidature[]>(api)
      .pipe(
        catchError(
          error => {
            console.error('l\'erreur : ', error);
            throw error;

          }
        )
      )
  }

  getByEtat(etat: String): Observable<EtatCandidature> {
    let api = `${this.endpoint}/list/etats/${etat}`
    return this.http.get<EtatCandidature>(api)
  }

  //4- modification d'un etat de candidature
  update(etatCandidature: EtatCandidature): Observable<EtatCandidature> {
    let api = `${this.endpoint}/${etatCandidature.id}/update`;
    return this.http.post<EtatCandidature>(api, etatCandidature)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })

      );
  }
}
