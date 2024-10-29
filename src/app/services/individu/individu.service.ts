import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Individu } from 'src/app/models/individu';
import { environment } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class IndividuService {

  // endpoint: string = 'http://localhost:1234/individu'

  private endpoint = (environment.production)
    ? 'https://ws.nestech.fr/individu'
    : 'http://localhost:1234/individu';


  constructor(
    private readonly http: HttpClient,
    private router: Router

  ) { }


  getAll(): Observable<Individu[]> {
    let api = `${this.endpoint}/get`;
    return this.http.get<Individu[]>(api)
      .pipe(
        catchError(
          error => {
            console.error('erreur : ', error);
            throw error

          }
        )
      )
  }

  getById(_id: number): Observable<Individu> {

    let api = `${this.endpoint}/get/individu/${_id}`
    return this.http.get<Individu>(api)

  }

  getByEmail(email: String): Observable<Individu> {

    let api = `${this.endpoint}/nom/email/${email}`
    return this.http.get<Individu>(api)

  }


}
