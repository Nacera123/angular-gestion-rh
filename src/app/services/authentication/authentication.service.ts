import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthDto } from 'src/app/models/authDto';
import { environment } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly endpoint = (environment.production)
    ? 'https://ws.nestech.fr/api'
    : 'http://localhost:1234/api';


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
    return this.http.post<any>(`${this.endpoint}/login1`, user, { headers: this.headers })


      .pipe(
        catchError(this.handleError),
        tap((res: any) => {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('sub', res.id);

          /*********** */
          if (user.email !== null && user.email !== undefined) {
            localStorage.setItem('user_email', user.email);
            this.currentUserEmailSubject.next(user.email);
            // localStorage.setItem('id', user.individu?._id);
            // this.currentUserEmailSubject.next(user.individu?._id);

          } else {
            console.log("ya un souucis");

          }
        })
      );

  }

  aa(): Observable<string | null> {
    // Récupérer la valeur de l'e-mail de l'utilisateur depuis le localStorage
    const id = localStorage.getItem('id');

    // Créer un Observable à partir de la valeur récupérée
    return of(id);
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



  getCurrentUserId(): number | null {
    // Suppose you store user ID in localStorage after successful login
    return localStorage.getItem('sub') ? parseInt(localStorage.getItem('sub')!, 10) : null;
  }



}
