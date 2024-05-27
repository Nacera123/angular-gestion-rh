import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { EtatCandidature } from 'src/app/models/candidature/etatCandidature';

@Injectable({
  providedIn: 'root'
})
export class EtatCandidatureService {

  private endpoint: string = 'http://localhost:1234/etat-candidature';


  constructor(
    private readonly http: HttpClient,
    private router: Router
  ) { }



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
}
