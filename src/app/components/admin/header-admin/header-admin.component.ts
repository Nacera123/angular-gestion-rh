import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SidebarService } from 'src/app/sidebar.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {




  currentUserEmail: string | null = null; // Initialisez currentUserEmail à null pour éviter l'erreur

  imgAdmin: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private sidebarService: SidebarService) {
    this.imgAdmin = {
      img1: './assets/img/admin/profile.PNG'
    };
  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  ngOnInit(): void {


    this.authService.getUserEmail()?.subscribe(
      email => {
        this.currentUserEmail = email;
      }
    );
  }



  logOut(): void {

    console.log('je fonctionne');
    localStorage.removeItem('sub');
    localStorage.removeItem('user_email');
    localStorage.removeItem('access_token');
    localStorage.removeItem('connectedUser');
    localStorage.removeItem('id_individu');

    // localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
