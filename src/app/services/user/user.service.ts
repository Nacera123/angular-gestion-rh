import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = 'http://localhost:1234/api'

  endpointUser: string = 'http://localhost:1234/user'




  constructor(
    private readonly http: HttpClient,
    public router: Router
  ) { }

  // inscription
  signup(user: User): Observable<any> {
    let api = `${this.endpoint}/register`
    return this.http.post(api, user)

      /******* */
      .pipe(
        // Gestion des erreurs
        catchError(this.handleError),
        tap((res: any) => {
          console.log('Inscription réussie', res);

        })
        /** ********/
      )
  }

  /**
   * Moethode qui stoque l'objet utilisateur
   * @param user 
   */
  setConnectedUser(user: User): void {

    localStorage.setItem('connectedUser', JSON.stringify(user))
  }

  /**
   * Methode qui recupere l'utilisateur
   * @returns 
   */

  getConnectedUser(): User {

    if (localStorage.getItem('connectedUser')) {

      return JSON.parse(localStorage.getItem('connectedUser') as string)
    }
    return {};
  }


  settoto(user: User) {
    localStorage.setItem('id individu', JSON.stringify(user.individu?._id))
  }


  gettoto(): User {

    if (localStorage.getItem('id individu')) {

      return JSON.parse(localStorage.getItem('id individur') as string)
    }
    return {};
  }


  getUserByIndividu(id?: number) {
    let url = this.endpointUser + `/b/${id}`
    return this.http.get(url)
  }

  /**
   * Recuperer l'email
   * @param email 
   * @returns 
   */

  getUserByEmail(email?: string) {
    let url = this.endpointUser + `/${email}`
    return this.http.get(url)
  }


  /******************************* */


  /**
   * recup le role
   * @param email 
   * @returns 
   */
  getRole(email?: string) {
    let url = this.endpointUser + `/role/${email}`
    return this.http.get<any>(url);
  }

  getTest(id?: number) {
    let url = this.endpointUser + `/bb/${id}`
    return this.http.get<any>(url);
  }


  /************Recup Id Individu ************** */


  // Méthode pour définir l'ID de l'individu
  getIndividuId(): Observable<string | null> {
    const indId = localStorage.getItem('individu_id');
    return of(indId);
  }


  /********************* */
  private handleError(error: any) {
    console.error('An error occurred:', error);

    // Extraire le message d'erreur du corps de la réponse
    let errorMessage = 'Une erreur s\'est produite';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else if (error.error && error.error.message) {
      // Erreur côté serveur (supposant que le backend renvoie le message d'erreur dans un format JSON)
      errorMessage = error.error.message;
    }

    // Réémettez l'erreur pour que le composant puisse également la traiter
    return throwError(errorMessage);
  }

  /********************* */
  addUserForIndividu(id: Number, user: User): Observable<User> {
    const api = `${this.endpoint}/${id}/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(api, user, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  getIdIndividu(id?: number) {
    let url = this.endpointUser + `/bb/${id}`
    return this.http.get<any>(url);
  }
}
