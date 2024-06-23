import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Test11Service {


  private endpoint: string = 'http://localhost:1234/api';
  endpointUser: string = 'http://localhost:1234/user'

  constructor(
    private readonly http: HttpClient,
    public router: Router,
  ) { }


  signin(user: User) {
    return this.http.post<any>(`${this.endpoint}/login1`, user)

      .pipe(
        tap((res: any) => {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('sub', res.id);

          /*********** */
          if (user.email !== null && user.email !== undefined) {
            localStorage.setItem('user_email', user.email);
          } else {
            console.log("ya un souucis");
          }
        })
      );

  }



  getUserByEmail(email?: string) {
    let url = this.endpointUser + `/${email}`
    return this.http.get(url)
  }


  setConnectedUser(user: User): void {

    localStorage.setItem('connectedUser', JSON.stringify(user))

  }


  getRole(email?: string) {
    let url = this.endpointUser + `/role/${email}`
    return this.http.get<any>(url);
  }
  getIdIndividu(id?: number) {
    let url = this.endpointUser + `/bb/${id}`
    return this.http.get<any>(url);
  }


}
