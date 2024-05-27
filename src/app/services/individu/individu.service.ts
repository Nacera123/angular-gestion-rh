import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Individu } from 'src/app/models/individu';

@Injectable({
  providedIn: 'root'
})
export class IndividuService {

  endpoint: string = 'http://localhost:1234/individu'

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


}
