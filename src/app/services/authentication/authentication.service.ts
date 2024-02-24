import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthDto } from 'src/app/models/authDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly endpoint: string = 'http://localhost:1234/api';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private currentUser = {};

  constructor(
    private readonly http: HttpClient,
    public router: Router
  ) { }

  signin(user: AuthDto) {
    return this.http.post<any>(`${this.endpoint}/login`, user, { headers: this.headers })


      .pipe(
        catchError(this.handleError),
        tap((res: any) => {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('sub', res.id);
          this.router.navigate(['/']);  // Redirection vers la page d'accueil après la connexion réussie
        })
      );


    // return this.http
    //   .post(`${this.endpoint}/signin`, user)
    //   .subscribe(
    //     (res: any) => {
    //       localStorage.setItem('access_token', res.token)
    //       localStorage.setItem('sub', res.id)
    //       this.router.navigate(['' + res.id])
    //     })
  }

  getToken(): string | null {
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
