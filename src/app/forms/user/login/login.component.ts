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
  private user1: User = new User();
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

  ngOnInit() {
  }

  loginUser() {
    // Assigner les valeurs du formulaire à l'objet user
    this.user.email = this.signinForm.get('email')?.value;
    this.user.password = this.signinForm.get('password')?.value;

    // Appeler la méthode signin du service d'authentification en passant l'objet user
    this.authService.signin(this.user)
      .subscribe(
        res => {
          console.log('Response from signin:', res); // Vérifiez la réponse ici
          if (res && res.token) {
            localStorage.setItem('access_token', res.token);
            if (res.id) {
              console.log('id user', res.id);
              localStorage.setItem('sub', res.id.toString());
              localStorage.setItem('id_individu', res.id_individu.toString());
              this.recupUtilisateur();
              this.getRoleByUser();

              localStorage.setItem('sub', res.id.toString());
              if (res.id_individu) {
                console.log('id individu', res.id_individu);

              }
            } else {
              console.error('ID de l\'utilisateur non défini dans la réponse de la connexion');
            }
          }
        },
        error => {
          console.error('Erreur lors de la connexion:', error);
        }
      );
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

  getIdIndividu(userId: number) {
    this.userService.getIdIndividu(userId)
      .subscribe(
        individuId => {
          console.log('ID de l\'individu:', individuId);
          // Utilisez individuId comme nécessaire
        },
        error => {
          console.error('Erreur lors de la récupération de l\'ID de l\'individu:', error);
        }
      );
  }


  getRoleByUser(): void {
    this.userService.getRole(this.user.email).subscribe(
      response => {
        const role = response.role;
        console.log('Detail du role:', role);

        // Maintenant, vous pouvez utiliser la propriété "role" pour effectuer des vérifications.
        if (role === 'CANDIDAT') {
          console.log('Redirection vers user');
          this.router.navigate(['mon-espace']);
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
