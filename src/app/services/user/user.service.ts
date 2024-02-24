import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint: string = 'http://localhost:1234/api'



  constructor(
    private readonly http: HttpClient,
    public router: Router
  ) { }

  // inscription
  signup(user: User) {
    let api = `${this.endpoint}/register`
    return this.http.post(api, user)
  }



}
