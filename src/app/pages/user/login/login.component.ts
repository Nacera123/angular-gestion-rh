import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDto } from 'src/app/models/authDto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: AuthDto = new AuthDto();

  signinForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthenticationService,
    public router: Router
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
          this.router.navigate(['/']);
        }
      )


    console.log(this.user);

  }
}
