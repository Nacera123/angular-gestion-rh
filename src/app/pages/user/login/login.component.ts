import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  user: AuthDto = new AuthDto();

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
          this.router.navigate(['/']);
        }
      )


    console.log(this.user);

  }




  recupUtilisateur(): void {
    this.userService.getUserByEmail(this.user.email).subscribe(data => {

      // let user1: User;
      this.userService.setConnectedUser(data);
      // user1 = data ;
      // this.role = user1.email.roles

    })
  }


  // logOut() {
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('connectedUser');
  //   this.router.navigate(['/']);
  // }
}
