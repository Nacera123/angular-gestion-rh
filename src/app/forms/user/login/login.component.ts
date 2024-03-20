import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthDto } from 'src/app/models/authDto';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: AuthDto = new AuthDto();
  signinForm: FormGroup;

  // role =  '';

  constructor(
    public fb: FormBuilder,
    public authService: AuthenticationService,
    public router: Router,
    private userService: UserService
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit() { }

  loginUser() {
    // Assigner les valeurs du formulaire à l'objet user
    this.user.email = this.signinForm.get('email')?.value;
    this.user.password = this.signinForm.get('password')?.value;

    // Appeler la méthode signin du service d'authentification en passant l'objet user
    this.authService.signin(this.user)
      .subscribe(
        () => {

          this.recupUtilisateur();
          this.getRoleByUser();
          //this.close();
        }
      )


    console.log(this.user);

  }




  recupUtilisateur(): void {
    this.userService.getUserByEmail(this.user.email).subscribe(data => {

      this.userService.setConnectedUser(data);

    },
      error => {
        console.error('erreur : ', error);
        alert(error);

      }
    )
  }


  // logOut() {
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('connectedUser');
  //   this.router.navigate(['/']);
  // }



  getRoleByUser(): void {
    this.userService.getRole(this.user.email).subscribe(
      response => {
        const role = response.role;
        console.log('Detail du role:', role);

        // Maintenant, vous pouvez utiliser la propriété "role" pour effectuer des vérifications.
        if (role === 'CANDIDAT') {
          console.log('Redirection vers user');
          this.router.navigate(['test']);
        } else if (role === 'ADMIN') {
          console.log('Redirection vers admin');
          this.router.navigate(['admin']);
        } else {
          console.log('pas de routes');

        }
      },
      error => {
        console.error('Erreur lors de la récupération du rôle:', error);
        // Gérez l'erreur en conséquence
      }
    );
  }



  @ViewChild('exampleModal', { static: false }) exampleModal?: ElementRef

  close() {

    (this.exampleModal?.nativeElement as HTMLElement).style.display = 'none';

    document.body.classList.remove('modal-open');
    document.querySelector('.modal-backdrop')?.classList.remove("show");
    (document.querySelector('.modal.backdrop') as HTMLElement).style.display = 'none';



    document.querySelector('.modal-backdrop.fade')?.classList.remove("show");
    (document.querySelector('modal-backdrop.fade') as HTMLElement).style.display = 'none';


    document.querySelector('.modal')?.classList.remove("show");
    (document.querySelector('modal') as HTMLElement).style.display = 'none';



  }
}
