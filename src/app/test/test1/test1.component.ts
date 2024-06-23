import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDto } from 'src/app/models/authDto';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { Test11Service } from '../test11.service';
import { Individu } from 'src/app/models/individu';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component {


  private user: AuthDto = new AuthDto();
  private user1: User = new User();
  signinForm: FormGroup;

  // role =  '';

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private testService: Test11Service
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {

  }

  loginUser() {
    this.user.email = this.signinForm.get('email')?.value;
    this.user.password = this.signinForm.get('password')?.value;
    this.testService.signin(this.user)
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
  }



  getIdIndividu() {
    this.testService.getIdIndividu(this.user.id)
      .subscribe(
        response => {
          const id_individu = response.id_individu
          console.log('id_individu', id_individu);

        },
        error => {
          console.error('Erreur lors de la récupération de l\'ID de l\'individu:', error);
        }

      );
  }
  // getIdIndividu(userId: number) {
  //   this.testService.getIdIndividu(userId)
  //     .subscribe(

  //       individuId => {
  //         console.log('ID de l\'individu:', individuId);

  //         localStorage.setItem('ID_individu', individuId)
  //       },
  //       error => {
  //         console.error('Erreur lors de la récupération de l\'ID de l\'individu:', error);
  //       }
  //     );
  // }




  recupUtilisateur(): void {
    this.testService.getUserByEmail(this.user.email).subscribe(data => {

      this.testService.setConnectedUser(data);

    },
      error => {
        console.error('erreur : ', error);
        alert(error);

      }
    )
  }



  getRoleByUser(): void {
    this.testService.getRole(this.user.email).subscribe(
      response => {
        const role = response.role;
        console.log('Detail du role:', role);

        // Maintenant, vous pouvez utiliser la propriété "role" pour effectuer des vérifications.
        if (role === 'CANDIDAT') {

          console.log('Redirection vers test2');
          this.router.navigate(['test2']);
        } else if (role === 'ADMIN') {
          console.log('Redirection vers admin');
          this.router.navigate(['admin']);
        } else {
          console.log('pas de routes');

        }
      },
      error => {
        console.error('Erreur lors de la récupération du rôle:', error);
      }
    );
  }



}
