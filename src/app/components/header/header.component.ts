import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { HomeComponent } from 'src/app/pages/general/home/home.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  headerData: any;

  isConnected: boolean = true;



  constructor(private authService: AuthenticationService,
    private router: Router
  ) {
    this.headerData = {
      logo: './assets/img/logo.png'
    };

  }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  getIsConnected(): boolean {
    // return this.authService.isLoggedIn;
    // return this.authService.isLoggedIn;
    if (this.authService.isLoggedIn) {
      return this.isConnected
    } else {
      return !this.isConnected
    }
  }

  logOut(): void {
    console.log('je fonctionne');

    localStorage.removeItem('access_token');
    localStorage.removeItem('connectedUser');
    localStorage.removeItem('user');
    localStorage.removeItem('sub');
    localStorage.removeItem('user_email');
    this.router.navigate(['/']);
  }

}
