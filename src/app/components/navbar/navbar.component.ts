import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.checkIfLoggedIn();
  }

  checkIfLoggedIn(): boolean {
    // Remplacez ceci par votre logique de vérification d'authentification
    return !!localStorage.getItem('access_token');
  }

  logOut(): void {
    console.log('je fonctionne');
    localStorage.removeItem('sub');
    localStorage.removeItem('user_email');
    localStorage.removeItem('access_token');
    localStorage.removeItem('connectedUser');
    localStorage.removeItem('id_individu');

    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}



