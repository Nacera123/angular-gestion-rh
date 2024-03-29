import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthDto } from 'src/app/models/authDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly endpoint: string = 'http://localhost:1234/api';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');



  /******************** */
  private currentUserEmailSubject = new BehaviorSubject<string>(''); // Utilisation de BehaviorSubject pour la gestion des abonnements

  currentUserEmail$: Observable<string> = this.currentUserEmailSubject.asObservable();

  /************** */

  constructor(
    private readonly http: HttpClient,
    public router: Router,
  ) { }

  signin(user: AuthDto) {
    return this.http.post<any>(`${this.endpoint}/login`, user, { headers: this.headers })


      .pipe(
        catchError(this.handleError),
        tap((res: any) => {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('sub', res.id);

          /*********** */
          if (user.email !== null && user.email !== undefined) {
            localStorage.setItem('user_email', user.email);
            this.currentUserEmailSubject.next(user.email);
          } else {
            console.log("ya un souucis");

          }
        })
      );

  }

  // toto: Observable<string | null> = this.getUserEmail();

  getUserEmail(): Observable<string | null> {
    // Récupérer la valeur de l'e-mail de l'utilisateur depuis le localStorage
    const userEmail = localStorage.getItem('user_email');

    // Créer un Observable à partir de la valeur récupérée
    return of(userEmail);
  }
  getToken(): string | null {

    console.log(localStorage);
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = this.getToken();
    return authToken !== null;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
